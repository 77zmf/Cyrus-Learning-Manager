import {
  controllabilityFormulaTerms,
  kalmanFormulaTerms,
  lqrFormulaTerms,
  lqgFormulaTerms,
  lyapunovFormulaTerms,
  mpcFormulaTerms,
  nonlinearFormulaTerms,
  observabilityFormulaTerms,
  quaternionFormulaTerms,
  lidarSlamFormulaTerms,
  robustFormulaTerms,
  epipolarFormulaTerms,
  nerfGaussianFormulaTerms,
  semanticNeuralSlamFormulaTerms,
  slamBackendFormulaTerms,
  slamProjectionFormulaTerms,
  slamTransformFormulaTerms,
  stabilityFormulaTerms,
  stateFeedbackFormulaTerms,
  stateSpaceFormulaTerms,
  stateTransitionFormulaTerms,
  stochasticFormulaTerms,
  threeBlueOneBrownCalculusTerms,
  threeBlueOneBrownDifferentialEquationTerms,
  threeBlueOneBrownGeometryTerms,
  threeBlueOneBrownLinearAlgebraTerms,
  threeBlueOneBrownNeuralNetworkTerms,
  threeBlueOneBrownProbabilityTerms,
  threeBlueOneBrownSignalsTerms,
  vioImuFormulaTerms,
  worldSpatialFormulaTerms
} from "./formula-visuals";
import type { FormulaTerm } from "./formula-visuals";
import { buildGuidedLessonManimScene, type GuidedLessonManimScene } from "./guided-manim";

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

export interface BeginnerStartStep {
  title: string;
  action: string;
  output: string;
}

export interface BeginnerLessonBridge {
  question: string;
  intuition: string;
  example: string;
  exercise: string;
  goodNotes: string;
}

export interface ReadyCheckFormulaChoice {
  label: string;
  value: string;
  isCorrect: boolean;
  feedback: string;
}

export interface LessonReadyCheck {
  prerequisite: string;
  conceptQuestion: string;
  conceptAnswer: string;
  formulaPrompt: string;
  formulaChoices: ReadyCheckFormulaChoice[];
  goodNotesPrompt: string;
  goodNotesExpected: string;
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
  manimScene: GuidedLessonManimScene;
  now: string;
  goodNotesPage: string;
  obsidianNode: string;
  notionRow: string;
  steps: GuidedLessonStep[];
  selfCheck: string[];
  readyCheck: LessonReadyCheck;
}

type GuidedLessonSeed = Omit<GuidedLesson, "readyCheck" | "manimScene">;

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

export interface ThreeBlueOneBrownSource {
  label: string;
  path?: string;
  url?: string;
  note: string;
}

export interface ThreeBlueOneBrownRoute {
  id: string;
  priority: string;
  title: string;
  importedTopic: string;
  officialLabel: string;
  officialUrl: string;
  visualQuestion: string;
  formula: string;
  formulaTerms: FormulaTerm[];
  intuition: string;
  engineeringBridge: string;
  goodNotes: string;
  obsidian: string;
  notion: string;
  minimalExperiment: string;
  outputs: string[];
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

export const beginnerStartSteps: BeginnerStartStep[] = [
  {
    title: "选一节课",
    action: "只选当前最想学的一节，不从头收藏所有资源。",
    output: "网页停在一张课程卡，不切换到别的任务。"
  },
  {
    title: "补前置卡",
    action: "先看课程卡写的“卡住就回到”基础卡。",
    output: "能用一句话说出这个前置概念在干什么。"
  },
  {
    title: "做 Ready Check",
    action: "先答一个概念题，再选一个公式入口。",
    output: "网页给出反馈后，再决定是否写 GoodNotes。"
  },
  {
    title: "写 GoodNotes",
    action: "只写直觉、公式、一个例子三块内容。",
    output: "留下一页可以复盘的手写证据。"
  },
  {
    title: "连 Obsidian 和 Notion",
    action: "Obsidian 只连概念关系，Notion 只记证据和下次复习。",
    output: "学习不是按日期推进，而是按证据推进。"
  }
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
  },
  {
    title: "坐标系和单位",
    plain: "坐标系说明一个量是从哪里开始量、朝哪个方向算正，单位说明这个数到底有多大。",
    example: "同一个车的位置，用车身坐标系和地图坐标系写出来可能完全不同。",
    exercise: "画 x 轴和 y 轴，标出车辆前方、左侧、世界坐标的原点。",
    goodNotes: "写一句：没有坐标系，位置、速度、角度都不能比较。"
  },
  {
    title: "矩阵乘法",
    plain: "矩阵乘法先理解成“每一行规则”和“状态列向量”做加权相加。",
    example: "A 的第一行决定新位置怎么由旧位置和旧速度组成。",
    exercise: "用两行两列矩阵乘 [位置, 速度]，只写每一行在混合什么。",
    goodNotes: "先画行乘列，不急着背所有计算技巧。"
  },
  {
    title: "方程组",
    plain: "方程组是在同时满足多条规则；控制和估计里常常要同时满足动态、观测和约束。",
    example: "既要满足位置变化由速度决定，又要满足速度变化由控制输入决定。",
    exercise: "写两条规则：p_dot 是 v，v_dot 是 a，然后说它们同时成立。",
    goodNotes: "把方程组写成两行，不要压成一行公式。"
  },
  {
    title: "状态、输入、输出",
    plain: "状态 x 是系统内部清单，输入 u 是你能施加的动作，输出 y 是传感器能看到的结果。",
    example: "车辆状态可以是位置和速度，输入可以是加速度命令，输出可以是 GPS 测到的位置。",
    exercise: "给一个小车例子，各写 2 个状态、1 个输入、1 个输出。",
    goodNotes: "画三栏：x 在系统里，u 从外面进来，y 从传感器出来。"
  },
  {
    title: "误差和反馈",
    plain: "误差是目标和当前状态的差，反馈是看见误差后反过来修正控制。",
    example: "车偏离车道中心，控制器根据横向误差修方向盘。",
    exercise: "写 current、target、error 三个词，并画 error -> control 的箭头。",
    goodNotes: "把开环写成不看结果，反馈写成看误差后修正。"
  },
  {
    title: "概率和期望",
    plain: "概率描述不确定性，期望是把很多可能结果按概率加权后的平均效果。",
    example: "前车可能刹车也可能不刹车，随机控制要考虑两种未来的风险。",
    exercise: "写两个未来：安全通过、前车急刹，并给它们各写一个风险分数。",
    goodNotes: "先用中文写“多种未来的加权平均”，再看期望符号。"
  },
  {
    title: "优化目标和约束",
    plain: "优化目标说明你想让什么变小，约束说明哪些行为绝对不能违反。",
    example: "MPC 想让跟踪误差小，但速度、加速度和方向盘角度不能超过限制。",
    exercise: "写一个目标：误差小；写三个约束：速度、加速度、转角。",
    goodNotes: "把目标写在上面，把硬限制写在下面。"
  },
  {
    title: "论文阅读四件套",
    plain: "读论文先抓问题、假设、核心公式、最小复现，不要从摘要一路抄到结论。",
    example: "看 BEVFormer 时先问它解决什么感知表示问题，再看 attention 公式和失败模式。",
    exercise: "给任意一篇论文写四行：problem、assumption、formula、reproduction。",
    goodNotes: "每篇论文只抄一个核心公式，并解释每个符号的工程含义。"
  },
  {
    title: "齐次坐标",
    plain: "齐次坐标是在普通坐标后面补一个 1，让旋转和平移可以合成同一个矩阵乘法。",
    example: "三维点 X=[x,y,z,1]^T 乘 T_{w\\leftarrow c} 后，就能从相机坐标变到世界坐标。",
    exercise: "写一个二维点 [2,3,1]^T，再写一个平移矩阵把它往右移 1。",
    goodNotes: "画普通坐标和齐次坐标的区别，写一句：平移也能被矩阵表示。"
  },
  {
    title: "像素和相机内参",
    plain: "相机内参 K 把相机里的 3D 方向变成图像里的像素位置。",
    example: "焦距越大，同一个物体投到图像上越大；主点决定图像坐标中心在哪里。",
    exercise: "画一条从相机中心出发的光线，标出 3D 点、成像平面和像素 u,v。",
    goodNotes: "写 K、焦距、主点、像素坐标四个词，不要求一次算完所有投影。"
  },
  {
    title: "位姿和轨迹",
    plain: "位姿是一帧里的位置和朝向，轨迹是一串按时间排列的位姿。",
    example: "SLAM 输出 T_{map\\leftarrow base}(t)，就是车在地图坐标系里的连续位置和朝向。",
    exercise: "画 3 个小车位置，给每个位置画朝向箭头。",
    goodNotes: "把 pose 写成 R+t，把 trajectory 写成 pose_1, pose_2, pose_3。"
  },
  {
    title: "重投影误差",
    plain: "重投影误差就是：用当前估计的相机和三维点预测一个像素，再和真实匹配像素比较。",
    example: "如果预测点离真实角点很远，说明相机位姿、三维点或匹配关系里至少有一个不准。",
    exercise: "在一张图里画真实像素 u，再画预测像素 u_hat，用箭头表示误差。",
    goodNotes: "写 u_{ij}-\\pi(T_iX_j)，旁边用中文写“预测像素减真实像素”。"
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
  },
  "lesson-rigid-camera-projection": {
    question: "这节课先问：同一个三维点，为什么在不同坐标系和像素里会变成不同数字？",
    intuition: "先把坐标变换看成翻译语言：车身坐标、相机坐标、地图坐标都在描述同一个世界。",
    example: "相机看见一个路锥，SLAM 需要知道这个路锥在相机里、车身里、地图里分别在哪里。",
    exercise: "画 world、camera、image 三层，连出 X -> camera point -> pixel。",
    goodNotes: "先画三层坐标，再写 T 和 s\\tilde{u}=K[R|t]\\tilde{X}。"
  },
  "lesson-feature-epipolar-geometry": {
    question: "这节课先问：两张图里怎么知道两个角点来自同一个三维点？",
    intuition: "匹配点不是随便配，第二张图里的点必须落在第一张图预测出的对极线上。",
    example: "你从左眼和右眼看同一个物体，两个视角的像素位置共同决定深度。",
    exercise: "画两台相机、一个三维点、两条成像光线和一条对极线。",
    goodNotes: "把 feature matching、epipolar line、triangulation 写成一页图。"
  },
  "lesson-slam-backend-pose-graph": {
    question: "这节课先问：前端给了很多匹配和相对运动，后端怎样把整条轨迹调顺？",
    intuition: "后端像总校准：每一条观测都是约束，目标是让所有约束的误差整体最小。",
    example: "车辆绕一圈回到起点时，如果轨迹没有闭合，loop closure 会把整条轨迹拉回一致。",
    exercise: "画 4 个 pose 节点和 5 条约束边，最后一条边标成 loop closure。",
    goodNotes: "把 BA 和 pose graph 并排写：一个优化相机+点，一个优化位姿图。"
  },
  "lesson-sfm-mvs-nerf-3dgs": {
    question: "这节课先问：从一堆照片到可看的三维场景，中间到底产出了什么？",
    intuition: "SfM 先求相机和稀疏点，MVS 补 dense geometry，NeRF/3DGS 再做可渲染表示。",
    example: "COLMAP 先给相机位姿和稀疏点云；NeRF 和 3DGS 通常需要这些位姿作为训练输入。",
    exercise: "画 Images -> SfM -> Sparse Cloud -> MVS Dense -> NeRF/3DGS -> Validation Asset。",
    goodNotes: "把 pipeline 画成一条资产链，并标出哪些能进 CARLA，哪些只是视觉研究层。"
  },
  "lesson-quaternion-orientation": {
    question: "这节课先问：一台相机或机器人转过一个角度，怎么不用欧拉角也能稳定表示？",
    intuition: "先把四元数想成姿态罗盘，不要先把它当成四维怪公式。",
    example: "IMU、相机位姿和 SLAM 后端经常用 quaternion 存朝向，因为连续旋转和组合旋转更稳定。",
    exercise: "画一个单位球上的 q 和 -q，再画一个向量 v 被转成 v'。",
    goodNotes: "写 q=cos(theta/2)+u sin(theta/2)，再写 v'=qvq^{-1}。"
  },
  "lesson-vio-imu-preintegration": {
    question: "这节课先问：相机帧率不高，机器人为什么还要用 IMU？",
    intuition: "IMU 像高频身体感觉，相机像低频外界纠偏；VIO 是把两者放进同一个估计问题。",
    example: "相机短暂看不清纹理时，IMU 还能提供角速度和加速度约束，帮轨迹不中断。",
    exercise: "画 camera keyframe i、j，中间塞很多 IMU 小箭头，再把它们压成一个 Delta 约束。",
    goodNotes: "写 Delta R、Delta v、Delta p 和 b_g、b_a，旁边写“高频积分会漂，必须估偏置”。"
  },
  "lesson-lidar-icp-lio-sam": {
    question: "这节课先问：LiDAR 没有像素特征，怎么知道两帧点云对齐了？",
    intuition: "LiDAR SLAM 先把点云当成几何形状，用 ICP 或 scan-to-map 找刚体变换，再用 IMU/回环稳定长期轨迹。",
    example: "车辆转弯时，一帧点云里的路沿、墙面和杆状物会和地图里的局部平面匹配。",
    exercise: "画两团点云，一团用 R,t 移到另一团；再写点到面残差。",
    goodNotes: "把 ICP、point-to-plane、LIO factor graph 分三块写，不要只背算法名。"
  },
  "lesson-semantic-neural-slam-map": {
    question: "这节课先问：地图只有几何够不够给机器人用？",
    intuition: "语义 SLAM 给几何地图加标签，神经 SLAM 用连续场表示空间；两者都要回到定位、建图和验证资产是否可靠。",
    example: "同一块空间里，路面、路沿、可通行区域、动态障碍和静态建筑对 planner 的意义完全不同。",
    exercise: "画一张几何地图，再给每块区域加语义标签，最后标出一个神经场 F_theta(x)。",
    goodNotes: "写 M_s=(G,L)、F_theta(x)->(sigma,c,s)，再写“语义/神经地图不能自动等于稳定验证资产”。"
  }
};

