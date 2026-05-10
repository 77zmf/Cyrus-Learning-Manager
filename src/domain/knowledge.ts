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

export interface DeepStudyPracticeQuestion {
  prompt: string;
  answer: string;
}

export interface DeepStudyFormulaChoice {
  label: string;
  value: string;
  isCorrect: boolean;
  feedback: string;
}

export interface DeepStudyFormulaCheck {
  prompt: string;
  choices: DeepStudyFormulaChoice[];
}

export interface DeepStudyGoodNotesCheck {
  prompt: string;
  expected: string;
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
  practiceQuestions: DeepStudyPracticeQuestion[];
  formulaCheck: DeepStudyFormulaCheck;
  goodNotesCheck: DeepStudyGoodNotesCheck;
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
    practiceQuestions: [
      {
        prompt: "状态空间里的状态是什么？",
        answer: "答案：状态就是一列变量，用来描述系统现在在哪里、速度多快、误差多大。"
      },
      {
        prompt: "A 和 B 为什么要分开看？",
        answer: "答案：A 描述系统自己怎么变，B 描述控制输入从哪里进入系统。"
      },
      {
        prompt: "为什么先用二维小车例子？",
        answer: "答案：二维例子只保留位置和速度，足够看清矩阵如何表达影响关系。"
      }
    ],
    formulaCheck: {
      prompt: "哪个公式是状态空间的最小入口？",
      choices: [
        {
          label: "A",
          value: "rank(C)=n",
          isCorrect: false,
          feedback: "还不对：rank(C)=n 是可控性检查，不是状态空间模型本体。"
        },
        {
          label: "B",
          value: "x_dot = Ax + Bu",
          isCorrect: true,
          feedback: "正确：状态空间入口就是状态变化率由系统矩阵和控制输入共同决定。"
        },
        {
          label: "C",
          value: "p(z_{t+1}|z_t,a_t)",
          isCorrect: false,
          feedback: "还不对：这是世界模型的 latent dynamics，不是线性状态空间入口。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page M001 写完了吗？",
      expected: "已记录：Page M001 应包含状态列向量、A/B 含义、二维小车例子。"
    },
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
    practiceQuestions: [
      {
        prompt: "微分方程最朴素的意思是什么？",
        answer: "答案：它说明一个量现在变化得多快，以及这个变化速度由哪些量决定。"
      },
      {
        prompt: "为什么 a 小于 0 会收敛？",
        answer: "答案：变化方向会把状态往 0 拉，离 0 越远，往回拉的量越明显。"
      },
      {
        prompt: "矩阵 A 和特征值有什么关系？",
        answer: "答案：矩阵 A 的特征值描述不同模态是衰减、保持还是发散。"
      }
    ],
    formulaCheck: {
      prompt: "哪个公式最适合用来理解一阶稳定性？",
      choices: [
        {
          label: "A",
          value: "x_dot = ax",
          isCorrect: true,
          feedback: "正确：先看一维 x_dot = ax，才能理解多维 A 的特征值。"
        },
        {
          label: "B",
          value: "C=[B AB ...]",
          isCorrect: false,
          feedback: "还不对：这是可控性矩阵，不是稳定性的最小入口。"
        },
        {
          label: "C",
          value: "s u = K[R|t]X",
          isCorrect: false,
          feedback: "还不对：这是相机投影，属于空间模型。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page M002 写完了吗？",
      expected: "已记录：Page M002 应包含一维收敛/发散序列、x_dot = ax、e^{At} 直觉。"
    },
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
    practiceQuestions: [
      {
        prompt: "可控性先问什么？",
        answer: "答案：先问输入能不能通过直接影响和系统传播影响到全部状态方向。"
      },
      {
        prompt: "可观性先问什么？",
        answer: "答案：先问输出看到的信息够不够反推出内部状态。"
      },
      {
        prompt: "rank 为什么会出现？",
        answer: "答案：rank 用来数独立方向，方向够多才可能覆盖全部状态。"
      }
    ],
    formulaCheck: {
      prompt: "哪个判断表示线性系统可控方向够多？",
      choices: [
        {
          label: "A",
          value: "rank(C)=n",
          isCorrect: true,
          feedback: "正确：rank(C)=n 表示可控性矩阵提供了 n 个独立状态方向。"
        },
        {
          label: "B",
          value: "rank(C)<n",
          isCorrect: false,
          feedback: "还不对：rank(C)<n 表示至少一个方向不可控。"
        },
        {
          label: "C",
          value: "x_dot = ax",
          isCorrect: false,
          feedback: "还不对：这是稳定性的一维入口，不是 rank test 结论。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page M003 写完了吗？",
      expected: "已记录：Page M003 应包含状态图、C=[B AB ...]、rank(C)=n 和 rank(C)<n 的区别。"
    },
    sources: [
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      }
    ]
  },
  {
    id: "deep-3blue1brown-linear-algebra-frames",
    track: "3blue1brown",
    title: "3Blue1Brown 线性代数到坐标变换",
    layer: "数学直觉 -> 自动驾驶坐标系",
    beginnerBridge:
      "先把矩阵看成空间变换，再把 Autoware 里的 map、base_link、lidar、camera 看成不同坐标语言。",
    coreIdeas: [
      "向量可以表示位置、速度和误差，不只是数字列表。",
      "基向量决定坐标语言；换基就是换一种方式描述同一个空间对象。",
      "矩阵乘法可以理解为连续执行多个坐标变换，顺序不能随便交换。"
    ],
    derivationEntry: "从一个 2D 点开始，写旋转矩阵、平移向量和两次变换的组合顺序。",
    practice: "用 3Blue1Brown 的线性代数直觉解释一条 lidar 点从 sensor frame 到 base_link 的路径。",
    goodNotes: "GoodNotes: Page 3B1B-M001",
    obsidian: "Obsidian: 3Blue1Brown -> Week 1 - Linear Algebra",
    notion: "Notion: Track=3Blue1Brown, evidence=Page 3B1B-M001, next=matrix as transform",
    practiceQuestions: [
      {
        prompt: "为什么矩阵不只是数字表格？",
        answer: "答案：矩阵可以表示空间如何被旋转、缩放、投影或组合变换。"
      },
      {
        prompt: "自动驾驶里基变换对应什么？",
        answer: "答案：它对应 map、base_link、lidar、camera 等坐标系之间的表达切换。"
      },
      {
        prompt: "为什么变换顺序重要？",
        answer: "答案：先旋转再平移和先平移再旋转得到的空间位置通常不同。"
      }
    ],
    formulaCheck: {
      prompt: "哪个表达最接近连续坐标变换？",
      choices: [
        {
          label: "A",
          value: "T_map_base T_base_lidar p_lidar",
          isCorrect: true,
          feedback: "正确：点先从 lidar 到 base，再从 base 到 map，顺序表达了变换链。"
        },
        {
          label: "B",
          value: "x_dot = ax",
          isCorrect: false,
          feedback: "还不对：这是动态系统的一阶变化率入口。"
        },
        {
          label: "C",
          value: "p(z_{t+1}|z_t,a_t)",
          isCorrect: false,
          feedback: "还不对：这是世界模型的 latent dynamics。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page 3B1B-M001 写完了吗？",
      expected:
        "已记录：Page 3B1B-M001 应包含向量、基、矩阵变换、TF frame 链和一个 2D 旋转例子。"
    },
    sources: [
      {
        title: "3Blue1Brown official site",
        url: "https://www.3blue1brown.com/"
      },
      {
        title: "Essence of Linear Algebra playlist",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
      },
      {
        title: "3Blue1Brown Bilibili official space",
        url: "https://space.bilibili.com/88461692"
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
    practiceQuestions: [
      {
        prompt: "LQR 主要在权衡什么？",
        answer: "答案：它权衡状态误差和控制力度，也就是 Q 与 R 的取舍。"
      },
      {
        prompt: "Kalman Filter 解决什么冲突？",
        answer: "答案：它解决模型预测和传感器观测不一致时该信谁的问题。"
      },
      {
        prompt: "MPC 为什么适合工程约束？",
        answer: "答案：它能把速度、转角、加速度等限制直接放进未来窗口优化。"
      }
    ],
    formulaCheck: {
      prompt: "哪个公式最像状态反馈控制律？",
      choices: [
        {
          label: "A",
          value: "u=-Kx",
          isCorrect: true,
          feedback: "正确：u=-Kx 表示根据当前状态直接生成控制输入。"
        },
        {
          label: "B",
          value: "y=Cx",
          isCorrect: false,
          feedback: "还不对：y=Cx 是输出方程，重点是观测。"
        },
        {
          label: "C",
          value: "e^{At}",
          isCorrect: false,
          feedback: "还不对：e^{At} 是状态传播器，不是控制律。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page C010 写完了吗？",
      expected: "已记录：Page C010 应包含 LQR 的 Q/R、Kalman 的预测更新、MPC 的约束窗口。"
    },
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
    practiceQuestions: [
      {
        prompt: "鲁棒控制为什么要看最坏情况？",
        answer: "答案：因为真实模型会有误差，控制器必须在扰动和不确定性下仍然可用。"
      },
      {
        prompt: "非线性控制为什么常从线性化开始？",
        answer: "答案：线性化把复杂系统在工作点附近变成可分析的局部近似。"
      },
      {
        prompt: "随机控制比确定性控制多考虑什么？",
        answer: "答案：它把噪声、风险和未来不确定性放进决策过程。"
      }
    ],
    formulaCheck: {
      prompt: "哪个表达式最能代表真实非线性系统？",
      choices: [
        {
          label: "A",
          value: "x_dot=f(x,u)",
          isCorrect: true,
          feedback: "正确：x_dot=f(x,u) 是非线性系统的通用入口。"
        },
        {
          label: "B",
          value: "rank(C)=n",
          isCorrect: false,
          feedback: "还不对：这是可控性 rank test，不是非线性系统表达。"
        },
        {
          label: "C",
          value: "s u = K[R|t]X",
          isCorrect: false,
          feedback: "还不对：这是相机投影表达。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page G001 写完了吗？",
      expected: "已记录：Page G001 应包含鲁棒扰动、非线性工作点、随机不确定性三类 failure mode。"
    },
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
    practiceQuestions: [
      {
        prompt: "世界模型的最小直觉是什么？",
        answer: "答案：它是在模型内部预演动作之后世界可能怎么变化。"
      },
      {
        prompt: "z_t 和真实世界状态有什么关系？",
        answer: "答案：z_t 是压缩后的隐藏表示，不等于完整现实，但保留预测需要的信息。"
      },
      {
        prompt: "自动驾驶世界模型最怕什么？",
        answer: "答案：最怕遮挡、长尾行为和分布外场景导致 imagined rollout 偏掉。"
      }
    ],
    formulaCheck: {
      prompt: "哪个表达式是 latent dynamics 的核心？",
      choices: [
        {
          label: "A",
          value: "p(z_{t+1}|z_t,a_t)",
          isCorrect: true,
          feedback: "正确：它描述当前 latent state 和动作如何预测下一步 latent state。"
        },
        {
          label: "B",
          value: "u=-Kx",
          isCorrect: false,
          feedback: "还不对：这是状态反馈控制律。"
        },
        {
          label: "C",
          value: "rank(C)=n",
          isCorrect: false,
          feedback: "还不对：这是可控性条件。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page W001 写完了吗？",
      expected: "已记录：Page W001 应包含 z_t、a_t、z_{t+1}、imagined rollout 和三个失败模式。"
    },
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
    practiceQuestions: [
      {
        prompt: "空间模型先回答什么问题？",
        answer: "答案：先回答东西在哪里，以及这个表示能不能被 planner 使用。"
      },
      {
        prompt: "BEV 为什么常用于自动驾驶？",
        answer: "答案：BEV 把多视角信息整理成鸟瞰平面，更接近规划控制需要的坐标。"
      },
      {
        prompt: "occupancy 比检测框多关心什么？",
        answer: "答案：occupancy 关心空间是否被占用，更接近可通行性和碰撞风险。"
      }
    ],
    formulaCheck: {
      prompt: "哪个表达式是相机投影入口？",
      choices: [
        {
          label: "A",
          value: "s u = K[R|t]X",
          isCorrect: true,
          feedback: "正确：它把三维点通过内参和外参投到图像或相关空间表示。"
        },
        {
          label: "B",
          value: "x_dot = ax",
          isCorrect: false,
          feedback: "还不对：这是一维动态系统。"
        },
        {
          label: "C",
          value: "u=-Kx",
          isCorrect: false,
          feedback: "还不对：这是控制律，不是相机几何。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page S001 写完了吗？",
      expected: "已记录：Page S001 应包含相机投影、BEV grid、occupancy value 三张图。"
    },
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
    practiceQuestions: [
      {
        prompt: "读论文第一步抓什么？",
        answer: "答案：先抓作者定义的问题，不要从摘要一路抄到结论。"
      },
      {
        prompt: "为什么要写 assumption？",
        answer: "答案：假设决定论文方法在哪些场景成立，也决定复现失败时该查哪里。"
      },
      {
        prompt: "什么叫 reproduction hook？",
        answer: "答案：就是能用最小场景、指标或可视化复现论文关键结论的入口。"
      }
    ],
    formulaCheck: {
      prompt: "论文卡最小顺序应该是什么？",
      choices: [
        {
          label: "A",
          value: "problem -> assumption -> formula -> reproduction",
          isCorrect: true,
          feedback: "正确：先定问题和假设，再看核心公式，最后落到最小复现。"
        },
        {
          label: "B",
          value: "formula -> abstract -> title -> conclusion",
          isCorrect: false,
          feedback: "还不对：这种顺序容易只抄公式，丢掉问题和假设。"
        },
        {
          label: "C",
          value: "source -> citation -> bookmark -> archive",
          isCorrect: false,
          feedback: "还不对：这只是资料管理，不是论文理解。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page P001 写完了吗？",
      expected: "已记录：Page P001 应包含 problem、assumption、one formula、minimal reproduction hook。"
    },
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
  },
  {
    id: "deep-ielts-output-error-attribution",
    track: "ielts",
    title: "IELTS 输出到错误归因",
    layer: "语言输出 -> 评分证据",
    beginnerBridge:
      "不要先背一堆模板。先产出一段真实答案，再用评分标准找出一个最具体的弱点：词汇、语法、连贯、任务回应或发音。",
    coreIdeas: [
      "Raw output 是原始证据，不能只写“今天练了口语”。",
      "Band descriptor 是评分语言，帮你把感觉差变成可修正的问题。",
      "Error cause 要写成下一次能修的动作，例如 tense drift、topic support weak、linking overuse。"
    ],
    derivationEntry: "raw answer -> rubric check -> error cause -> better version -> next drill",
    practice: "写一段 Task 2 body paragraph 或录一段 Part 2 answer，只改一个最高价值错误。",
    goodNotes: "GoodNotes: Page I001",
    obsidian: "Obsidian: IELTS -> Error Attribution",
    notion: "Notion: Track=IELTS, Resource Type=Error Log, Evidence=raw answer + correction",
    practiceQuestions: [
      {
        prompt: "为什么先产出再纠错？",
        answer: "答案：真实输出暴露的是你当前会犯的错误，比空背模板更能形成可复盘证据。"
      },
      {
        prompt: "错误归因要具体到什么程度？",
        answer: "答案：要具体到下一次能练的动作，例如 topic sentence 太弱，而不是笼统写“写作不好”。"
      },
      {
        prompt: "Notion 应该记录什么？",
        answer: "答案：记录模块、原始答案、估分、错误类型、原因、修正版和下一次 drill。"
      }
    ],
    formulaCheck: {
      prompt: "IELTS 输出复盘的最小链路是什么？",
      choices: [
        {
          label: "A",
          value: "raw output -> rubric -> error cause -> correction",
          isCorrect: true,
          feedback: "正确：这条链路把语言练习变成可复盘证据。"
        },
        {
          label: "B",
          value: "template -> memorization -> next template",
          isCorrect: false,
          feedback: "还不对：只背模板很容易绕开真实输出问题。"
        },
        {
          label: "C",
          value: "video -> bookmark -> done",
          isCorrect: false,
          feedback: "还不对：收藏材料不等于形成输出证据。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page I001 写完了吗？",
      expected: "已记录：Page I001 应包含 raw output、rubric phrase、error cause、better version。"
    },
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
    id: "deep-philosophy-argument-engineering-judgment",
    track: "philosophy",
    title: "哲学论证到工程判断",
    layer: "论证结构 -> 证据质量",
    beginnerBridge:
      "哲学不是背名词。你先练四件事：一句 thesis，两条 premises，一个 objection，一个 response。这个结构能反过来帮助你判断工程证据够不够。",
    coreIdeas: [
      "Thesis 是你要主张的结论，premise 是支持它的理由。",
      "Objection 不是反对自己，而是提前找出论证最脆弱的地方。",
      "工程判断里也有论证：为什么这个证据能支持 close issue、release 或继续测试。"
    ],
    derivationEntry: "thesis -> premise 1 -> premise 2 -> objection -> response -> engineering decision",
    practice: "选一篇 SEP 条目或 AI ethics 片段，写一张 argument map，再连接到一个验证决策。",
    goodNotes: "GoodNotes: Page PH001",
    obsidian: "Obsidian: Philosophy -> Argument Map",
    notion: "Notion: Philosophy Reading Tracker, purpose=argument clarity and technology judgment",
    practiceQuestions: [
      {
        prompt: "为什么 objection 很重要？",
        answer: "答案：它帮你提前看到论证最弱处，避免只收集支持自己观点的证据。"
      },
      {
        prompt: "哲学和工程验证怎么连接？",
        answer: "答案：工程验证也需要判断证据是否足够支持一个结论，例如问题是否真的关闭。"
      },
      {
        prompt: "一张 argument map 最少要有什么？",
        answer: "答案：至少要有 thesis、premises、objection、response 和一个实际判断。"
      }
    ],
    formulaCheck: {
      prompt: "最小论证地图的结构是什么？",
      choices: [
        {
          label: "A",
          value: "thesis -> premises -> objection -> response",
          isCorrect: true,
          feedback: "正确：这能把抽象阅读变成可检查的推理结构。"
        },
        {
          label: "B",
          value: "quote -> quote -> quote",
          isCorrect: false,
          feedback: "还不对：只摘抄没有暴露推理关系。"
        },
        {
          label: "C",
          value: "author -> year -> archive",
          isCorrect: false,
          feedback: "还不对：这是文献管理，不是论证理解。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page PH001 写完了吗？",
      expected: "已记录：Page PH001 应包含 thesis、premises、objection、response、engineering decision。"
    },
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
        title: "Philosophy Reading Tracker",
        url: "https://www.notion.so/350ef7e6aaa98185a4f6fe93fe6b8b32"
      }
    ]
  },
  {
    id: "deep-slam-state-estimation-map",
    track: "world-spatial-models",
    title: "SLAM 从定位到建图",
    layer: "Pose -> observation -> map",
    beginnerBridge:
      "SLAM 先不用想成一个大黑箱。它只是在同时回答两个问题：我在哪里，我看到的世界地图长什么样。",
    coreIdeas: [
      "状态不是只有 x，而是一串位姿 T_1, T_2, ...；每个 T 都包含位置和朝向。",
      "观测可以是图像特征、深度点、LiDAR 点云或 IMU 约束；它们都在给位姿和地图加约束。",
      "后端优化不是玄学，就是让预测观测和真实观测的误差整体变小。"
    ],
    derivationEntry:
      "Start with T_{w<-c}, projection s u = K[R|t]X, then write reprojection error u_ij - pi(T_i X_j).",
    practice:
      "在 GoodNotes 画三层图：pose 节点、landmark 点、observation 边；再写一个重投影误差。",
    goodNotes: "GoodNotes: Page SLAM-001/003",
    obsidian: "Obsidian: World-Spatial -> SLAM -> State Estimation",
    notion: "Notion: Track=World & Spatial Models, Evidence=GoodNotes SLAM-001/003",
    practiceQuestions: [
      {
        prompt: "SLAM 的两个核心问题是什么？",
        answer: "答案：同时估计自己在哪里，以及周围地图是什么。"
      },
      {
        prompt: "为什么位姿比普通位置多一个朝向？",
        answer: "答案：相机或车不仅有位置，还要知道朝哪个方向看；投影和运动都依赖朝向。"
      },
      {
        prompt: "后端优化为什么要最小化误差？",
        answer: "答案：因为单次观测有噪声，整体优化能让所有约束尽量一致，减少漂移。"
      }
    ],
    formulaCheck: {
      prompt: "哪个对象最像视觉 SLAM 的核心误差？",
      choices: [
        {
          label: "A",
          value: "u_ij - pi(T_i X_j)",
          isCorrect: true,
          feedback: "正确：这是预测像素和真实观测像素之间的重投影误差。"
        },
        {
          label: "B",
          value: "daily plan",
          isCorrect: false,
          feedback: "还不对：SLAM 主线按对象和证据推进，不按每日计划推进。"
        },
        {
          label: "C",
          value: "rank(C)=n",
          isCorrect: false,
          feedback: "还不对：这是控制可控性，不是 SLAM 观测误差。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page SLAM-001/003 写完了吗？",
      expected:
        "已记录：Page SLAM-001/003 应包含 pose、landmark、observation、projection、reprojection error、loop closure。"
    },
    sources: [
      {
        title: "A Tutorial Approach to Simultaneous Localization and Mapping",
        url: "https://dspace.mit.edu/bitstream/handle/1721.1/36832/16-412JSpring2004/NR/rdonlyres/Aeronautics-and-Astronautics/16-412JSpring2004/A3C5517F-C092-4554-AA43-232DC74609B3/0/1Aslam_blas_report.pdf"
      },
      {
        title: "ORB-SLAM3",
        url: "https://arxiv.org/abs/2007.11898"
      },
      {
        title: "TUM RGB-D SLAM Dataset",
        url: "https://cvg.cit.tum.de/data/datasets/rgbd-dataset"
      }
    ]
  },
  {
    id: "deep-sfm-mvs-colmap-reconstruction",
    track: "world-spatial-models",
    title: "SfM / MVS / COLMAP 重建实验线",
    layer: "Images -> cameras -> sparse points -> dense geometry",
    beginnerBridge:
      "三维重建先看成一条流水线：照片进来，先恢复相机位姿和稀疏点，再补密集几何，最后才考虑 NeRF 或 3DGS。",
    coreIdeas: [
      "SfM 解决相机在哪里、稀疏三维点在哪里；MVS 在已知相机的基础上补密集表面。",
      "COLMAP 是从真实图像到相机位姿、稀疏点云、稠密点云的标准练习工具。",
      "NeRF/3DGS 通常需要相机位姿输入，但它们的输出偏可渲染，不自动等于 CARLA 可碰撞资产。"
    ],
    derivationEntry:
      "Use epipolar constraint x_2^T F x_1=0, then BA min sum ||u_ij - pi(T_i X_j)||^2.",
    practice:
      "画 Images -> Feature Matching -> SfM -> Sparse Cloud -> MVS -> NeRF/3DGS -> Validation Asset，并标出每一步产物。",
    goodNotes: "GoodNotes: Page SLAM-002/004",
    obsidian: "Obsidian: World-Spatial -> Reconstruction -> COLMAP Lab",
    notion: "Notion: Track=World & Spatial Models, Evidence=GoodNotes SLAM-002/004",
    practiceQuestions: [
      {
        prompt: "SfM 先产出什么？",
        answer: "答案：相机位姿和稀疏三维点。"
      },
      {
        prompt: "MVS 和 SfM 的关系是什么？",
        answer: "答案：MVS 通常在已知相机位姿后，进一步恢复更密的几何表面。"
      },
      {
        prompt: "NeRF/3DGS 为什么不等于 CARLA 资产？",
        answer: "答案：它们主要解决可渲染外观，物理碰撞、语义、车道拓扑和 OpenDRIVE 还要另外建模。"
      }
    ],
    formulaCheck: {
      prompt: "哪个流程顺序最像 COLMAP 到神经重建？",
      choices: [
        {
          label: "A",
          value: "images -> SfM poses -> MVS/dense -> NeRF or 3DGS",
          isCorrect: true,
          feedback: "正确：相机位姿是后续稠密重建和神经渲染的重要前置。"
        },
        {
          label: "B",
          value: "NeRF -> no camera poses -> stable CARLA",
          isCorrect: false,
          feedback: "还不对：NeRF 通常需要相机位姿，而且不自动形成稳定 CARLA 物理资产。"
        },
        {
          label: "C",
          value: "IELTS rubric -> point cloud",
          isCorrect: false,
          feedback: "还不对：这是完全不同的学习线。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page SLAM-002/004 写完了吗？",
      expected:
        "已记录：Page SLAM-002/004 应包含 epipolar geometry、COLMAP pipeline、NeRF/3DGS rendering、validation asset boundary。"
    },
    sources: [
      {
        title: "COLMAP",
        url: "https://colmap.org/"
      },
      {
        title: "Stanford CS231A",
        url: "https://web.stanford.edu/class/cs231a/"
      },
      {
        title: "NeRF project",
        url: "https://www.matthewtancik.com/nerf"
      },
      {
        title: "3D Gaussian Splatting",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
      }
    ]
  },
  {
    id: "deep-reconstruction-slam-handoff",
    track: "work-validation",
    title: "重建 SLAM 技术栈到验证资产",
    layer: "Reconstruction -> stable validation asset",
    beginnerBridge:
      "把重建线先看成“资产生产线”，不是直接控制车辆的实时系统。它产出轨迹、点云、pose prior、对齐诊断，稳定验证线再决定能不能拿来跑 CARLA 或地图刷新。",
    coreIdeas: [
      "SLAM producer 输出 trajectory、GlobalMap.pcdrgb、pose_prior_manifest 和 alignment diagnostics。",
      "CARLA import 需要 mesh + OpenDRIVE + collision proxy，Gaussian/NeRF/3DGS 主要是视觉研究层。",
      "稳定线、shadow 线和 reconstruction 线要分开记录，避免研究资产误写成已验证主线能力。"
    ],
    derivationEntry:
      "H_slam = {T_map<-base(t), GlobalMap.pcdrgb, pose_prior_manifest, alignment_diagnostics}",
    practice:
      "从 Notion 新页面抽一条 SLAM 产物，写清 producer、artifact、metric、consumer 和是否能进入 stable validation。",
    goodNotes: "GoodNotes: Page R001",
    obsidian: "Obsidian: PIX Simulation Validation -> Reconstruction SLAM",
    notion: "Notion: Detailed stack and reconstruction SLAM line",
    practiceQuestions: [
      {
        prompt: "为什么 SLAM 线不是稳定实时控制线？",
        answer: "答案：它当前是离线资产生产者，给地图刷新、重建或 CARLA 资产提供证据，不直接接管生产控制。"
      },
      {
        prompt: "CARLA 导入最少要看哪三类对象？",
        answer: "答案：mesh / FBX / OBJ，OpenDRIVE / XODR，以及 collision proxy。"
      },
      {
        prompt: "pose prior 最常见的消费者是谁？",
        answer: "答案：重建、地图对齐、CARLA 资产检查或后续定位验证流程。"
      }
    ],
    formulaCheck: {
      prompt: "重建 SLAM handoff 最关键的证据包是什么？",
      choices: [
        {
          label: "A",
          value: "trajectory + GlobalMap + alignment diagnostics",
          isCorrect: true,
          feedback: "正确：这些对象能说明 SLAM 是否产出可复用的验证资产。"
        },
        {
          label: "B",
          value: "only a nice screenshot",
          isCorrect: false,
          feedback: "还不对：截图不能替代 trajectory、map 和对齐指标。"
        },
        {
          label: "C",
          value: "daily study plan",
          isCorrect: false,
          feedback: "还不对：你要的是可验证资产链，不是日历式计划。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "GoodNotes: Page R001 写完了吗？",
      expected:
        "已记录：GoodNotes: Page R001 应包含 producer、artifact、metric、consumer、stable/shadow/reconstruction 边界。"
    },
    sources: [
      {
        title: "Detailed stack and reconstruction SLAM line",
        url: "https://www.notion.so/35cef7e6aaa981d09be6ffd935e7c748"
      },
      {
        title: "PIX Simulation Validation Platform",
        url: "https://github.com/77zmf/PIX-Simulation-Validation-Platform"
      }
    ]
  },
  {
    id: "deep-mit-6006-simctl-data-structures",
    track: "mit-eecs",
    title: "MIT 6.006 到 simctl 数据结构",
    layer: "Algorithms -> validation control plane",
    beginnerBridge:
      "算法课不要只做题。把数组、哈希表、堆、图、BFS/DFS、最短路都连接到 simctl 的 manifest、scenario index、run_result 和 digest 生成。",
    coreIdeas: [
      "哈希表适合从 scenario id、run id、asset hash 快速找到证据。",
      "图适合表示 scenario -> asset -> run -> KPI -> report 的依赖链。",
      "优先队列适合把高风险 failcase、blocked owner 或 next review 排到前面。"
    ],
    derivationEntry: "scenario graph G=(V,E), V={asset, scenario, run_result, kpi_gate, report}",
    practice: "用一个小字典和一张依赖图解释 simctl 为什么要标准化 manifest 和 run_result。",
    goodNotes: "GoodNotes: Page MIT-A001",
    obsidian: "Obsidian: MIT EECS -> 6.006 -> simctl data structures",
    notion: "Notion: Track=MIT EECS, Evidence=Page MIT-A001, next=one executable data-structure exercise",
    practiceQuestions: [
      {
        prompt: "为什么 run id 适合放进哈希表？",
        answer: "答案：因为你经常需要用一个 id 快速找到对应 run_result、report 或 evidence。"
      },
      {
        prompt: "为什么 scenario 到 report 像图？",
        answer: "答案：它由多个对象和依赖边组成，能追踪资产、运行、KPI 和报告之间的关系。"
      },
      {
        prompt: "MIT 6.006 学完要落到什么产物？",
        answer: "答案：至少落到一个可执行的小数据结构例子，并连接到 Cyrus 或 simctl 对象。"
      }
    ],
    formulaCheck: {
      prompt: "哪个结构最适合表达 scenario -> run_result -> KPI gate？",
      choices: [
        {
          label: "A",
          value: "directed graph",
          isCorrect: true,
          feedback: "正确：依赖关系天然是有方向的图。"
        },
        {
          label: "B",
          value: "single string",
          isCorrect: false,
          feedback: "还不对：单个字符串无法表达对象之间的依赖边。"
        },
        {
          label: "C",
          value: "random checklist only",
          isCorrect: false,
          feedback: "还不对：清单可以辅助，但核心依赖关系需要结构化。"
        }
      ]
    },
    goodNotesCheck: {
      prompt: "Page MIT-A001 写完了吗？",
      expected: "已记录：Page MIT-A001 应包含 hash map、graph、priority queue 和 simctl evidence chain。"
    },
    sources: [
      {
        title: "MIT 6.006 Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"
      },
      {
        title: "PIX Simulation Validation Platform",
        url: "https://github.com/77zmf/PIX-Simulation-Validation-Platform"
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
    id: "3blue1brown-autonomous-driving-math-intuition",
    track: "3blue1brown",
    title: "3Blue1Brown autonomous-driving math intuition",
    stage: "Visual math bridge",
    focus:
      "Use 3Blue1Brown to convert linear algebra, calculus, differential equations, neural networks, probability, and geometry into autonomous-driving engineering intuition.",
    outputs: [
      "one video note with plain-language intuition",
      "one Autoware/CARLA/simctl engineering connection",
      "one minimal Python, diagram, log, or formula experiment"
    ],
    sources: [
      {
        title: "3Blue1Brown official site",
        url: "https://www.3blue1brown.com/"
      },
      {
        title: "3Blue1Brown YouTube playlists",
        url: "https://www.youtube.com/c/3blue1brown/playlists"
      },
      {
        title: "3Blue1Brown Bilibili official space",
        url: "https://space.bilibili.com/88461692"
      }
    ]
  },
  {
    id: "3blue1brown-linear-algebra-week",
    track: "3blue1brown",
    title: "3Blue1Brown first week: linear algebra",
    stage: "P0 math foundation",
    focus:
      "Start with vectors, basis, matrices as transformations, composition, determinants, inverse matrices, and solvability, then map each concept to coordinate frames and point-cloud transforms.",
    outputs: [
      "one vector intuition note tied to position, velocity, and error",
      "one coordinate-frame note for map/base_link/lidar/camera",
      "one 2D transform mini experiment"
    ],
    sources: [
      {
        title: "Essence of Linear Algebra playlist",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
      },
      {
        title: "3Blue1Brown Linear Algebra topic",
        url: "https://www.3blue1brown.com/?topic=linear-algebra"
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
    id: "slam-zero-to-map",
    track: "world-spatial-models",
    title: "SLAM zero-to-map first line",
    stage: "Beginner SLAM spine",
    focus:
      "Build SLAM from zero: coordinate frames, camera projection, feature matching, visual odometry, backend optimization, loop closure, VIO, LiDAR SLAM, and validation asset handoff.",
    outputs: [
      "one GoodNotes page for pose and projection",
      "one GoodNotes page for BA or pose graph optimization",
      "one Obsidian concept chain from SLAM output to validation artifact"
    ],
    sources: [
      {
        title: "A Tutorial Approach to Simultaneous Localization and Mapping",
        url: "https://dspace.mit.edu/bitstream/handle/1721.1/36832/16-412JSpring2004/NR/rdonlyres/Aeronautics-and-Astronautics/16-412JSpring2004/A3C5517F-C092-4554-AA43-232DC74609B3/0/1Aslam_blas_report.pdf"
      },
      {
        title: "ORB-SLAM3",
        url: "https://arxiv.org/abs/2007.11898"
      },
      {
        title: "TUM RGB-D SLAM Dataset",
        url: "https://cvg.cit.tum.de/data/datasets/rgbd-dataset"
      }
    ]
  },
  {
    id: "sfm-mvs-colmap-lab",
    track: "world-spatial-models",
    title: "SfM, MVS, and COLMAP reconstruction lab",
    stage: "Photogrammetry to reconstruction",
    focus:
      "Use COLMAP as the concrete lab for feature extraction, matching, incremental SfM, bundle adjustment, sparse reconstruction, dense MVS, and camera-pose export.",
    outputs: [
      "one COLMAP pipeline card from images to sparse and dense output",
      "one epipolar geometry and triangulation formula page",
      "one asset-readiness checklist for point cloud, mesh, scale, and alignment"
    ],
    sources: [
      {
        title: "COLMAP",
        url: "https://colmap.org/"
      },
      {
        title: "Stanford CS231A",
        url: "https://web.stanford.edu/class/cs231a/"
      },
      {
        title: "Open3D documentation",
        url: "https://www.open3d.org/docs/latest/"
      }
    ]
  },
  {
    id: "nerf-3dgs-validation-assets",
    track: "world-spatial-models",
    title: "NeRF and 3DGS validation asset bridge",
    stage: "Neural reconstruction to validation boundary",
    focus:
      "Learn NeRF volume rendering, 3D Gaussian Splatting, pose requirements, dynamic-object limits, and the boundary between renderable scene assets and CARLA/Autoware validation assets.",
    outputs: [
      "one NeRF rendering equation page",
      "one 3DGS Gaussian projection page",
      "one stable-vs-reconstruction boundary note for CARLA assets"
    ],
    sources: [
      {
        title: "NeRF project",
        url: "https://www.matthewtancik.com/nerf"
      },
      {
        title: "3D Gaussian Splatting",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
      },
      {
        title: "COLMAP",
        url: "https://colmap.org/"
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
    id: "seed_slam_zero_to_map",
    title: "Start SLAM zero-to-map with pose and projection",
    track: "world-spatial-models",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://arxiv.org/abs/2007.11898",
    notes:
      "Self-paced SLAM item: write T, camera projection, feature observation, reprojection error, and one pose-graph sketch."
  },
  {
    id: "seed_colmap_sfm_mvs_lab",
    title: "Build the COLMAP SfM/MVS reconstruction lab note",
    track: "world-spatial-models",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://colmap.org/",
    notes:
      "Write the pipeline: images, feature extraction, matching, incremental SfM, bundle adjustment, sparse cloud, dense MVS, and asset-readiness checks."
  },
  {
    id: "seed_nerf_3dgs_validation_asset",
    title: "Compare NeRF and 3DGS as validation assets",
    track: "world-spatial-models",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
    notes:
      "Derive one NeRF rendering equation, one 3DGS projection equation, then mark what is renderable, physical, semantic, and stable-validation ready."
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
    id: "seed_3blue1brown_linear_algebra_week",
    title: "Start 3Blue1Brown Week 1: linear algebra intuition",
    track: "3blue1brown",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
    notes:
      "Write the first video note: explain vector, basis, and matrix-as-transform intuition, then connect it to map/base_link/lidar/camera frames."
  },
  {
    id: "seed_3blue1brown_autonomous_math_route",
    title: "Use 3Blue1Brown as the autonomous-driving math bridge",
    track: "3blue1brown",
    status: "active",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://www.3blue1brown.com/",
    notes:
      "Pick one topic from linear algebra, calculus, differential equations, neural networks, probability, or geometry and leave a reusable engineering connection."
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
