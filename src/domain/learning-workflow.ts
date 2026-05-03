export interface ToolRole {
  tool: string;
  role: string;
  output: string;
}

export interface MindMapEntry {
  title: string;
  path: string;
  purpose: string;
}

export interface LearningLaunchItem {
  title: string;
  focus: string;
  prompt: string;
  goodNotes: string;
  obsidian: string;
  notion: string;
}

export interface GuidedLessonStep {
  label: string;
  instruction: string;
  output: string;
}

export interface GuidedLesson {
  title: string;
  goal: string;
  formula: string;
  now: string;
  goodNotesPage: string;
  obsidianNode: string;
  notionRow: string;
  steps: GuidedLessonStep[];
  selfCheck: string[];
}

export interface GoodNotesDerivationCard {
  title: string;
  formula: string;
  steps: string[];
  output: string;
}

export interface CanvasGraphNode {
  kind: string;
  title: string;
  detail: string;
}

export interface CanvasGraphEdge {
  title: string;
  from: string;
  to: string;
  action: string;
}

export interface NotionReviewView {
  name: string;
  filter: string;
  purpose: string;
}

export interface LibraryTrackRoute {
  title: string;
  tracks: string;
  output: string;
}

export interface SyncReadinessCheck {
  label: string;
  target: string;
  command: string;
}

export type LearningHandoffStatus = "active" | "blocked" | "done" | "mixed";

export interface HermesLearningPreset {
  id: string;
  buttonLabel: string;
  topic: string;
  scope: string;
  line: string;
  status: LearningHandoffStatus;
  evidence: string;
  blocker: string;
  owner: string;
  nextAction: string;
  verificationPath: string;
  rollback: string;
}

export const learningToolRoles: ToolRole[] = [
  {
    tool: "Web",
    role: "网页是主学习入口",
    output: "interactive checks, source links, feedback, and generated study summaries"
  },
  {
    tool: "GoodNotes",
    role: "GoodNotes is the handwritten derivation notebook",
    output: "公式推导, 错题重写, diagrams, and iPad-first problem solving"
  },
  {
    tool: "Obsidian",
    role: "Obsidian is the mind-map and concept-network layer",
    output: "Canvas maps linking 课程, 公式, 论文, 工程应用"
  },
  {
    tool: "Notion",
    role: "Notion is the structured review and index database",
    output: "status, mastery, next review, evidence, and resource queue tracking"
  }
];

export const goodNotesSections = [
  "公式推导",
  "错题重写",
  "工程直觉",
  "GoodNotes Summary",
  "下一题"
];