export const threeBlueOneBrownSources: ThreeBlueOneBrownSource[] = [
  {
    label: "Imported Notion library",
    path: "50_Assets/Imports/3Blue1Brown_Notion_学习库.md",
    note: "原始导入表，保留课程总表、优先级、自动驾驶关联和每集学习模板。"
  },
  {
    label: "Obsidian course map",
    path: "20_Courses/3Blue1Brown/00-3Blue1Brown-Study-Map.md",
    note: "主入口，连接原始导入、自动驾驶数学路线、线性代数第一周和视频笔记模板。"
  },
  {
    label: "Video note template",
    path: "90_Templates/3Blue1Brown Video Note.md",
    note: "每看一集都按直觉、公式、工程连接、最小实验和下一步记录。"
  },
  {
    label: "3Blue1Brown official site",
    url: "https://www.3blue1brown.com/",
    note: "官方课程和专题入口。"
  },
  {
    label: "YouTube playlists",
    url: "https://www.youtube.com/c/3blue1brown/playlists",
    note: "官方合集入口。"
  },
  {
    label: "Bilibili official space",
    url: "https://space.bilibili.com/88461692",
    note: "中文观看入口。"
  }
];

export const threeBlueOneBrownLearningPath: ThreeBlueOneBrownRoute[] = [
  {
    id: "3b1b-linear-algebra",
    priority: "P0",
    title: "Linear Algebra: matrix as transform",
    importedTopic: "线性代数的本质",
    officialLabel: "Essence of Linear Algebra playlist",
    officialUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
    visualQuestion: "矩阵到底是在移动空间，还是只是在摆一张数字表？",
    formula: "\\mathbf{p}_{map}=T_{map\\leftarrow base}T_{base\\leftarrow lidar}\\mathbf{p}_{lidar}",
    formulaTerms: threeBlueOneBrownLinearAlgebraTerms,
    intuition: "先把向量当成空间中的箭头，把矩阵当成对整片空间的旋转、缩放、投影或换坐标。",
    engineeringBridge: "SLAM、TF tree、点云投影、BEV 坐标对齐都依赖这条直觉。",
    goodNotes: "GoodNotes Page 3B1B-M001：向量、基、矩阵变换、TF frame 链。",
    obsidian: "Obsidian: 3Blue1Brown -> Autonomous-Driving Math Route",
    notion: "Notion: Track=3Blue1Brown, Evidence=video note + minimal experiment",
    minimalExperiment: "用 2D 点和两次坐标变换画出 lidar 到 map 的路径。",
    outputs: [
      "一页矩阵变换手写图",
      "一个 TF frame 链路说明",
      "一个坐标顺序不能互换的反例"
    ]
  },
  {
    id: "3b1b-calculus",
    priority: "P0",
    title: "Calculus: derivative as motion",
    importedTopic: "微积分的本质",
    officialLabel: "Essence of Calculus playlist",
    officialUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
    visualQuestion: "变化率和累计量怎样变成控制、优化和神经网络训练的语言？",
    formula: "\\frac{d}{dt}f(x(t))=\\nabla f(x)^T\\dot{x},\\quad J=\\int_0^T L(x(t),u(t))dt",
    formulaTerms: threeBlueOneBrownCalculusTerms,
    intuition: "导数先理解成现在变化多快，积分先理解成把一小段一小段影响累加起来。",
    engineeringBridge: "轨迹优化、MPC 代价、反向传播和 EKF 线性化都在使用变化率。",
    goodNotes: "GoodNotes Page 3B1B-M002：导数、积分、梯度、代价累计。",
    obsidian: "Obsidian: 3Blue1Brown -> Calculus -> Optimization",
    notion: "Notion: Track=3Blue1Brown, Resource=Calculus, Evidence=Page 3B1B-M002",
    minimalExperiment: "画一条位置曲线，手写速度、加速度和累计误差的关系。",
    outputs: [
      "一页变化率直觉图",
      "一个控制误差累计例子",
      "一个梯度方向解释"
    ]
  },
  {
    id: "3b1b-differential-equations",
    priority: "P0",
    title: "Differential Equations: state evolution",
    importedTopic: "微分方程",
    officialLabel: "Differential Equations playlist",
    officialUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNPOjrT6KVlfJuKtYTftqH6",
    visualQuestion: "如果每个状态都给出下一瞬间的变化方向，整条轨迹会长什么样？",
    formula: "\\dot{x}=f(x,u),\\quad x(t+\\Delta t)\\approx x(t)+\\Delta t\\,f(x,u)",
    formulaTerms: threeBlueOneBrownDifferentialEquationTerms,
    intuition: "把微分方程看成状态空间里每个点的一支箭头，轨迹就是沿着箭头走出来的线。",
    engineeringBridge: "车辆动力学、横向控制震荡、收敛速度和稳定性都从这里进入。",
    goodNotes: "GoodNotes Page 3B1B-M003：相图、状态箭头、收敛和发散。",
    obsidian: "Obsidian: 3Blue1Brown -> Differential Equations -> Control",
    notion: "Notion: Track=3Blue1Brown, Resource=Differential equations, Evidence=Page 3B1B-M003",
    minimalExperiment: "画一个一维收敛系统和一个一维发散系统的箭头场。",
    outputs: [
      "一张相图草图",
      "一个稳定和不稳定序列对比",
      "一个车辆误差响应解释"
    ]
  },
  {
    id: "3b1b-signals",
    priority: "P1",
    title: "Euler, Fourier, Laplace: signals as modes",
    importedTopic: "欧拉公式 / 傅里叶 / 拉普拉斯",
    officialLabel: "Explainers playlist",
    officialUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDN52m7Y21ePrTbvXkPaWVSg",
    visualQuestion: "为什么振荡、频率和系统响应可以用同一种旋转直觉理解？",
    formula: "e^{i\\theta}=\\cos\\theta+i\\sin\\theta,\\quad x(t)=\\sum_k a_ke^{i\\omega_kt}",
    formulaTerms: threeBlueOneBrownSignalsTerms,
    intuition: "复杂信号可以拆成很多基本振动；系统响应也可以拆成不同模态的衰减或放大。",
    engineeringBridge: "控制频域、滤波、振动、传感器噪声和闭环响应都需要这条线。",
    goodNotes: "GoodNotes Page 3B1B-M004：旋转、频率、模态、系统响应。",
    obsidian: "Obsidian: 3Blue1Brown -> Signals -> Control Frequency View",
    notion: "Notion: Track=3Blue1Brown, Resource=Explainers, Evidence=Page 3B1B-M004",
    minimalExperiment: "把一个抖动信号画成低频趋势和高频噪声两部分。",
    outputs: [
      "一页单位圆和振荡图",
      "一个噪声分解例子",
      "一个控制响应频率解释"
    ]
  },
  {
    id: "3b1b-neural-networks",
    priority: "P1",
    title: "Neural Networks: representation and loss",
    importedTopic: "神经网络",
    officialLabel: "Neural Networks playlist",
    officialUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
    visualQuestion: "网络到底在学什么，loss 又怎样推动参数改变？",
    formula: "L(\\theta)=\\frac{1}{N}\\sum_i\\ell(f_\\theta(x_i),y_i),\\quad \\theta_{k+1}=\\theta_k-\\eta\\nabla_\\theta L",
    formulaTerms: threeBlueOneBrownNeuralNetworkTerms,
    intuition: "先把网络当成一串可调变换，loss 是告诉它现在错在哪里的反馈信号。",
    engineeringBridge: "BEV 感知、E2E、预测网络和世界模型训练都离不开表示、目标和梯度。",
    goodNotes: "GoodNotes Page 3B1B-M005：参数、loss、梯度下降、反向传播直觉。",
    obsidian: "Obsidian: 3Blue1Brown -> Neural Networks -> Perception",
    notion: "Notion: Track=3Blue1Brown, Resource=Neural networks, Evidence=Page 3B1B-M005",
    minimalExperiment: "画一个输入、隐藏表示、loss、参数更新的四步链。",
    outputs: [
      "一个 loss feedback 图",
      "一个 BEV 表示连接",
      "一个过拟合风险记录"
    ]
  },
  {
    id: "3b1b-probability",
    priority: "P1",
    title: "Probability: uncertainty and belief",
    importedTopic: "概率 / 贝叶斯 / 信息论",
    officialLabel: "Probability topic",
    officialUrl: "https://www.3blue1brown.com/?topic=probability",
    visualQuestion: "传感器有噪声、未来不确定时，系统如何更新相信程度？",
    formula: "p(x\\mid z)=\\frac{p(z\\mid x)p(x)}{p(z)},\\quad \\mathbb{E}[c]=\\sum_i p_i c_i",
    formulaTerms: threeBlueOneBrownProbabilityTerms,
    intuition: "概率不是玄学，它是在证据不完整时给每个可能状态分配相信程度。",
    engineeringBridge: "Kalman Filter、感知置信度、多未来预测和风险代价都来自这条线。",
    goodNotes: "GoodNotes Page 3B1B-M006：先验、似然、后验、期望代价。",
    obsidian: "Obsidian: 3Blue1Brown -> Probability -> Sensor Fusion",
    notion: "Notion: Track=3Blue1Brown, Resource=Probability, Evidence=Page 3B1B-M006",
    minimalExperiment: "写一个 GPS 抖动时模型预测和观测互相修正的例子。",
    outputs: [
      "一页贝叶斯更新图",
      "一个传感器融合例子",
      "一个风险期望解释"
    ]
  },
  {
    id: "3b1b-geometry-groups",
    priority: "P1",
    title: "Geometry and Groups: spatial transforms",
    importedTopic: "几何 / 群论 / 拓扑",
    officialLabel: "Geometry topic",
    officialUrl: "https://www.3blue1brown.com/?topic=geometry",
    visualQuestion: "位姿、旋转和对称性为什么是空间智能的基础对象？",
    formula: "R^TR=I,\\quad \\det(R)=1,\\quad X_{world}=RX_{body}+t",
    formulaTerms: threeBlueOneBrownGeometryTerms,
    intuition: "先把旋转看成保持形状的空间动作，再把位姿看成旋转加平移。",
    engineeringBridge: "机器人位姿、相机投影、3D 重建、占据场和空间模型都需要几何直觉。",
    goodNotes: "GoodNotes Page 3B1B-M007：旋转、位姿、对称性、空间场。",
    obsidian: "Obsidian: 3Blue1Brown -> Geometry -> Spatial Models",
    notion: "Notion: Track=3Blue1Brown, Resource=Geometry, Evidence=Page 3B1B-M007",
    minimalExperiment: "画一个车身点经过旋转和平移进入世界坐标的过程。",
    outputs: [
      "一页旋转和平移图",
      "一个相机或 BEV 投影连接",
      "一个空间模型失败模式"
    ]
  }
];

