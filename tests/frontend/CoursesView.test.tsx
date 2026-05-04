import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CoursesView } from "../../src/components/CoursesView";

describe("CoursesView", () => {
  it("renders sourced first-batch knowledge modules", () => {
    render(<CoursesView />);

    expect(screen.getByText("Tsinghua Automation undergraduate full path")).toBeInTheDocument();
    expect(screen.getByText("Graduate control engineering path")).toBeInTheDocument();
    expect(screen.getByText("Control formula derivation ladder")).toBeInTheDocument();
    expect(screen.getByText("MIT EECS full coverage map")).toBeInTheDocument();
    expect(screen.getByText("World models and latent dynamics")).toBeInTheDocument();
    expect(screen.getByText("Spatial models, 3D geometry, BEV, and occupancy")).toBeInTheDocument();
    expect(screen.getByText("World and spatial paper reproduction ladder")).toBeInTheDocument();
    expect(screen.getByText("IELTS scoring and rubric loop")).toBeInTheDocument();
    expect(screen.getByText("IELTS output and error-attribution loop")).toBeInTheDocument();
    expect(screen.getByText("Philosophy reading ladder")).toBeInTheDocument();
    expect(screen.getAllByText("Knowledge modules").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Track Routes" })).toBeInTheDocument();
    expect(screen.getByText("Control spine route")).toBeInTheDocument();
    expect(screen.getByText("World and spatial route")).toBeInTheDocument();
    expect(screen.getByText("Output-first IELTS route")).toBeInTheDocument();
    expect(screen.getByText("Deep Study Cards")).toBeInTheDocument();
    expect(screen.getByText("线性代数到状态空间")).toBeInTheDocument();
    expect(screen.getByText("微分方程到稳定性")).toBeInTheDocument();
    expect(screen.getByText("可控性与可观性从图到 rank")).toBeInTheDocument();
    expect(screen.getByText("LQR / Kalman / MPC 三件套")).toBeInTheDocument();
    expect(screen.getByText("鲁棒、非线性、随机控制研究生入口")).toBeInTheDocument();
    expect(screen.getByText("世界模型 latent dynamics")).toBeInTheDocument();
    expect(screen.getByText("空间模型：相机几何、BEV、occupancy")).toBeInTheDocument();
    expect(screen.getByText("论文阅读模板：问题、假设、公式、复现")).toBeInTheDocument();
    expect(screen.getAllByText("先补基础").length).toBeGreaterThanOrEqual(8);
    expect(screen.getAllByText("推导入口").length).toBeGreaterThanOrEqual(8);
    expect(screen.getByText(/先学标量，再学向量，再学矩阵/)).toBeInTheDocument();
    expect(screen.getByText("GoodNotes: Page M001")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: Concept Graph -> Linear Algebra")).toBeInTheDocument();
    expect(screen.getAllByText("MIT 6.241J Dynamic Systems and Control")[0]).toHaveAttribute(
      "href",
      "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
    );
  });
});
