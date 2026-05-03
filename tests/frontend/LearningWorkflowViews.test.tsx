import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LearnView } from "../../src/components/LearnView";
import { MindMapView } from "../../src/components/MindMapView";
import { NotebookView } from "../../src/components/NotebookView";
import { ReviewView } from "../../src/components/ReviewView";
import { SyncCenter } from "../../src/components/SyncCenter";

describe("learning workflow views", () => {
  it("renders web learning as the primary interactive surface", () => {
    render(<LearnView />);

    expect(screen.getByRole("heading", { name: "Learn" })).toBeInTheDocument();
    expect(screen.getAllByText(/网页是主学习入口/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Cyrus Guided Path" })).toBeInTheDocument();
    expect(screen.getByText("第 1 课：状态空间模型")).toBeInTheDocument();
    expect(screen.getByText("第 2 课：可控性 rank test")).toBeInTheDocument();
    expect(screen.getByText("第 3 课：稳定性与特征值")).toBeInTheDocument();
    expect(screen.getByText("现在做：先在网页读公式，再在 GoodNotes 写 Page 001。")).toBeInTheDocument();
    expect(screen.getByText("GoodNotes Page 001：状态空间模型")).toBeInTheDocument();
    expect(screen.getByText("Obsidian node：Control -> State Space Model")).toBeInTheDocument();
    expect(screen.getByText("Notion row：Topic=State-space model, Mastery=2, Evidence=GoodNotes Page 001")).toBeInTheDocument();
    expect(screen.getAllByText("Formula Visual").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText("状态向量 x")).toBeInTheDocument();
    expect(screen.getByText("系统矩阵 A")).toBeInTheDocument();
    expect(screen.getByText("控制矩阵 B")).toBeInTheDocument();
    expect(screen.getByText("可控性矩阵")).toBeInTheDocument();
    expect(screen.getByText("特征值实部")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Learning Launch Queue" })).toBeInTheDocument();
    expect(screen.getByText("State-space controllability sprint")).toBeInTheDocument();
    expect(screen.getByText("GoodNotes: 002 可控性")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: Control -> Controllability")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Interactive Tutor" })).toBeInTheDocument();
  });

  it("renders GoodNotes as the handwritten derivation notebook", () => {
    render(<NotebookView />);

    expect(screen.getByRole("heading", { name: "Notebook" })).toBeInTheDocument();
    expect(screen.getByText("GoodNotes")).toBeInTheDocument();
    expect(screen.getByText("公式推导")).toBeInTheDocument();
    expect(screen.getByText("错题重写")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Derivation Cards" })).toBeInTheDocument();
    expect(screen.getByText("State transition solution")).toBeInTheDocument();
    expect(screen.getAllByText(/\\dot\{x\}=Ax\+Bu/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Formula Visual").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText("状态转移矩阵")).toBeInTheDocument();
    expect(screen.getByText("Riccati 方程")).toBeInTheDocument();
    expect(screen.getAllByText(/GoodNotes Summary/).length).toBeGreaterThan(0);
  });

  it("renders Obsidian as the mind-map and concept-network layer", () => {
    render(<MindMapView />);

    expect(screen.getByRole("heading", { name: "Map" })).toBeInTheDocument();
    expect(screen.getByText("Obsidian Canvas")).toBeInTheDocument();
    expect(screen.getByText("80_Canvas/Learning System.canvas")).toBeInTheDocument();
    expect(screen.getAllByText(/课程.*公式.*论文.*工程应用/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Graph Nodes" })).toBeInTheDocument();
    expect(screen.getByText("Course")).toBeInTheDocument();
    expect(screen.getByText("Formula")).toBeInTheDocument();
    expect(screen.getByText("Paper")).toBeInTheDocument();
    expect(screen.getByText("Engineering Application")).toBeInTheDocument();
    expect(screen.getByText("Control formula -> GoodNotes derivation")).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "Notion Review Views" })).toBeInTheDocument();
    expect(screen.getByText("Next Review Queue")).toBeInTheDocument();
    expect(screen.getByText("Paper Queue")).toBeInTheDocument();
    expect(screen.getByText("Evidence Ledger")).toBeInTheDocument();
  });

  it("renders sync readiness checks for local integrations", () => {
    render(
      <SyncCenter
        health={{ ok: true, service: "cyrus-local-sync", notionConfigured: false, obsidianConfigured: true }}
        error={null}
      />
    );

    expect(screen.getByRole("heading", { name: "Sync Readiness" })).toBeInTheDocument();
    expect(screen.getByText("Vite page")).toBeInTheDocument();
    expect(screen.getByText("Obsidian vault")).toBeInTheDocument();
    expect(screen.getByText("Notion database")).toBeInTheDocument();
    expect(screen.getByText("http://127.0.0.1:5173/Cyrus-Learning-Manager/")).toBeInTheDocument();
  });
});
