import type { FormulaTerm } from "./formula-visuals";

export interface GuidedLessonManimFrame {
  label: string;
  focus: string;
  visual: string;
  formulaCue: string;
}

export interface GuidedLessonManimScene {
  title: string;
  sceneName: string;
  assetPath: string;
  command: string;
  purpose: string;
  interactiveCue: string;
  goodNotes: string;
  frames: GuidedLessonManimFrame[];
}

interface GuidedLessonManimInput {
  id: string;
  title: string;
  goal: string;
  formula: string;
  formulaTerms: FormulaTerm[];
  goodNotesPage: string;
  steps: Array<{
    output: string;
  }>;
  bridgeIntuition?: string;
}

const guidedLessonSceneNames: Record<string, string> = {
  "lesson-state-space": "GuidedStateSpaceScene",
  "lesson-controllability": "GuidedControllabilityScene",
  "lesson-stability": "GuidedStabilityScene",
  "lesson-observability": "GuidedObservabilityScene",
  "lesson-lyapunov": "GuidedLyapunovScene",
  "lesson-state-feedback": "GuidedStateFeedbackScene",
  "lesson-lqr": "GuidedLqrScene",
  "lesson-kalman": "GuidedKalmanScene",
  "lesson-lqg": "GuidedLqgScene",
  "lesson-mpc": "GuidedMpcScene",
  "lesson-robust": "GuidedRobustControlScene",
  "lesson-nonlinear": "GuidedNonlinearControlScene",
  "lesson-stochastic-control": "GuidedStochasticControlScene",
  "lesson-world-spatial-interface": "GuidedWorldSpatialInterfaceScene",
  "lesson-rigid-camera-projection": "GuidedRigidCameraProjectionScene",
  "lesson-feature-epipolar-geometry": "GuidedEpipolarGeometryScene",
  "lesson-slam-backend-pose-graph": "GuidedSlamBackendPoseGraphScene",
  "lesson-sfm-mvs-nerf-3dgs": "GuidedReconstructionRepresentationScene",
  "lesson-quaternion-orientation": "GuidedQuaternionOrientationScene",
  "lesson-vio-imu-preintegration": "GuidedVioImuPreintegrationScene",
  "lesson-lidar-icp-lio-sam": "GuidedLidarSlamIcpScene",
  "lesson-semantic-neural-slam-map": "GuidedSemanticNeuralSlamScene"
};

const guidedLessonSceneTitles: Record<string, string> = {
  "lesson-state-space": "State Space Manim storyboard",
  "lesson-controllability": "Controllability Manim storyboard",
  "lesson-stability": "Stability Manim storyboard",
  "lesson-observability": "Observability Manim storyboard",
  "lesson-lyapunov": "Lyapunov Manim storyboard",
  "lesson-state-feedback": "State Feedback Manim storyboard",
  "lesson-lqr": "LQR Manim storyboard",
  "lesson-kalman": "Kalman Filter Manim storyboard",
  "lesson-lqg": "LQG Manim storyboard",
  "lesson-mpc": "MPC Manim storyboard",
  "lesson-robust": "Robust Control Manim storyboard",
  "lesson-nonlinear": "Nonlinear Control Manim storyboard",
  "lesson-stochastic-control": "Stochastic Control Manim storyboard",
  "lesson-world-spatial-interface": "World Spatial Interface Manim storyboard",
  "lesson-rigid-camera-projection": "Camera Projection Manim storyboard",
  "lesson-feature-epipolar-geometry": "Epipolar Geometry Manim storyboard",
  "lesson-slam-backend-pose-graph": "SLAM Backend Manim storyboard",
  "lesson-sfm-mvs-nerf-3dgs": "Reconstruction Representation Manim storyboard",
  "lesson-quaternion-orientation": "Quaternion Orientation Manim storyboard",
  "lesson-vio-imu-preintegration": "VIO IMU Preintegration Manim storyboard",
  "lesson-lidar-icp-lio-sam": "LiDAR SLAM ICP Manim storyboard",
  "lesson-semantic-neural-slam-map": "Semantic Neural SLAM Manim storyboard"
};

