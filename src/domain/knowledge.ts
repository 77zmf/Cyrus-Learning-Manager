import type { TaskPriority, TaskStatus, TrackId } from "./types";

export interface KnowledgeSource {
  title: string;
  url: string;
}

export interface KnowledgeModule {
  id: string;
  track: TrackId;
  title: string;
  stage: string;
  focus: string;
  outputs: string[];
  sources: KnowledgeSource[];
}

export interface DeepStudyCard {
  id: string;
  track: TrackId;
  title: string;
  layer: string;
  beginnerBridge: string;
  coreIdeas: string[];
  derivationEntry: string;
  practice: string;
  goodNotes: string;
  obsidian: string;
  notion: string;
  sources: KnowledgeSource[];
}

export interface KnowledgeSeedTask {
  id: string;
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
}

export const deepStudyCards: DeepStudyCard[] = [
  {
    id: "deep-linear-algebra-state-space",
    track: "tsinghua-automation",
    title: "线性代数到状态空间",
    layer: "数学基础 -> 控制入口",
    beginnerBridge:
      "先学标量，再学向量，再学矩阵：一个数描述一个量，一列数描述一组状态，矩阵描述状态之间如何互相影响。",
    coreIdeas: [
      "向量 x 是状态清单，不是抽象符号；车辆里可以是位置、速度、航向误差。",
      "矩阵 A 负责状态自己怎么演化，矩阵 B 负责输入怎么进入系统。",
      "矩阵乘法先理解成“加权组合”，不要一开始就死背行列计算。"
    ],
    derivationEntry: "从二维例子开始写 x_dot = Ax + Bu，再解释 A 的每个元素对应哪条影响边。",
    practice: "用一个小车模型写 x=[位置, 速度]，令位置变化率等于速度，速度变化率等于控制输入。",
    goodNotes: "GoodNotes: Page M001",
    obsidian: "Obsidian: Concept Graph -> Linear Algebra",
    notion: "Notion: mastery=1, evidence=Page M001, next=state-space two-state example",
    sources: [
      {
        title: "Tsinghua Automation undergraduate program",
        url: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf"
      },
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      }
    ]
  },
  {
    id: "deep-differential-equations-stability",
    track: "tsinghua-automation",
    title: "微分方程到稳定性",
    layer: "变化率 -> 系统趋势",
    beginnerBridge:
      "微分方程先不用怕，它只是在说“现在的变化速度由什么决定”。稳定性就是看误差被推开后是回来还是放大。",
    coreIdeas: [
      "一阶系统先看 x_dot = ax：a 小于 0 会收敛，a 大于 0 会发散。",
      "多维系统把 a 换成 A，趋势由特征值决定。",
      "e^{At} 是状态从现在走到未来的传播器。"
    ],
    derivationEntry: "先解 x_dot = ax 得到 x(t)=e^{at}x(0)，再把标量 a 升级成矩阵 A。",
    practice: "画 1, 0.5, 0.25 和 1, 2, 4 两条序列，标出收敛和发散。",
    goodNotes: "GoodNotes: Page M002",
    obsidian: "Obsidian: Control -> Stability -> Eigenvalue",
    notion: "Notion: mastery=1, evidence=Page M002, next=matrix exponential intuition",
    sources: [
      {
        title: "MIT 6.003 Signals and Systems",
        url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/"
      },
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      }
    ]
  },
  {
    id: "deep-controllability-observability-rank",
    track: "tsinghua-automation",
    title: "可控性与可观性从图到 rank",
    layer: "结构判断 -> rank test",
    beginnerBridge:
      "先把系统画成图：输入能沿着边影响哪些状态，输出能沿着边看见哪些状态。rank test 是把这张图变成矩阵检查。",
    coreIdeas: [
      "B 是输入直接碰到的方向，AB 是经过系统传播后碰到的方向。",
      "rank(C)=n 表示输入影响方向够多；rank(C)<n 表示至少有一个方向不可控。",
      "可观性把问题反过来：输出 y=Cx 能不能反推出内部状态。"
    ],
    derivationEntry: "先写 C=[B AB ...]，再写 O=[C; CA; ...]，最后用 rank 判断方向是否够。",
    practice: "画两个状态节点和一个输入节点，标出直接影响和传播影响，再判断能否控制全部状态。",
    goodNotes: "GoodNotes: Page M003",
    obsidian: "Obsidian: Control -> Rank Tests",
    notion: "Notion: mastery=1, evidence=Page M003, next=two-state rank example",
    sources: [
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      }
    ]
  },
  {
    id: "deep-lqr-kalman-mpc",
    track: "mit-eecs",
    title: "LQR / Kalman / MPC 三件套",
    layer: "现代控制主干",
    beginnerBridge:
      "把它们先分成三件事：LQR 决定怎么控，Kalman 决定怎么估，MPC 决定怎么带约束往未来看。",
    coreIdeas: [
      "LQR 的 Q 惩罚状态误差，R 惩罚控制太猛。",
      "Kalman Filter 在模型预测和传感器观测之间做加权融合。",
      "MPC 每次优化未来一段窗口，但只执行当前第一步。"
    ],
    derivationEntry:
      "先写 J=sum(state cost + control cost)，再写 predict-update，最后写 constrained rollout。",
    practice: "同一个跟车场景分别写 LQR、Kalman、MPC 各自解决的问题。",
    goodNotes: "GoodNotes: Page C010",
    obsidian: "Obsidian: Control -> LQR Kalman MPC",
    notion: "Notion: mastery=1, evidence=Page C010, next=one controller comparison",
    sources: [
      {
        title: "MIT 2.14 Feedback Control",
        url: "https://ocw.mit.edu/courses/2-14-analysis-and-design-of-feedback-control-systems-spring-2014/"
      },
      {
        title: "MIT 6.231 Dynamic Programming and Stochastic Control",
        url: "https://ocw.mit.edu/courses/6-231-dynamic-programming-and-stochastic-control-fall-2015/"
      }
    ]
  },
  {
    id: "deep-graduate-control-research",
    track: "mit-eecs",
    title: "鲁棒、非线性、随机控制研究生入口",
    layer: "研究生控制工程",
    beginnerBridge:
      "研究生控制不是换一堆新名词，而是把“模型不准、系统非线性、未来不确定”这三类困难系统化处理。",
    coreIdeas: [
      "鲁棒控制问最坏扰动下还能不能保持性能。",
      "非线性控制先从工作点线性化，再学习 Lyapunov、反馈线性化和局部/全局稳定。",
      "随机控制把未来不确定性放进代价和 Bellman 递推。"
    ],
    derivationEntry: "先把真实系统写成 x_dot=f(x,u)，再比较线性化、扰动项 w、随机转移概率。",
    practice: "拿自动驾驶横向控制写三个 failure mode：轮胎参数变、急弯非线性、前车动作不确定。",
    goodNotes: "GoodNotes: Page G001",
    obsidian: "Obsidian: Graduate Control -> Robust Nonlinear Stochastic",
    notion: "Notion: mastery=1, evidence=Page G001, next=choose one graduate branch",
    sources: [
      {
        title: "MIT 6.245 Multivariable Control Systems",
        url: "https://ocw.mit.edu/courses/6-245-multivariable-control-systems-spring-2004/"
      },
      {
        title: "MIT 6.231 Dynamic Programming and Stochastic Control",
        url: "https://ocw.mit.edu/courses/6-231-dynamic-programming-and-stochastic-control-fall-2015/"
      },
      {
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/"
      }
    ]
  },
  {
    id: "deep-world-model-latent-dynamics",
    track: "world-spatial-models",
    title: "世界模型 latent dynamics",
    layer: "预测世界 -> 想象 rollout",
    beginnerBridge:
      "世界模型先理解成“脑内预演”：给定现在的表示和动作，模型预测下一步可能发生什么。",
    coreIdeas: [
      "表示 z_t 压缩真实世界状态，动作 a_t 改变未来状态。",
      "p(z_{t+1}|z_t,a_t) 是世界模型的核心问题。",
      "自动驾驶里要特别记录失败模式：遮挡、长尾行为、分布外场景。"
    ],
    derivationEntry: "写 latent transition、reward/value prediction、imagined rollout 三行，不急着复现完整模型。",
    practice: "把一个变道场景写成 z_t、a_t、z_{t+1}，并写出三个模型可能猜错的地方。",
    goodNotes: "GoodNotes: Page W001",
    obsidian: "Obsidian: World Models -> Latent Dynamics",
    notion: "Notion: mastery=1, evidence=Page W001, next=PlaNet or Dreamer paper card",
    sources: [
      {
        title: "World Models",
        url: "https://worldmodels.github.io/"
      },
      {
        title: "PlaNet",
        url: "https://arxiv.org/abs/1811.04551"
      },
      {
        title: "DreamerV3",
        url: "https://arxiv.org/abs/2301.04104"
      }
    ]
  },
  {
    id: "deep-spatial-model-geometry-bev",
    track: "world-spatial-models",
    title: "空间模型：相机几何、BEV、occupancy",
    layer: "空间表示 -> 可规划地图",
    beginnerBridge:
      "空间模型先回答三个问题：东西在哪里、从相机怎么投到空间、 planner 能不能使用这个表示。",
    coreIdeas: [
      "相机模型把 3D 点投影成 2D 像素，核心是内参 K、外参 R/t。",
      "BEV 把多视角信息整理到鸟瞰平面，便于规划和控制使用。",
      "occupancy 问空间里每个位置是否被占用，比只检测框更接近可通行性。"
    ],
    derivationEntry: "先写 s u = K[R|t]X，再画 BEV grid 和 occupancy value。",
    practice: "选一个路口场景，画相机视角、BEV 视角、占用栅格三张图。",
    goodNotes: "GoodNotes: Page S001",
    obsidian: "Obsidian: Spatial Models -> Geometry BEV Occupancy",
    notion: "Notion: mastery=1, evidence=Page S001, next=BEVFormer or occupancy card",
    sources: [
      {
        title: "Stanford CS231A",
        url: "https://web.stanford.edu/class/cs231a/"
      },
      {
        title: "BEVFormer",
        url: "https://arxiv.org/abs/2203.17270"
      },
      {
        title: "Occupancy Networks",
        url: "https://arxiv.org/abs/1812.03828"
      }
    ]
  },
  {
    id: "deep-paper-reading-template",
    track: "world-spatial-models",
    title: "论文阅读模板：问题、假设、公式、复现",
    layer: "论文 -> 可复现实验",
    beginnerBridge:
      "论文不要从摘要一路读到结尾。先抓四件事：它解决什么问题、做了哪些假设、核心公式是什么、最小复现怎么做。",
    coreIdeas: [
      "Problem：作者到底把哪个失败或能力缺口定义成问题。",
      "Assumption：数据、传感器、模型、训练条件默认成立什么。",
      "Reproduction hook：用一个最小场景、指标或可视化复现关键结论。"
    ],
    derivationEntry: "每篇论文只抄一个核心公式，然后写每个符号的工程含义。",
    practice: "用 Kalman、MPC、Dreamer、BEVFormer、3DGS 中任意一篇填一张 paper card。",
    goodNotes: "GoodNotes: Page P001",
    obsidian: "Obsidian: Paper Queue -> Reproduction Cards",
    notion: "Notion: mastery=1, evidence=Page P001, next=one paper card with validation hook",
    sources: [
      {
        title: "Kalman 1960 DOI",
        url: "https://doi.org/10.1115/1.3662552"
      },
      {
        title: "BEVFormer",
        url: "https://arxiv.org/abs/2203.17270"
      },
      {
        title: "3D Gaussian Splatting",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
      }
    ]
  }
];

