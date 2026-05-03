export interface FormulaTerm {
  label: string;
  symbol: string;
  meaning: string;
}

export const stateSpaceFormulaTerms: FormulaTerm[] = [
  {
    label: "状态向量 x",
    symbol: "x",
    meaning: "把位置、速度、误差等系统内部量放进一个列向量。"
  },
  {
    label: "系统矩阵 A",
    symbol: "A",
    meaning: "描述没有控制输入时，状态之间如何自然传播。"
  },
  {
    label: "控制矩阵 B",
    symbol: "B",
    meaning: "描述控制输入 u 会进入哪些状态方向。"
  }
];

export const controllabilityFormulaTerms: FormulaTerm[] = [
  {
    label: "可控性矩阵",
    symbol: "\\mathcal{C}",
    meaning: "把 B, AB, ..., A^{n-1}B 拼起来，看输入能否影响全部状态方向。"
  },
  {
    label: "传播项 AB",
    symbol: "AB",
    meaning: "先被输入影响的状态，再通过 A 传播到下一层状态。"
  },
  {
    label: "满秩条件",
    symbol: "rank(\\mathcal{C})=n",
    meaning: "秩等于状态维度 n 时，线性系统可控。"
  }
];

export const stabilityFormulaTerms: FormulaTerm[] = [
  {
    label: "状态转移",
    symbol: "e^{At}",
    meaning: "把初始状态 x(0) 推到未来状态 x(t)。"
  },
  {
    label: "特征值实部",
    symbol: "Re(\\lambda_i(A))",
    meaning: "决定每个模态是衰减还是发散。"
  },
  {
    label: "稳定条件",
    symbol: "Re(\\lambda_i(A))<0",
    meaning: "连续时间线性系统所有模态都衰减。"
  }
];

export const stateTransitionFormulaTerms: FormulaTerm[] = [
  {
    label: "齐次解",
    symbol: "e^{At}x(0)",
    meaning: "没有输入时，系统由初始状态自然演化。"
  },
  {
    label: "状态转移矩阵",
    symbol: "e^{At}",
    meaning: "矩阵 A 在时间上的指数传播。"
  },
  {
    label: "输入卷积项",
    symbol: "\\int_0^t e^{A(t-\\tau)}Bu(\\tau)d\\tau",
    meaning: "把每个时刻的控制输入累计进当前状态。"
  }
];

export const lqrFormulaTerms: FormulaTerm[] = [
  {
    label: "代价函数",
    symbol: "J",
    meaning: "把状态误差和控制代价放进同一个优化目标。"
  },
  {
    label: "权重矩阵 Q/R",
    symbol: "Q,R",
    meaning: "Q 惩罚状态偏差，R 惩罚控制输入大小。"
  },
  {
    label: "Riccati 方程",
    symbol: "A^TP+PA-PBR^{-1}B^TP+Q=0",
    meaning: "求解 LQR 最优反馈增益的核心方程。"
  }
];

export const tutorControllabilityTerms: FormulaTerm[] = [
  {
    label: "矩阵 A",
    symbol: "A",
    meaning: "当前题里的系统传播矩阵，第二个状态会保留自身。"
  },
  {
    label: "矩阵 B",
    symbol: "B",
    meaning: "控制输入只直接进入第一个状态。"
  },
  {
    label: "可控性传播 AB",
    symbol: "AB",
    meaning: "把 B 乘上 A，检查输入影响是否能传播到第二个状态。"
  }
];
