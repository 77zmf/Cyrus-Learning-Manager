import type {
  HealthResponse,
  LearningTask,
  TaskPriority,
  TaskStatus,
  TrackId
} from "../domain/types";

const baseUrl = "http://127.0.0.1:8787";

export interface TaskFilters {
  search?: string;
  track?: TrackId | "";
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
}

export interface CreateTaskInput {
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${baseUrl}/health`, {
    headers: appKeyHeaders()
  });
  if (!response.ok) throw new Error("Local sync service is not reachable.");
  return response.json() as Promise<HealthResponse>;
}

export async function listTasks(filters: TaskFilters = {}): Promise<LearningTask[]> {
  const params = new URLSearchParams();
  if (filters.search?.trim()) params.set("search", filters.search.trim());
  if (filters.track) params.set("track", filters.track);
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);

  const query = params.toString();
  const response = await fetch(`${baseUrl}/tasks${query ? `?${query}` : ""}`, {
    headers: appKeyHeaders()
  });
  if (!response.ok) throw new Error("Failed to load tasks.");
  const data = (await response.json()) as { tasks: LearningTask[] };
  return data.tasks;
}

export async function createTask(input: CreateTaskInput): Promise<LearningTask> {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(input)
  });
  if (!response.ok) throw new Error("Failed to create task.");
  const data = (await response.json()) as { task: LearningTask };
  return data.task;
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  progress: number
): Promise<LearningTask> {
  const response = await fetch(`${baseUrl}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify({ status, progress })
  });
  if (!response.ok) throw new Error("Failed to update task status.");
  const data = (await response.json()) as { task: LearningTask };
  return data.task;
}

function jsonHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    ...appKeyHeaders()
  };
}

function appKeyHeaders(): Record<string, string> {
  const localKey = readLocalAppKey();
  return localKey ? { "x-cyrus-app-key": localKey } : {};
}

function readLocalAppKey() {
  if (typeof window === "undefined") return null;
  try {
    const storage = window.localStorage;
    if (typeof storage?.getItem !== "function") return null;
    return storage.getItem("cyrus_local_app_key");
  } catch {
    return null;
  }
}