export const guidedControlLessons: GuidedLesson[] = [
  {
    title: "第 1 课：状态空间模型",
    goal: "把车辆状态写成 x_dot = Ax + Bu，并知道 A/B 分别控制什么。",
    formula: "\\dot{x}=Ax+Bu",
    now: "现在做：先在网页读公式，再在 GoodNotes 写 Page 001。",
    goodNotesPage: "GoodNotes Page 001：状态空间模型",
    obsidianNode: "Obsidian node：Control -> State Space Model",
    notionRow: "Notion row：Topic=State-space model, Mastery=2, Evidence=GoodNotes Page 001",
    steps: [
      {
        label: "Step 1",
        instruction: "在网页读公式 \\dot{x}=Ax+Bu。",
        output: "说清楚 x 是状态，u 是输入，A 是系统矩阵，B 是控制矩阵。"
      },
      {
        label: "Step 2",
        instruction: "在 GoodNotes 写 Page 001。",
        output: "写 definitions、主公式、一个车辆状态例子。"
      },
      {
        label: "Step 3",
        instruction: "把例子写成 \\dot{p}=v, \\dot{v}=a。",
        output: "确认 A 保留速度项，B 把输入送到加速度状态。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian Canvas 连到 Control -> State Space Model。",
        output: "补一个概念节点和一条关系边。"
      },
      {
        label: "Step 5",
        instruction: "在 Notion 记复习行。",
        output: "Topic=State-space model, Mastery=2, Evidence=GoodNotes Page 001。"
      }
    ],
    selfCheck: ["A 是系统矩阵", "B 是控制矩阵", "x_dot 是状态变化率"]
  },
  {
    title: "第 2 课：可控性 rank test",
    goal: "会算 C=[B AB ...]，并能解释 rank(C)<n 为什么不可控。",
    formula: "\\mathcal{C}=\\begin{bmatrix}B&AB&\\cdots&A^{n-1}B\\end{bmatrix},\\quad rank(\\mathcal{C})=n",
    now: "现在做：先完成下面 Interactive Tutor 的 3 个小题。",
    goodNotesPage: "GoodNotes Page 002：可控性",
    obsidianNode: "Obsidian node：Control -> Controllability",
    notionRow: "Notion row：Topic=Controllability, Mastery=2, Evidence=GoodNotes Page 002",
    steps: [
      {
        label: "Step 1",
        instruction: "先写出 B，再算 AB。",
        output: "不要先背结论，先看输入能不能被 A 传播到其他状态。"
      },
      {
        label: "Step 2",
        instruction: "把 \\mathcal{C}=[B\\ AB] 写成矩阵。",
        output: "对二阶系统检查两列是否线性无关。"
      },
      {
        label: "Step 3",
        instruction: "在 GoodNotes 写 Page 002。",
        output: "保留完整 rank 计算，不怕公式推导。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian Canvas 连到 Control -> Controllability。",
        output: "把 rank(C)<n 标成一个 failure mode。"
      },
      {
        label: "Step 5",
        instruction: "在 Notion 加一条 evidence。",
        output: "Evidence=GoodNotes Page 002，并把 Mastery 保持在 2，等你会独立算再升。"
      }
    ],
    selfCheck: ["可控性看输入能否影响全部状态", "rank(C)=n 是满秩", "rank(C)<n 说明至少一个方向不可控"]
  },
  {
    title: "第 3 课：稳定性与特征值",
    goal: "用特征值实部判断线性系统局部稳定性。",
    formula: "x(t)=e^{At}x(0),\\quad Re(\\lambda_i(A))<0",
    now: "现在做：在 GoodNotes 写两个一维系统的解。",
    goodNotesPage: "GoodNotes Page 003：稳定性与特征值",
    obsidianNode: "Obsidian node：Control -> Stability",
    notionRow: "Notion row：Topic=Stability eigenvalues, Mastery=1, Evidence=GoodNotes Page 003",
    steps: [
      {
        label: "Step 1",
        instruction: "写 \\dot{x}=\\lambda x 的解析解。",
        output: "得到 x(t)=e^{\\lambda t}x(0)。"
      },
      {
        label: "Step 2",
        instruction: "分别代入 \\lambda=-1 和 \\lambda=+1。",
        output: "看清一个收敛、一个发散。"
      },
      {
        label: "Step 3",
        instruction: "把一维直觉推广到矩阵 A。",
        output: "用 A 的特征值实部判断线性系统稳定性。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian Canvas 连到 Control -> Stability。",
        output: "把“实部大于 0 会发散”接到车辆不稳定直觉。"
      },
      {
        label: "Step 5",
        instruction: "在 Notion 把 Mastery 先设为 1。",
        output: "等你能解释 e^{At} 和 eigenvalue 关系后再升到 2。"
      }
    ],
    selfCheck: ["实部小于 0 收敛", "实部大于 0 发散", "e^{At} 是状态转移的核心对象"]
  }
];

