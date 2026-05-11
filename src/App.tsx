import { lazy, Suspense, useEffect, useState } from "react";
import {
  createTask,
  getHealth,
  listTasks,
  updateTaskStatus,
  type CreateTaskInput
} from "./api/client";
import type {
  HealthResponse,
  LearningTask,
  TaskPriority,
  TaskStatus,
  TrackId
} from "./domain/types";

type Tab = "learn" | "notebook" | "map" | "library" | "review" | "hermes" | "sync";
const tabs: Tab[] = ["learn", "notebook", "map", "library", "review", "hermes", "sync"];

const LearnView = lazy(() => import("./components/LearnView").then((module) => ({ default: module.LearnView })));
const NotebookView = lazy(() =>
  import("./components/NotebookView").then((module) => ({ default: module.NotebookView }))
);
const MindMapView = lazy(() =>
  import("./components/MindMapView").then((module) => ({ default: module.MindMapView }))
);
const CoursesView = lazy(() =>
  import("./components/CoursesView").then((module) => ({ default: module.CoursesView }))
);
const ReviewView = lazy(() => import("./components/ReviewView").then((module) => ({ default: module.ReviewView })));
const HermesConsole = lazy(() =>
  import("./components/HermesConsole").then((module) => ({ default: module.HermesConsole }))
);
const SyncCenter = lazy(() => import("./components/SyncCenter").then((module) => ({ default: module.SyncCenter })));

export function App() {
  const [tab, setTab] = useState<Tab>("learn");
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
      <Suspense fallback={<p className="status-message">Loading {tabLabel(tab)}...</p>}>
        {tab === "learn" ? <LearnView /> : null}
        {tab === "notebook" ? <NotebookView /> : null}
        {tab === "map" ? <MindMapView /> : null}
        {tab === "library" ? <CoursesView /> : null}
        {tab === "review" ? (
          <ReviewView
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
        {tab === "hermes" ? <HermesConsole onCreateTask={handleCreateTask} /> : null}
        {tab === "sync" ? <SyncCenter health={health} error={error} /> : null}
      </Suspense>
    </main>
  );
}

function tabLabel(tab: Tab) {
  if (tab === "map") return "Map";
  return tab[0].toUpperCase() + tab.slice(1);
}
