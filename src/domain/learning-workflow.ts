import {
  controllabilityFormulaTerms,
  kalmanFormulaTerms,
  lqrFormulaTerms,
  lqgFormulaTerms,
  lyapunovFormulaTerms,
  mpcFormulaTerms,
  nonlinearFormulaTerms,
  observabilityFormulaTerms,
  robustFormulaTerms,
  stabilityFormulaTerms,
  stateFeedbackFormulaTerms,
  stateSpaceFormulaTerms,
  stateTransitionFormulaTerms,
  stochasticFormulaTerms,
  worldSpatialFormulaTerms
} from "./formula-visuals";
import type { FormulaTerm } from "./formula-visuals";

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

export interface BeginnerFoundation {
  title: string;
  plain: string;
  example: string;
  exercise: string;
  goodNotes: string;
}

export interface BeginnerLessonBridge {
  question: string;
  intuition: string;
  example: string;
  exercise: string;
  goodNotes: string;
}

export interface GuidedLessonStep {
  label: string;
  instruction: string;
  output: string;
}

export interface GuidedLesson {
  id: string;
  title: string;
  goal: string;
  formula: string;
  formulaTerms: FormulaTerm[];
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
  formulaTerms: FormulaTerm[];
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

export const beginnerFoundations: BeginnerFoundation[] = [
  {
    title: "先不用背公式",
    plain: "先把每个公式当成一句话：它在说什么会影响什么。",
    example: "车辆速度变大，下一秒的位置也会变大，这就是状态之间的关系。",
    exercise: "用一句话解释“速度影响位置”。",
    goodNotes: "GoodNotes Page 000：学习规则，只写直觉、例子、公式三行。"
  },
  {
    title: "函数和变量",
    plain: "变量是会变的量，函数是输入一个量以后输出另一个量的规则。",
    example: "油门 u 变大，车的加速度 a 可能变大，可以先想成 a=f(u)。",
    exercise: "写 3 个变量：位置、速度、油门，并写出谁影响谁。",
    goodNotes: "画一条箭头：油门 -> 加速度 -> 速度 -> 位置。"
  },
  {
    title: "向量和矩阵",
    plain: "向量是一组状态，矩阵是一组规则，用来把一组数变成另一组数。",
    example: "x=[位置, 速度]，A 告诉你位置和速度之间如何互相影响。",
    exercise: "把车辆状态写成两行：第一行位置，第二行速度。",
    goodNotes: "只要能写出 x 是一列数，就能继续学状态空间。"
  },
  {
    title: "导数和变化率",
    plain: "导数不是玄学，它就是“现在变化得有多快”。",
    example: "位置的变化率是速度，速度的变化率是加速度。",
    exercise: "写出：p_dot 是速度，v_dot 是加速度。",
    goodNotes: "画一条链：位置 p -> 速度 v -> 加速度 a。"
  },
  {
    title: "秩 rank",
    plain: "rank 可以先理解成“真正有用的独立方向有几个”。",
    example: "两个箭头如果指向同一个方向，就只算一个独立方向。",
    exercise: "画两个方向不同的箭头，再画两个方向相同的箭头。",
    goodNotes: "把 rank(C)=n 写成：方向够了；rank(C)<n 写成：方向不够。"
  },
  {
    title: "特征值 eigenvalue",
    plain: "特征值先理解成系统自己的放大或衰减倾向。",
    example: "如果每一步都乘 0.8，会越来越小；如果每一步都乘 1.2，会越来越大。",
    exercise: "写两个序列：1, 0.8, 0.64 和 1, 1.2, 1.44。",
    goodNotes: "把“实部小于 0 收敛，实部大于 0 发散”写成直觉句。"
  }
];

export const beginnerLessonBridges: Record<string, BeginnerLessonBridge> = {
  "lesson-state-space": {
    question: "这节课先问：车现在是什么状态，下一秒会怎么变？",
    intuition: "先把状态想成一张仪表盘。",
    example: "仪表盘上有位置、速度、航向、误差；状态空间只是把它们放进一个向量。",
    exercise: "写一个最小状态 x=[位置, 速度]，再写位置由速度改变。",
    goodNotes: "先画仪表盘，再写 x_dot = Ax + Bu。"
  },
  "lesson-controllability": {
    question: "这节课先问：我踩油门或打方向，能不能影响所有重要状态？",
    intuition: "可控性不是控制算法，它先检查车有没有“控制得到”的方向。",
    example: "如果油门只能改变速度，完全影响不了横向位置，那某些状态方向就不可控。",
    exercise: "画两个状态圆圈：一个被输入直接影响，一个要靠 A 传播影响。",
    goodNotes: "把 B 写成直接影响，把 AB 写成传播后的影响。"
  },
  "lesson-stability": {
    question: "这节课先问：系统被推开以后，会自己回来，还是越跑越远？",
    intuition: "稳定性就是看误差会收敛还是发散。",
    example: "方向盘回正像收敛；越修越偏像发散。",
    exercise: "比较 1, 0.5, 0.25 和 1, 2, 4 两个序列。",
    goodNotes: "先写一维直觉，再写 e^{At} 和特征值。"
  },
  "lesson-observability": {
    question: "这节课先问：传感器看到的东西够不够反推出车的内部状态？",
    intuition: "可观性就是“看不看得出来”。",
    example: "只看位置，有时也能通过位置变化推速度；但如果输出和某个状态完全无关，就看不出来。",
    exercise: "写 y=Cx，并圈出 C 直接测到哪些状态。",
    goodNotes: "把可控性写成能不能控制，把可观性写成能不能看见。"
  },
  "lesson-lyapunov": {
    question: "这节课先问：不用解方程，我能不能证明系统会回到安全区域？",
    intuition: "Lyapunov 函数像一个能量表，能量一直下降就稳定。",
    example: "球滚进碗底，势能越来越低；这就是稳定的直觉。",
    exercise: "画一个碗，标出离碗底越远 V 越大。",
    goodNotes: "先画能量下降，再写 V_dot < 0。"
  },
  "lesson-state-feedback": {
    question: "这节课先问：如果我知道当前状态，能不能直接算一个控制输入？",
    intuition: "状态反馈就是“看仪表盘后立刻调整控制”。",
    example: "车偏右了，就向左修；速度太快了，就减小油门。",
    exercise: "写 u=-Kx，并说明 K 大时控制更猛。",
    goodNotes: "把开环 A 和闭环 A-BK 并排写。"
  },
  "lesson-lqr": {
    question: "这节课先问：控制时我到底在权衡什么代价？",
    intuition: "不用先懂最优控制，先问：我更怕偏离轨迹，还是更怕控制太猛？",
    example: "Q 大表示很怕偏离车道；R 大表示很怕方向盘打得太猛。",
    exercise: "写两个调参句：Q 变大怎样，R 变大怎样。",
    goodNotes: "先写 Q/R 工程直觉，再写 J 和 u=-R^{-1}B^TPx。"
  },
  "lesson-kalman": {
    question: "这节课先问：模型预测和传感器观测冲突时，我信谁？",
    intuition: "Kalman Filter 是一个加权融合器。",
    example: "GPS 抖动时更信模型；模型漂移时更信传感器。",
    exercise: "画 predict -> residual -> update 三个框。",
    goodNotes: "先写 K 大更信观测，K 小更信模型。"
  },
  "lesson-lqg": {
    question: "这节课先问：如果真实状态看不全，还能不能做 LQR？",
    intuition: "LQG 就是先估计状态，再用估计状态控制。",
    example: "先用传感器融合得到车的位置和速度估计，再把估计值交给控制器。",
    exercise: "画两条箭头：sensor -> x_hat，x_hat -> control。",
    goodNotes: "把 Kalman 和 LQR 两张图合成一张。"
  },
  "lesson-mpc": {
    question: "这节课先问：我能不能每一步都往未来看几秒再决定现在怎么控制？",
    intuition: "MPC 像开车时不断预判未来路线，但只执行眼前一步。",
    example: "看到前方弯道，提前约束速度和转角，但下一秒会重新规划。",
    exercise: "写三个约束：速度上限、加速度上限、转角上限。",
    goodNotes: "先画滚动窗口，再写优化目标。"
  },
  "lesson-robust": {
    question: "这节课先问：模型不准、路面变化、传感器误差来了以后系统还稳不稳？",
    intuition: "鲁棒控制关注最坏情况下别崩。",
    example: "同一个控制器在干地和湿滑路面都要尽量可用。",
    exercise: "写一个扰动 w，并写它可能来自哪里。",
    goodNotes: "把标称模型和真实系统画成两条不完全重合的线。"
  },
  "lesson-nonlinear": {
    question: "这节课先问：真实车不是线性的，为什么我们还老写 A 和 B？",
    intuition: "线性化是在一个工作点附近放大看局部规律。",
    example: "小角度转向可以近似线性，大角度漂移就不行。",
    exercise: "写工作点 x*, u*，并写“只在附近有效”。",
    goodNotes: "先画局部放大镜，再写 Jacobian。"
  },
  "lesson-stochastic-control": {
    question: "这节课先问：未来有噪声和不确定性时，怎么做决策？",
    intuition: "随机控制不是追求一个确定未来，而是在不确定未来里最小化期望代价。",
    example: "前车可能刹车，也可能不刹车；控制要考虑风险。",
    exercise: "写状态、动作、扰动、代价四个词。",
    goodNotes: "先写 Bellman 递推的中文解释，再写公式。"
  },
  "lesson-world-spatial-interface": {
    question: "这节课先问：控制系统怎么使用世界模型和空间模型？",
    intuition: "先把世界模型想成会在脑子里预演的模型。",
    example: "空间模型告诉你哪里有路和障碍，世界模型预演动作之后会发生什么。",
    exercise: "写 representation、prediction、failure mode 三行。",
    goodNotes: "把 Control、World Model、Spatial Model 画成三角关系。"
  }
};

export const guidedControlLessons: GuidedLesson[] = [
  {
    id: "lesson-state-space",
    title: "第 1 课：状态空间模型",
    goal: "把车辆状态写成 x_dot = Ax + Bu，并知道 A/B 分别控制什么。",
    formula: "\\dot{x}=Ax+Bu",
    formulaTerms: stateSpaceFormulaTerms,
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
    id: "lesson-controllability",
    title: "第 2 课：可控性 rank test",
    goal: "会算 C=[B AB ...]，并能解释 rank(C)<n 为什么不可控。",
    formula: "\\mathcal{C}=\\begin{bmatrix}B&AB&\\cdots&A^{n-1}B\\end{bmatrix},\\quad rank(\\mathcal{C})=n",
    formulaTerms: controllabilityFormulaTerms,
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
    id: "lesson-stability",
    title: "第 3 课：稳定性与特征值",
    goal: "用特征值实部判断线性系统局部稳定性。",
    formula: "x(t)=e^{At}x(0),\\quad Re(\\lambda_i(A))<0",
    formulaTerms: stabilityFormulaTerms,
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
  },
  {
    id: "lesson-observability",
    title: "第 4 课：可观性 Observability",
    goal: "会写 O=[C; CA; ...]，并解释输出 y 能不能反推出全部状态。",
    formula: "\\mathcal{O}=\\begin{bmatrix}C\\\\CA\\\\\\cdots\\\\CA^{n-1}\\end{bmatrix},\\quad rank(\\mathcal{O})=n",
    formulaTerms: observabilityFormulaTerms,
    now: "现在做：把可观性和可控性并排写在 GoodNotes Page 004。",
    goodNotesPage: "GoodNotes Page 004：可观性 Observability",
    obsidianNode: "Obsidian node：Control -> Observability",
    notionRow: "Notion row：Topic=Observability, Mastery=1, Evidence=GoodNotes Page 004",
    steps: [
      {
        label: "Step 1",
        instruction: "写出输出方程 y=Cx+Du。",
        output: "说明 C 是传感器能直接看到哪些状态。"
      },
      {
        label: "Step 2",
        instruction: "把 C, CA, ... 纵向堆起来。",
        output: "和可控性矩阵横向拼 B, AB 形成对照。"
      },
      {
        label: "Step 3",
        instruction: "检查 rank(O)=n 还是 rank(O)<n。",
        output: "满秩表示全部状态能被输出反推；不满秩表示有隐藏状态看不见。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian Canvas 连到 Estimation -> Sensor Model。",
        output: "把可观性接到传感器配置、定位和状态估计。"
      },
      {
        label: "Step 5",
        instruction: "在 Notion 建 Observability review row。",
        output: "Evidence=GoodNotes Page 004，Mastery 先设为 1。"
      }
    ],
    selfCheck: ["可观性看输出能否反推状态", "rank(O)=n 是满秩", "rank(O)<n 说明至少一个状态方向看不见"]
  },
  {
    id: "lesson-lyapunov",
    title: "第 5 课：Lyapunov 稳定性",
    goal: "不用先解微分方程，用能量函数 V 判断系统会不会收敛。",
    formula: "V(x)=x^TPx,\\quad P\\succ0,\\quad \\dot{V}(x)=x^T(A^TP+PA)x<0",
    formulaTerms: lyapunovFormulaTerms,
    now: "现在做：在 GoodNotes 写一个一维和一个二维 Lyapunov 判断。",
    goodNotesPage: "GoodNotes Page 005：Lyapunov 稳定性",
    obsidianNode: "Obsidian node：Control -> Lyapunov Stability",
    notionRow: "Notion row：Topic=Lyapunov, Mastery=1, Evidence=GoodNotes Page 005",
    steps: [
      {
        label: "Step 1",
        instruction: "先把 V(x) 理解成能量。",
        output: "状态离平衡点越远，V 越大；在原点 V 等于 0。"
      },
      {
        label: "Step 2",
        instruction: "沿系统轨迹计算 V_dot。",
        output: "如果 V_dot 小于 0，能量下降，状态会靠近平衡点。"
      },
      {
        label: "Step 3",
        instruction: "把 A^TP+PA 写成矩阵不等式。",
        output: "为后面的 LQR 和鲁棒控制打基础。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian 接到 Stability 和 LQR。",
        output: "Lyapunov 是稳定性证明和最优控制之间的桥。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一个证明型 evidence。",
        output: "把 evidence 写成“我能独立算 V_dot”。"
      }
    ],
    selfCheck: ["V 正定", "V_dot 负定", "不用显式求解也能证明稳定"]
  },
  {
    id: "lesson-state-feedback",
    title: "第 6 课：状态反馈与极点配置",
    goal: "知道 u=-Kx 后闭环矩阵变成 A-BK，并能用极点位置调响应。",
    formula: "u=-Kx,\\quad \\dot{x}=(A-BK)x,\\quad \\lambda(A-BK)",
    formulaTerms: stateFeedbackFormulaTerms,
    now: "现在做：用二阶系统手算一个 K 对闭环极点的影响。",
    goodNotesPage: "GoodNotes Page 006：状态反馈与极点配置",
    obsidianNode: "Obsidian node：Control -> State Feedback",
    notionRow: "Notion row：Topic=State feedback, Mastery=1, Evidence=GoodNotes Page 006",
    steps: [
      {
        label: "Step 1",
        instruction: "写出开环矩阵 A 和输入矩阵 B。",
        output: "先检查系统可控，否则无法任意配置极点。"
      },
      {
        label: "Step 2",
        instruction: "代入 u=-Kx。",
        output: "把系统改写成闭环动态 A-BK。"
      },
      {
        label: "Step 3",
        instruction: "写目标特征多项式。",
        output: "把期望响应速度、阻尼和稳定性转成极点位置。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian 连到 Controllability。",
        output: "极点配置依赖可控性，这是一个前置边。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一个手算 K 的例子。",
        output: "Evidence=GoodNotes Page 006。"
      }
    ],
    selfCheck: ["闭环矩阵是 A-BK", "极点决定响应", "可控性是极点配置前提"]
  },
  {
    id: "lesson-lqr",
    title: "第 7 课：LQR 最优控制",
    goal: "把状态误差和控制代价放进 J，理解 Q/R 怎么改变控制行为。",
    formula: "J=\\int_0^\\infty (x^TQx+u^TRu)dt,\\quad u=-R^{-1}B^TPx",
    formulaTerms: lqrFormulaTerms,
    now: "现在做：写一页 Q/R 调参直觉，不急着背 Riccati 方程。",
    goodNotesPage: "GoodNotes Page 007：LQR 最优控制",
    obsidianNode: "Obsidian node：Control -> LQR",
    notionRow: "Notion row：Topic=LQR, Mastery=1, Evidence=GoodNotes Page 007",
    steps: [
      {
        label: "Step 1",
        instruction: "定义代价函数 J。",
        output: "Q 惩罚状态误差，R 惩罚控制输入大小。"
      },
      {
        label: "Step 2",
        instruction: "写 Riccati 方程但先不强行背。",
        output: "先知道 P 是从优化问题里求出来的能量矩阵。"
      },
      {
        label: "Step 3",
        instruction: "把 u=-R^{-1}B^TPx 写成反馈形式。",
        output: "LQR 仍然是状态反馈，只是 K 来自优化。"
      },
      {
        label: "Step 4",
        instruction: "连接到轨迹跟踪或横向控制。",
        output: "写一个车辆偏差 e 和横摆角误差的应用。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录 Q/R 的一条调参直觉。",
        output: "Mastery 先保持 1，等能做例题再升。"
      }
    ],
    selfCheck: ["Q 惩罚状态", "R 惩罚控制", "LQR 是优化出来的反馈控制"]
  },
  {
    id: "lesson-kalman",
    title: "第 8 课：Kalman Filter 状态估计",
    goal: "理解预测、观测残差和 Kalman 增益如何融合模型与传感器。",
    formula: "x_{k+1}=Ax_k+Bu_k+w_k,\\quad y_k=Cx_k+v_k,\\quad K_k=P_k^-C^T(CP_k^-C^T+R)^{-1}",
    formulaTerms: kalmanFormulaTerms,
    now: "现在做：画一张 predict -> update 的状态估计流程图。",
    goodNotesPage: "GoodNotes Page 008：Kalman Filter",
    obsidianNode: "Obsidian node：Estimation -> Kalman Filter",
    notionRow: "Notion row：Topic=Kalman Filter, Mastery=1, Evidence=GoodNotes Page 008",
    steps: [
      {
        label: "Step 1",
        instruction: "写预测模型和观测模型。",
        output: "把过程噪声 w 和观测噪声 v 明确写出来。"
      },
      {
        label: "Step 2",
        instruction: "写预测协方差和观测残差。",
        output: "残差表示传感器看到的和模型预测的差。"
      },
      {
        label: "Step 3",
        instruction: "解释 Kalman gain。",
        output: "K 大表示更信观测，K 小表示更信模型。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian 接到 Observability。",
        output: "估计器能不能工作，先看系统是否可观。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一个定位或感知融合例子。",
        output: "Evidence=GoodNotes Page 008。"
      }
    ],
    selfCheck: ["预测", "观测残差", "Kalman gain 权衡模型和传感器"]
  },
  {
    id: "lesson-lqg",
    title: "第 9 课：LQG 与分离原则",
    goal: "把 Kalman 估计器和 LQR 控制器合起来，理解估计-控制分离。",
    formula: "\\hat{x}_{k|k}=\\hat{x}_{k|k-1}+K_k(y_k-C\\hat{x}_{k|k-1}),\\quad u_k=-L\\hat{x}_{k|k}",
    formulaTerms: lqgFormulaTerms,
    now: "现在做：画两条链路：传感器到估计，估计到控制。",
    goodNotesPage: "GoodNotes Page 009：LQG",
    obsidianNode: "Obsidian node：Control -> LQG",
    notionRow: "Notion row：Topic=LQG, Mastery=1, Evidence=GoodNotes Page 009",
    steps: [
      {
        label: "Step 1",
        instruction: "把 Kalman Filter 输出写成 x_hat。",
        output: "控制器拿到的是估计状态，不一定是真实状态。"
      },
      {
        label: "Step 2",
        instruction: "把 LQR 的 u=-Lx 改成 u=-Lx_hat。",
        output: "估计器和控制器串起来形成 LQG。"
      },
      {
        label: "Step 3",
        instruction: "写清分离原则适用条件。",
        output: "线性、高斯、模型匹配时可以分别设计。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian 连 Kalman 和 LQR。",
        output: "这是一条 Estimation -> Control 的边。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一条风险。",
        output: "模型错、非线性强或噪声不高斯时，分离直觉可能失效。"
      }
    ],
    selfCheck: ["LQG = Kalman + LQR", "控制用估计状态", "分离原则有条件"]
  },
  {
    id: "lesson-mpc",
    title: "第 10 课：MPC 模型预测控制",
    goal: "理解滚动优化、预测时域、约束和只执行第一步的控制方式。",
    formula: "\\min_{u_{0:N-1}}\\sum_{k=0}^{N-1}(x_k^TQx_k+u_k^TRu_k)+x_N^TPx_N,\\quad x_{k+1}=Ax_k+Bu_k",
    formulaTerms: mpcFormulaTerms,
    now: "现在做：写一个车辆速度、加速度、转角约束的 MPC 问题。",
    goodNotesPage: "GoodNotes Page 010：MPC",
    obsidianNode: "Obsidian node：Control -> MPC",
    notionRow: "Notion row：Topic=MPC, Mastery=1, Evidence=GoodNotes Page 010",
    steps: [
      {
        label: "Step 1",
        instruction: "写预测模型 x_{k+1}=Ax_k+Bu_k。",
        output: "明确每一步状态如何滚动到下一步。"
      },
      {
        label: "Step 2",
        instruction: "写时域 N 内的目标函数。",
        output: "把每一步状态误差、输入代价和终端代价加起来。"
      },
      {
        label: "Step 3",
        instruction: "加入约束集合 X 和 U。",
        output: "车辆控制里约束比 LQR 更接近真实系统。"
      },
      {
        label: "Step 4",
        instruction: "解释 receding horizon。",
        output: "每次只执行第一步，下一周期重新优化。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一个 Autoware 或规划控制连接。",
        output: "Evidence=GoodNotes Page 010。"
      }
    ],
    selfCheck: ["预测时域", "约束", "滚动优化只执行第一步"]
  },
  {
    id: "lesson-robust",
    title: "第 11 课：鲁棒控制与 H∞",
    goal: "把模型误差和最坏情况扰动放进控制问题，而不是只看标称模型。",
    formula: "\\|T_{zw}\\|_\\infty<\\gamma",
    formulaTerms: robustFormulaTerms,
    now: "现在做：写一个模型误差会导致控制失败的车辆例子。",
    goodNotesPage: "GoodNotes Page 011：鲁棒控制",
    obsidianNode: "Obsidian node：Control -> Robust Control",
    notionRow: "Notion row：Topic=Robust Control, Mastery=1, Evidence=GoodNotes Page 011",
    steps: [
      {
        label: "Step 1",
        instruction: "区分标称模型和真实系统。",
        output: "真实车辆参数、摩擦、延迟都可能和模型不同。"
      },
      {
        label: "Step 2",
        instruction: "写扰动 w 和性能输出 z。",
        output: "w 是外部或模型不确定性，z 是你要限制的误差。"
      },
      {
        label: "Step 3",
        instruction: "解释 H infinity norm。",
        output: "它衡量最坏频率下扰动到性能输出的放大。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian 接到 Validation failure mode。",
        output: "鲁棒控制和仿真验证天然连接。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一个 worst-case assumption。",
        output: "把假设和验证路径写清楚。"
      }
    ],
    selfCheck: ["扰动 w", "性能输出 z", "最坏情况放大受限"]
  },
  {
    id: "lesson-nonlinear",
    title: "第 12 课：非线性系统与线性化",
    goal: "知道真实系统常是 f(x,u)，线性模型只是工作点附近的近似。",
    formula: "\\dot{x}=f(x,u),\\quad A=\\frac{\\partial f}{\\partial x}\\bigg|_{x^*,u^*},\\quad B=\\frac{\\partial f}{\\partial u}\\bigg|_{x^*,u^*}",
    formulaTerms: nonlinearFormulaTerms,
    now: "现在做：把车辆或机器人模型在一个工作点线性化。",
    goodNotesPage: "GoodNotes Page 012：非线性与线性化",
    obsidianNode: "Obsidian node：Control -> Nonlinear Systems",
    notionRow: "Notion row：Topic=Nonlinear linearization, Mastery=1, Evidence=GoodNotes Page 012",
    steps: [
      {
        label: "Step 1",
        instruction: "写真实模型 x_dot=f(x,u)。",
        output: "不要把所有系统默认当成线性。"
      },
      {
        label: "Step 2",
        instruction: "选工作点 x*, u*。",
        output: "线性化只在这个点附近可靠。"
      },
      {
        label: "Step 3",
        instruction: "对 x 和 u 求偏导。",
        output: "得到局部 A 和 B。"
      },
      {
        label: "Step 4",
        instruction: "连接到 EKF、LQR、MPC。",
        output: "很多高级方法都依赖局部线性近似。"
      },
      {
        label: "Step 5",
        instruction: "Notion 写清适用范围。",
        output: "记录“远离工作点会失效”。"
      }
    ],
    selfCheck: ["真实模型 f(x,u)", "工作点", "Jacobian 线性化"]
  },
  {
    id: "lesson-stochastic-control",
    title: "第 13 课：随机控制与动态规划",
    goal: "用值函数和 Bellman 递推理解不确定性下的最优决策。",
    formula: "V_t(x)=\\min_u\\mathbb{E}[\\ell(x,u,w)+V_{t+1}(f(x,u,w))]",
    formulaTerms: stochasticFormulaTerms,
    now: "现在做：把一个带噪声的控制问题写成状态、动作、代价、扰动。",
    goodNotesPage: "GoodNotes Page 013：随机控制与动态规划",
    obsidianNode: "Obsidian node：Control -> Stochastic Control",
    notionRow: "Notion row：Topic=Stochastic Control, Mastery=1, Evidence=GoodNotes Page 013",
    steps: [
      {
        label: "Step 1",
        instruction: "定义状态 x、动作 u、扰动 w。",
        output: "把不确定性显式放进系统。"
      },
      {
        label: "Step 2",
        instruction: "写即时损失 l(x,u,w)。",
        output: "代价可以包括安全、误差、控制量和风险。"
      },
      {
        label: "Step 3",
        instruction: "写 Bellman 递推。",
        output: "当前最优动作依赖下一步值函数。"
      },
      {
        label: "Step 4",
        instruction: "连接到强化学习和 MPC。",
        output: "RL 和 stochastic MPC 都能从这条线继续。"
      },
      {
        label: "Step 5",
        instruction: "Notion 记录一个不确定性来源。",
        output: "例如感知误差、交通参与者行为或路面摩擦。"
      }
    ],
    selfCheck: ["值函数", "期望代价", "Bellman 递推"]
  },
  {
    id: "lesson-world-spatial-interface",
    title: "第 14 课：世界模型与空间模型接口",
    goal: "把控制工程接到 latent dynamics、相机投影、BEV/occupancy 和 3D 重建。",
    formula: "p(z_{t+1}\\mid z_t,a_t),\\quad s\\mathbf{u}=K[R|t]X,\\quad f(x,y,z)",
    formulaTerms: worldSpatialFormulaTerms,
    now: "现在做：选一个世界模型或空间模型论文，写 representation -> objective -> failure mode。",
    goodNotesPage: "GoodNotes Page 014：世界模型与空间模型接口",
    obsidianNode: "Obsidian node：World Model -> Control Interface",
    notionRow: "Notion row：Topic=World/Spatial Interface, Mastery=1, Evidence=GoodNotes Page 014",
    steps: [
      {
        label: "Step 1",
        instruction: "写 latent dynamics。",
        output: "世界模型负责预测隐藏状态如何随动作演化。"
      },
      {
        label: "Step 2",
        instruction: "写 camera projection 或 occupancy field。",
        output: "空间模型负责把三维几何变成可计算表示。"
      },
      {
        label: "Step 3",
        instruction: "写一个 failure mode。",
        output: "比如 imagined rollout 偏移、BEV 遮挡错误、重建几何不准。"
      },
      {
        label: "Step 4",
        instruction: "在 Obsidian 连接 Control、World Model、Spatial Model。",
        output: "这节课是后续论文阅读和仿真实验的接口。"
      },
      {
        label: "Step 5",
        instruction: "Notion 建 Paper queue row。",
        output: "Resource Type=Paper，Status=Active，Evidence=GoodNotes Page 014。"
      }
    ],
    selfCheck: ["latent dynamics", "camera projection", "occupancy/3D representation"]
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
    formulaTerms: stateTransitionFormulaTerms,
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
    formulaTerms: controllabilityFormulaTerms,
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
    formulaTerms: lqrFormulaTerms,
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