export const knowledgeModules: KnowledgeModule[] = [
  {
    id: "tsinghua-undergraduate-full-path",
    track: "tsinghua-automation",
    title: "Tsinghua Automation undergraduate full path",
    stage: "Undergraduate backbone",
    focus:
      "Map the automation undergraduate curriculum into math, programming, circuits, signals, control, intelligence, robotics, and engineering labs.",
    outputs: [
      "one self-paced curriculum map",
      "one derivation-heavy note for a signal or control concept",
      "one lab or exercise connected to Autoware/CARLA validation"
    ],
    sources: [
      {
        title: "Tsinghua Automation undergraduate program",
        url: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf"
      },
      {
        title: "XuetangX Tsinghua automation/control search",
        url: "https://www.xuetangx.com/search?query=%E8%87%AA%E5%8A%A8%E6%8E%A7%E5%88%B6%E5%8E%9F%E7%90%86%20%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6"
      }
    ]
  },
  {
    id: "tsinghua-control-spine",
    track: "tsinghua-automation",
    title: "Signals, systems, and control spine",
    stage: "Foundation to core",
    focus:
      "Use signal representation, system response, feedback, and control theory as the automation backbone.",
    outputs: [
      "one concept sheet for signal transforms and system response",
      "one control-theory note connected to vehicle control or trajectory review",
      "one lab note using simulation, logs, or KPI evidence"
    ],
    sources: [
      {
        title: "Tsinghua Automation undergraduate program",
        url: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf"
      },
      {
        title: "MIT OCW 6.003 Signals and Systems",
        url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/"
      }
    ]
  },
  {
    id: "tsinghua-graduate-control-engineering",
    track: "tsinghua-automation",
    title: "Graduate control engineering path",
    stage: "Graduate control spine",
    focus:
      "Use control science and engineering as the graduate path: linear systems, optimal control, robust control, estimation, MPC, nonlinear control, and robotics.",
    outputs: [
      "one state-space derivation note",
      "one Kalman/LQR/MPC derivation and simulation",
      "one controller comparison tied to a vehicle-control validation case"
    ],
    sources: [
      {
        title: "Tsinghua Automation research directions",
        url: "https://www.au.tsinghua.edu.cn/?columnId=00509"
      },
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      },
      {
        title: "MIT 2.14 Feedback Control",
        url: "https://ocw.mit.edu/courses/2-14-analysis-and-design-of-feedback-control-systems-spring-2014/"
      }
    ]
  },
  {
    id: "control-formula-derivation-ladder",
    track: "tsinghua-automation",
    title: "Control formula derivation ladder",
    stage: "Formula-first control learning",
    focus:
      "Use one core formula at a time to move from signals and state space into controllability, Lyapunov stability, LQR, Kalman filtering, MPC, and robust control.",
    outputs: [
      "one LaTeX derivation note with definitions, assumptions, and result",
      "one engineering interpretation tied to vehicle control or state estimation",
      "one minimal simulation, example, or KPI connection"
    ],
    sources: [
      {
        title: "Tsinghua Automation undergraduate program",
        url: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf"
      },
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      },
      {
        title: "MIT 2.14 Feedback Control",
        url: "https://ocw.mit.edu/courses/2-14-analysis-and-design-of-feedback-control-systems-spring-2014/"
      }
    ]
  },
  {
    id: "tsinghua-intelligent-systems",
    track: "tsinghua-automation",
    title: "Intelligent sensing, optimization, and robotics bridge",
    stage: "Professional extension",
    focus:
      "Connect AI, pattern recognition, intelligent sensing, optimization, and robotics to autonomous-driving validation work.",
    outputs: [
      "one perception failure taxonomy note",
      "one optimization or planning comparison note",
      "one robotics-to-CARLA scenario idea"
    ],
    sources: [
      {
        title: "Tsinghua Automation research directions",
        url: "https://www.au.tsinghua.edu.cn/?columnId=00509"
      },
      {
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/"
      }
    ]
  },
  {
    id: "mit-undergraduate-full-path",
    track: "mit-eecs",
    title: "MIT EECS undergraduate full path",
    stage: "Undergraduate executable resources",
    focus:
      "Use MIT EECS open resources for programming, discrete math, algorithms, systems, signals, AI, machine learning, and robotics.",
    outputs: [
      "one executable course map",
      "one algorithm or systems exercise",
      "one connection from MIT material to the validation platform"
    ],
    sources: [
      {
        title: "MIT EECS undergraduate programs",
        url: "https://www.eecs.mit.edu/academics/undergraduate-programs/"
      },
      {
        title: "MIT OCW 6.006 Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"
      },
      {
        title: "MIT OCW 6.003 Signals and Systems",
        url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/"
      }
    ]
  },
  {
    id: "mit-algorithms-systems",
    track: "mit-eecs",
    title: "Algorithms, software, and systems execution line",
    stage: "Executable CS",
    focus:
      "Treat MIT EECS as the execution companion for building reliable tools, data paths, and simulation workflows.",
    outputs: [
      "one solved algorithms problem with complexity notes",
      "one software construction refactor note",
      "one systems reliability note tied to simctl or batch runs"
    ],
    sources: [
      {
        title: "MIT OCW 6.006 Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"
      },
      {
        title: "MIT OCW 6.033 Computer System Engineering",
        url: "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/"
      }
    ]
  },
  {
    id: "mit-graduate-control-engineering",
    track: "mit-eecs",
    title: "MIT graduate control engineering path",
    stage: "Graduate control resources",
    focus:
      "Follow the MIT side through dynamic systems, feedback control, multivariable control, stochastic control, optimization, and underactuated robotics.",
    outputs: [
      "one derivation note for controllability, observability, Lyapunov, LQR, Kalman, or MPC",
      "one simulation for estimation or control",
      "one paper card from the control/autonomous-driving queue"
    ],
    sources: [
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      },
      {
        title: "MIT 6.245 Multivariable Control Systems",
        url: "https://ocw.mit.edu/courses/6-245-multivariable-control-systems-spring-2004/"
      },
      {
        title: "MIT 6.231 Dynamic Programming and Stochastic Control",
        url: "https://ocw.mit.edu/courses/6-231-dynamic-programming-and-stochastic-control-fall-2015/"
      },
      {
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/"
      }
    ]
  },
  {
    id: "mit-eecs-full-coverage-map",
    track: "mit-eecs",
    title: "MIT EECS full coverage map",
    stage: "Coverage and selection",
    focus:
      "Map MIT EECS undergraduate and graduate resources into what to study deeply, what to use as reference, and what can stay out of scope for now.",
    outputs: [
      "one selected MIT direction marked as deep, optional, or out of scope",
      "one lecture, assignment, or reading linked to a durable note",
      "one connection to control engineering, world/spatial models, or validation tooling"
    ],
    sources: [
      {
        title: "MIT EECS undergraduate programs",
        url: "https://www.eecs.mit.edu/academics/undergraduate-programs/"
      },
      {
        title: "MIT EECS curriculum",
        url: "https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/"
      },
      {
        title: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu/"
      }
    ]
  },
  {
    id: "mit-ai-robotics",
    track: "mit-eecs",
    title: "Machine learning and robotics line",
    stage: "AI and autonomy",
    focus:
      "Use machine learning and robotics materials only when they produce a concrete experiment, metric, or failure analysis.",
    outputs: [
      "one ML concept note on over-fitting, generalization, or reinforcement learning",
      "one robotics dynamics/control note",
      "one validation experiment proposal"
    ],
    sources: [
      {
        title: "MIT OCW 6.036 Introduction to Machine Learning",
        url: "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/"
      },
      {
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/"
      }
    ]
  },
  {
    id: "world-latent-dynamics",
    track: "world-spatial-models",
    title: "World models and latent dynamics",
    stage: "Predictive representation",
    focus:
      "Learn latent dynamics, imagined rollouts, model-based RL, RSSM/Dreamer-style training, and world-model failure modes for autonomous systems.",
    outputs: [
      "one LaTeX derivation of p(z_{t+1}|z_t,a_t) and imagined rollout objective",
      "one RSSM or Dreamer-style loss note",
      "one autonomous-driving world-model failure taxonomy"
    ],
    sources: [
      {
        title: "World Models",
        url: "https://worldmodels.github.io/"
      },
      {
        title: "PlaNet: Learning Latent Dynamics for Planning from Pixels",
        url: "https://arxiv.org/abs/1811.04551"
      },
      {
        title: "DreamerV3",
        url: "https://arxiv.org/abs/2301.04104"
      },
      {
        title: "Berkeley CS 285 Deep RL",
        url: "https://rail.eecs.berkeley.edu/deeprlcourse/"
      }
    ]
  },
  {
    id: "spatial-geometry-occupancy",
    track: "world-spatial-models",
    title: "Spatial models, 3D geometry, BEV, and occupancy",
    stage: "Spatial representation",
    focus:
      "Use camera geometry, epipolar constraints, occupancy fields, BEV maps, NeRF, and 3D Gaussian Splatting as the spatial layer for robotics and validation.",
    outputs: [
      "one LaTeX derivation of camera projection or epipolar geometry",
      "one occupancy-field or BEV planner-cost note",
      "one NeRF vs 3DGS vs occupancy comparison tied to CARLA assets"
    ],
    sources: [
      {
        title: "Stanford CS231A",
        url: "https://web.stanford.edu/class/cs231a/"
      },
      {
        title: "Occupancy Networks",
        url: "https://arxiv.org/abs/1812.03828"
      },
      {
        title: "NeRF project",
        url: "https://www.matthewtancik.com/nerf"
      },
      {
        title: "3D Gaussian Splatting",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
      },
      {
        title: "BEVFormer",
        url: "https://arxiv.org/abs/2203.17270"
      }
    ]
  },
  {
    id: "world-spatial-paper-reproduction-map",
    track: "world-spatial-models",
    title: "World and spatial paper reproduction ladder",
    stage: "Research to experiment",
    focus:
      "Read world model, BEV, occupancy, NeRF, and 3DGS papers through representation, objective, failure mode, and minimal reproduction.",
    outputs: [
      "one paper card with problem, representation, objective, and assumptions",
      "one LaTeX derivation of a model, loss, rendering equation, or planner cost",
      "one CARLA/Autoware validation hook for the paper's failure modes"
    ],
    sources: [
      {
        title: "PlaNet",
        url: "https://arxiv.org/abs/1811.04551"
      },
      {
        title: "DreamerV3",
        url: "https://arxiv.org/abs/2301.04104"
      },
      {
        title: "BEVFormer",
        url: "https://arxiv.org/abs/2203.17270"
      },
      {
        title: "3D Gaussian Splatting",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
      }
    ]
  },
  {
    id: "ielts-scoring-loop",
    track: "ielts",
    title: "IELTS scoring and rubric loop",
    stage: "Diagnostic to weekly loop",
    focus:
      "Use official band-score logic and public descriptors to drive practice, not generic English study.",
    outputs: [
      "one baseline score sheet",
      "one writing rubric checklist",
      "one speaking recording review with fluency, vocabulary, grammar, and pronunciation notes"
    ],
    sources: [
      {
        title: "IELTS scoring in detail",
        url: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail"
      },
      {
        title: "IELTS Speaking band descriptors",
        url: "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf"
      }
    ]
  },
  {
    id: "ielts-output-loop",
    track: "ielts",
    title: "IELTS output and error-attribution loop",
    stage: "Practice to scoring",
    focus:
      "Turn each listening, reading, writing, or speaking practice into an output, score estimate, and error attribution.",
    outputs: [
      "one raw answer or recording record",
      "one band descriptor or correct-rate check",
      "one error-log entry with cause and fix"
    ],
    sources: [
      {
        title: "IELTS scoring in detail",
        url: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail"
      },
      {
        title: "IELTS Speaking band descriptors",
        url: "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf"
      }
    ]
  },
  {
    id: "philosophy-argument-ethics",
    track: "philosophy",
    title: "Argument clarity and technology ethics line",
    stage: "Reading to decision quality",
    focus:
      "Convert philosophy readings into argument maps, objections, and judgment notes for engineering decisions.",
    outputs: [
      "one argument map",
      "one strongest-objection note",
      "one AI or autonomous-systems ethics decision memo"
    ],
    sources: [
      {
        title: "Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/"
      },
      {
        title: "SEP Ethics of Artificial Intelligence and Robotics",
        url: "https://plato.stanford.edu/entries/ethics-ai/"
      },
      {
        title: "Open Yale Philosophy courses",
        url: "https://oyc.yale.edu/philosophy"
      }
    ]
  },
  {
    id: "philosophy-reading-ladder",
    track: "philosophy",
    title: "Philosophy reading ladder",
    stage: "Argument to judgment",
    focus:
      "Use logic, epistemology, philosophy of science, ethics, philosophy of mind, and AI ethics to improve argument quality and engineering judgment.",
    outputs: [
      "one thesis-premise-objection argument map",
      "one evidence-quality note connected to validation",
      "one AI or autonomous-systems ethics decision memo"
    ],
    sources: [
      {
        title: "Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/"
      },
      {
        title: "SEP Scientific Method",
        url: "https://plato.stanford.edu/entries/scientific-method/"
      },
      {
        title: "SEP Ethics of Artificial Intelligence and Robotics",
        url: "https://plato.stanford.edu/entries/ethics-ai/"
      }
    ]
  },
  {
    id: "work-validation-closure",
    track: "work-validation",
    title: "Stable validation closure line",
    stage: "Work integration",
    focus:
      "Keep work notes connected to repeatable run results, KPI gates, failcase packages, and owner-ready digests.",
    outputs: [
      "one weekly validation digest",
      "one failcase closure note",
      "one KPI gate or scenario-readiness review"
    ],
    sources: [
      {
        title: "PIX Simulation Validation Platform",
        url: "https://github.com/77zmf/PIX-Simulation-Validation-Platform"
      }
    ]
  }
];

