import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TasksView } from "../../src/components/TasksView";
import type { LearningTask } from "../../src/domain/types";

const task: LearningTask = {
  id: "task_1",
  title: "MIT algorithms drill",
  track: "mit-eecs",
  status: "active",
  priority: "high",
  dueDate: "2026-05-03",
  progress: 40,
  source: "MIT OCW",
  notes: "Graph search",
  obsidianPath: null,
  notionPageId: null,
  createdAt: "2026-04-29T00:00:00.000Z",
  updatedAt: "2026-04-29T00:00:00.000Z"
};

const defaultProps = {
  search: "",
  track: "",
  status: "",
  priority: "",
  onSearchChange: vi.fn(),
  onTrackChange: vi.fn(),
  onStatusChange: vi.fn(),
  onPriorityChange: vi.fn(),
  onStatusUpdate: vi.fn()
} as const;

describe("TasksView", () => {
  it("renders a task", () => {
    render(<TasksView {...defaultProps} tasks={[task]} onCreateTask={vi.fn()} />);

    expect(screen.getByText("MIT algorithms drill")).toBeInTheDocument();
    expect(screen.getByText("MIT EECS · high")).toBeInTheDocument();
  });

  it("submits a new task title", () => {
    const onCreateTask = vi.fn();
    render(<TasksView {...defaultProps} tasks={[]} onCreateTask={onCreateTask} />);

    fireEvent.change(screen.getByLabelText("New task title"), {
      target: { value: "Read control chapter" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Create task" }));

    expect(onCreateTask).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Read control chapter" })
    );
  });
});
