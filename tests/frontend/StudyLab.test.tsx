import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StudyLab } from "../../src/components/StudyLab";

describe("StudyLab", () => {
  it("switches track and mode to show a concrete learning prompt", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "world-spatial-models" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Paper" }));

    expect(screen.getByText("World and Spatial Models")).toBeInTheDocument();
    expect(screen.getByText("Paper reading and reproduction")).toBeInTheDocument();
    expect(screen.getByText(/representation, objective, failure mode/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PlaNet" })).toHaveAttribute(
      "href",
      "https://arxiv.org/abs/1811.04551"
    );
  });

  it("creates a task from the selected study plan", () => {
    const onCreateTask = vi.fn();
    render(<StudyLab onCreateTask={onCreateTask} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "tsinghua-automation" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Formula" }));
    fireEvent.click(screen.getByRole("button", { name: "Create study task" }));

    expect(onCreateTask).toHaveBeenCalledWith(
      expect.objectContaining({
        track: "tsinghua-automation",
        status: "active",
        priority: "high",
        title: expect.stringContaining("Control formula")
      })
    );
  });

  it("shows Hermes closeout fields for every study session", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    expect(screen.getByText("Hermes Closeout")).toBeInTheDocument();
    expect(screen.getByText("Evidence")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Blocker")).toBeInTheDocument();
    expect(screen.getByText("Owner")).toBeInTheDocument();
    expect(screen.getByText("Next action")).toBeInTheDocument();
    expect(screen.getByText("Verification path")).toBeInTheDocument();
  });

  it("supports a work validation closure mode instead of falling back to another track", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "work-validation" }
    });

    expect(screen.getByRole("button", { name: "Closure" })).toBeInTheDocument();
    expect(screen.getByText("Work validation closure loop")).toBeInTheDocument();
    expect(screen.getByText(/evidence, status, blocker, owner, next action/i)).toBeInTheDocument();
  });
});