const lessonReadyChecks: Record<string, LessonReadyCheck> = {
  "lesson-state-space": {
    prerequisite: "状态、输入、输出",
    conceptQuestion: "状态空间里 x、u、y 分别是什么？",
    conceptAnswer: "答案：状态就是系统当前的变量清单，输入是你能施加的动作，输出是传感器能看到的结果。",
    formulaPrompt: "哪个公式是状态空间模型的最小入口？",
    formulaChoices: [
      {
        label: "A",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：rank(C)=n 是可控性检查，不是状态空间入口。"
      },
      {
        label: "B",
        value: "x_dot = Ax + Bu",
        isCorrect: true,
        feedback: "正确：状态空间最小入口就是状态变化率由系统自己和控制输入共同决定。"
      },
      {
        label: "C",
        value: "u=-Kx",
        isCorrect: false,
        feedback: "还不对：u=-Kx 是状态反馈控制律。"
      }
    ],
    goodNotesPrompt: "Page 001 写完了吗？",
    goodNotesExpected: "已记录：Page 001 至少有状态向量、A/B 含义、一个二状态小车例子。"
  },
  "lesson-controllability": {
    prerequisite: "秩 rank",
    conceptQuestion: "可控性到底先问什么？",
    conceptAnswer: "答案：先问输入能不能通过直接影响和 A 的传播影响到全部状态方向。",
    formulaPrompt: "哪个判断表示可控方向够多？",
    formulaChoices: [
      {
        label: "A",
        value: "rank(C)<n",
        isCorrect: false,
        feedback: "还不对：rank(C)<n 表示方向不够，至少一个状态方向不可控。"
      },
      {
        label: "B",
        value: "x_dot = ax",
        isCorrect: false,
        feedback: "还不对：x_dot = ax 是一维稳定性入口。"
      },
      {
        label: "C",
        value: "rank(C)=n",
        isCorrect: true,
        feedback: "正确：rank(C)=n 表示输入影响覆盖了 n 个独立状态方向。"
      }
    ],
    goodNotesPrompt: "Page 002 写完了吗？",
    goodNotesExpected: "已记录：Page 002 至少有 B、AB、C=[B AB]、rank(C)<n 的失败解释。"
  },
  "lesson-stability": {
    prerequisite: "特征值 eigenvalue",
    conceptQuestion: "稳定性最朴素的问题是什么？",
    conceptAnswer: "答案：系统被推开以后，误差是回到 0 附近，还是越变越大。",
    formulaPrompt: "连续时间线性系统稳定时，特征值实部应该怎样？",
    formulaChoices: [
      {
        label: "A",
        value: "Re(\\lambda_i(A))<0",
        isCorrect: true,
        feedback: "正确：所有模态都衰减，状态才会回到平衡点附近。"
      },
      {
        label: "B",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：这是可控性，不是稳定性。"
      },
      {
        label: "C",
        value: "s u = K[R|t]X",
        isCorrect: false,
        feedback: "还不对：这是相机投影入口。"
      }
    ],
    goodNotesPrompt: "Page 003 写完了吗？",
    goodNotesExpected: "已记录：Page 003 至少有一维收敛/发散序列和 e^{At} 的直觉。"
  },
  "lesson-observability": {
    prerequisite: "状态、输入、输出",
    conceptQuestion: "可观性和可控性有什么反向关系？",
    conceptAnswer: "答案：可控性问输入能不能影响状态，可观性问输出能不能反推出状态。",
    formulaPrompt: "哪个表达式表示输出方程？",
    formulaChoices: [
      {
        label: "A",
        value: "y=Cx",
        isCorrect: true,
        feedback: "正确：y=Cx 表示内部状态经过输出矩阵变成可测输出。"
      },
      {
        label: "B",
        value: "u=-Kx",
        isCorrect: false,
        feedback: "还不对：这是反馈控制，不是观测输出。"
      },
      {
        label: "C",
        value: "x_dot = ax",
        isCorrect: false,
        feedback: "还不对：这是一维动态系统。"
      }
    ],
    goodNotesPrompt: "Page 004 写完了吗？",
    goodNotesExpected: "已记录：Page 004 至少有 y=Cx、O=[C; CA; ...]、rank(O)<n 的含义。"
  },
  "lesson-lyapunov": {
    prerequisite: "误差和反馈",
    conceptQuestion: "Lyapunov 函数为什么像能量表？",
    conceptAnswer: "答案：它衡量系统离平衡点有多远；如果能量一直下降，系统就往平衡点靠近。",
    formulaPrompt: "哪个条件最像“能量一直下降”？",
    formulaChoices: [
      {
        label: "A",
        value: "V_dot<0",
        isCorrect: true,
        feedback: "正确：V_dot<0 表示沿着系统轨迹，能量函数持续变小。"
      },
      {
        label: "B",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：rank(C)=n 是可控性条件。"
      },
      {
        label: "C",
        value: "z_t",
        isCorrect: false,
        feedback: "还不对：z_t 是世界模型里的潜变量。"
      }
    ],
    goodNotesPrompt: "Page 005 写完了吗？",
    goodNotesExpected: "已记录：Page 005 至少有碗底图、V 正定、V_dot<0 的中文解释。"
  },
  "lesson-state-feedback": {
    prerequisite: "误差和反馈",
    conceptQuestion: "状态反馈为什么叫反馈？",
    conceptAnswer: "答案：它读取当前状态或误差，再根据这个状态反过来生成控制输入。",
    formulaPrompt: "哪个公式表示状态反馈？",
    formulaChoices: [
      {
        label: "A",
        value: "y=Cx",
        isCorrect: false,
        feedback: "还不对：y=Cx 是输出方程。"
      },
      {
        label: "B",
        value: "u=-Kx",
        isCorrect: true,
        feedback: "正确：u=-Kx 表示根据当前状态 x 直接生成控制输入 u。"
      },
      {
        label: "C",
        value: "e^{At}",
        isCorrect: false,
        feedback: "还不对：e^{At} 是状态转移。"
      }
    ],
    goodNotesPrompt: "Page 006 写完了吗？",
    goodNotesExpected: "已记录：Page 006 至少有 u=-Kx、闭环 A-BK、可控性前提。"
  },
  "lesson-lqr": {
    prerequisite: "优化目标和约束",
    conceptQuestion: "LQR 的 Q 和 R 分别惩罚什么？",
    conceptAnswer: "答案：Q 惩罚状态误差，R 惩罚控制输入太大或太猛。",
    formulaPrompt: "哪个公式表达状态反馈形式？",
    formulaChoices: [
      {
        label: "A",
        value: "u=-R^{-1}B^TPx",
        isCorrect: true,
        feedback: "正确：LQR 最终仍然给出状态反馈，只是增益来自优化。"
      },
      {
        label: "B",
        value: "rank(O)=n",
        isCorrect: false,
        feedback: "还不对：这是可观性满秩条件。"
      },
      {
        label: "C",
        value: "p(z_{t+1}|z_t,a_t)",
        isCorrect: false,
        feedback: "还不对：这是世界模型的 latent dynamics。"
      }
    ],
    goodNotesPrompt: "Page 007 写完了吗？",
    goodNotesExpected: "已记录：Page 007 至少有 Q/R 调参直觉、J、u=-R^{-1}B^TPx。"
  },
  "lesson-kalman": {
    prerequisite: "概率和期望",
    conceptQuestion: "Kalman Filter 在融合哪两种信息？",
    conceptAnswer: "答案：它融合模型预测和传感器观测，根据信任程度给它们不同权重。",
    formulaPrompt: "哪个符号表示 Kalman 增益？",
    formulaChoices: [
      {
        label: "A",
        value: "K_k",
        isCorrect: true,
        feedback: "正确：K_k 决定这一步更信模型预测还是观测残差。"
      },
      {
        label: "B",
        value: "A-BK",
        isCorrect: false,
        feedback: "还不对：A-BK 是状态反馈后的闭环矩阵。"
      },
      {
        label: "C",
        value: "V_dot<0",
        isCorrect: false,
        feedback: "还不对：这是 Lyapunov 下降条件。"
      }
    ],
    goodNotesPrompt: "Page 008 写完了吗？",
    goodNotesExpected: "已记录：Page 008 至少有 predict、residual、update、K 大/小的含义。"
  },
  "lesson-lqg": {
    prerequisite: "状态、输入、输出",
    conceptQuestion: "LQG 为什么要用估计状态？",
    conceptAnswer: "答案：真实状态不一定能全部直接测到，所以先用 Kalman 得到 x_hat，再交给 LQR 控制。",
    formulaPrompt: "哪个控制律使用估计状态？",
    formulaChoices: [
      {
        label: "A",
        value: "u=-Lx_hat",
        isCorrect: true,
        feedback: "正确：LQG 控制器拿估计状态 x_hat 来做反馈。"
      },
      {
        label: "B",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：这是可控性条件。"
      },
      {
        label: "C",
        value: "s u = K[R|t]X",
        isCorrect: false,
        feedback: "还不对：这是相机投影。"
      }
    ],
    goodNotesPrompt: "Page 009 写完了吗？",
    goodNotesExpected: "已记录：Page 009 至少有 sensor -> x_hat、x_hat -> control 两条链。"
  },
  "lesson-mpc": {
    prerequisite: "优化目标和约束",
    conceptQuestion: "MPC 和 LQR 相比最工程化的优势是什么？",
    conceptAnswer: "答案：MPC 可以把速度、加速度、转角等约束直接写进优化问题。",
    formulaPrompt: "哪个表达式最像 MPC 的一步预测模型？",
    formulaChoices: [
      {
        label: "A",
        value: "x_{k+1}=Ax_k+Bu_k",
        isCorrect: true,
        feedback: "正确：MPC 用模型把每一步状态滚动预测到下一步。"
      },
      {
        label: "B",
        value: "rank(O)=n",
        isCorrect: false,
        feedback: "还不对：这是可观性判断。"
      },
      {
        label: "C",
        value: "x_dot = ax",
        isCorrect: false,
        feedback: "还不对：这是一维连续系统入口。"
      }
    ],
    goodNotesPrompt: "Page 010 写完了吗？",
    goodNotesExpected: "已记录：Page 010 至少有预测时域 N、目标函数、速度/加速度/转角约束。"
  },
  "lesson-robust": {
    prerequisite: "误差和反馈",
    conceptQuestion: "鲁棒控制为什么要关心最坏情况？",
    conceptAnswer: "答案：真实模型会有误差，控制器必须在扰动、延迟、湿滑路面下仍然别崩。",
    formulaPrompt: "哪个表达式表示最坏扰动放大被限制？",
    formulaChoices: [
      {
        label: "A",
        value: "\\|T_{zw}\\|_\\infty<\\gamma",
        isCorrect: true,
        feedback: "正确：H infinity 条件限制扰动 w 到性能输出 z 的最坏放大。"
      },
      {
        label: "B",
        value: "y=Cx",
        isCorrect: false,
        feedback: "还不对：这是输出方程。"
      },
      {
        label: "C",
        value: "u=-Kx",
        isCorrect: false,
        feedback: "还不对：这是状态反馈控制律。"
      }
    ],
    goodNotesPrompt: "Page 011 写完了吗？",
    goodNotesExpected: "已记录：Page 011 至少有扰动 w、性能输出 z、最坏情况放大。"
  },
  "lesson-nonlinear": {
    prerequisite: "方程组",
    conceptQuestion: "线性化为什么只在工作点附近可靠？",
    conceptAnswer: "答案：它用局部斜率近似真实非线性系统，离工作点太远时斜率关系会变。",
    formulaPrompt: "哪个表达式是非线性系统入口？",
    formulaChoices: [
      {
        label: "A",
        value: "x_dot=f(x,u)",
        isCorrect: true,
        feedback: "正确：真实系统通常先写成 x_dot=f(x,u)，再在工作点线性化。"
      },
      {
        label: "B",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：这是可控性条件。"
      },
      {
        label: "C",
        value: "K_k",
        isCorrect: false,
        feedback: "还不对：这是 Kalman 增益。"
      }
    ],
    goodNotesPrompt: "Page 012 写完了吗？",
    goodNotesExpected: "已记录：Page 012 至少有 x_dot=f(x,u)、工作点、Jacobian A/B。"
  },
  "lesson-stochastic-control": {
    prerequisite: "概率和期望",
    conceptQuestion: "随机控制比普通最优控制多考虑什么？",
    conceptAnswer: "答案：它把噪声、风险和多种可能未来放进期望代价里。",
    formulaPrompt: "哪个对象表示从当前状态开始的未来最优代价？",
    formulaChoices: [
      {
        label: "A",
        value: "V_t(x)",
        isCorrect: true,
        feedback: "正确：V_t(x) 是值函数，用来表示从当前状态开始的未来最优期望代价。"
      },
      {
        label: "B",
        value: "A-BK",
        isCorrect: false,
        feedback: "还不对：这是闭环矩阵。"
      },
      {
        label: "C",
        value: "rank(O)=n",
        isCorrect: false,
        feedback: "还不对：这是可观性条件。"
      }
    ],
    goodNotesPrompt: "Page 013 写完了吗？",
    goodNotesExpected: "已记录：Page 013 至少有状态、动作、扰动、代价、Bellman 直觉。"
  },
  "lesson-world-spatial-interface": {
    prerequisite: "论文阅读四件套",
    conceptQuestion: "世界模型和空间模型分别给控制提供什么？",
    conceptAnswer: "答案：空间模型告诉哪里有什么，世界模型预演动作后未来可能怎么变。",
    formulaPrompt: "哪个表达式表示世界模型的 latent dynamics？",
    formulaChoices: [
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
        feedback: "还不对：这是控制律。"
      },
      {
        label: "C",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：这是可控性判断。"
      }
    ],
    goodNotesPrompt: "Page 014 写完了吗？",
    goodNotesExpected: "已记录：Page 014 至少有 latent dynamics、camera projection、failure mode。"
  },
  "lesson-rigid-camera-projection": {
    prerequisite: "齐次坐标",
    conceptQuestion: "为什么 SLAM 里要把 R 和 t 放进同一个 T 矩阵？",
    conceptAnswer: "答案：因为位姿同时包含旋转和平移，齐次矩阵能用一次矩阵乘法完成坐标变换。",
    formulaPrompt: "哪个表达式表示三维点投影到像素？",
    formulaChoices: [
      {
        label: "A",
        value: "s\\tilde{u}=K[R|t]\\tilde{X}",
        isCorrect: true,
        feedback: "正确：外参先把世界点放到相机里，内参再把它投到像素。"
      },
      {
        label: "B",
        value: "rank(C)=n",
        isCorrect: false,
        feedback: "还不对：这是可控性检查，不是相机投影。"
      },
      {
        label: "C",
        value: "V_dot<0",
        isCorrect: false,
        feedback: "还不对：这是 Lyapunov 稳定性入口。"
      }
    ],
    goodNotesPrompt: "Page SLAM-001 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-001 至少有 world/camera/image 三层、T、K、投影链。"
  },
  "lesson-feature-epipolar-geometry": {
    prerequisite: "像素和相机内参",
    conceptQuestion: "对极几何为什么能筛掉错误匹配？",
    conceptAnswer: "答案：同一个三维点在两张图里的像素必须满足 x2^T F x1=0，不满足的匹配大概率是错的。",
    formulaPrompt: "哪个公式是两视图匹配的对极约束？",
    formulaChoices: [
      {
        label: "A",
        value: "\\tilde{x}_2^TF\\tilde{x}_1=0",
        isCorrect: true,
        feedback: "正确：这是两视图几何里最核心的匹配约束。"
      },
      {
        label: "B",
        value: "u=-Kx",
        isCorrect: false,
        feedback: "还不对：这是状态反馈。"
      },
      {
        label: "C",
        value: "p(z_{t+1}|z_t,a_t)",
        isCorrect: false,
        feedback: "还不对：这是世界模型动态。"
      }
    ],
    goodNotesPrompt: "Page SLAM-002 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-002 至少有两相机、匹配点、对极线、三角化。"
  },
  "lesson-slam-backend-pose-graph": {
    prerequisite: "重投影误差",
    conceptQuestion: "SLAM 后端在优化什么？",
    conceptAnswer: "答案：它调整位姿和地图点，让重投影误差、相对位姿误差、回环约束整体最小。",
    formulaPrompt: "哪个对象是视觉 BA 的核心误差？",
    formulaChoices: [
      {
        label: "A",
        value: "u_{ij}-\\pi(T_iX_j)",
        isCorrect: true,
        feedback: "正确：预测像素和观测像素的差就是重投影误差。"
      },
      {
        label: "B",
        value: "A-BK",
        isCorrect: false,
        feedback: "还不对：这是控制闭环矩阵。"
      },
      {
        label: "C",
        value: "T_i only",
        isCorrect: false,
        feedback: "还不对：只列出位姿不等于定义优化误差。"
      }
    ],
    goodNotesPrompt: "Page SLAM-003 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-003 至少有 frontend/backend、BA、pose graph、loop closure。"
  },
  "lesson-sfm-mvs-nerf-3dgs": {
    prerequisite: "位姿和轨迹",
    conceptQuestion: "SfM、MVS、NeRF、3DGS 的先后关系是什么？",
    conceptAnswer: "答案：SfM 先估计相机位姿和稀疏点，MVS 补密集几何，NeRF/3DGS 用图像和位姿学习可渲染场景。",
    formulaPrompt: "哪个表达式表示 NeRF 沿光线累加颜色？",
    formulaChoices: [
      {
        label: "A",
        value: "\\hat{C}(r)=\\sum_i T_i(1-e^{-\\sigma_i\\delta_i})c_i",
        isCorrect: true,
        feedback: "正确：NeRF 的离散体渲染就是沿光线加权累加颜色。"
      },
      {
        label: "B",
        value: "rank(O)=n",
        isCorrect: false,
        feedback: "还不对：这是可观性条件。"
      },
      {
        label: "C",
        value: "x_dot=Ax+Bu",
        isCorrect: false,
        feedback: "还不对：这是状态空间入口。"
      }
    ],
    goodNotesPrompt: "Page SLAM-004 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-004 至少有 SfM/MVS/COLMAP/NeRF/3DGS 的资产链和边界。"
  },
  "lesson-quaternion-orientation": {
    prerequisite: "位姿和轨迹",
    conceptQuestion: "四元数在 SLAM 里主要解决什么问题？",
    conceptAnswer:
      "答案：它用单位四元数稳定表达三维朝向，避免欧拉角万向节锁，并方便把姿态连续插值和组合。",
    formulaPrompt: "哪个表达式表示用单位四元数旋转三维向量？",
    formulaChoices: [
      {
        label: "A",
        value: "v'=qvq^{-1}",
        isCorrect: true,
        feedback: "正确：把三维向量当成纯虚四元数，夹在 q 和 q^{-1} 中间就得到旋转后的向量。"
      },
      {
        label: "B",
        value: "rank(\\mathcal{C})=n",
        isCorrect: false,
        feedback: "还不对：这是可控性满秩条件。"
      },
      {
        label: "C",
        value: "\\hat{C}(r)=\\sum_iT_i\\alpha_ic_i",
        isCorrect: false,
        feedback: "还不对：这是 NeRF/3DGS 相关的渲染累加直觉。"
      }
    ],
    goodNotesPrompt: "Page SLAM-005 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-005 至少有 q、-q、半角、v'=qvq^{-1} 和一个相机姿态例子。"
  },
  "lesson-vio-imu-preintegration": {
    prerequisite: "位姿和轨迹",
    conceptQuestion: "VIO 为什么要把相机和 IMU 放在一起？",
    conceptAnswer:
      "答案：相机提供外界几何纠偏，IMU 提供高频运动约束；二者融合后能在低纹理、快速运动和短时遮挡中保持轨迹连续。",
    formulaPrompt: "哪个对象最像 IMU 预积分的压缩测量？",
    formulaChoices: [
      {
        label: "A",
        value: "\\Delta R_{ij},\\Delta v_{ij},\\Delta p_{ij}",
        isCorrect: true,
        feedback: "正确：预积分把关键帧之间的 IMU 测量压缩成旋转、速度和位置增量。"
      },
      {
        label: "B",
        value: "rank(\\mathcal{O})=n",
        isCorrect: false,
        feedback: "还不对：这是可观性检查，不是 IMU 预积分。"
      },
      {
        label: "C",
        value: "q\\sim -q",
        isCorrect: false,
        feedback: "还不对：这是四元数双覆盖，不是视觉惯性约束。"
      }
    ],
    goodNotesPrompt: "Page SLAM-006 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-006 至少有 camera keyframes、IMU arrows、Delta R/v/p、bias drift。"
  },
  "lesson-lidar-icp-lio-sam": {
    prerequisite: "坐标系和单位",
    conceptQuestion: "LiDAR SLAM 的配准在比较什么？",
    conceptAnswer:
      "答案：它比较当前点云经过 R,t 变换后，和目标 scan 或 map 的点、线、面是否对齐。",
    formulaPrompt: "哪个表达式表示点到面 ICP 残差？",
    formulaChoices: [
      {
        label: "A",
        value: "n_i^T(Rp_i+t-q_i)",
        isCorrect: true,
        feedback: "正确：点到面残差衡量变换后的点到局部平面的距离。"
      },
      {
        label: "B",
        value: "p(z_{t+1}|z_t,a_t)",
        isCorrect: false,
        feedback: "还不对：这是世界模型 latent dynamics。"
      },
      {
        label: "C",
        value: "x_2^TFx_1=0",
        isCorrect: false,
        feedback: "还不对：这是视觉两视图的对极约束。"
      }
    ],
    goodNotesPrompt: "Page SLAM-007 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-007 至少有 ICP、point-to-plane、scan-to-map、LIO factor graph。"
  },
  "lesson-semantic-neural-slam-map": {
    prerequisite: "论文阅读四件套",
    conceptQuestion: "语义和神经 SLAM 地图比几何地图多了什么？",
    conceptAnswer:
      "答案：它们多了物体/区域语义、可通行关系或连续神经场表示，但仍要接受定位误差、漂移和验证资产边界检查。",
    formulaPrompt: "哪个表达式最像神经场地图？",
    formulaChoices: [
      {
        label: "A",
        value: "F_\\theta(x)\\rightarrow(\\sigma,c,s)",
        isCorrect: true,
        feedback: "正确：神经场用连续函数把空间点映射到密度、颜色和语义。"
      },
      {
        label: "B",
        value: "u=-Kx",
        isCorrect: false,
        feedback: "还不对：这是状态反馈控制。"
      },
      {
        label: "C",
        value: "\\min_{R,t}\\sum_i\\lVert Rp_i+t-q_i\\rVert^2",
        isCorrect: false,
        feedback: "还不对：这是 ICP 配准，不是神经场地图。"
      }
    ],
    goodNotesPrompt: "Page SLAM-008 写完了吗？",
    goodNotesExpected: "已记录：Page SLAM-008 至少有 semantic map、neural field、tracking/map consistency、validation boundary。"
  }
};

