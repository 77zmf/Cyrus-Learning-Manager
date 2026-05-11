import {
  epipolarFormulaTerms,
  nerfGaussianFormulaTerms,
  quaternionFormulaTerms,
  slamBackendFormulaTerms,
  slamProjectionFormulaTerms,
  slamTransformFormulaTerms,
  worldSpatialFormulaTerms
} from "./formula-visuals";
import type { FormulaTerm } from "./formula-visuals";

export interface ManimStudioSource {
  label: string;
  url: string;
  note: string;
}

export interface ManimStudioStage {
  id: string;
  label: string;
  beginnerQuestion: string;
  explanation: string;
  goodNotes: string;
  obsidian: string;
  notion: string;
}

export interface ManimStudioPanel {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  formula: string;
  formulaTerms: FormulaTerm[];
  stages: ManimStudioStage[];
  sourceLinks: ManimStudioSource[];
}

export const spatialIntelligenceFormulaTerms: FormulaTerm[] = [
  {
    label: "三维世界后验",
    symbol: "p(W_{3D}\\mid I_{1:n})",
    meaning: "看到一组图像、视频或传感器输入后，对三维世界状态形成概率化理解。"
  },
  {
    label: "空间一致生成",
    symbol: "\\hat{W}_{3D}=G_\\theta(c)",
    meaning: "从文本、图像或布局条件 c 生成可移动、可编辑、前后一致的三维世界。"
  },
  {
    label: "具身动作接口",
    symbol: "a_t=\\pi(o_t,\\hat{W}_{3D})",
    meaning: "把当前观测和三维世界模型交给策略，用来做导航、交互或验证动作。"
  }
];

