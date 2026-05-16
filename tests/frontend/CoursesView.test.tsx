import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CoursesView } from "../../src/components/CoursesView";

describe("CoursesView", () => {
  it("renders sourced first-batch knowledge modules", () => {
    render(<CoursesView />);

    expect(screen.getByText("Tsinghua Automation undergraduate full path")).toBeInTheDocument();
    expect(screen.getByText("Graduate control engineering path")).toBeInTheDocument();
    expect(screen.getAllByText("Control formula derivation ladder").length).toBeGreaterThan(0);
    expect(screen.getByText("MIT EECS full coverage map")).toBeInTheDocument();
    expect(screen.getByText("World models and latent dynamics")).toBeInTheDocument();
    expect(screen.getByText("Spatial intelligence learning route")).toBeInTheDocument();
    expect(screen.getByText("Spatial models, 3D geometry, BEV, and occupancy")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "CS231A Course Notes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "CS231n Course Notes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "University Course Packs" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Course Notes 1: Camera Models" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/cs231a/course-notes/01-camera-models.pdf"
    );
    expect(screen.getByRole("link", { name: "Course Notes 10: Optimal Estimation" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/cs231a/course-notes/10-optimal-estimation.pdf"
    );
    expect(screen.getByRole("link", { name: "CS231n Cyrus CS231n Guided Notes" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/cs231n/cyrus-cs231n-guided-notes.pdf"
    );
    expect(screen.getByRole("link", { name: "Roadmap PDF Cyrus university course roadmap PDF" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/university-course-packs/cyrus-university-course-roadmap.pdf"
    );
    expect(screen.getByRole("link", { name: /Tsinghua Tsinghua Automation official site/ })).toHaveAttribute(
      "href",
      "https://www.au.tsinghua.edu.cn/"
    );
    expect(screen.getByRole("link", { name: /6.241J MIT 6.241J Dynamic Systems and Control/ })).toHaveAttribute(
      "href",
      "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
    );
    expect(screen.getByRole("link", { name: /CS229 Stanford CS229 Machine Learning/ })).toHaveAttribute(
      "href",
      "https://cs229.stanford.edu/"
    );
    expect(screen.getByRole("link", { name: "Guided PDF Stanford CS229 Machine Learning" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/university-course-packs/stanford-cs229/cyrus-stanford-cs229-guided-notes.pdf"
    );
    expect(screen.getByRole("link", { name: "Guided PDF MIT 6.241J Dynamic Systems and Control" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/university-course-packs/mit-6241j/cyrus-mit-6241j-guided-notes.pdf"
    );
    expect(screen.getByRole("link", { name: "Guided PDF Tsinghua control spine" })).toHaveAttribute(
      "href",
      "/Cyrus-Learning-Manager/courses/university-course-packs/tsinghua-control-spine/cyrus-tsinghua-control-spine-guided-notes.pdf"
    );
    expect(screen.getByRole("link", { name: "CS231n Convolutional Neural Networks" })).toHaveAttribute(
      "href",
      "https://cs231n.github.io/convolutional-networks/"
    );
    expect(screen.getByText("World and spatial paper reproduction ladder")).toBeInTheDocument();
    expect(screen.getByText("SLAM zero-to-map first line")).toBeInTheDocument();
    expect(screen.getByText("SfM, MVS, and COLMAP reconstruction lab")).toBeInTheDocument();
    expect(screen.getByText("NeRF and 3DGS validation asset bridge")).toBeInTheDocument();
    expect(screen.getByText("VIO and IMU preintegration bridge")).toBeInTheDocument();
    expect(screen.getByText("LiDAR SLAM, ICP, and LIO line")).toBeInTheDocument();
    expect(screen.getByText("Semantic and neural SLAM map bridge")).toBeInTheDocument();
    expect(screen.getByText("Factor graphs, bundle adjustment, and GTSAM optimizer bridge")).toBeInTheDocument();
    expect(screen.getByText("Loop closure, place recognition, and relocalization bridge")).toBeInTheDocument();
    expect(screen.getByText("SLAM datasets and evaluation benchmark line")).toBeInTheDocument();
    expect(screen.getByText("Camera, LiDAR, and IMU calibration chain")).toBeInTheDocument();
    expect(screen.getByText("Stereo depth and dense MVS bridge")).toBeInTheDocument();
    expect(screen.getByText("Dynamic reconstruction and scene flow line")).toBeInTheDocument();
    expect(screen.getByText("Reconstruction quality metrics and validation gate")).toBeInTheDocument();
    expect(screen.getByText("3Blue1Brown autonomous-driving math intuition")).toBeInTheDocument();
    expect(screen.getByText("3Blue1Brown first week: linear algebra")).toBeInTheDocument();
    expect(screen.getByText("3Blue1Brown math-intuition route")).toBeInTheDocument();
    expect(screen.getByText("IELTS scoring and rubric loop")).toBeInTheDocument();
    expect(screen.getByText("IELTS output and error-attribution loop")).toBeInTheDocument();
    expect(screen.getByText("Philosophy reading ladder")).toBeInTheDocument();
    expect(screen.getAllByText("Knowledge modules").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Track Routes" })).toBeInTheDocument();
    expect(screen.getByText("Control spine route")).toBeInTheDocument();
    expect(screen.getByText("World and spatial route")).toBeInTheDocument();
    expect(screen.getByText("Spatial intelligence validation route")).toBeInTheDocument();
    expect(screen.getByText("Output-first IELTS route")).toBeInTheDocument();
    expect(screen.getByText("3Blue1Brown math-intuition route")).toBeInTheDocument();
    expect(screen.getByText("Deep Study Cards")).toBeInTheDocument();
    expect(screen.getByText("线性代数到状态空间")).toBeInTheDocument();
    expect(screen.getByText("微分方程到稳定性")).toBeInTheDocument();
    expect(screen.getByText("可控性与可观性从图到 rank")).toBeInTheDocument();
    expect(screen.getByText("LQR / Kalman / MPC 三件套")).toBeInTheDocument();
    expect(screen.getByText("鲁棒、非线性、随机控制研究生入口")).toBeInTheDocument();
    expect(screen.getByText("世界模型 latent dynamics")).toBeInTheDocument();
    expect(screen.getByText("空间模型：相机几何、BEV、occupancy")).toBeInTheDocument();
    expect(screen.getByText("论文阅读模板：问题、假设、公式、复现")).toBeInTheDocument();
    expect(screen.getByText("3Blue1Brown 线性代数到坐标变换")).toBeInTheDocument();
    expect(screen.getByText("IELTS 输出到错误归因")).toBeInTheDocument();
    expect(screen.getByText("哲学论证到工程判断")).toBeInTheDocument();
    expect(screen.getByText("重建 SLAM 技术栈到验证资产")).toBeInTheDocument();
    expect(screen.getByText("SLAM 从定位到建图")).toBeInTheDocument();
    expect(screen.getByText("SfM / MVS / COLMAP 重建实验线")).toBeInTheDocument();
    expect(screen.getByText("VIO 与 IMU 预积分")).toBeInTheDocument();
    expect(screen.getByText("LiDAR SLAM、ICP 与 LIO")).toBeInTheDocument();
    expect(screen.getByText("语义与神经 SLAM 地图")).toBeInTheDocument();
    expect(screen.getByText("因子图、BA 与 GTSAM 优化")).toBeInTheDocument();
    expect(screen.getByText("回环检测、地点识别与重定位")).toBeInTheDocument();
    expect(screen.getByText("传感器标定：相机、LiDAR、IMU")).toBeInTheDocument();
    expect(screen.getByText("双目深度与稠密 MVS")).toBeInTheDocument();
    expect(screen.getByText("动态三维重建与 Scene Flow")).toBeInTheDocument();
    expect(screen.getByText("重建质量评估：轨迹、几何、渲染、验证")).toBeInTheDocument();
    expect(screen.getByText("MIT 6.006 到 simctl 数据结构")).toBeInTheDocument();
    expect(screen.getAllByText("先补基础").length).toBeGreaterThanOrEqual(16);
    expect(screen.getAllByText("推导入口").length).toBeGreaterThanOrEqual(16);
    expect(screen.getAllByText("交互练习").length).toBeGreaterThanOrEqual(16);
    expect(screen.getAllByText("小白题").length).toBeGreaterThanOrEqual(48);
    expect(screen.getAllByText("公式选择").length).toBeGreaterThanOrEqual(16);
    expect(screen.getAllByText("GoodNotes 输出检查").length).toBeGreaterThanOrEqual(16);
    expect(screen.getAllByText("GTSAM Docs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ceres Solver Non-linear Least Squares").length).toBeGreaterThan(0);
    expect(screen.getAllByText("DBoW2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("NetVLAD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Scan Context").length).toBeGreaterThan(0);
    expect(screen.getByText("GoodNotes: Page 3B1B-M001")).toBeInTheDocument();
    expect(screen.getByText("GoodNotes: Page R001")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: PIX Simulation Validation -> Reconstruction SLAM")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> SLAM -> VIO Preintegration")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> SLAM -> LiDAR ICP LIO")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> SLAM -> Semantic Neural Map")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> SLAM -> Sensor Calibration")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> Reconstruction -> Stereo MVS")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> Reconstruction -> Dynamic Scene Flow")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: World-Spatial -> Reconstruction -> Quality Gate")).toBeInTheDocument();
    expect(screen.getByText(/先学标量，再学向量，再学矩阵/)).toBeInTheDocument();
    expect(screen.getByText("GoodNotes: Page M001")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: Concept Graph -> Linear Algebra")).toBeInTheDocument();
    expect(screen.getByText("Detailed stack and reconstruction SLAM line")).toHaveAttribute(
      "href",
      "https://www.notion.so/35cef7e6aaa981d09be6ffd935e7c748"
    );
    expect(screen.getAllByRole("link", { name: "MIT 6.241J Dynamic Systems and Control" })[0]).toHaveAttribute(
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

  it("exposes the 3Blue1Brown video formula starter from the library page", () => {
    render(<CoursesView onCreateTask={vi.fn()} />);

    expect(screen.getByText("Study Lab")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "3blue1brown" }
    });

    expect(screen.getByText("3Blue1Brown video note")).toBeInTheDocument();
    expect(screen.getByLabelText("Formula visual: First 3Blue1Brown video formula")).toBeInTheDocument();
    expect(screen.getByText("坐标变换链")).toBeInTheDocument();
  });

  it("renders dedicated video links across the library", () => {
    render(<CoursesView />);

    expect(screen.getAllByText("Video links").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MIT 6.006 lecture videos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MIT RES.6-007 video lectures").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Underactuated Robotics lecture videos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Cyrill Stachniss SLAM course").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3Blue1Brown YouTube playlists").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tsinghua automatic control video set").length).toBeGreaterThan(0);
  });
});
