import { useState } from "react";
import type { CreateTaskInput } from "../api/client";
import { tracks } from "../domain/tracks";
import type { LearningTask, TaskPriority, TaskStatus, TrackId } from "../domain/types";

const taskStatuses: TaskStatus[] = ["backlog", "active", "blocked", "done", "archived"];
const taskPriorities: TaskPriority[] = ["low", "medium", "high", "urgent"];

interface TasksViewProps {
  tasks: LearningTask[];
  search: string;
  track: TrackId | "";
  status: TaskStatus | "";
  priority: TaskPriority | "";
  onSearchChange: (value: string) => void;
  onTrackChange: (value: TrackId | "") => void;
  onStatusChange: (value: TaskStatus | "") => void;
  onPriorityChange: (value: TaskPriority | "") => void;
  onCreateTask: (input: CreateTaskInput) => void;
  onStatusUpdate: (taskId: string, status: TaskStatus, progress: number) => void;
}

export function TasksView({
  tasks,
  search,
  track,
  status,
  priority,
  onSearchChange,
  onTrackChange,
  onStatusChange,
  onPriorityChange,
  onCreateTask,
  onStatusUpdate
}: TasksViewProps) {
  const [title, setTitle] = useState("");
  const [newTrack, setNewTrack] = useState<TrackId>("mit-eecs");
  const [newPriority, setNewPriority] = useState<TaskPriority>("medium");

  function submitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    onCreateTask({
      title: title.trim(),
      track: newTrack,
      status: "active",
      priority: newPriority,
      dueDate: null,
      progress: 0,
      source: "Cyrus Learning Manager",
      notes: ""
    });
    setTitle("");
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Tasks</h2>
        <p>Search, filter, create, and update task status for local learning work.</p>
      </div>

      <div className="filters" aria-label="Task filters">
        <label>
          Search
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Title, source, notes"
          />
        </label>
        <label>
          Track
          <select value={track} onChange={(event) => onTrackChange(event.target.value as TrackId | "")}>
            <option value="">All tracks</option>
            {tracks.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => onStatusChange(event.target.value as TaskStatus | "")}>
            <option value="">All statuses</option>
            {taskStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value as TaskPriority | "")}
          >
            <option value="">All priorities</option>
            {taskPriorities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form className="create-task" onSubmit={submitTask}>
        <label>
          New task title
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          New task track
          <select value={newTrack} onChange={(event) => setNewTrack(event.target.value as TrackId)}>
            {tracks.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          New task priority
          <select value={newPriority} onChange={(event) => setNewPriority(event.target.value as TaskPriority)}>
            {taskPriorities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create task</button>
      </form>

      <div className="task-list">
        {tasks.length ? (
          tasks.map((task) => (
            <article className="task-row" key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>
                  {trackName(task.track)} · {task.priority}
                </p>
                {task.notes ? <small>{task.notes}</small> : null}
              </div>
              <select
                aria-label={`Status for ${task.title}`}
                value={task.status}
                onChange={(event) => {
                  const nextStatus = event.target.value as TaskStatus;
                  onStatusUpdate(task.id, nextStatus, nextStatus === "done" ? 100 : task.progress);
                }}
              >
                {taskStatuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <progress value={task.progress} max={100} aria-label={`${task.title} progress`} />
            </article>
          ))
        ) : (
          <p className="empty-state">No tasks match the current filters.</p>
        )}
      </div>
    </section>
  );
}

function trackName(trackId: TrackId) {
  return tracks.find((track) => track.id === trackId)?.name ?? trackId;
}