export const manimStudioPanels: ManimStudioPanel[] = [
  {
    id: "slam",
    title: "SLAM Interface",
    kicker: "Localization -> Mapping -> Loop closure",
    summary: "把 SLAM 当成一条证据链：位姿先把坐标系连起来，相机投影把三维点落到像素，后端优化再把所有误差一起收紧。",
    formula: "T_{map\\leftarrow camera}=T_{map\\leftarrow base}T_{base\\leftarrow camera},\\quad e_{ij}=u_{ij}-\\pi(T_iX_j)",
    formulaTerms: [...slamTransformFormulaTerms, ...slamProjectionFormulaTerms, ...slamBackendFormulaTerms],
    stages: [
      {
        id: "slam-pose-chain",
        label: "位姿链",
        beginnerQuestion: "同一个点为什么会有 lidar、camera、base、map 四种说法？",
        explanation: "SLAM 第一件事不是建图，而是把每个坐标系说清楚。坐标变换链错了，后面的特征、地图和轨迹都会错。",
        goodNotes: "GoodNotes Page SLAM-G001：画四个坐标系，写一条 T_map<-base T_base<-camera 链。",
        obsidian: "Obsidian: SLAM -> Pose graph -> Coordinate frames",
        notion: "Notion: Topic=SLAM pose chain, Evidence=GoodNotes SLAM-G001"
      },
      {
        id: "slam-projection",
        label: "投影",
        beginnerQuestion: "三维点如何变成图像上的一个像素？",
        explanation: "相机模型把世界点先变到相机坐标，再用内参 K 投到像素平面。重投影误差就是预测像素和真实像素差多少。",
        goodNotes: "GoodNotes Page SLAM-G002：写 s u = K[R|t]X，并画一条从 3D 点到像素的箭头。",
        obsidian: "Obsidian: Camera model -> Reprojection error",
        notion: "Notion: Topic=Projection, Evidence=GoodNotes SLAM-G002"
      },
      {
        id: "slam-matching",
        label: "匹配",
        beginnerQuestion: "为什么两张图里同一个点不是随便匹配？",
        explanation: "对极几何用 F 或 E 限制匹配位置。它让你从“看起来像”进入“几何上必须合理”。",
        goodNotes: "GoodNotes Page SLAM-G003：画两张图、一条对极线、一个错误匹配。",
        obsidian: "Obsidian: Epipolar geometry -> Feature matching",
        notion: "Notion: Topic=Epipolar geometry, Evidence=GoodNotes SLAM-G003"
      },
      {
        id: "slam-backend",
        label: "后端优化",
        beginnerQuestion: "为什么 SLAM 后端总是在最小化误差？",
        explanation: "前端给出观测，后端把所有位姿、点和约束放进一个优化问题，让整条轨迹和地图同时更一致。",
        goodNotes: "GoodNotes Page SLAM-G004：写一个 sum of residuals，并标出 pose、landmark、measurement。",
        obsidian: "Obsidian: Bundle adjustment -> Pose graph",
        notion: "Notion: Topic=SLAM backend, Evidence=GoodNotes SLAM-G004"
      },
      {
        id: "slam-loop",
        label: "回环",
        beginnerQuestion: "车回到同一个地方，为什么地图会突然变准？",
        explanation: "回环约束把远处的累计漂移拉回来。它不是魔法，而是新增了一条“这里其实是同一处”的强约束。",
        goodNotes: "GoodNotes Page SLAM-G005：画一条漂移轨迹和一条回环边。",
        obsidian: "Obsidian: Loop closure -> Drift correction",
        notion: "Notion: Topic=Loop closure, Evidence=GoodNotes SLAM-G005"
      }
    ],
    sourceLinks: [
      {
        label: "MIT 6.8300",
        url: "https://ocw.mit.edu/courses/6-8300-advances-in-computer-vision-fall-2023/",
        note: "把视觉几何、表示学习和 3D 视觉放回课程体系里。"
      }
    ]
  },
  {
    id: "quaternion",
    title: "Quaternion Explorable",
    kicker: "Unit quaternion -> double cover -> rotation",
    summary:
      "把 Ben Eater / 3Blue1Brown 的四元数可探索思路接到 SLAM 姿态学习：先看单位四元数，理解 q 和 -q 的双覆盖，再把 v'=qvq^{-1} 接到相机、IMU 和位姿图。",
    formula:
      "q=\\cos\\frac{\\theta}{2}+\\sin\\frac{\\theta}{2}(u_xi+u_yj+u_zk),\\quad v'=qvq^{-1},\\quad q\\sim -q",
    formulaTerms: quaternionFormulaTerms,
    stages: [
      {
        id: "quat-unit",
        label: "单位四元数",
        beginnerQuestion: "为什么只有长度为 1 的四元数才拿来表示旋转？",
        explanation:
          "单位四元数像 4D 单位球面上的点。长度固定以后，它只保留旋转信息，不把向量额外放大或缩小。",
        goodNotes: "GoodNotes Page Q-001：写 q=w+xi+yj+zk 和 ||q||=1，画一个单位圆类比单位球。",
        obsidian: "Obsidian: SLAM -> Orientation -> Unit quaternion",
        notion: "Notion: Topic=Quaternion unit norm, Evidence=GoodNotes Q-001"
      },
      {
        id: "quat-double-cover",
        label: "双覆盖",
        beginnerQuestion: "为什么 q 和 -q 会代表同一个 3D 旋转？",
        explanation:
          "四元数用半角表达旋转；在单位球面上走到对面的点，会让左右夹乘的符号抵消，所以方向结果相同。",
        goodNotes: "GoodNotes Page Q-002：写 q ~ -q，并画一对对跖点指向同一个旋转。",
        obsidian: "Obsidian: Quaternion -> Double cover",
        notion: "Notion: Topic=Quaternion double cover, Evidence=GoodNotes Q-002"
      },
      {
        id: "quat-stereo",
        label: "立体投影",
        beginnerQuestion: "四维单位球看不见，为什么还可以学习？",
        explanation:
          "立体投影把 S^3 投到我们能看的三维空间里。你不是在背 4D，而是在观察旋转状态如何连续移动。",
        goodNotes: "GoodNotes Page Q-003：画 S^2 到平面的投影类比，再写 S^3 -> R^3。",
        obsidian: "Obsidian: Quaternion -> Stereographic projection",
        notion: "Notion: Topic=Stereographic projection, Evidence=GoodNotes Q-003"
      },
      {
        id: "quat-multiply",
        label: "四元数乘法",
        beginnerQuestion: "为什么四元数乘法顺序不能换？",
        explanation:
          "i、j、k 的乘法方向带有旋转顺序。先绕 x 再绕 y，和先绕 y 再绕 x，一般不是同一个姿态。",
        goodNotes: "GoodNotes Page Q-004：写 i^2=j^2=k^2=ijk=-1，并做一次 ij=k、ji=-k。",
        obsidian: "Obsidian: Quaternion -> Non-commutative multiplication",
        notion: "Notion: Topic=Quaternion multiplication, Evidence=GoodNotes Q-004"
      },
      {
        id: "quat-sandwich",
        label: "旋转夹心",
        beginnerQuestion: "v'=qvq^{-1} 这串式子到底在干什么？",
        explanation:
          "把 3D 向量写成纯虚四元数 v，再用 q 从左边推、用 q^{-1} 从右边拉，结果仍是纯虚部分，也就是旋转后的 3D 向量。",
        goodNotes: "GoodNotes Page Q-005：写 v'=qvq^{-1}，标出 q、v、q^{-1} 各自角色。",
        obsidian: "Obsidian: Quaternion -> Rotation sandwich",
        notion: "Notion: Topic=Quaternion rotation sandwich, Evidence=GoodNotes Q-005"
      }
    ],
    sourceLinks: [
      {
        label: "Visualizing quaternions",
        url: "https://eater.net/quaternions",
        note: "Ben Eater and 3Blue1Brown's explorable video sequence, adapted here as a SLAM orientation module."
      },
      {
        label: "3Blue1Brown quaternion video",
        url: "https://www.youtube.com/watch?v=d4EgbgTm0Bg",
        note: "Four-dimensional visualization route for understanding quaternion rotation."
      },
      {
        label: "Quaternion rotation follow-up",
        url: "https://www.youtube.com/watch?v=zjMuIxRvygQ",
        note: "Short companion video on why quaternions describe 3D orientation."
      }
    ]
  },
  {
    id: "reconstruction",
    title: "3D Reconstruction Interface",
    kicker: "COLMAP -> MVS -> NeRF -> 3DGS -> validation asset",
    summary: "把三维重建当成资产生产线：先用 SfM 得到相机和稀疏点，再稠密化或神经渲染，最后转成可验证的场景资产。",
    formula: "\\hat{C}(r)=\\sum_iT_i\\alpha_ic_i,\\quad \\Sigma'=JW\\Sigma W^TJ^T",
    formulaTerms: [...epipolarFormulaTerms, ...nerfGaussianFormulaTerms],
    stages: [
      {
        id: "recon-capture",
        label: "采集",
        beginnerQuestion: "为什么同一个物体要从很多角度拍？",
        explanation: "重建需要视差。没有足够角度，算法只知道像素长什么样，不知道深度在哪里。",
        goodNotes: "GoodNotes Page 3D-R001：画一个物体和三台相机，标出 baseline。",
        obsidian: "Obsidian: Reconstruction -> Capture protocol",
        notion: "Notion: Topic=Capture baseline, Evidence=GoodNotes 3D-R001"
      },
      {
        id: "recon-colmap",
        label: "COLMAP SfM",
        beginnerQuestion: "SfM 为什么能从照片里找出相机位置？",
        explanation: "SfM 先匹配特征，再用几何约束求相机相对位姿和稀疏三维点，最后用 BA 一起优化。",
        goodNotes: "GoodNotes Page 3D-R002：写 feature -> pose -> sparse points -> BA。",
        obsidian: "Obsidian: COLMAP -> SfM graph",
        notion: "Notion: Topic=COLMAP SfM, Evidence=GoodNotes 3D-R002"
      },
      {
        id: "recon-mvs",
        label: "MVS",
        beginnerQuestion: "稀疏点不够用，怎么变成稠密表面？",
        explanation: "MVS 利用多视图一致性估计更多深度，目标是把稀疏点扩展成稠密点云或网格。",
        goodNotes: "GoodNotes Page 3D-R003：画 sparse -> dense -> mesh 三步。",
        obsidian: "Obsidian: MVS -> Dense reconstruction",
        notion: "Notion: Topic=MVS, Evidence=GoodNotes 3D-R003"
      },
      {
        id: "recon-nerf-3dgs",
        label: "NeRF / 3DGS",
        beginnerQuestion: "为什么新重建方法不只输出网格？",
        explanation: "光线和高斯不是装饰，是从图像合成可检查的三维资产。NeRF 学一个连续场，3DGS 用大量可投影高斯更快渲染。",
        goodNotes: "GoodNotes Page 3D-R004：左边写体渲染，右边写 3D Gaussian splatting。",
        obsidian: "Obsidian: NeRF -> 3DGS -> validation asset",
        notion: "Notion: Topic=NeRF/3DGS, Evidence=GoodNotes 3D-R004"
      },
      {
        id: "recon-validation",
        label: "验证资产",
        beginnerQuestion: "重建得漂亮就能用于自动驾驶验证吗？",
        explanation: "不能只看漂亮。要检查尺度、坐标系、动态物体、遮挡、可复现输入和 simctl 可接入证据。",
        goodNotes: "GoodNotes Page 3D-R005：列出 scale、frame、dynamic actor、KPI 四个检查框。",
        obsidian: "Obsidian: Reconstruction asset -> simctl evidence",
        notion: "Notion: Topic=Validation asset, Evidence=GoodNotes 3D-R005"
      }
    ],
    sourceLinks: [
      {
        label: "World Labs Spark",
        url: "https://www.worldlabs.ai/research",
        note: "跟踪 3DGS 与空间智能工程化输出。"
      }
    ]
  },
  {
    id: "spatial-intelligence",
    title: "Fei-Fei Li Spatial Intelligence",
    kicker: "See -> understand -> reason -> generate -> act",
    summary: "这里把空间智能放到你的学习系统里：不是背概念，而是学会从图像和视频恢复三维世界，并把它接到机器人、仿真和验证。",
    formula: "p(W_{3D}\\mid I_{1:n}),\\quad \\hat{W}_{3D}=G_\\theta(c),\\quad a_t=\\pi(o_t,\\hat{W}_{3D})",
    formulaTerms: [...worldSpatialFormulaTerms, ...spatialIntelligenceFormulaTerms],
    stages: [
      {
        id: "spatial-see",
        label: "看见",
        beginnerQuestion: "计算机视觉为什么不等于真正理解空间？",
        explanation: "识别物体只是第一层。空间智能还要知道物体在哪里、能不能通过、会如何遮挡、从另一边看会变成什么。",
        goodNotes: "GoodNotes Page SI-L001：写 object, relation, geometry, affordance 四个词。",
        obsidian: "Obsidian: Spatial intelligence -> Seeing",
        notion: "Notion: Topic=Spatial seeing, Evidence=GoodNotes SI-L001"
      },
      {
        id: "spatial-world",
        label: "生成世界",
        beginnerQuestion: "为什么 World Labs 说从 pixels 到 worlds？",
        explanation: "空间智能模型要能从文本、图像、视频或全景生成可移动、可编辑、前后一致的 3D 世界。",
        goodNotes: "GoodNotes Page SI-L002：画 input -> persistent 3D world -> editable output。",
        obsidian: "Obsidian: World Labs -> Marble -> 3D world generation",
        notion: "Notion: Topic=World generation, Evidence=GoodNotes SI-L002"
      },
      {
        id: "spatial-reason",
        label: "空间推理",
        beginnerQuestion: "什么叫在三维世界里推理？",
        explanation: "推理就是能回答前后、遮挡、尺度、可达性、相机移动后会看到什么，而不只是给图片贴标签。",
        goodNotes: "GoodNotes Page SI-L003：写 3 个空间问题：where, occluded, reachable。",
        obsidian: "Obsidian: Spatial reasoning -> Robotics",
        notion: "Notion: Topic=Spatial reasoning, Evidence=GoodNotes SI-L003"
      },
      {
        id: "spatial-act",
        label: "接到动作",
        beginnerQuestion: "空间智能和自动驾驶、机器人有什么关系？",
        explanation: "如果模型能维护三维世界，策略就能基于世界状态做规划、避障、探索和仿真验证。",
        goodNotes: "GoodNotes Page SI-L004：画 perception -> world model -> planner -> action。",
        obsidian: "Obsidian: Spatial intelligence -> Embodied action",
        notion: "Notion: Topic=Action bridge, Evidence=GoodNotes SI-L004"
      },
      {
        id: "spatial-cyrus",
        label: "接到 Cyrus",
        beginnerQuestion: "我该怎么把它接到自己的学习网页？",
        explanation: "先把它当成 SLAM/重建/世界模型的上层目标：能否生成、理解并验证可交互的 3D 场景。",
        goodNotes: "GoodNotes Page SI-L005：写 SLAM、3DGS、World Model、simctl 四个连接。",
        obsidian: "Obsidian: Cyrus Learning -> Spatial intelligence hub",
        notion: "Notion: Topic=Cyrus spatial bridge, Evidence=GoodNotes SI-L005"
      }
    ],
    sourceLinks: [
      {
        label: "World Labs",
        url: "https://www.worldlabs.ai/",
        note: "Spatial intelligence company, frontier models for 3D world perception, generation, reasoning, and interaction."
      },
      {
        label: "Stanford HAI",
        url: "https://hai.stanford.edu/people/fei-fei-li",
        note: "Fei-Fei Li's Stanford HAI profile and research context."
      }
    ]
  }
];
