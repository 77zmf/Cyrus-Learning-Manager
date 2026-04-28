import type Database from "better-sqlite3";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";
import { syncTask } from "../../server/sync/queue";
import { createTask, getTask } from "../../server/tasks";

let tempDir: string | null = null;
let db: Database.Database | null = null;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "cyrus-sync-queue-"));
  db = openDatabase(join(tempDir, "app.db"));
});

afterEach(() => {
  db?.close();
  db = null;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("sync queue", () => {
  it("writes Obsidian, records skipped Notion, and stores sync events", async () => {
    const vaultPath = join(requiredTempDir(), "vault");
    const task = createTask(requiredDb(), {
      title: "Queue sync task",
      track: "work-validation",
      status: "active",
      priority: "urgent",
      progress: 25,
      notes: "queue notes",
      source: "run output"
    });

    const result = await syncTask(requiredDb(), task, {
      obsidianVaultPath: vaultPath,
      notionToken: null,
      notionTasksDatabaseId: null
    });

    expect(result.obsidian.status).toBe("success");
    if (result.obsidian.status !== "success") {
      throw new Error(result.obsidian.message);
    }
    expect(result.notion.status).toBe("skipped");
    expect(result.obsidian.relativePath).toBe(
      "60_Learning-App/Tasks/" + `${task.id}-queue-sync-task.md`
    );
    expect(existsSync(join(vaultPath, result.obsidian.relativePath))).toBe(true);

    const stored = getTask(requiredDb(), task.id);
    expect(stored?.obsidianPath).toBe(result.obsidian.relativePath);
    expect(stored?.notionPageId).toBeNull();
    const content = readFileSync(join(vaultPath, result.obsidian.relativePath), "utf8");
    expect(content).toContain(`- Obsidian Path: ${result.obsidian.relativePath}`);

    const events = requiredDb()
      .prepare("SELECT target, status, message FROM sync_events ORDER BY created_at ASC")
      .all() as Array<{ target: string; status: string; message: string }>;
    expect(events).toEqual([
      {
        target: "obsidian",
        status: "success",
        message: result.obsidian.relativePath
      },
      {
        target: "notion",
        status: "skipped",
        message: "Notion token or tasks database id is not configured"
      }
    ]);
  });
});

function requiredTempDir() {
  if (!tempDir) throw new Error("test temp dir was not initialized");
  return tempDir;
}

function requiredDb() {
  if (!db) throw new Error("test database was not initialized");
  return db;
}
