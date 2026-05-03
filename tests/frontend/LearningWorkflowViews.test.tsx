import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LearnView } from "../../src/components/LearnView";
import { MindMapView } from "../../src/components/MindMapView";
import { NotebookView } from "../../src/components/NotebookView";
import { ReviewView } from "../../src/components/ReviewView";

describe("learning workflow views", () => {
  it("renders web learning as the primary interactive surface", () => {
    render(<LearnView />);

    expect(screen.getByRole("heading", { name: "Learn" })).toBeInTheDocument();
    expect(screen.getAllByText(/网页是主学习入口/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Interactive Tutor" })).toBeInTheDocument();
  });

  it("renders GoodNotes as the handwritten derivation notebook", () => {
    render(<NotebookView />);

    expect(screen.getByRole("heading", { name: "Notebook" })).toBeInTheDocument();
    expect(screen.getByText("GoodNotes")).toBeInTheDocument();
    expect(screen.getByText("公式推导")).toBeInTheDocument();
    expect(screen.getByText("错题重写")).toBeInTheDocument();
    expect(screen.getAllByText(/GoodNotes Summary/).length).toBeGreaterThan(0);
  });

  it("renders Obsidian as the mind-map and concept-network layer", () => {
    render(<MindMapView />);

    expect(screen.getByRole("heading", { name: "Map" })).toBeInTheDocument();
    expect(screen.getByText("Obsidian Canvas")).toBeInTheDocument();
    expect(screen.getByText("80_Canvas/Learning System.canvas")).toBeInTheDocument();
    expect(screen.getAllByText(/课程.*公式.*论文.*工程应用/).length).toBeGreaterThan(0);
  });

  it("renders Notion as the structured review and index database", () => {
    render(
      <ReviewView
        tasks={[]}
        search=""
        track=""
        status=""
        priority=""
        onSearchChange={vi.fn()}
        onTrackChange={vi.fn()}
        onStatusChange={vi.fn()}
        onPriorityChange={vi.fn()}
        onCreateTask={vi.fn()}
        onStatusUpdate={vi.fn()}
      />
    );

    expect(screen.getByRole("heading", { name: "Review" })).toBeInTheDocument();
    expect(screen.getByText("Notion Learning Database")).toBeInTheDocument();
    expect(screen.getByText("Mastery")).toBeInTheDocument();
    expect(screen.getByText("Next Review")).toBeInTheDocument();
    expect(screen.getByText("GoodNotes Page")).toBeInTheDocument();
    expect(screen.getByText("Evidence")).toBeInTheDocument();
  });
});
