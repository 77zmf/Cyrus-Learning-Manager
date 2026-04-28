import { mkdirSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import type { LearningTask } from "../../src/domain/types";

export interface ObsidianSyncConfig {
  vaultPath: string;
}

export interface ObsidianSyncResult {
  relativePath: string;
}

const taskDirectory = "60_Learning-App/Tasks";
const generatedMarker = "<!-- CYRUS_LEARNING_MANAGER:GENERATED -->";

export function writeTaskMarkdownToObsidian(
  task: LearningTask,
  config: ObsidianSyncConfig
): ObsidianSyncResult {
  if (!config.vaultPath.trim()) {
    throw new Error("Obsidian vault path is not configured");
  }

  const filename = `${sanitizeFilenamePart(task.id)}-${slugify(task.title)}.md`;
  const relativePath = posix.join(taskDirectory, filename);
  const absoluteDirectory = join(config.vaultPath, taskDirectory);
  const taskForMarkdown = { ...task, obsidianPath: relativePath };
  mkdirSync(absoluteDirectory, { recursive: true });
  writeFileSync(
    join(config.vaultPath, relativePath),
    renderTaskMarkdown(taskForMarkdown),
    "utf8"
  );

  return { relativePath };
}

function renderTaskMarkdown(task: LearningTask) {
  return `---
id: ${yamlString(task.id)}
title: ${yamlString(task.title)}
track: ${yamlString(task.track)}
status: ${yamlString(task.status)}
priority: ${yamlString(task.priority)}
due: ${task.dueDate ? yamlString(task.dueDate) : "null"}
progress: ${task.progress}
source: ${yamlString(task.source)}
generated: true
created_at: ${yamlString(task.createdAt)}
updated_at: ${yamlString(task.updatedAt)}
---

${generatedMarker}

# ${task.title}

## Summary
- Track: ${task.track}
- Status: ${task.status}
- Priority: ${task.priority}
- Due: ${task.dueDate ?? "Unscheduled"}
- Progress: ${task.progress}%

## Notes
${task.notes.trim() || "_No notes recorded._"}

## Evidence or Output
${task.source.trim() || "_No evidence or output recorded._"}

## Next Action
${nextActionFor(task)}

## Sync Metadata
- Task ID: ${task.id}
- Obsidian Path: ${task.obsidianPath ?? "Pending"}
- Notion Page ID: ${task.notionPageId ?? "Pending"}
- Last Updated: ${task.updatedAt}
`;
}

function nextActionFor(task: LearningTask) {
  if (task.status === "done") return "Review and archive when appropriate.";
  if (task.status === "blocked") return "Resolve the blocker or record the owner.";
  return "Continue the next concrete step for this task.";
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "untitled";
}

function sanitizeFilenamePart(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function yamlString(value: string) {
  return JSON.stringify(value);
}
