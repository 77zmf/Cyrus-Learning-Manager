import type Database from "better-sqlite3";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";
import {
  createTask,
  getTask,
  listTasks,
  updateTaskStatus
} from "../../server/tasks";

let tempDir: string | null = null;
let db: Database.Database | null = null;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "cyrus-tasks-"));
  db = openDatabase(join(tempDir, "app.db"));
});

afterEach(() => {
  db?.close();
  db = null;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

function database() {
  if (!db) throw new Error("test database was not initialized");
  return db;
}

describe("task repository", () => {
  it("creates and reads a learning task with camelCase fields", () => {
    const task = createTask(database(), {
      title: "Read planning paper",
      track: "mit-eecs",
      status: "backlog",
      priority: "urgent",
      dueDate: "2026-05-01",
      progress: 10,
      source: "course notes",
      notes: "focus on proofs",
      obsidianPath: "Learning/MIT.md",
      notionPageId: "notion-123"
    });

    expect(task).toMatchObject({
      title: "Read planning paper",
      track: "mit-eecs",
      status: "backlog",
      priority: "urgent",
      dueDate: "2026-05-01",
      progress: 10,
      source: "course notes",
      notes: "focus on proofs",
      obsidianPath: "Learning/MIT.md",
      notionPageId: "notion-123"
    });
    expect(task.id).toMatch(/^task_/);
    expect(task.createdAt).toBe(task.updatedAt);

    expect(getTask(database(), task.id)).toEqual(task);
    expect(getTask(database(), "task_missing")).toBeNull();
  });

  it("lists tasks sorted by due date then updated time", () => {
    const laterDue = createTask(database(), {
      title: "Later due",
      track: "ielts",
      status: "active",
      priority: "medium",
      dueDate: "2026-06-01"
    });
    const earliestDue = createTask(database(), {
      title: "Earliest due",
      track: "philosophy",
      status: "blocked",
      priority: "high",
      dueDate: "2026-05-01"
    });
    const noDueOlder = createTask(database(), {
      title: "No due older",
      track: "work-validation",
      status: "done",
      priority: "low",
      dueDate: null
    });
    const noDueNewest = createTask(database(), {
      title: "No due newest",
      track: "tsinghua-automation",
      status: "archived",
      priority: "urgent",
      dueDate: null
    });

    database()
      .prepare("UPDATE tasks SET updated_at = ? WHERE id = ?")
      .run("2026-04-01T00:00:00.000Z", noDueOlder.id);
    database()
      .prepare("UPDATE tasks SET updated_at = ? WHERE id = ?")
      .run("2026-04-02T00:00:00.000Z", noDueNewest.id);

    expect(listTasks(database()).map((task) => task.id)).toEqual([
      earliestDue.id,
      laterDue.id,
      noDueNewest.id,
      noDueOlder.id
    ]);
  });

  it("filters tasks by case-insensitive search and track", () => {
    const planning = createTask(database(), {
      title: "Closed-loop Planning Review",
      track: "work-validation",
      status: "active",
      priority: "high",
      notes: "CARLA KPI gate"
    });
    createTask(database(), {
      title: "Planning homework",
      track: "mit-eecs",
      status: "backlog",
      priority: "medium",
      notes: "lecture"
    });
    createTask(database(), {
      title: "IELTS speaking",
      track: "ielts",
      status: "active",
      priority: "low",
      notes: "practice"
    });

    expect(
      listTasks(database(), { search: "planning", track: "work-validation" }).map(
        (task) => task.id
      )
    ).toEqual([planning.id]);
  });

  it("filters tasks by status and priority", () => {
    const blockedUrgent = createTask(database(), {
      title: "Resolve blocker",
      track: "work-validation",
      status: "blocked",
      priority: "urgent"
    });
    createTask(database(), {
      title: "Low priority blocker",
      track: "work-validation",
      status: "blocked",
      priority: "low"
    });
    createTask(database(), {
      title: "Urgent active task",
      track: "work-validation",
      status: "active",
      priority: "urgent"
    });

    expect(
      listTasks(database(), { status: "blocked", priority: "urgent" }).map(
        (task) => task.id
      )
    ).toEqual([blockedUrgent.id]);
  });

  it("rejects invalid creation data", () => {
    expect(() =>
      createTask(database(), {
        title: "   ",
        track: "mit-eecs",
        status: "active",
        priority: "medium"
      })
    ).toThrow("Task title is required");

    expect(() =>
      createTask(database(), {
        title: "Bad track",
        track: "not-a-track" as never,
        status: "active",
        priority: "medium"
      })
    ).toThrow("Invalid task track");

    expect(() =>
      createTask(database(), {
        title: "Bad progress",
        track: "mit-eecs",
        status: "active",
        priority: "medium",
        progress: 101
      })
    ).toThrow("Invalid task progress");
  });

  it("rejects invalid filter values", () => {
    expect(() => listTasks(database(), { track: "bad-track" as never })).toThrow(
      "Invalid task track"
    );
    expect(() => listTasks(database(), { status: "bad-status" as never })).toThrow(
      "Invalid task status"
    );
    expect(() => listTasks(database(), { priority: "bad-priority" as never })).toThrow(
      "Invalid task priority"
    );
  });

  it("updates a task status, progress, and updated timestamp", () => {
    const task = createTask(database(), {
      title: "Draft sync plan",
      track: "tsinghua-automation",
      status: "active",
      priority: "medium"
    });

    const updated = updateTaskStatus(database(), task.id, "done", 100);

    expect(updated).toMatchObject({
      id: task.id,
      status: "done",
      progress: 100
    });
    expect(updated?.updatedAt).not.toBe(task.updatedAt);
    expect(getTask(database(), task.id)?.status).toBe("done");
    expect(getTask(database(), task.id)?.progress).toBe(100);
    expect(updateTaskStatus(database(), "task_missing", "archived", 0)).toBeNull();
  });
});