const guidedControlLessonSeeds: GuidedLessonSeed[] = [
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
  },
  {
    id: "lesson-rigid-camera-projection",
    title: "第 15 课：刚体变换与相机投影",
    goal: "从零理解 SLAM 的第一步：同一个三维点如何从世界坐标、相机坐标变成像素。",
    formula:
      "T_{w\\leftarrow c}=\\begin{bmatrix}R&t\\\\0&1\\end{bmatrix},\\quad s\\tilde{u}=K[R\\mid t]\\tilde{X}",
    formulaTerms: [...slamTransformFormulaTerms, ...slamProjectionFormulaTerms],
    now: "现在做：在 GoodNotes 画 world -> camera -> image 三层坐标，不急着写代码。",
    goodNotesPage: "GoodNotes Page SLAM-001：刚体变换与相机投影",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> Camera Projection",
    notionRow: "Notion row：Topic=SLAM projection, Mastery=1, Evidence=GoodNotes Page SLAM-001",
    steps: [
      {
        label: "Step 1",
        instruction: "画 world、camera、image 三层。",
        output: "明确 X 是 3D 点，u 是像素点。"
      },
      {
        label: "Step 2",
        instruction: "写 T_{w\\leftarrow c} 里的 R 和 t。",
        output: "R 管朝向，t 管位置，T 把它们合成一个位姿。"
      },
      {
        label: "Step 3",
        instruction: "写 s\\tilde{u}=K[R|t]\\tilde{X}。",
        output: "外参先换坐标，内参再投像素。"
      },
      {
        label: "Step 4",
        instruction: "把公式接到 SLAM。",
        output: "SLAM 后面所有误差都要比较预测像素和真实像素。"
      },
      {
        label: "Step 5",
        instruction: "在 Obsidian 连接 Camera Model、Pose、Projection。",
        output: "建立 SLAM 主线的第一个概念三角。"
      }
    ],
    selfCheck: ["T 同时包含 R 和 t", "K 是相机内参", "投影要除掉齐次尺度 s"]
  },
  {
    id: "lesson-feature-epipolar-geometry",
    title: "第 16 课：特征匹配与对极几何",
    goal: "理解视觉 SLAM 前端如何从两张图的匹配点估计相机运动和三维点。",
    formula:
      "\\tilde{x}_2^TF\\tilde{x}_1=0,\\quad E=[t]_\\times R,\\quad \\min_X\\sum_i\\|u_i-\\pi(T_iX)\\|^2",
    formulaTerms: epipolarFormulaTerms,
    now: "现在做：画两台相机、一个三维点、两条成像光线和一条对极线。",
    goodNotesPage: "GoodNotes Page SLAM-002：特征匹配与对极几何",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> Epipolar Geometry",
    notionRow: "Notion row：Topic=Epipolar geometry, Mastery=1, Evidence=GoodNotes Page SLAM-002",
    steps: [
      {
        label: "Step 1",
        instruction: "先定义 feature matching。",
        output: "同一个角点或描述子在两张图里找到对应像素。"
      },
      {
        label: "Step 2",
        instruction: "写对极约束 \\tilde{x}_2^TF\\tilde{x}_1=0。",
        output: "错误匹配通常不满足这条几何约束。"
      },
      {
        label: "Step 3",
        instruction: "写 E=[t]_\\times R。",
        output: "内参已知时，相对位姿进入本质矩阵。"
      },
      {
        label: "Step 4",
        instruction: "解释 triangulation。",
        output: "两条光线交会的位置就是三维点估计。"
      },
      {
        label: "Step 5",
        instruction: "在 Obsidian 连接 Feature、Epipolar、Triangulation。",
        output: "前端跟踪不再是黑箱。"
      }
    ],
    selfCheck: ["feature matching", "epipolar constraint", "triangulation"]
  },
  {
    id: "lesson-slam-backend-pose-graph",
    title: "第 17 课：SLAM 后端与位姿图优化",
    goal: "把视觉 SLAM 和 LiDAR SLAM 的后端都看成误差最小化问题。",
    formula:
      "\\min_{T_i,X_j}\\sum_{i,j}\\|u_{ij}-\\pi(T_iX_j)\\|^2_{\\Sigma^{-1}},\\quad \\min_{T_i}\\sum_{(i,j)}\\|\\log(Z_{ij}^{-1}T_i^{-1}T_j)\\|^2_{\\Omega_{ij}}",
    formulaTerms: slamBackendFormulaTerms,
    now: "现在做：画 pose graph，节点是位姿，边是里程计、匹配或回环约束。",
    goodNotesPage: "GoodNotes Page SLAM-003：BA 与位姿图优化",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> Backend Optimization",
    notionRow: "Notion row：Topic=SLAM backend, Mastery=1, Evidence=GoodNotes Page SLAM-003",
    steps: [
      {
        label: "Step 1",
        instruction: "区分 frontend 和 backend。",
        output: "前端提供匹配、里程计和候选回环；后端负责整体一致。"
      },
      {
        label: "Step 2",
        instruction: "写 BA 目标。",
        output: "同时调相机位姿 T_i 和三维点 X_j，让重投影误差最小。"
      },
      {
        label: "Step 3",
        instruction: "写 pose graph 目标。",
        output: "只优化位姿节点，让相对位姿约束尽量一致。"
      },
      {
        label: "Step 4",
        instruction: "解释 loop closure。",
        output: "回到旧地点时增加一条强约束，减少累计漂移。"
      },
      {
        label: "Step 5",
        instruction: "把输出接到 validation asset。",
        output: "trajectory、drift、coverage、RMSE 都可以成为证据。"
      }
    ],
    selfCheck: ["frontend/backend", "bundle adjustment", "pose graph + loop closure"]
  },
  {
    id: "lesson-sfm-mvs-nerf-3dgs",
    title: "第 18 课：SfM/MVS 到 NeRF/3DGS 重建",
    goal: "把 COLMAP、NeRF、3DGS 放进同一条三维重建资产链，并区分可渲染和可仿真。",
    formula:
      "\\hat{C}(r)=\\sum_i T_i(1-e^{-\\sigma_i\\delta_i})c_i,\\quad \\Sigma'=JW\\Sigma W^TJ^T",
    formulaTerms: nerfGaussianFormulaTerms,
    now: "现在做：画 Images -> COLMAP SfM -> MVS -> NeRF/3DGS -> validation asset。",
    goodNotesPage: "GoodNotes Page SLAM-004：COLMAP 到 NeRF/3DGS",
    obsidianNode: "Obsidian node：World-Spatial -> Reconstruction -> Asset Pipeline",
    notionRow: "Notion row：Topic=SfM/MVS/NeRF/3DGS, Mastery=1, Evidence=GoodNotes Page SLAM-004",
    steps: [
      {
        label: "Step 1",
        instruction: "写 SfM 输入和输出。",
        output: "输入是多视角图像，输出是相机位姿和稀疏点云。"
      },
      {
        label: "Step 2",
        instruction: "写 MVS 的作用。",
        output: "在已知相机位姿上补出更密的几何。"
      },
      {
        label: "Step 3",
        instruction: "写 NeRF 体渲染。",
        output: "它学习沿光线的颜色和密度，不等于仿真物理资产。"
      },
      {
        label: "Step 4",
        instruction: "写 3DGS 高斯投影。",
        output: "它渲染快，适合视觉资产，但碰撞和语义要另外建模。"
      },
      {
        label: "Step 5",
        instruction: "标注 stable / reconstruction 边界。",
        output: "能进稳定验证的必须有 mesh、OpenDRIVE、collision proxy 或明确证据。"
      }
    ],
    selfCheck: ["COLMAP produces poses", "NeRF/3DGS are renderable representations", "CARLA needs physical/semantic assets"]
  },
  {
    id: "lesson-quaternion-orientation",
    title: "第 19 课：四元数与三维姿态",
    goal: "把四元数从抽象公式变成 SLAM、IMU 和相机姿态里能用的旋转表示。",
    formula:
      "q=\\cos\\frac{\\theta}{2}+\\sin\\frac{\\theta}{2}(u_xi+u_yj+u_zk),\\quad v'=qvq^{-1},\\quad q\\sim -q",
    formulaTerms: quaternionFormulaTerms,
    now: "现在做：打开 Manim Studio 的 Quaternion Explorable，再在 GoodNotes 写 Page SLAM-005。",
    goodNotesPage: "GoodNotes Page SLAM-005：四元数与三维姿态",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> Quaternion Orientation",
    notionRow: "Notion row：Topic=Quaternion orientation, Mastery=1, Evidence=GoodNotes Page SLAM-005",
    steps: [
      {
        label: "Step 1",
        instruction: "先写单位四元数 q=w+xi+yj+zk, ||q||=1。",
        output: "明确单位长度表示只保留旋转，不额外缩放向量。"
      },
      {
        label: "Step 2",
        instruction: "把轴角写成 q=cos(theta/2)+u sin(theta/2)。",
        output: "解释为什么公式里出现半角，而不是直接用 theta。"
      },
      {
        label: "Step 3",
        instruction: "画 q 和 -q 的双覆盖。",
        output: "说明两个对跖点对应同一个三维旋转。"
      },
      {
        label: "Step 4",
        instruction: "写 v'=qvq^{-1}。",
        output: "把三维向量当成纯虚四元数，再用旋转夹心得到 v'。"
      },
      {
        label: "Step 5",
        instruction: "接到 SLAM/IMU 姿态。",
        output: "写一行：camera/imu orientation can be stored as unit quaternion。"
      }
    ],
    selfCheck: ["单位四元数", "双覆盖 q 和 -q", "旋转夹心 qvq^{-1}", "乘法顺序不可交换"]
  },
  {
    id: "lesson-vio-imu-preintegration",
    title: "第 20 课：VIO 与 IMU 预积分",
    goal: "理解视觉惯性里程计如何把相机关键帧和高频 IMU 测量放进同一个状态估计问题。",
    formula:
      "\\Delta R_{ij},\\Delta v_{ij},\\Delta p_{ij}=\\int_i^j(\\omega_m-b_g,a_m-b_a),\\quad r_{imu}(x_i,x_j,b_i)",
    formulaTerms: vioImuFormulaTerms,
    now: "现在做：画两个相机关键帧，中间画很多 IMU 小测量，并压缩成一个预积分因子。",
    goodNotesPage: "GoodNotes Page SLAM-006：VIO 与 IMU 预积分",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> VIO Preintegration",
    notionRow: "Notion row：Topic=VIO preintegration, Mastery=1, Evidence=GoodNotes Page SLAM-006",
    steps: [
      {
        label: "Step 1",
        instruction: "区分 camera keyframe 和 IMU sample。",
        output: "相机低频但看见外界，IMU 高频但会漂。"
      },
      {
        label: "Step 2",
        instruction: "写 Delta R、Delta v、Delta p。",
        output: "关键帧之间的很多 IMU 测量被压缩成一个相对运动约束。"
      },
      {
        label: "Step 3",
        instruction: "写 b_g 和 b_a。",
        output: "陀螺和加计偏置必须估计，否则积分会持续漂移。"
      },
      {
        label: "Step 4",
        instruction: "把 IMU 因子接到 SLAM 后端。",
        output: "VIO 后端同时最小化视觉重投影误差和 IMU 预积分残差。"
      },
      {
        label: "Step 5",
        instruction: "写一个失败模式。",
        output: "快速运动、低纹理、时间同步错误或 IMU bias 都会让 VIO 变差。"
      }
    ],
    selfCheck: ["camera keyframe", "IMU sample", "preintegration", "bias drift", "visual + inertial residual"]
  },
  {
    id: "lesson-lidar-icp-lio-sam",
    title: "第 21 课：LiDAR SLAM、ICP 与 LIO",
    goal: "把 LiDAR 点云配准、ICP/NDT、scan-to-map 和 LIO 因子图串成一条可验证的定位建图线。",
    formula:
      "\\min_{R,t}\\sum_i\\lVert Rp_i+t-q_i\\rVert^2,\\quad n_i^T(Rp_i+t-q_i),\\quad \\mathcal{G}=\\{r_{lidar},r_{imu},r_{loop}\\}",
    formulaTerms: lidarSlamFormulaTerms,
    now: "现在做：画两帧点云，一帧用 R,t 对齐到另一帧，再写 point-to-plane residual。",
    goodNotesPage: "GoodNotes Page SLAM-007：LiDAR SLAM、ICP 与 LIO",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> LiDAR ICP LIO",
    notionRow: "Notion row：Topic=LiDAR SLAM and LIO, Mastery=1, Evidence=GoodNotes Page SLAM-007",
    steps: [
      {
        label: "Step 1",
        instruction: "先写 scan、map、transform。",
        output: "LiDAR SLAM 的核心是把当前 scan 对齐到上一帧或局部地图。"
      },
      {
        label: "Step 2",
        instruction: "写点到点 ICP。",
        output: "先理解 R,t 如何让两团点云重合。"
      },
      {
        label: "Step 3",
        instruction: "写点到面残差。",
        output: "真实 LiDAR scan-to-map 更常用局部平面约束。"
      },
      {
        label: "Step 4",
        instruction: "接入 IMU 和回环。",
        output: "LIO 因子图把 LiDAR、IMU、先验和回环放进同一个优化问题。"
      },
      {
        label: "Step 5",
        instruction: "写验证指标。",
        output: "漂移、地图重叠、回环一致性、定位跳变都要成为证据。"
      }
    ],
    selfCheck: ["ICP", "point-to-plane residual", "scan-to-map", "IMU factor", "loop closure"]
  },
  {
    id: "lesson-semantic-neural-slam-map",
    title: "第 22 课：语义与神经 SLAM 地图",
    goal: "把几何地图升级到语义地图和神经场地图，同时保留验证资产边界，不把漂亮渲染误认为稳定可用。",
    formula:
      "\\mathcal{M}_s=(\\mathcal{G},\\mathcal{L}),\\quad F_\\theta(x)\\rightarrow(\\sigma,c,s),\\quad \\min_{T,\\theta}\\mathcal{L}_{photo}+\\lambda\\mathcal{L}_{sem}",
    formulaTerms: semanticNeuralSlamFormulaTerms,
    now: "现在做：画一张几何地图，给区域加语义标签，再画一个神经场 F_theta(x)。",
    goodNotesPage: "GoodNotes Page SLAM-008：语义与神经 SLAM 地图",
    obsidianNode: "Obsidian node：World-Spatial -> SLAM -> Semantic Neural Map",
    notionRow: "Notion row：Topic=Semantic and neural SLAM map, Mastery=1, Evidence=GoodNotes Page SLAM-008",
    steps: [
      {
        label: "Step 1",
        instruction: "先写几何地图。",
        output: "几何回答哪里有点、面、障碍和自由空间。"
      },
      {
        label: "Step 2",
        instruction: "加语义标签。",
        output: "语义告诉 planner 这是车道、路沿、建筑、动态物体还是可通行区域。"
      },
      {
        label: "Step 3",
        instruction: "写神经场。",
        output: "F_theta 用连续函数表示空间里的颜色、密度和语义。"
      },
      {
        label: "Step 4",
        instruction: "写跟踪-建图一致性。",
        output: "轨迹和地图要一起解释观测，否则重渲染和定位都会偏。"
      },
      {
        label: "Step 5",
        instruction: "写验证边界。",
        output: "语义/神经地图要进入稳定验证，还需要尺度、坐标、语义质量和物理可用证据。"
      }
    ],
    selfCheck: ["semantic map", "neural field", "photo loss", "semantic loss", "validation boundary"]
  }
];

