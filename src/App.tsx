import { useEffect, useState } from "react";
import {
  createTask,
  getHealth,
  listTasks,
  updateTaskStatus,
  type CreateTaskInput
} from "./api/client";
import { CoursesView } from "./components/CoursesView";
import { Dashboard } from "./components/Dashboard";
import { HermesConsole } from "./components/HermesConsole";
import { InteractiveTutor } from "./components/InteractiveTutor";
import { ProgressView } from "./components/ProgressView";
import { StudyLab } from "./components/StudyLab";
import { SyncCenter } from "./components/SyncCenter";
import { TasksView } from "./components/TasksView";
import type {
  HealthResponse,
  LearningTask,
  TaskPriority,
  TaskStatus,
  TrackId
} from "./domain/types";

type Tab = "dashboard" | "study" | "tutor" | "hermes" | "tasks" | "courses" | "progress" | "sync";
const tabs: Tab[] = ["dashboard", "study", "tutor", "hermes", "tasks", "courses", "progress", "sync"];

export function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [tasks, setTasks] = useState<LearningTask[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [track, setTrack] = useState<TrackId | "">("");
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");

  useEffect(() => {
    void Promise.all([getHealth(), listTasks({ search, track, status, priority })])
      .then(([nextHealth, nextTasks]) => {
        setHealth(nextHealth);
        setTasks(nextTasks);
        setError(null);
      })
      .catch((caught: unknown) => {
        setHealth(null);
        setTasks([]);
        setError(
          caught instanceof Error && caught.name !== "TypeError"
            ? caught.message
            : "Local sync service unavailable. Obsidian and Notion writes are paused."
        );
      });
  }, [search, track, status, priority]);

  function handleCreateTask(input: CreateTaskInput) {
    void createTask(input)
      .then((task) => {
        setTasks((current) => [task, ...current]);
        setError(null);
      })
      .catch((caught: unknown) => {
        setError(caught instanceof Error ? caught.message : "Failed to create task.");
      });
  }

  function handleStatusUpdate(taskId: string, nextStatus: TaskStatus, progress: number) {
    void updateTaskStatus(taskId, nextStatus, progress)
      .then((updated) => {
        setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)));
        setError(null);
      })
      .catch((caught: unknown) => {
        setError(caught instanceof Error ? caught.message : "Failed to update task.");
      });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cyrus Knowledge</p>
          <h1>Cyrus Learning Manager</h1>
          <p className="deck-meta">Local-first / GitHub Pages / Obsidian / Notion</p>
        </div>
        <span className={health ? "status-pill is-ready" : "status-pill is-muted"}>
          Local Sync: {health ? "connected" : "disconnected"}
        </span>
      </header>

      <nav className="tabs" aria-label="Main views">
        {tabs.map((item) => (
          <button
            className={tab === item ? "active" : ""}
            key={item}
            onClick={() => setTab(item)}
            type="button"
          >
            {tabLabel(item)}
          </button>
        ))}
      </nav>

      {error && tab !== "sync" ? <p className="error" role="status">{error}</p> : null}
      {tab === "dashboard" ? <Dashboard tasks={tasks} /> : null}
      {tab === "study" ? <StudyLab onCreateTask={handleCreateTask} /> : null}
      {tab === "tutor" ? <InteractiveTutor /> : null}
      {tab === "hermes" ? <HermesConsole onCreateTask={handleCreateTask} /> : null}
      {tab === "tasks" ? (
        <TasksView
          tasks={tasks}
          search={search}
          track={track}
          status={status}
          priority={priority}
          onSearchChange={setSearch}
          onTrackChange={setTrack}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onCreateTask={handleCreateTask}
          onStatusUpdate={handleStatusUpdate}
        />
      ) : null}
      {tab === "courses" ? <CoursesView /> : null}
      {tab === "progress" ? <ProgressView tasks={tasks} /> : null}
      {tab === "sync" ? <SyncCenter health={health} error={error} /> : null}
    </main>
  );
}

function tabLabel(tab: Tab) {
  return tab[0].toUpperCase() + tab.slice(1);
}