export const learningLaunchQueue: LearningLaunchItem[] = [
  {
    title: "State-space controllability sprint",
    focus: "Use the web tutor to answer rank-test questions before touching notes.",
    prompt: "Explain A, B, AB, C=[B AB], and rank(C)<n in your own words.",
    goodNotes: "GoodNotes: 002 可控性",
    obsidian: "Obsidian: Control -> Controllability",
    notion: "Notion: Mastery = 2, Next Review = after one solved example"
  },
  {
    title: "World model loss sprint",
    focus: "Read one objective and separate representation, transition, and reward prediction.",
    prompt: "Write the latent dynamics factorization and one failure mode for imagined rollouts.",
    goodNotes: "GoodNotes: 021 World Models",
    obsidian: "Obsidian: World Model -> Latent Dynamics",
    notion: "Notion: Resource Type = Paper, Status = Active"
  },
  {
    title: "IELTS output correction sprint",
    focus: "Practice output first, then classify the error by rubric instead of time.",
    prompt: "Produce one paragraph or one speaking answer and tag the weakest band descriptor.",
    goodNotes: "GoodNotes: IELTS Error Log",
    obsidian: "Obsidian: IELTS -> Error Attribution",
    notion: "Notion: Evidence = raw answer + correction"
  }
];

export const goodNotesDerivationCards: GoodNotesDerivationCard[] = [
  {
    title: "State transition solution",
    formula: "\\dot{x}=Ax+Bu,\\quad x(t)=e^{At}x(0)+\\int_0^t e^{A(t-\\tau)}Bu(\\tau)d\\tau",
    steps: [
      "写出齐次解 x_h(t)=e^{At}x(0)",
      "用变参数法加入输入项",
      "标出每个矩阵维度和工程含义"
    ],
    output: "one GoodNotes page ending with a vehicle-state interpretation"
  },
  {
    title: "Controllability rank test",
    formula: "\\mathcal{C}=\\begin{bmatrix}B&AB&\\cdots&A^{n-1}B\\end{bmatrix},\\quad rank(\\mathcal{C})=n",
    steps: [
      "先算 B, AB, A^2B",
      "列出可控性矩阵",
      "用秩解释哪些状态无法被输入影响"
    ],
    output: "one solved example plus one unstable or under-actuated intuition"
  },
  {
    title: "LQR cost and Riccati equation",
    formula: "J=\\int_0^\\infty (x^TQx+u^TRu)dt,\\quad A^TP+PA-PBR^{-1}B^TP+Q=0",
    steps: [
      "定义 Q/R 惩罚的工程含义",
      "推到 u=-R^{-1}B^TPx",
      "连接到轨迹跟踪或横向控制"
    ],
    output: "one formula card and one control-parameter intuition note"
  }
];

export const mindMapEntries: MindMapEntry[] = [
  {
    title: "Learning System",
    path: "80_Canvas/Learning System.canvas",
    purpose: "课程 -> 公式 -> 论文 -> 工程应用"
  },
  {
    title: "Work Closure Loop",
    path: "80_Canvas/Work Closure Loop.canvas",
    purpose: "证据 -> 状态 -> 阻塞 -> owner -> next action"
  },
  {
    title: "Notion Obsidian Loop",
    path: "80_Canvas/Notion Obsidian Loop.canvas",
    purpose: "网页学习 -> GoodNotes -> Obsidian map -> Notion review"
  }
];

export const canvasGraphNodes: CanvasGraphNode[] = [
  {
    kind: "Course",
    title: "MIT 6.241J / Tsinghua Control",
    detail: "source lectures, assignments, and prerequisite structure"
  },
  {
    kind: "Formula",
    title: "State transition, controllability, LQR, Kalman, MPC",
    detail: "LaTeX derivations that must survive without multiple choice"
  },
  {
    kind: "Paper",
    title: "Kalman 1960, MPC survey, Dreamer, BEVFormer, 3DGS",
    detail: "problem, assumptions, objective, reproduction hook"
  },
  {
    kind: "Engineering Application",
    title: "Autoware, CARLA, KPI gates, failcase closure",
    detail: "where the idea changes a validation decision"
  }
];