const guidedLessonVisualModels: Record<string, string> = {
  "lesson-state-space": "两个状态节点 x1/x2、输入 u、A/B 两条箭头逐帧出现。",
  "lesson-controllability": "输入列 B 先亮起，再沿 A 传播成 AB 和更高阶传播项，最后堆成 rank test。",
  "lesson-stability": "一条轨迹随 e^{lambda t} 收敛或发散，特征值实部控制方向。",
  "lesson-observability": "传感器输出 y 逐层回推隐藏状态，O 矩阵纵向堆叠。",
  "lesson-lyapunov": "能量碗 V(x) 随轨迹下降，V_dot 用颜色从正变负。",
  "lesson-state-feedback": "开环 A 被 u=-Kx 闭合成 A-BK，极点拖到左半平面。",
  "lesson-lqr": "Q/R 两个旋钮改变轨迹误差和控制力度的平衡。",
  "lesson-kalman": "预测云团和观测点融合，Kalman gain 决定向哪边靠近。",
  "lesson-lqg": "左侧 Kalman 估计 x_hat，右侧 LQR 用估计状态输出控制。",
  "lesson-mpc": "预测时域像滑动窗口一样向前滚动，只执行第一步控制。",
  "lesson-robust": "不确定性盒子包住模型，控制器在最坏扰动下仍保持边界。",
  "lesson-nonlinear": "非线性曲线在工作点附近被切线线性化，再对比真实轨迹。",
  "lesson-stochastic-control": "状态树按概率分叉，动态规划从终点价值反推当前动作。",
  "lesson-world-spatial-interface": "观测进入 latent/world state，再分出 prediction、planning、validation 三条边。",
  "lesson-rigid-camera-projection": "世界点经过 R/t 和 K，投到 image plane 的像素点。",
  "lesson-feature-epipolar-geometry": "两台相机、同一地标、对极线和错误匹配逐帧对比。",
  "lesson-slam-backend-pose-graph": "位姿节点、观测边、回环边和残差收缩做成优化动画。",
  "lesson-sfm-mvs-nerf-3dgs": "Images -> COLMAP -> MVS -> NeRF/3DGS -> validation asset 逐段流动。",
  "lesson-quaternion-orientation": "q 与 -q 对跖点、半角和 v'=qvq^{-1} 旋转夹心同步变化。",
  "lesson-vio-imu-preintegration": "相机关键帧之间塞入高频 IMU 箭头，再压缩成 Delta R/v/p 预积分因子。",
  "lesson-lidar-icp-lio-sam": "两团点云通过 R,t 对齐，点到面残差逐步变短，再接入 IMU 和回环因子。",
  "lesson-semantic-neural-slam-map": "几何地图先出现，再叠加语义标签和神经场采样点，最后标出验证边界。"
};

export function deriveGuidedManimAssetPath(sceneName: string) {
  const assetName = sceneName
    .replace(/^Guided/, "")
    .replace(/Scene$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();

  return `manim/guided_${assetName}.mp4`;
}

export function buildGuidedLessonManimScene(lesson: GuidedLessonManimInput): GuidedLessonManimScene {
  const sceneName = guidedLessonSceneNames[lesson.id] ?? "GuidedLessonScene";
  const firstTerm = lesson.formulaTerms[0]?.label ?? "核心对象";
  const secondTerm = lesson.formulaTerms[1]?.label ?? "公式结构";
  const thirdTerm = lesson.formulaTerms[2]?.label ?? "工程含义";

  return {
    title: guidedLessonSceneTitles[lesson.id] ?? `${lesson.title.replace(/^第 \d+ 课：/, "")} Manim storyboard`,
    sceneName,
    assetPath: deriveGuidedManimAssetPath(sceneName),
    command: `npm run manim:render -- ${sceneName}`,
    purpose: `把 ${lesson.title} 做成可暂停的 Manim 动画：先建立直觉，再让公式逐项出现，最后落到 GoodNotes 输出。`,
    interactiveCue: guidedLessonVisualModels[lesson.id] ?? "把概念节点、公式项和 GoodNotes 输出做成三幕动画。",
    goodNotes: lesson.goodNotesPage,
    frames: [
      {
        label: "Scene 1",
        focus: firstTerm,
        visual: lesson.bridgeIntuition ?? lesson.goal,
        formulaCue: lesson.formulaTerms[0]?.symbol ?? lesson.formula
      },
      {
        label: "Scene 2",
        focus: secondTerm,
        visual: guidedLessonVisualModels[lesson.id] ?? lesson.steps[0]?.output ?? lesson.goal,
        formulaCue: lesson.formulaTerms[1]?.symbol ?? lesson.formula
      },
      {
        label: "Scene 3",
        focus: thirdTerm,
        visual: lesson.steps.at(-1)?.output ?? lesson.goodNotesPage,
        formulaCue: lesson.formulaTerms[2]?.symbol ?? lesson.formula
      }
    ]
  };
}