export const guidedControlLessons: GuidedLesson[] = guidedControlLessonSeeds.map((lesson) => ({
  ...lesson,
  manimScene: buildGuidedLessonManimScene({
    ...lesson,
    bridgeIntuition: beginnerLessonBridges[lesson.id]?.intuition
  }),
  readyCheck: lessonReadyChecks[lesson.id]
}));

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
    title: "SLAM reconstruction first line",
    focus: "Start from pose, projection, epipolar geometry, backend optimization, then COLMAP/NeRF/3DGS.",
    prompt: "Open lessons 15-18, write one GoodNotes page, and keep the output as trajectory, map, reconstruction asset, or formula evidence.",
    goodNotes: "GoodNotes: SLAM-001 to SLAM-004",
    obsidian: "Obsidian: World-Spatial -> SLAM and Reconstruction",
    notion: "Notion: Track=World & Spatial Models, Status=Active, Evidence=GoodNotes SLAM page"
  },
  {
    title: "Quaternion orientation sprint",
    focus: "Use the Manim quaternion explorable before writing SLAM pose notes.",
    prompt: "Explain unit quaternion, q and -q double cover, and v'=qvq^{-1} without looking at the formula card.",
    goodNotes: "GoodNotes: SLAM-005 四元数与三维姿态",
    obsidian: "Obsidian: World-Spatial -> SLAM -> Quaternion Orientation",
    notion: "Notion: Topic=Quaternion orientation, Evidence=GoodNotes SLAM-005"
  },
  {
    title: "VIO and LiDAR SLAM sprint",
    focus: "After quaternion orientation, move into sensor-fusion SLAM before semantic/neural maps.",
    prompt: "Explain IMU preintegration, point-to-plane ICP, and one failure mode for VIO or LIO in your own words.",
    goodNotes: "GoodNotes: SLAM-006 to SLAM-007",
    obsidian: "Obsidian: World-Spatial -> SLAM -> Sensor Fusion",
    notion: "Notion: Topic=VIO/LiDAR SLAM, Evidence=GoodNotes SLAM-006/007"
  },
  {
    title: "Semantic neural map sprint",
    focus: "Use semantic and neural SLAM as the bridge from geometry to spatial intelligence.",
    prompt: "Draw geometry, semantic labels, and neural field F_theta(x), then mark why it is not automatically a stable validation asset.",
    goodNotes: "GoodNotes: SLAM-008 语义与神经 SLAM 地图",
    obsidian: "Obsidian: World-Spatial -> SLAM -> Semantic Neural Map",
    notion: "Notion: Topic=Semantic/Neural SLAM, Evidence=GoodNotes SLAM-008"
  },
  {
    title: "3Blue1Brown visual math sprint",
    focus: "Pick one visual route and produce one reusable math-to-engineering note.",
    prompt: "Explain the visual intuition, draw one GoodNotes diagram, and connect it to SLAM, control, perception, or spatial models.",
    goodNotes: "GoodNotes: 3B1B-M00x",
    obsidian: "Obsidian: 3Blue1Brown -> Autonomous-Driving Math Route",
    notion: "Notion: Track = 3Blue1Brown, Evidence = video note + minimal experiment"
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
      "先算 B 与 AB，再继续到第 n-1 阶传播项",
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
  },
  {
    title: "Kalman prediction-update",
    formula:
      "\\hat{x}_{k|k-1}=A\\hat{x}_{k-1|k-1}+Bu_k,\\quad K_k=P_{k|k-1}C^T(CP_{k|k-1}C^T+R)^{-1}",
    formulaTerms: kalmanFormulaTerms,
    steps: [
      "先写模型预测，只用 A, B 和上一时刻估计。",
      "写观测残差 y_k-C\\hat{x}_{k|k-1}，说明传感器看到什么偏差。",
      "用 Kalman 增益 K_k 决定更信模型还是更信观测。",
      "把修正后的 \\hat{x}_{k|k} 连接到定位或目标状态估计。"
    ],
    output: "one estimator page showing prediction, residual, gain, and correction"
  },
  {
    title: "MPC constrained rollout",
    formula:
      "\\min_{u_{0:N-1}}\\sum_{k=0}^{N-1}(x_k^TQx_k+u_k^TRu_k),\\quad x_{k+1}=Ax_k+Bu_k,\\quad x_k\\in\\mathcal{X},u_k\\in\\mathcal{U}",
    formulaTerms: mpcFormulaTerms,
    steps: [
      "先定义预测时域 N，说明每次只看有限未来。",
      "把状态误差和控制幅度写成 cost。",
      "把速度、转角、加速度或安全边界写成约束。",
      "解释为什么 MPC 每次重算但只执行第一步。"
    ],
    output: "one constrained-planning card tied to vehicle control or trajectory tracking"
  },
  {
    title: "World model imagined rollout",
    formula: "p(z_{t+1}\\mid z_t,a_t),\\quad \\hat{r}_t=r_\\theta(z_t,a_t),\\quad \\hat{v}_t=v_\\theta(z_t)",
    formulaTerms: worldSpatialFormulaTerms,
    steps: [
      "把真实观测压成 latent state z_t。",
      "用动作 a_t 在模型里想象下一步 z_{t+1}。",
      "分别写 reward prediction 和 value prediction。",
      "标出 imagined rollout 可能偏离真实世界的地方。"
    ],
    output: "one world-model page separating representation, transition, reward, and value"
  },
  {
    title: "Camera projection to BEV",
    formula:
      "s\\begin{bmatrix}u\\\\v\\\\1\\end{bmatrix}=K[R\\mid t]X,\\quad X_{bev}=T_{ego\\leftarrow camera}X",
    formulaTerms: worldSpatialFormulaTerms,
    steps: [
      "先写三维点 X 和图像像素 (u,v)。",
      "用内参 K 和外参 [R|t] 解释相机投影。",
      "再把点转到 ego 或 BEV 坐标。",
      "说明 BEV 表示为什么适合规划和占据理解。"
    ],
    output: "one spatial-model sketch linking camera geometry, BEV grid, and driving decisions"
  },
  {
    title: "SLAM rigid transform and projection",
    formula:
      "T_{w\\leftarrow c}=\\begin{bmatrix}R&t\\\\0&1\\end{bmatrix},\\quad s\\tilde{u}=K[R\\mid t]\\tilde{X}",
    formulaTerms: [...slamTransformFormulaTerms, ...slamProjectionFormulaTerms],
    steps: [
      "画 world、camera、image 三层坐标。",
      "解释 R、t、T 分别负责朝向、位置和整个位姿。",
      "把三维点投影到像素，标出齐次尺度 s。"
    ],
    output: "one SLAM-001 page linking coordinate transform to camera projection"
  },
  {
    title: "Epipolar geometry and triangulation",
    formula: "\\tilde{x}_2^TF\\tilde{x}_1=0,\\quad E=[t]_\\times R,\\quad \\min_X\\sum_i\\|u_i-\\pi(T_iX)\\|^2",
    formulaTerms: epipolarFormulaTerms,
    steps: [
      "画两台相机和同一个三维点。",
      "写对极约束，说明它如何过滤错误匹配。",
      "用三角化解释多视角怎样恢复三维点。"
    ],
    output: "one SLAM-002 page with feature matching, epipolar line, and triangulation"
  },
  {
    title: "Bundle adjustment and pose graph",
    formula:
      "\\min_{T_i,X_j}\\sum_{i,j}\\|u_{ij}-\\pi(T_iX_j)\\|^2_{\\Sigma^{-1}},\\quad \\min_{T_i}\\sum_{(i,j)}\\|\\log(Z_{ij}^{-1}T_i^{-1}T_j)\\|^2_{\\Omega_{ij}}",
    formulaTerms: slamBackendFormulaTerms,
    steps: [
      "把相机位姿画成节点，把相对位姿或匹配画成边。",
      "区分 BA 同时优化位姿和点，pose graph 主要优化位姿。",
      "用 loop closure 解释为什么回到旧地点能减少漂移。"
    ],
    output: "one SLAM-003 page comparing visual BA and pose graph optimization"
  },
  {
    title: "NeRF and 3DGS rendering equations",
    formula: "\\hat{C}(r)=\\sum_i T_i(1-e^{-\\sigma_i\\delta_i})c_i,\\quad \\Sigma'=JW\\Sigma W^TJ^T",
    formulaTerms: nerfGaussianFormulaTerms,
    steps: [
      "写 NeRF 沿光线累加颜色和密度。",
      "写 3DGS 如何把三维高斯投影到图像。",
      "标注 renderable representation 和 CARLA physical asset 的边界。"
    ],
    output: "one SLAM-004 page connecting COLMAP poses, NeRF, 3DGS, and validation assets"
  },
  {
    title: "Quaternion orientation sandwich",
    formula:
      "q=\\cos\\frac{\\theta}{2}+\\sin\\frac{\\theta}{2}(u_xi+u_yj+u_zk),\\quad v'=qvq^{-1},\\quad q\\sim -q",
    formulaTerms: quaternionFormulaTerms,
    steps: [
      "先写单位四元数和轴角形式，标出 theta/2。",
      "画 q 和 -q 的对跖点，说明它们代表同一个三维旋转。",
      "把向量 v 当成纯虚四元数，手写 v'=qvq^{-1} 的角色分解。",
      "写一个相机或 IMU 姿态用 quaternion 存储的工程例子。"
    ],
    output: "one SLAM-005 page linking quaternion rotation to camera/IMU orientation"
  },
  {
    title: "Reconstruction SLAM pose-prior handoff",
    formula:
      "\\mathcal{H}_{slam}=\\{T_{map\\leftarrow base}(t),\\ \\mathrm{GlobalMap},\\ \\mathrm{alignment\\ diagnostics}\\}",
    formulaTerms: [
      {
        label: "Pose prior",
        symbol: "T_{map\\leftarrow base}(t)",
        meaning: "SLAM 输出的时间序列位姿，用来给重建、地图刷新或资产对齐提供先验。"
      },
      {
        label: "GlobalMap",
        symbol: "\\mathrm{GlobalMap.pcdrgb}",
        meaning: "重建线产出的带颜色点云地图，是后续资产检查和可视化的核心证据。"
      },
      {
        label: "Alignment diagnostics",
        symbol: "\\mathrm{RMSE},\\ \\mathrm{coverage}",
        meaning: "用对齐误差、覆盖率和连续性判断 SLAM 结果能否进入验证资产链。"
      }
    ],
    steps: [
      "把 SLAM 定位成离线生产者，不放进稳定实时控制闭环。",
      "检查轨迹、GlobalMap 和 alignment diagnostics 是否齐全。",
      "把 pose prior 交给重建、CARLA 资产或地图刷新流程。",
      "在 Notion 记录 stable / shadow / reconstruction 三条线的边界。"
    ],
    output: "one reconstruction handoff card with producer, artifact, metric, and validation consumer"
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
  },
  {
    kind: "Reconstruction / SLAM Producer",
    title: "LIO-RF, FAST-LIO, pose prior, GlobalMap.pcdrgb",
    detail: "offline producer for map refresh, CARLA asset prep, and alignment evidence"
  },
  {
    kind: "IELTS Output",
    title: "Raw answer -> rubric -> error cause",
    detail: "output-first language practice that records the exact weak descriptor and correction"
  },
  {
    kind: "Philosophy Argument",
    title: "Thesis, premises, objection, response",
    detail: "argument maps that improve evidence-quality and engineering judgment"
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
  },
  {
    title: "Reconstruction stack -> validation asset",
    from: "Reconstruction / SLAM Producer",
    to: "Engineering Application",
    action: "Every SLAM or reconstruction artifact must name its manifest, metric, and validation consumer."
  },
  {
    title: "IELTS error -> review queue",
    from: "IELTS Output",
    to: "Notion",
    action: "Every weak answer creates one error-cause row instead of a vague daily-plan task."
  },
  {
    title: "Argument map -> evidence-quality decision",
    from: "Philosophy Argument",
    to: "Engineering Application",
    action: "Every argument map ends with one better decision about evidence, responsibility, or model limits."
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
  "Evidence",
  "Validation Line",
  "Confidence"
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
  },
  {
    name: "Reconstruction Evidence Queue",
    filter: "Validation Line = reconstruction and Evidence is not empty",
    purpose: "Keep SLAM, pose-prior, GlobalMap, alignment, and CARLA-import evidence visible before it is reused."
  },
  {
    name: "IELTS Error Queue",
    filter: "Track = IELTS and Resource Type = Error Log",
    purpose: "Review weak descriptors and corrected answers when you want language practice."
  },
  {
    name: "Philosophy Argument Queue",
    filter: "Track = Philosophy and Resource Type = Argument",
    purpose: "Review thesis, premise, objection, and response cards that sharpen engineering judgment."
  }
];

export const libraryTrackRoutes: LibraryTrackRoute[] = [
  {
    title: "Control spine route",
    tracks: "Tsinghua Automation + MIT EECS",
    output: "state-space derivation, controllability example, LQR/Kalman/MPC card"
  },
  {
    title: "3Blue1Brown math-intuition route",
    tracks: "3Blue1Brown",
    output: "video note, autonomous-driving connection, minimal transform or dynamics experiment"
  },
  {
    title: "World and spatial route",
    tracks: "World & Spatial Models",
    output: "SLAM projection, pose graph, COLMAP reconstruction, NeRF/3DGS asset boundary"
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
    label: "Local sync health",
    target: "http://127.0.0.1:8787/health",
    command: "curl -fsS http://127.0.0.1:8787/health"
  },
  {
    label: "Hermes profile",
    target: "/Users/cyber/.hermes/profiles/cyrus",
    command: "cyrus status"
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
  },
  {
    label: "GitHub Pages",
    target: "https://77zmf.github.io/Cyrus-Learning-Manager/",
    command: "gh run list --repo 77zmf/Cyrus-Learning-Manager --limit 5"
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