export const canvasGraphEdges: CanvasGraphEdge[] = [
  {
    title: "Control formula -> GoodNotes derivation",
    from: "Formula",
    to: "GoodNotes",
    action: "Every formula node links to the exact handwritten page number."
  },
  {
    title: "Paper -> Engineering failure mode",
    from: "Paper",
    to: "Engineering Application",
    action: "Every paper card names one CARLA, Autoware, or validation hook."
  },
  {
    title: "Course -> Review queue",
    from: "Course",
    to: "Notion",
    action: "Every finished lecture creates one review row with mastery and evidence."
  }
];

export const notionLearningFields = [
  "Topic",
  "Track",
  "Resource Type",
  "Status",
  "Mastery",
  "Next Review",
  "Obsidian Link",
  "GoodNotes Page",
  "Paper or Video URL",
  "Evidence"
];

export const notionReviewViews: NotionReviewView[] = [
  {
    name: "Next Review Queue",
    filter: "Status != Done and Next Review is due",
    purpose: "Choose what to review when you want to study without a daily schedule."
  },
  {
    name: "Paper Queue",
    filter: "Resource Type = Paper",
    purpose: "Keep control, world-model, spatial-model, and autonomy papers in one reproducible queue."
  },
  {
    name: "Evidence Ledger",
    filter: "Evidence is not empty",
    purpose: "Show which topics have GoodNotes pages, Obsidian nodes, code, tests, or KPI evidence."
  }
];

export const libraryTrackRoutes: LibraryTrackRoute[] = [
  {
    title: "Control spine route",
    tracks: "Tsinghua Automation + MIT EECS",
    output: "state-space derivation, controllability example, LQR/Kalman/MPC card"
  },
  {
    title: "World and spatial route",
    tracks: "World & Spatial Models",
    output: "latent dynamics note, BEV/occupancy comparison, paper reproduction hook"
  },
  {
    title: "Output-first IELTS route",
    tracks: "IELTS",
    output: "raw answer, band-descriptor diagnosis, error-attribution note"
  },
  {
    title: "Argument-quality route",
    tracks: "Philosophy + Work Validation",
    output: "argument map, objection, evidence-quality decision memo"
  }
];

export const syncReadinessChecks: SyncReadinessCheck[] = [
  {
    label: "Vite page",
    target: "http://127.0.0.1:5173/Cyrus-Learning-Manager/",
    command: "npm run dev:web"
  },
  {
    label: "Local sync service",
    target: "http://127.0.0.1:8787/health",
    command: "npm run dev:sync"
  },
  {
    label: "Obsidian vault",
    target: "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge",
    command: "set OBSIDIAN_VAULT_PATH in .env.local when overriding the default"
  },
  {
    label: "Notion database",
    target: "Notion Learning Database",
    command: "set NOTION_TOKEN and NOTION_TASKS_DATABASE_ID in .env.local"
  }
];

export const hermesLearningPresets: HermesLearningPreset[] = [
  {
    id: "control-lesson",
    buttonLabel: "Use control lesson preset",
    topic: "Control lesson closeout",
    scope: "learning-plan",
    line: "learning",
    status: "active",
    evidence: "GoodNotes page and Obsidian node updated for the current control lesson",
    blocker: "not recorded",
    owner: "Cyrus",
    nextAction: "Ask one follow-up question and create one review row in Notion",
    verificationPath: "Explain the formula without looking at the multiple-choice options",
    rollback: "Keep the raw GoodNotes page even if the Obsidian node needs restructuring"
  },
  {
    id: "paper-card",
    buttonLabel: "Use paper card preset",
    topic: "Paper reproduction card",
    scope: "concept-reuse",
    line: "shadow",
    status: "active",
    evidence: "paper problem, assumptions, objective, and reproduction hook captured",
    blocker: "not recorded",
    owner: "Cyrus",
    nextAction: "Connect the paper to one CARLA, Autoware, or validation scenario",
    verificationPath: "One equation, one failure mode, one experiment hook",
    rollback: "Mark the paper optional if no validation hook exists"
  }
];
