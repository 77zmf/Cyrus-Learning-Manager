import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LearnView } from "../../src/components/LearnView";
import { MindMapView } from "../../src/components/MindMapView";
import { NotebookView } from "../../src/components/NotebookView";
import { ReviewView } from "../../src/components/ReviewView";
import { SyncCenter } from "../../src/components/SyncCenter";

describe("learning workflow views", () => {
  it("renders web learning as the primary interactive surface", () => {
    const { container } = render(<LearnView />);

    expect(screen.getByRole("heading", { name: "Learn" })).toBeInTheDocument();
    expect(screen.getAllByText(/网页是主学习入口/).length).toBeGreaterThan(0);
    expect(screen.getByRole("navigation", { name: "Learning directory" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "小白入口" })).toHaveAttribute("href", "#section-start");
    expect(screen.getByRole("link", { name: "3Blue1Brown 数学桥" })).toHaveAttribute(
      "href",
      "#section-3blue1brown"
    );
    expect(screen.getByRole("link", { name: "Manim Studio" })).toHaveAttribute("href", "#section-manim-studio");
    expect(screen.getByRole("link", { name: "控制+SLAM课程目录" })).toHaveAttribute("href", "#section-guided-path");
    expect(screen.getByRole("heading", { name: "Start Here for Beginners" })).toBeInTheDocument();
    expect(screen.getByText("选一节课")).toBeInTheDocument();
    expect(screen.getByText("补前置卡")).toBeInTheDocument();
    expect(screen.getByText("做 Ready Check")).toBeInTheDocument();
    expect(screen.getByText("写 GoodNotes")).toBeInTheDocument();
    expect(screen.getByText("连 Obsidian 和 Notion")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Zero-Base Bridge" })).toBeInTheDocument();
    expect(screen.getByText("先不用背公式")).toBeInTheDocument();
    expect(screen.getByText("函数和变量")).toBeInTheDocument();
    expect(screen.getByText("向量和矩阵")).toBeInTheDocument();
    expect(screen.getByText("导数和变化率")).toBeInTheDocument();
    expect(screen.getByText("秩 rank")).toBeInTheDocument();
    expect(screen.getByText("特征值 eigenvalue")).toBeInTheDocument();
    expect(screen.getByText("坐标系和单位")).toBeInTheDocument();
    expect(screen.getByText("矩阵乘法")).toBeInTheDocument();
    expect(screen.getByText("方程组")).toBeInTheDocument();
    expect(screen.getByText("状态、输入、输出")).toBeInTheDocument();
    expect(screen.getByText("概率和期望")).toBeInTheDocument();
    expect(screen.getByText("优化目标和约束")).toBeInTheDocument();
    expect(screen.getByText("齐次坐标")).toBeInTheDocument();
    expect(screen.getByText("像素和相机内参")).toBeInTheDocument();
    expect(screen.getByText("位姿和轨迹")).toBeInTheDocument();
    expect(screen.getAllByText("重投影误差").length).toBeGreaterThan(0);
    expect(screen.getAllByText("最小练习").length).toBeGreaterThanOrEqual(18);
    expect(screen.getByRole("heading", { name: "3Blue1Brown Math Bridge" })).toBeInTheDocument();
    expect(screen.getByText("导入来源")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "3Blue1Brown route directory" })).toBeInTheDocument();
    expect(screen.getByText("50_Assets/Imports/3Blue1Brown_Notion_学习库.md")).toBeInTheDocument();
    expect(screen.getByText("20_Courses/3Blue1Brown/00-3Blue1Brown-Study-Map.md")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "3Blue1Brown official site" })).toHaveAttribute(
      "href",
      "https://www.3blue1brown.com/"
    );
    expect(screen.getByRole("heading", { name: "Linear Algebra: matrix as transform" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Calculus: derivative as motion" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Differential Equations: state evolution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Euler, Fourier, Laplace: signals as modes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Neural Networks: representation and loss" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Probability: uncertainty and belief" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Geometry and Groups: spatial transforms" })).toBeInTheDocument();
    expect(screen.getByText("GoodNotes Page 3B1B-M001：向量、基、矩阵变换、TF frame 链。")).toBeInTheDocument();
    expect(screen.getAllByText("Obsidian: 3Blue1Brown -> Autonomous-Driving Math Route").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Notion: Track=3Blue1Brown, Evidence=video note + minimal experiment").length).toBeGreaterThan(0);
    expect(screen.getByText("用 2D 点和两次坐标变换画出 lidar 到 map 的路径。")).toBeInTheDocument();
    expect(container.querySelectorAll("details.threeblue-route-card").length).toBeGreaterThanOrEqual(7);
    expect(container.querySelectorAll("details.threeblue-route-card[open]").length).toBe(1);
    expect(screen.getByRole("heading", { name: "Manim Studio" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Manim studio topics" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Quaternion explorable reference" })).toHaveAttribute(
      "href",
      "https://eater.net/quaternions"
    );
    expect(screen.getByRole("application", { name: "Manim explorable preview" })).toBeInTheDocument();
    expect(screen.getByLabelText("Manim animation scrubber")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "打开 SLAM Interface" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "打开 3D Reconstruction Interface" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "打开 Fei-Fei Li Spatial Intelligence" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "打开 Quaternion Explorable" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "打开 Quaternion Explorable" }));
    expect(screen.getByRole("button", { name: "打开 Quaternion Explorable" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getAllByText("单位四元数").length).toBeGreaterThan(0);
    expect(screen.getAllByText("双覆盖 q 和 -q").length).toBeGreaterThan(0);
    expect(screen.getAllByText("立体投影").length).toBeGreaterThan(0);
    expect(screen.getAllByText("旋转夹心 qvq^{-1}").length).toBeGreaterThan(0);
    expect(screen.getByRole("application", { name: "Drag quaternion rotation lab" })).toBeInTheDocument();
    expect(screen.getByLabelText("Quaternion rotation angle")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Quaternion rotation angle"), { target: { value: "120" } });
    expect(screen.getByText("Quaternion angle: 120°")).toBeInTheDocument();
    expect(screen.getByText("Quaternion rotation Manim scene")).toBeInTheDocument();
    expect(screen.getByText("npm run manim:render -- QuaternionRotationScene")).toBeInTheDocument();
    expect(screen.getByLabelText("Quaternion rotation Manim scene video")).toHaveAttribute(
      "src",
      "/Cyrus-Learning-Manager/manim/quaternion_rotation.mp4"
    );
    expect(screen.getByText("Visualizing quaternions").closest("a")).toHaveAttribute(
      "href",
      "https://eater.net/quaternions"
    );
    fireEvent.click(screen.getByRole("button", { name: "打开 SLAM Interface" }));
    expect(screen.getAllByText("位姿链").length).toBeGreaterThan(0);
    expect(container.querySelector(".spatial-stage-strip")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "拖动三维点，看它如何投影到像素" })).toBeInTheDocument();
    expect(screen.getByRole("application", { name: "Drag 3D point projection lab" })).toBeInTheDocument();
    expect(screen.getByLabelText("Projected image plane")).toBeInTheDocument();
    expect(screen.getByLabelText("Projection depth Z")).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole("application", { name: "Drag 3D point projection lab" }), {
      clientX: 280,
      clientY: 80,
      pointerId: 1
    });
    fireEvent.pointerMove(screen.getByRole("application", { name: "Drag 3D point projection lab" }), {
      clientX: 310,
      clientY: 120,
      pointerId: 1
    });
    fireEvent.pointerUp(screen.getByRole("application", { name: "Drag 3D point projection lab" }), {
      clientX: 310,
      clientY: 120,
      pointerId: 1
    });
    expect(screen.getByText("Drag count: 1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Camera frame" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Projection depth Z"), { target: { value: "3.1" } });
    expect(screen.getByRole("heading", { name: "Normalized plane" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "拖动 SLAM 地标，看位姿链如何收紧" })).toBeInTheDocument();
    expect(screen.getByRole("application", { name: "Drag SLAM landmark lab" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Scene Queue" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Manim Community" })).toHaveAttribute(
      "href",
      "https://www.manim.community/"
    );
    expect(screen.getByText("scripts/manim/spatial_scenes.py")).toBeInTheDocument();
    expect(screen.getByText("SLAM projection Manim scene")).toBeInTheDocument();
    expect(screen.getByLabelText("SLAM projection Manim scene video")).toHaveAttribute(
      "src",
      "/Cyrus-Learning-Manager/manim/slam_projection.mp4"
    );
    expect(screen.getByText("Pose graph loop closure Manim scene")).toBeInTheDocument();
    expect(screen.getByText("npm run manim:render -- SlamProjectionScene")).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole("application", { name: "Drag SLAM landmark lab" }), {
      clientX: 220,
      clientY: 90,
      pointerId: 2
    });
    fireEvent.pointerMove(screen.getByRole("application", { name: "Drag SLAM landmark lab" }), {
      clientX: 340,
      clientY: 150,
      pointerId: 2
    });
    fireEvent.pointerUp(screen.getByRole("application", { name: "Drag SLAM landmark lab" }), {
      clientX: 340,
      clientY: 150,
      pointerId: 2
    });
    expect(screen.getByText("SLAM drag count: 1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "投影观测" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show SLAM visual stage 回环约束" }));
    expect(screen.getByText(/回环边把当前位姿拉回已见过的位置/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "打开 3D Reconstruction Interface" }));
    expect(screen.getByRole("button", { name: "打开 3D Reconstruction Interface" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getAllByText("COLMAP SfM").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "拖动相机基线，看三维重建如何变密" })).toBeInTheDocument();
    expect(screen.getByRole("application", { name: "Drag reconstruction camera rig" })).toBeInTheDocument();
    expect(screen.getByText("COLMAP to Gaussian reconstruction Manim scene")).toBeInTheDocument();
    expect(screen.getByText("npm run manim:render -- ReconstructionPipelineScene")).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole("application", { name: "Drag reconstruction camera rig" }), {
      clientX: 260,
      clientY: 120,
      pointerId: 3
    });
    fireEvent.pointerMove(screen.getByRole("application", { name: "Drag reconstruction camera rig" }), {
      clientX: 390,
      clientY: 130,
      pointerId: 3
    });
    fireEvent.pointerUp(screen.getByRole("application", { name: "Drag reconstruction camera rig" }), {
      clientX: 390,
      clientY: 130,
      pointerId: 3
    });
    expect(screen.getByText("Reconstruction drag count: 1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "COLMAP SfM" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Reconstruction baseline"), { target: { value: "2.8" } });
    expect(screen.getByRole("heading", { name: "MVS 稠密化" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "查看 NeRF / 3DGS" }));
    expect(screen.getByText(/光线和高斯不是装饰/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "打开 Fei-Fei Li Spatial Intelligence" }));
    expect(screen.getByRole("heading", { name: "Fei-Fei Li Spatial Intelligence" })).toBeInTheDocument();
    expect(screen.getByText("三维世界后验")).toBeInTheDocument();
    expect(screen.getByText("World Labs").closest("a")).toHaveAttribute("href", "https://www.worldlabs.ai/");
    expect(screen.getByText("Stanford HAI").closest("a")).toHaveAttribute(
      "href",
      "https://hai.stanford.edu/people/fei-fei-li"
    );
    expect(screen.getByRole("heading", { name: "Cyrus Guided Path" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Course directory" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 1 课：状态空间模型" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 2 课：可控性 rank test" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 3 课：稳定性与特征值" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 4 课：可观性 Observability" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 7 课：LQR 最优控制" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 8 课：Kalman Filter 状态估计" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 10 课：MPC 模型预测控制" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 13 课：随机控制与动态规划" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 14 课：世界模型与空间模型接口" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 15 课：刚体变换与相机投影" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 16 课：特征匹配与对极几何" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 17 课：SLAM 后端与位姿图优化" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 18 课：SfM/MVS 到 NeRF/3DGS 重建" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "第 19 课：四元数与三维姿态" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /第 10 课：MPC 模型预测控制/ })).toHaveAttribute(
      "href",
      "#lesson-mpc"
    );
    expect(screen.getByRole("link", { name: /第 19 课：四元数与三维姿态/ })).toHaveAttribute(
      "href",
      "#lesson-quaternion-orientation"
    );
    expect(container.querySelectorAll("details.guided-lesson-card").length).toBe(19);
    expect(container.querySelectorAll("details.guided-lesson-card[open]").length).toBe(1);
    expect(screen.getByText("现在做：先在网页读公式，再在 GoodNotes 写 Page 001。")).toBeInTheDocument();
    expect(screen.getByText("GoodNotes Page 001：状态空间模型")).toBeInTheDocument();
    expect(screen.getByText("Obsidian node：Control -> State Space Model")).toBeInTheDocument();
    expect(screen.getByText("Notion row：Topic=State-space model, Mastery=2, Evidence=GoodNotes Page 001")).toBeInTheDocument();
    expect(screen.getAllByText("小白入口").length).toBeGreaterThanOrEqual(18);
    expect(screen.getAllByText("Ready Check").length).toBeGreaterThanOrEqual(18);
    expect(screen.getAllByText("卡住就回到：状态、输入、输出").length).toBeGreaterThan(0);
    expect(screen.getAllByText("卡住就回到：优化目标和约束").length).toBeGreaterThan(0);
    expect(screen.getByText("先把状态想成一张仪表盘。")).toBeInTheDocument();
    expect(screen.getByText("不用先懂最优控制，先问：我更怕偏离轨迹，还是更怕控制太猛？")).toBeInTheDocument();
    expect(screen.getByText("先把世界模型想成会在脑子里预演的模型。")).toBeInTheDocument();
    expect(screen.getAllByText("Formula Visual").length).toBeGreaterThanOrEqual(18);
    expect(screen.getByText("状态向量 x")).toBeInTheDocument();
    expect(screen.getByText("系统矩阵 A")).toBeInTheDocument();
    expect(screen.getByText("控制矩阵 B")).toBeInTheDocument();
    expect(screen.getByText("可控性矩阵")).toBeInTheDocument();
    expect(screen.getByText("特征值实部")).toBeInTheDocument();
    expect(screen.getAllByText("旋转夹心 qvq^{-1}").length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/Formula visual line/).length).toBeGreaterThanOrEqual(20);
    expect(container.querySelector(".latex-source")).toBeNull();
    expect(screen.getByRole("heading", { name: "Learning Launch Queue" })).toBeInTheDocument();
    expect(screen.getByText("State-space controllability sprint")).toBeInTheDocument();
    expect(screen.getByText("GoodNotes: 002 可控性")).toBeInTheDocument();
    expect(screen.getByText("Obsidian: Control -> Controllability")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Interactive Tutor" })).toBeInTheDocument();
  });

  it("lets a beginner use a lesson ready check before writing notes", () => {
    render(<LearnView />);

    fireEvent.click(screen.getByRole("button", { name: "显示 第 1 课：状态空间模型 Ready Check 概念答案" }));
    expect(screen.getByText(/答案：状态就是系统当前的变量清单/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "第 1 课：状态空间模型 Ready Check 公式选项 B" }));
    expect(screen.getByText(/正确：状态空间最小入口就是状态变化率/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "确认 第 1 课：状态空间模型 Ready Check GoodNotes 输出" }));
    expect(screen.getByText(/已记录：Page 001 至少有状态向量、A\/B 含义、一个二状态小车例子/)).toBeInTheDocument();
  });

  it("renders GoodNotes as the handwritten derivation notebook", () => {
    const { container } = render(<NotebookView />);

    expect(screen.getByRole("heading", { name: "Notebook" })).toBeInTheDocument();
    expect(screen.getByText("GoodNotes")).toBeInTheDocument();
    expect(screen.getByText("公式推导")).toBeInTheDocument();
    expect(screen.getByText("错题重写")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Derivation Cards" })).toBeInTheDocument();
    expect(screen.getByText("State transition solution")).toBeInTheDocument();
    expect(screen.getByText("Kalman prediction-update")).toBeInTheDocument();
    expect(screen.getByText("MPC constrained rollout")).toBeInTheDocument();
    expect(screen.getByText("World model imagined rollout")).toBeInTheDocument();
    expect(screen.getByText("Camera projection to BEV")).toBeInTheDocument();
    expect(screen.getByText("SLAM rigid transform and projection")).toBeInTheDocument();
    expect(screen.getByText("Bundle adjustment and pose graph")).toBeInTheDocument();
    expect(screen.getByText("NeRF and 3DGS rendering equations")).toBeInTheDocument();
    expect(screen.getByText("Reconstruction SLAM pose-prior handoff")).toBeInTheDocument();
    expect(screen.getByText("Quaternion orientation sandwich")).toBeInTheDocument();
    expect(screen.getAllByText("Formula Visual").length).toBeGreaterThanOrEqual(12);
    expect(screen.getByText("状态转移矩阵")).toBeInTheDocument();
    expect(screen.getByText("Riccati 方程")).toBeInTheDocument();
    expect(screen.getByText("Kalman 增益")).toBeInTheDocument();
    expect(screen.getByText("预测时域")).toBeInTheDocument();
    expect(screen.getByText("Pose prior")).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Formula visual line/).length).toBeGreaterThanOrEqual(12);
    expect(container.querySelector(".latex-source")).toBeNull();
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
    expect(screen.getByText("Reconstruction / SLAM Producer")).toBeInTheDocument();
    expect(screen.getByText("IELTS Output")).toBeInTheDocument();
    expect(screen.getByText("Philosophy Argument")).toBeInTheDocument();
    expect(screen.getByText("Control formula -> GoodNotes derivation")).toBeInTheDocument();
    expect(screen.getByText("Reconstruction stack -> validation asset")).toBeInTheDocument();
    expect(screen.getByText("IELTS error -> review queue")).toBeInTheDocument();
    expect(screen.getByText("Argument map -> evidence-quality decision")).toBeInTheDocument();
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
    expect(screen.getByText("Validation Line")).toBeInTheDocument();
    expect(screen.getByText("Confidence")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Notion Review Views" })).toBeInTheDocument();
    expect(screen.getByText("Next Review Queue")).toBeInTheDocument();
    expect(screen.getByText("Paper Queue")).toBeInTheDocument();
    expect(screen.getByText("Evidence Ledger")).toBeInTheDocument();
    expect(screen.getByText("Reconstruction Evidence Queue")).toBeInTheDocument();
    expect(screen.getByText("IELTS Error Queue")).toBeInTheDocument();
    expect(screen.getByText("Philosophy Argument Queue")).toBeInTheDocument();
  });

  it("renders sync readiness checks for local integrations", () => {
    render(
      <SyncCenter
        health={{
          ok: true,
          service: "cyrus-local-sync",
          notionConfigured: false,
          obsidianConfigured: true,
          hermesConfigured: true,
          hermesModel: "kimi-k2.6",
          hermesProvider: "Kimi / Moonshot China",
          hermesProfilePath: "/Users/cyber/.hermes/profiles/cyrus",
          notionTarget: "350ef7e6aaa980629326e56e121a39cb",
          obsidianVaultPath: "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge"
        }}
        error={null}
      />
    );

    expect(screen.getByRole("heading", { name: "Sync Readiness" })).toBeInTheDocument();
    expect(screen.getByText("Vite page")).toBeInTheDocument();
    expect(screen.getByText("Local sync service")).toBeInTheDocument();
    expect(screen.getByText("Obsidian vault")).toBeInTheDocument();
    expect(screen.getByText("Notion database")).toBeInTheDocument();
    expect(screen.getByText("Hermes")).toBeInTheDocument();
    expect(screen.getByText("Kimi / Moonshot China / kimi-k2.6")).toBeInTheDocument();
    expect(screen.getByText("GitHub Pages")).toBeInTheDocument();
    expect(screen.getByText("http://127.0.0.1:5173/Cyrus-Learning-Manager/")).toBeInTheDocument();
    expect(screen.getByText("curl -fsS http://127.0.0.1:8787/health")).toBeInTheDocument();
    expect(screen.getByText("cyrus status")).toBeInTheDocument();
  });
});
