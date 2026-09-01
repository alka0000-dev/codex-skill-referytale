#!/usr/bin/env ruby
# frozen_string_literal: true

require "digest"
require "fileutils"
require "json"
require "optparse"
require "pathname"

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: ruby build-evidence.rb --raw DIR --output DIR"
  opts.on("--raw DIR", "Raw run directory produced by run-regression.rb") { |value| options[:raw] = value }
  opts.on("--output DIR", "New directory for sanitized public evidence") { |value| options[:output] = value }
end.parse!

abort "Both --raw and --output are required" unless options[:raw] && options[:output]

raw_root = Pathname(options[:raw]).realpath
output_root = Pathname(options[:output]).expand_path
abort "Output already exists: #{output_root}" if output_root.exist?

def sanitize(text, raw_root, workspace)
  text
    .gsub(workspace.to_s, "workspace")
    .gsub(%r{/Users/[^/\s]+/[^\s)\]>]*?/workspace}, "workspace")
    .gsub(raw_root.to_s, "<RAW_ROOT>")
    .gsub(Dir.home, "<HOME>")
end

def relative_workspace_path(path, workspace)
  return path.split("/workspace/", 2).last if path.include?("/workspace/")

  Pathname(path).relative_path_from(workspace).to_s
rescue ArgumentError
  path
end

def phase1_table(output)
  header = "| ID | 出典 | 目的 | 具体対象 | 役割 | 前後関係 |"
  start = output.index(header)
  return nil unless start

  candidate = output.index("| ID | 候補語 | 種別 | 初出定義 |", start)
  body = candidate ? output[start...candidate] : output[start..]
  lines = body.lines
  table_lines = []
  started = false
  lines.each do |line|
    if line.start_with?("|")
      started = true
      table_lines << line
    elsif started
      break
    end
  end
  table_lines.join.strip
end

manifest = JSON.parse(raw_root.join("manifest.json").read)
FileUtils.mkdir_p(output_root)
output_root.join("manifest.json").write(JSON.pretty_generate(manifest) + "\n")
if raw_root.join("run-summary.json").file?
  run_summary = JSON.parse(raw_root.join("run-summary.json").read)
  output_root.join("run-summary.json").write(JSON.pretty_generate(run_summary) + "\n")
end

records = []
status_paths = Dir[raw_root.join("[0-9][0-9]-*", "{baseline,skill}", "run-*", "status.json").to_s].sort

