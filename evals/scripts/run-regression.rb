#!/usr/bin/env ruby
# frozen_string_literal: true

require "digest"
require "fileutils"
require "json"
require "open3"
require "optparse"
require "pathname"
require "thread"
require "time"

DEFAULTS = {
  codex: "codex",
  model: "gpt-5.6-sol",
  effort: "medium",
  runs: 3,
  concurrency: 2,
  modes: %w[baseline skill]
}.freeze

options = DEFAULTS.dup
options[:fixtures] = []
options[:disabled_skills] = []
options[:run_numbers] = []
options[:skip_existing_success] = false

parser = OptionParser.new do |opts|
  opts.banner = "Usage: ruby run-regression.rb --skill-path PATH --output DIR [options]"

  opts.on("--skill-path PATH", "Path to referytale/SKILL.md") { |value| options[:skill_path] = value }
  opts.on("--output DIR", "Directory for raw run records") { |value| options[:output] = value }
  opts.on("--fixtures DIR", "Fixture directory") { |value| options[:fixtures_dir] = value }
  opts.on("--fixture NAME", "Run only this fixture directory; repeatable") { |value| options[:fixtures] << value }
  opts.on("--disable-skill PATH", "Disable another custom skill; repeatable") do |value|
    options[:disabled_skills] << value
  end
  opts.on("--codex PATH", "Codex CLI executable") { |value| options[:codex] = value }
  opts.on("--model ID", "Exact model ID") { |value| options[:model] = value }
  opts.on("--effort LEVEL", "Reasoning effort") { |value| options[:effort] = value }
  opts.on("--runs N", Integer, "Runs per fixture and mode") { |value| options[:runs] = value }
  opts.on("--run-number N", Integer, "Run only this repetition number; repeatable") do |value|
    options[:run_numbers] << value
  end
  opts.on("--concurrency N", Integer, "Maximum concurrent independent runs") do |value|
    options[:concurrency] = value
  end
  opts.on("--modes LIST", "Comma-separated baseline,skill") { |value| options[:modes] = value.split(",") }
  opts.on("--skip-existing-success", "Keep successful run directories and execute only missing jobs") do
    options[:skip_existing_success] = true
  end
end

parser.parse!

abort parser.to_s unless options[:skill_path] && options[:output]
abort "--runs must be 1 or greater" unless options[:runs].positive?
abort "--run-number must be 1 or greater" unless options[:run_numbers].all?(&:positive?)
abort "--concurrency must be 1 or greater" unless options[:concurrency].positive?
abort "--modes may contain only baseline and skill" unless (options[:modes] - %w[baseline skill]).empty?

script_dir = Pathname(__dir__).realpath
fixtures_dir = Pathname(options[:fixtures_dir] || script_dir.join("../fixtures")).realpath
skill_path = Pathname(options[:skill_path]).realpath
output_dir = Pathname(options[:output]).expand_path

