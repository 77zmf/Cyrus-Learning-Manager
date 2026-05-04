import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getAllByText("交互练习").length).toBeGreaterThanOrEqual(8);
    expect(screen.getAllByText("小白题").length).toBeGreaterThanOrEqual(24);
    expect(screen.getAllByText("公式选择").length).toBeGreaterThanOrEqual(8);
    expect(screen.getAllByText("GoodNotes 输出检查").length).toBeGreaterThanOrEqual(8);
    expect(screen.getByText(/先学标量，再学向量，再学矩阵/)).toBeInTheDocument();
    expect(screen.getByText("GoodNotes: Page M001")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: Concept Graph -> Linear Algebra")).toBeInTheDocument();
    expect(screen.getAllByText("MIT 6.241J Dynamic Systems and Control")[0]).toHaveAttribute(
      "href",
      "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
    );
  });

  it("lets a learner reveal answers, choose formula checks, and confirm GoodNotes output", () => {
    render(<CoursesView />);

    fireEvent.click(screen.getByRole("button", { name: "显示 线性代数到状态空间 第 1 题答案" }));
    expect(screen.getByText(/答案：状态就是一列变量/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "线性代数到状态空间 公式选项 B" }));
    expect(screen.getByText(/正确：状态空间入口就是状态变化率/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "确认 线性代数到状态空间 GoodNotes 输出" }));
    expect(screen.getByText(/已记录：Page M001 应包含状态列向量、A\/B 含义、二维小车例子/)).toBeInTheDocument();
  });
});