status_paths.each do |status_name|
  status_path = Pathname(status_name)
  run_dir = status_path.dirname
  workspace = run_dir.join("workspace").realpath
  relative_run = run_dir.relative_path_from(raw_root)
  public_run = output_root.join(relative_run)
  FileUtils.mkdir_p(public_run)

  status = JSON.parse(status_path.read)
  public_run.join("status.json").write(JSON.pretty_generate(status) + "\n")

  Dir[run_dir.join("prompt-turn-*.txt").to_s].sort.each do |path|
    FileUtils.cp(path, public_run.join(File.basename(path)))
  end

  Dir[run_dir.join("final-turn-*.md").to_s].sort.each do |path|
    content = sanitize(File.read(path), raw_root, workspace)
    public_run.join(File.basename(path)).write(content)
  end

  public_workspace = public_run.join("workspace")
  workspace_files = Dir.glob(workspace.join("**", "*").to_s, File::FNM_DOTMATCH).select do |path|
    File.file?(path)
  end
  workspace_files.each do |path|
    relative = relative_workspace_path(path, workspace)
    next if relative.start_with?(".agent/")

    destination = public_workspace.join(relative)
    FileUtils.mkdir_p(destination.dirname)
    destination.write(sanitize(File.read(path), raw_root, workspace))
  end

  sequence = 0
  trace = []
  ref_changes = []
  target_changes = []
  final_sequences = {}
  phase1_observations = []
  phase2_observations = []
  skill_invocation_observed = false
  validation_observed = false

  Dir[run_dir.join("events-turn-*.jsonl").to_s].sort.each do |events_name|
    turn = File.basename(events_name)[/turn-(\d+)/, 1].to_i
    File.foreach(events_name) do |line|
      event = JSON.parse(line)
      sequence += 1
      item = event["item"] || {}
      next unless event["type"] == "item.completed"

      case item["type"]
      when "file_change"
        item.fetch("changes", []).each do |change|
          relative = relative_workspace_path(change.fetch("path"), workspace)
          entry = {
            "sequence" => sequence,
            "turn" => turn,
            "event" => "file_change",
            "kind" => change["kind"],
            "path" => relative
          }
          trace << entry
          if relative.start_with?(".codex/referent-tables/")
            ref_changes << entry
          elsif !relative.start_with?(".agent/")
            target_changes << entry
          end
        end
      when "command_execution"
        output = item["aggregated_output"].to_s
        command = item["command"].to_s
        if command.include?(".codex/referent-tables/") || command.include?("referent-table-")
          snapshot = phase1_table(output)
          if snapshot && !output.include?("| ID | 候補語 | 種別 | 初出定義 |")
            observation = {
              "sequence" => sequence,
              "turn" => turn,
              "event" => "phase1_snapshot_observed"
            }
            phase1_observations << observation.merge("snapshot" => snapshot)
            trace << observation
          end
          if output.include?("| ID | 候補語 | 種別 | 初出定義 |")
            observation = {
              "sequence" => sequence,
              "turn" => turn,
              "event" => "phase2_observed"
            }
            phase2_observations << observation
            trace << observation
          end
        end
        skill_invocation_observed ||= command.include?("codex-skill-referytale/SKILL.md")
        validation_observed ||= output.match?(/Semantic validation|Vocabulary check|Referent check|Role check|Name uniqueness|Sequence check|Unknown check|Purpose.means/i)
      when "agent_message"
        text = item["text"].to_s
        final_sequences[turn] = sequence
        skill_invocation_observed ||= text.match?(/\$referytale|`?referytale`?\s*(?:スキルを使|を使用|を使)|ReferyTale(?:を|スキル|\s)/i)
        validation_observed ||= text.match?(/Semantic validation|semantic validation|語彙.*検査|指示対象.*検査|役割.*検査|名称.*一意|順序.*検査|未確定.*検査|目的.*手段.*検査/)
      end
    end
  end

  first_ref = ref_changes.first
  target_first_sequence = target_changes.map { |entry| entry["sequence"] }.min || final_sequences.values.min
  phase1_first = phase1_observations.first
  phase2_first = phase2_observations.first
  referent_files = Dir[workspace.join(".codex/referent-tables/*.md").to_s]
  final_ref_has_phase2 = referent_files.any? do |path|
    File.read(path).include?("| ID | 候補語 | 種別 | 初出定義 |")
  end
  g1 = first_ref && target_first_sequence && first_ref["sequence"] < target_first_sequence
  phase2_change_after_phase1 = phase1_first && ref_changes.any? do |entry|
    entry["sequence"] > phase1_first["sequence"]
  end
  g2 = phase1_first && phase2_change_after_phase1 && final_ref_has_phase2

  if phase1_first
    public_run.join("phase1-snapshot.md").write(phase1_first.fetch("snapshot") + "\n")
  end
  public_run.join("event-trace.json").write(JSON.pretty_generate(trace) + "\n")

  record = {
    "fixture" => status.fetch("fixture"),
    "mode" => status.fetch("mode"),
    "run" => status.fetch("run"),
    "execution_success" => status.fetch("success"),
    "prompt_sha256" => Digest::SHA256.file(run_dir.join("prompt-turn-1.txt")).hexdigest,
    "referent_table_count" => referent_files.length,
    "skill_invocation_observed" => skill_invocation_observed,
    "phase1_snapshot_observed" => !phase1_first.nil?,
    "phase2_observed" => !phase2_first.nil? || final_ref_has_phase2,
    "g1_preflight_order_observed" => !!g1,
    "g2_phase_separation_observed" => !!g2,
    "semantic_validation_mentioned" => validation_observed,
    "turn_2_referent_changes_before_final" => if final_sequences[2]
      ref_changes.count { |entry| entry["turn"] == 2 && entry["sequence"] < final_sequences[2] }
    end
  }
  public_run.join("automatic-checks.json").write(JSON.pretty_generate(record) + "\n")
  records << record
end

output_root.join("automatic-checks.json").write(JSON.pretty_generate(records) + "\n")