export const knowledgeSeedTasks: KnowledgeSeedTask[] = [
  {
    id: "seed_tsinghua_signal_control_spine",
    title: "Build the Tsinghua signals and control spine",
    track: "tsinghua-automation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf",
    notes:
      "Create one spine note linking signal transforms, system response, feedback, and automatic control to vehicle-control validation."
  },
  {
    id: "seed_tsinghua_undergraduate_full_path",
    title: "Use the Tsinghua Automation undergraduate full path as the backbone",
    track: "tsinghua-automation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf",
    notes:
      "Self-paced queue item: pick one undergraduate module, then produce a derivation note, solved exercise, or validation connection."
  },
  {
    id: "seed_graduate_control_state_space_derivation",
    title: "Derive the state-space solution and controllability condition",
    track: "tsinghua-automation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/",
    notes:
      "Self-paced derivation item: define assumptions, derive the matrix exponential solution, explain controllability, and connect it to vehicle control."
  },
  {
    id: "seed_control_formula_ladder",
    title: "Pick one formula from the control derivation ladder",
    track: "tsinghua-automation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/",
    notes:
      "Self-paced item: choose one formula, write definitions, assumptions, derivation, result, engineering use, and one failure mode."
  },
  {
    id: "seed_tsinghua_intelligent_systems_bridge",
    title: "Map intelligent sensing and robotics to validation cases",
    track: "tsinghua-automation",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://www.au.tsinghua.edu.cn/?columnId=00509",
    notes:
      "Turn intelligent sensing, optimization, and robotics topics into concrete perception, planning, and CARLA scenario notes."
  },
  {
    id: "seed_mit_undergraduate_full_path",
    title: "Use the MIT EECS undergraduate full path as executable support",
    track: "mit-eecs",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://www.eecs.mit.edu/academics/undergraduate-programs/",
    notes:
      "Self-paced queue item: pick algorithms, systems, signals, AI, or ML and leave one exercise, code artifact, or engineering note."
  },
  {
    id: "seed_mit_eecs_full_coverage_review",
    title: "Classify one MIT EECS area as deep, optional, or out of scope",
    track: "mit-eecs",
    status: "active",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://www.eecs.mit.edu/academics/undergraduate-programs/",
    notes:
      "Use the MIT coverage map to avoid collecting every course; keep only material that supports control, world/spatial models, software systems, or validation."
  },
  {
    id: "seed_mit_6006_algorithms_problem",
    title: "Start MIT 6.006 with one algorithms problem note",
    track: "mit-eecs",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
    notes:
      "Use one lecture/problem set to capture model, data structure, correctness argument, complexity, and implementation hook."
  },
  {
    id: "seed_control_paper_kalman_or_mpc",
    title: "Read one control-engineering paper: Kalman 1960 or Mayne 2000 MPC",
    track: "mit-eecs",
    status: "backlog",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://doi.org/10.1115/1.3662552",
    notes:
      "Write a paper card with problem, assumptions, derivation, result, reproduction idea, and Autoware/CARLA connection."
  },
  {
    id: "seed_world_model_latent_dynamics",
    title: "Derive a world-model latent dynamics objective",
    track: "world-spatial-models",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://worldmodels.github.io/",
    notes:
      "Self-paced LaTeX item: derive p(z_{t+1}|z_t,a_t), imagined rollout objective, and one autonomous-driving failure mode."
  },
  {
    id: "seed_spatial_model_projection_occupancy",
    title: "Derive camera projection and occupancy representation",
    track: "world-spatial-models",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://web.stanford.edu/class/cs231a/",
    notes:
      "Self-paced LaTeX item: derive s u = K[R|t]X, occupancy field f(x,y,z), and connect BEV/occupancy errors to planner cost."
  },
  {
    id: "seed_world_spatial_paper_ladder",
    title: "Turn one world/spatial paper into a reproduction card",
    track: "world-spatial-models",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://arxiv.org/abs/1811.04551",
    notes:
      "Pick PlaNet, DreamerV3, Lift-Splat-Shoot, BEVFormer, NeRF, or 3DGS and capture representation, objective, failure mode, and a minimal reproduction."
  },
  {
    id: "seed_mit_6003_signals_companion",
    title: "Use MIT 6.003 as the signals companion",
    track: "mit-eecs",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/",
    notes:
      "Capture discrete/continuous signal representations and connect them to filtering, control, and vehicle-state analysis."
  },
  {
    id: "seed_ielts_diagnostic_score_sheet",
    title: "Create IELTS baseline score sheet",
    track: "ielts",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail",
    notes:
      "Record listening, reading, writing, and speaking baseline bands, then pick the weakest two modules for the first two weeks."
  },
  {
    id: "seed_ielts_speaking_rubric_review",
    title: "Record one IELTS speaking answer against band descriptors",
    track: "ielts",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf",
    notes:
      "Review fluency, lexical resource, grammatical range and accuracy, and pronunciation with concrete fixes."
  },
  {
    id: "seed_ielts_output_error_loop",
    title: "Run one IELTS output and error-attribution loop",
    track: "ielts",
    status: "active",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail",
    notes:
      "Produce one raw answer or recording, estimate score, and log the exact error cause and fix."
  },
  {
    id: "seed_philosophy_argument_map",
    title: "Create the first philosophy argument map",
    track: "philosophy",
    status: "active",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://plato.stanford.edu/",
    notes:
      "Pick one SEP entry or lecture and extract thesis, premises, inference, strongest objection, and work relevance."
  },
  {
    id: "seed_philosophy_ai_ethics_memo",
    title: "Draft an AI ethics memo for autonomous validation",
    track: "philosophy",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://plato.stanford.edu/entries/ethics-ai/",
    notes:
      "Connect autonomy, responsibility, opacity, fairness, and safety to one validation or failcase decision."
  },
  {
    id: "seed_philosophy_reading_ladder",
    title: "Use the philosophy reading ladder on one concept",
    track: "philosophy",
    status: "active",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://plato.stanford.edu/",
    notes:
      "Pick logic, epistemology, philosophy of science, ethics, mind, or AI ethics and write thesis, premises, objection, and validation connection."
  },
  {
    id: "seed_work_weekly_validation_digest",
    title: "Create this week's validation digest shell",
    track: "work-validation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://github.com/77zmf/PIX-Simulation-Validation-Platform",
    notes:
      "Summarize run results, KPI gates, failcases, issue closures, and next owner actions in one weekly note."
  }
];

export function modulesForTrack(track: TrackId) {
  return knowledgeModules.filter((module) => module.track === track);
}
