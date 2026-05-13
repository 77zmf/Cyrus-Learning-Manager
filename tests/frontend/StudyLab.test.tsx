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

  it("supports a reconstruction handoff mode sourced from the newly added stack page", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "work-validation" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Reconstruction" }));

    expect(screen.getByText("Reconstruction SLAM handoff session")).toBeInTheDocument();
    expect(screen.getByText(/mesh \+ OpenDRIVE \+ collision proxy/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Detailed stack and reconstruction SLAM line" })).toHaveAttribute(
      "href",
      "https://www.notion.so/35cef7e6aaa981d09be6ffd935e7c748"
    );
  });

  it("offers a SLAM first-line session under world and spatial models", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "world-spatial-models" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Reconstruction" }));

    expect(screen.getByText("SLAM and 3D reconstruction first line")).toBeInTheDocument();
    expect(screen.getByText(/pose graph, bundle adjustment, COLMAP, NeRF, and 3DGS/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "COLMAP" })).toHaveAttribute("href", "https://colmap.org/");
  });

  it("offers a factor graph optimizer formula session under world and spatial models", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "world-spatial-models" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Formula" }));

    expect(screen.getByText("Factor graph optimizer session")).toBeInTheDocument();
    expect(screen.getByText(/factor graph, residual, Jacobian, robust kernel/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Formula visual: Factor graph least-squares objective")).toBeInTheDocument();
    expect(screen.getByText("残差因子")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GTSAM Docs" })).toHaveAttribute(
      "href",
      "https://gtsam.org/docs/"
    );
  });

  it("offers a loop closure and relocalization session under world and spatial models", () => {
    render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "world-spatial-models" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Loop Closure" }));

    expect(screen.getByText("Loop closure and relocalization session")).toBeInTheDocument();
    expect(screen.getByText(/DBoW2, NetVLAD, Scan Context, geometric verification/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Formula visual: Loop closure candidate score and verification edge")).toBeInTheDocument();
    expect(screen.getByText("候选地点")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "DBoW2" })).toHaveAttribute(
      "href",
      "https://github.com/dorian3d/DBoW2"
    );
  });

  it("renders the first 3Blue1Brown video formula cue as visual math", () => {
    const { container } = render(<StudyLab onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "3blue1brown" }
    });

    expect(screen.getByText("3Blue1Brown video note")).toBeInTheDocument();
    expect(screen.getByLabelText("Formula visual: First 3Blue1Brown video formula")).toBeInTheDocument();
    expect(screen.getByText("坐标变换链")).toBeInTheDocument();
    expect(container.querySelectorAll(".math-inline .katex").length).toBeGreaterThan(0);
    expect(visibleTextWithoutRenderedMath(container)).not.toContain("\\mathbf{p}_{map}");
  });
});

function visibleTextWithoutRenderedMath(container: HTMLElement) {
  const clone = container.cloneNode(true) as HTMLElement;

  clone.querySelectorAll(".katex, script, style").forEach((node) => node.remove());

  return clone.textContent ?? "";
}
