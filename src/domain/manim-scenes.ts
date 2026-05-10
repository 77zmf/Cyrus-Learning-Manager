export type ManimSceneTopic = "slam" | "reconstruction" | "spatial-intelligence";

export interface ManimSceneCard {
  id: string;
  title: string;
  sceneName: string;
  topic: ManimSceneTopic;
  assetPath: string;
  command: string;
  purpose: string;
  dragCue: string;
  goodNotes: string;
}

export const manimSceneSource = "scripts/manim/spatial_scenes.py";

export const manimSceneCards: ManimSceneCard[] = [
  {
    id: "slam-projection",
    title: "SLAM projection Manim scene",
    sceneName: "SlamProjectionScene",
    topic: "slam",
    assetPath: "manim/slam_projection.mp4",
    command: "npm run manim:render -- SlamProjectionScene",
    purpose: "把三维点、相机坐标、归一化平面和像素投影做成一段逐步动画。",
    dragCue: "网页里拖动 3D 点后，再看这段动画巩固 X/Z、Y/Z 为什么决定像素位置。",
    goodNotes: "GoodNotes SLAM-M001：暂停在 image plane，手写 u = fx X/Z + cx。"
  },
  {
    id: "slam-loop",
    title: "Pose graph loop closure Manim scene",
    sceneName: "PoseGraphLoopClosureScene",
    topic: "slam",
    assetPath: "manim/pose_graph_loop.mp4",
    command: "npm run manim:render -- PoseGraphLoopClosureScene",
    purpose: "把漂移轨迹、回环边、残差收紧做成位姿图动画。",
    dragCue: "拖动 SLAM 地标后，看回环边如何让长期漂移从局部误差变成全局约束。",
    goodNotes: "GoodNotes SLAM-M002：画 pose node、landmark、loop edge、residual 四件事。"
  },
  {
    id: "reconstruction-pipeline",
    title: "COLMAP to Gaussian reconstruction Manim scene",
    sceneName: "ReconstructionPipelineScene",
    topic: "reconstruction",
    assetPath: "manim/reconstruction_pipeline.mp4",
    command: "npm run manim:render -- ReconstructionPipelineScene",
    purpose: "把 images -> features -> SfM -> MVS -> 3DGS -> validation asset 串成资产生产线。",
    dragCue: "网页里调 baseline 后，再看动画理解为什么视差、稀疏点和稠密重建是连续步骤。",
    goodNotes: "GoodNotes 3D-M001：写 capture baseline、SfM pose、MVS dense、3DGS render。"
  },
  {
    id: "spatial-intelligence-loop",
    title: "Spatial intelligence world-model Manim scene",
    sceneName: "SpatialIntelligenceScene",
    topic: "spatial-intelligence",
    assetPath: "manim/spatial_intelligence.mp4",
    command: "npm run manim:render -- SpatialIntelligenceScene",
    purpose: "把 image/video observation、3D world posterior、planner/action 接成空间智能闭环。",
    dragCue: "切到李飞飞空间智能页面时，用它理解 SLAM 和 3DGS 为什么是 world model 的下层工具。",
    goodNotes: "GoodNotes SI-M001：画 observation -> 3D world -> reasoning -> action。"
  }
];

export function getManimScenesForPanel(panelId: string) {
  return manimSceneCards.filter((scene) => scene.topic === panelId);
}
