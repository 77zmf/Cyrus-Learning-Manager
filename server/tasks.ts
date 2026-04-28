import { randomUUID } from "node:crypto";
import type Database from "better-sqlite3";
import type {
  LearningTask,
  TaskPriority,
  TaskStatus,
  TrackId
} from "../src/domain/types";

export interface CreateTaskInput {
  title: string;
  track: TrackId;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
  progress?: number;
  source?: string;
  notes?: string;
  obsidianPath?: string | null;
  notionPageId?: string | null;
}

export interface ListTasksFilters {
  search?: string;
  track?: TrackId;
  status?: TaskStatus;
  priority?: TaskPriority;
}

interface TaskRow {
  id: string;
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  progress: number;
  source: string;
  notes: string;
  obsidian_path: string | null;
  notion_page_id: string | null;
  created_at: string;
  updated_at: string;
}

const taskSelect = `
  SELECT
    id,
    title,
    track,
    status,
    priority,
    due_date,
    progress,
    source,
    notes,
    obsidian_path,
    notion_page_id,
    created_at,
    updated_at
  FROM tasks
`;

const validStatuses = new Set<TaskStatus>([
  "backlog",
  "active",
  "blocked",
  "done",
  "archived"
]);
const validPriorities = new Set<TaskPriority>(["low", "medium", "high", "urgent"]);
const validTracks = new Set<TrackId>([
  "tsinghua-automation",
  "mit-eecs",
  "ielts",
  "philosophy",
  "work-validation"
]);

export function createTask(db: Database.Database, input: CreateTaskInput): LearningTask {
  assertCreateTaskInput(input);
  const now = new Date().toISOString();
  const task = {
    id: `task_${randomUUID()}`,
    title: input.title,
    track: input.track,
    status: input.status ?? "backlog",
    priority: input.priority ?? "medium",
    dueDate: input.dueDate ?? null,
    progress: input.progress ?? 0,
    source: input.source ?? "",
    notes: input.notes ?? "",
    obsidianPath: input.obsidianPath ?? null,
    notionPageId: input.notionPageId ?? null,
    createdAt: now,
    updatedAt: now
  } satisfies LearningTask;

  db.prepare(
    `
      INSERT INTO tasks (
        id,
        title,
        track,
        status,
        priority,
        due_date,
        progress,
        source,
        notes,
        obsidian_path,
        notion_page_id,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    task.id,
    task.title,
    task.track,
    task.status,
    task.priority,
    task.dueDate,
    task.progress,
    task.source,
    task.notes,
    task.obsidianPath,
    task.notionPageId,
    task.createdAt,
    task.updatedAt
  );

  return task;
}

export function getTask(db: Database.Database, id: string): LearningTask | null {
  const row = db.prepare(`${taskSelect} WHERE id = ?`).get(id) as TaskRow | undefined;
  return row ? mapTaskRow(row) : null;
}

export function listTasks(
  db: Database.Database,
  filters: ListTasksFilters = {}
): LearningTask[] {
  const clauses: string[] = [];
  const values: Array<string> = [];

  if (filters.search?.trim()) {
    clauses.push(
      "(LOWER(title) LIKE LOWER(?) OR LOWER(notes) LIKE LOWER(?) OR LOWER(source) LIKE LOWER(?))"
    );
    const search = `%${filters.search.trim()}%`;
    values.push(search, search, search);
  }

  if (filters.track) {
    assertTrack(filters.track);
    clauses.push("track = ?");
    values.push(filters.track);
  }

  if (filters.status) {
    assertTaskStatus(filters.status);
    clauses.push("status = ?");
    values.push(filters.status);
  }

  if (filters.priority) {
    assertTaskPriority(filters.priority);
    clauses.push("priority = ?");
    values.push(filters.priority);
  }

  const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = db
    .prepare(
      `
        ${taskSelect}
        ${where}
        ORDER BY due_date IS NULL ASC, due_date ASC, updated_at DESC
      `
    )
    .all(...values) as TaskRow[];

  return rows.map(mapTaskRow);
}

export function updateTaskStatus(
  db: Database.Database,
  id: string,
  status: TaskStatus,
  progress: number
): LearningTask | null {
  assertTaskStatus(status);
  assertProgress(progress);

  const existing = getTask(db, id);
  if (!existing) return null;

  let updatedAt = new Date().toISOString();
  if (updatedAt <= existing.updatedAt) {
    updatedAt = new Date(Date.parse(existing.updatedAt) + 1).toISOString();
  }

  db.prepare("UPDATE tasks SET status = ?, progress = ?, updated_at = ? WHERE id = ?").run(
    status,
    progress,
    updatedAt,
    id
  );

  return getTask(db, id);
}

function mapTaskRow(row: TaskRow): LearningTask {
  return {
    id: row.id,
    title: row.title,
    track: row.track,
    status: row.status,
    priority: row.priority,
    dueDate: row.due_date,
    progress: row.progress,
    source: row.source,
    notes: row.notes,
    obsidianPath: row.obsidian_path,
    notionPageId: row.notion_page_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function assertTaskStatus(status: string): asserts status is TaskStatus {
  if (!validStatuses.has(status as TaskStatus)) {
    throw new Error(`Invalid task status: ${status}`);
  }
}

function assertTaskPriority(priority: string): asserts priority is TaskPriority {
  if (!validPriorities.has(priority as TaskPriority)) {
    throw new Error(`Invalid task priority: ${priority}`);
  }
}

function assertTrack(track: string): asserts track is TrackId {
  if (!validTracks.has(track as TrackId)) {
    throw new Error(`Invalid task track: ${track}`);
  }
}

function assertProgress(progress: number) {
  if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
    throw new Error(`Invalid task progress: ${progress}`);
  }
}

function assertOptionalString(value: unknown, field: string): asserts value is string | undefined {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`Invalid ${field}`);
  }
}

function assertNullableString(
  value: unknown,
  field: string
): asserts value is string | null | undefined {
  if (value !== undefined && value !== null && typeof value !== "string") {
    throw new Error(`Invalid ${field}`);
  }
}

function assertCreateTaskInput(input: CreateTaskInput) {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid task input");
  }
  if (typeof input.title !== "string" || !input.title.trim()) {
    throw new Error("Task title is required");
  }
  input.title = input.title.trim();
  assertTrack(input.track);
  if (input.status !== undefined) assertTaskStatus(input.status);
  if (input.priority !== undefined) assertTaskPriority(input.priority);
  if (input.progress !== undefined) assertProgress(input.progress);
  assertNullableString(input.dueDate, "dueDate");
  assertOptionalString(input.source, "source");
  assertOptionalString(input.notes, "notes");
  assertNullableString(input.obsidianPath, "obsidianPath");
  assertNullableString(input.notionPageId, "notionPageId");
}