def extract_input(path)
  body = path.read
  match = body.match(/^## Input\s*$\n(.*?)(?=^## Likely baseline failures\s*$)/m)
  raise "Input section not found: #{path}" unless match

  match[1].strip
end

def split_turns(input)
  headings = input.scan(/^### Turn (\d+)\s*$/).flatten.map(&:to_i)
  return [input] if headings.empty?

  expected = (1..headings.length).to_a
  raise "Turn numbering must be contiguous: #{headings.inspect}" unless headings == expected

  input.split(/^### Turn \d+\s*$\n/).drop(1).map(&:strip)
end

def toml_string(value)
  value.to_json
end

def skill_config(disabled_skills, skill_path, mode)
  entries = (disabled_skills + [skill_path.to_s]).uniq.map do |path|
    "{path=#{toml_string(File.expand_path(path))},enabled=false}"
  end
  entries << "{path=#{toml_string(skill_path.to_s)},enabled=true}" if mode == "skill"
  "skills.config=[#{entries.join(",")}]"
end

def find_thread_id(value)
  case value
  when Hash
    direct = value["thread_id"] || value["threadId"]
    return direct if direct.is_a?(String) && !direct.empty?

    value.each_value do |child|
      found = find_thread_id(child)
      return found if found
    end
  when Array
    value.each do |child|
      found = find_thread_id(child)
      return found if found
    end
  end
  nil
end

def run_command(command, prompt, events_path, stderr_path)
  thread_id = nil
  File.open(events_path, "wb") do |events|
    File.open(stderr_path, "wb") do |errors|
      Open3.popen3(*command) do |stdin, stdout, stderr, wait_thread|
        stdin.write(prompt)
        stdin.close

        stdout_reader = Thread.new do
          stdout.each_line do |line|
            events.write(line)
            begin
              parsed = JSON.parse(line)
              thread_id ||= find_thread_id(parsed)
            rescue JSON::ParserError
              # Preserve non-JSON diagnostics in the raw record.
            end
          end
        end
        stderr_reader = Thread.new { stderr.each_line { |line| errors.write(line) } }

        stdout_reader.join
        stderr_reader.join
        return [wait_thread.value.exitstatus, thread_id]
      end
    end
  end
end

def base_command(options, workspace, config)
  referent_dir = workspace.join(".codex/referent-tables")
  [
    options[:codex],
    "-a", "never",
    "-s", "workspace-write",
    "--add-dir", referent_dir.to_s,
    "-m", options[:model],
    "exec",
    "--skip-git-repo-check",
    "--ignore-user-config",
    "--ignore-rules",
    "-c", "model_reasoning_effort=#{toml_string(options[:effort])}",
    "-c", config,
    "-C", workspace.to_s,
    "--json"
  ]
end

fixture_paths = fixtures_dir.children.select { |path| path.directory? && path.join("fixture.md").file? }.sort
unless options[:fixtures].empty?
  fixture_paths.select! { |path| options[:fixtures].include?(path.basename.to_s) }
  missing = options[:fixtures] - fixture_paths.map { |path| path.basename.to_s }
  abort "Unknown fixtures: #{missing.join(", ")}" unless missing.empty?
end
abort "No fixtures found in #{fixtures_dir}" if fixture_paths.empty?

run_numbers = options[:run_numbers].empty? ? (1..options[:runs]).to_a : options[:run_numbers].uniq.sort
planned_jobs = fixture_paths.product(options[:modes], run_numbers)
skipped_jobs = []
jobs = planned_jobs.reject do |fixture_path, mode, run_number|
  next false unless options[:skip_existing_success]

  status_path = output_dir.join(fixture_path.basename.to_s, mode, "run-#{run_number}/status.json")
  next false unless status_path.file?

  status = JSON.parse(status_path.read)
  if status["success"] == true
    skipped_jobs << [fixture_path, mode, run_number]
    true
  else
    false
  end
rescue JSON::ParserError
  false
end
queue = Queue.new
jobs.each { |job| queue << job }

codex_version_stdout, codex_version_stderr, codex_version_status = Open3.capture3(options[:codex], "--version")
abort "Could not read Codex CLI version: #{codex_version_stderr.strip}" unless codex_version_status.success?

manifest = {
  "started_at" => Time.now.utc.iso8601,
  "codex" => options[:codex],
  "codex_cli_version" => codex_version_stdout.strip,
  "model" => options[:model],
  "reasoning_effort" => options[:effort],
  "runs_per_fixture_and_mode" => options[:runs],
  "run_numbers" => run_numbers,
  "modes" => options[:modes],
  "fixtures" => fixture_paths.map { |path| path.basename.to_s },
  "planned_jobs" => planned_jobs.length,
  "skipped_existing_successes" => skipped_jobs.length,
  "skill_sha256" => Digest::SHA256.file(skill_path).hexdigest,
  "project_instruction_sha256" => begin
    global_agents = Pathname(Dir.home).join(".codex/AGENTS.md")
    global_agents.file? ? Digest::SHA256.file(global_agents).hexdigest : nil
  end
}
FileUtils.mkdir_p(output_dir)
output_dir.join("manifest.json").write(JSON.pretty_generate(manifest) + "\n")

print_lock = Mutex.new
failure_lock = Mutex.new
failures = []
completed = 0

workers = Array.new([options[:concurrency], jobs.length].min) do
  Thread.new do
    loop do
      fixture_path, mode, run_number = queue.pop(true)
      fixture_name = fixture_path.basename.to_s
      run_dir = output_dir.join(fixture_name, mode, "run-#{run_number}")
      workspace = run_dir.join("workspace")
      FileUtils.mkdir_p(workspace)
      FileUtils.mkdir_p(workspace.join(".codex/referent-tables"))

      input = extract_input(fixture_path.join("fixture.md"))
      turns = split_turns(input)
      config = skill_config(options[:disabled_skills], skill_path, mode)
      thread_id = nil
      turn_results = []

      turns.each_with_index do |source_prompt, index|
        turn_number = index + 1
        prompt = if mode == "skill" && turn_number == 1
                   "$referytale\n\n#{source_prompt}"
                 else
                   source_prompt
                 end
        run_dir.join("prompt-turn-#{turn_number}.txt").write(prompt + "\n")

        final_path = run_dir.join("final-turn-#{turn_number}.md")
        events_path = run_dir.join("events-turn-#{turn_number}.jsonl")
        stderr_path = run_dir.join("stderr-turn-#{turn_number}.log")

        command = if turn_number == 1
                    initial = base_command(options, workspace, config)
                    initial << "--ephemeral" if turns.length == 1
                    initial + ["-o", final_path.to_s, "-"]
                  else
                    raise "Missing thread ID after turn 1" unless thread_id

                    [
                      options[:codex],
                      "-a", "never",
                      "-s", "workspace-write",
                      "--add-dir", workspace.join(".codex/referent-tables").to_s,
                      "exec", "resume",
                      "--skip-git-repo-check",
                      "--ignore-user-config",
                      "--ignore-rules",
                      "-m", options[:model],
                      "-c", "model_reasoning_effort=#{toml_string(options[:effort])}",
                      "-c", config,
                      "--json",
                      "-o", final_path.to_s,
                      thread_id,
                      "-"
                    ]
                  end

        started_at = Time.now.utc
        exit_status, observed_thread_id = run_command(command, prompt, events_path, stderr_path)
        thread_id ||= observed_thread_id
        turn_results << {
          "turn" => turn_number,
          "started_at" => started_at.iso8601,
          "finished_at" => Time.now.utc.iso8601,
          "exit_status" => exit_status,
          "thread_id_recorded" => !observed_thread_id.nil?
        }
        break unless exit_status.zero?
      end

      success = turn_results.length == turns.length && turn_results.all? { |result| result["exit_status"].zero? }
      status = {
        "fixture" => fixture_name,
        "mode" => mode,
        "run" => run_number,
        "success" => success,
        "turns" => turn_results
      }
      run_dir.join("status.json").write(JSON.pretty_generate(status) + "\n")

      failure_lock.synchronize { failures << status unless success }
      print_lock.synchronize do
        completed += 1
        state = success ? "PASS" : "ERROR"
        puts "[#{completed}/#{jobs.length}] #{state} #{fixture_name} #{mode} run-#{run_number}"
      end
    rescue ThreadError
      break
    rescue StandardError => e
      failure_lock.synchronize do
        failures << {
          "fixture" => fixture_path&.basename&.to_s,
          "mode" => mode,
          "run" => run_number,
          "success" => false,
          "error" => "#{e.class}: #{e.message}"
        }
      end
      print_lock.synchronize do
        completed += 1
        warn "[#{completed}/#{jobs.length}] ERROR #{fixture_path&.basename} #{mode} run-#{run_number}: #{e.message}"
      end
    end
  end
end
workers.each(&:join)

summary = {
  "finished_at" => Time.now.utc.iso8601,
  "planned_jobs" => planned_jobs.length,
  "executed_jobs" => jobs.length,
  "skipped_existing_successes" => skipped_jobs.length,
  "successful_jobs" => skipped_jobs.length + jobs.length - failures.length,
  "failed_jobs" => failures.length,
  "failures" => failures
}
output_dir.join("run-summary.json").write(JSON.pretty_generate(summary) + "\n")

exit(failures.empty? ? 0 : 1)
