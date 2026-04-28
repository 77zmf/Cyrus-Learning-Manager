import { randomUUID } from "node:crypto";
import type Database from "better-sqlite3";
import type { LearningTask } from "../../src/domain/types";
import { syncTaskToNotion, type NotionSyncConfig } from "./notion";
import { writeTaskMarkdownToObsidian } from "./obsidian";

export interface SyncQueueConfig extends NotionSyncConfig {
  obsidianVaultPath: string;
}

export interface SyncTaskResult {
  obsidian:
    | { status: "success"; relativePath: string }
    | { status: "failed"; message: string };
  notion:
    | { status: "success"; pageId: string; message: string }
    | { status: "skipped"; message: string }
    | { status: "failed"; message: string };
}

export async function syncTask(
  db: Database.Database,
  task: LearningTask,
  config: SyncQueueConfig
): Promise<SyncTaskResult> {
  let taskForNotion = task;
  let obsidianResult: SyncTaskResult["obsidian"];

  try {
    const result = writeTaskMarkdownToObsidian(task, {
      vaultPath: config.obsidianVaultPath
    });
    db.prepare("UPDATE tasks SET obsidian_path = ? WHERE id = ?").run(
      result.relativePath,
      task.id
    );
    taskForNotion = { ...task, obsidianPath: result.relativePath };
    obsidianResult = { status: "success", relativePath: result.relativePath };
    recordSyncEvent(db, task.id, "obsidian", "success", result.relativePath);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to sync task to Obsidian";
    obsidianResult = { status: "failed", message };
    recordSyncEvent(db, task.id, "obsidian", "failed", message);
  }

  const notionResult = await syncTaskToNotion(taskForNotion, config);
  if (notionResult.status === "success") {
    db.prepare("UPDATE tasks SET notion_page_id = ? WHERE id = ?").run(
      notionResult.pageId,
      task.id
    );
    if (obsidianResult.status === "success") {
      writeTaskMarkdownToObsidian(
        { ...taskForNotion, notionPageId: notionResult.pageId },
        { vaultPath: config.obsidianVaultPath }
      );
    }
  }
  recordSyncEvent(db, task.id, "notion", notionResult.status, notionResult.message);

  return {
    obsidian: obsidianResult,
    notion: notionResult
  };
}

export function recordSyncFailure(
  db: Database.Database,
  taskId: string,
  target: "obsidian" | "notion",
  message: string
) {
  recordSyncEvent(db, taskId, target, "failed", message);
}

function recordSyncEvent(
  db: Database.Database,
  taskId: string,
  target: "obsidian" | "notion",
  status: "success" | "failed" | "skipped",
  message: string
) {
  const now = new Date().toISOString();
  db.prepare(
    `
      INSERT INTO sync_events (
        id,
        entity_type,
        entity_id,
        target,
        status,
        message,
        attempt_count,
        created_at,
        updated_at
      )
      VALUES (?, 'task', ?, ?, ?, ?, 1, ?, ?)
    `
  ).run(`sync_${randomUUID()}`, taskId, target, status, message, now, now);
}
