export type TrackId =
  | "tsinghua-automation"
  | "mit-eecs"
  | "ielts"
  | "philosophy"
  | "work-validation";

export type TaskStatus = "backlog" | "active" | "blocked" | "done" | "archived";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Track {
  id: TrackId;
  name: string;
  description: string;
  obsidianEntry: string;
  canvasEntry: string;
}

export interface LearningTask {
  id: string;
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
  obsidianPath: string | null;
  notionPageId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SyncEvent {
  id: string;
  entityType: "task";
  entityId: string;
  target: "obsidian" | "notion";
  status: "pending" | "success" | "failed";
  message: string;
  attemptCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface HealthResponse {
  ok: boolean;
  service: "cyrus-local-sync";
  notionConfigured: boolean;
  obsidianConfigured: boolean;
}
