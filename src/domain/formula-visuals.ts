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

export const observabilityFormulaTerms: FormulaTerm[] = [
  {
    label: "输出矩阵 C",
    symbol: "C",
    meaning: "把内部状态 x 映射成传感器或可测输出 y。"
  },
  {
    label: "可观性传播 CA",
    symbol: "CA",
    meaning: "看输出在系统自然传播后，能不能暴露更多状态方向。"
  },
  {
    label: "可观性满秩",
    symbol: "rank(\\mathcal{O})=n",
    meaning: "秩等于状态维度 n 时，可以从输出反推出全部状态。"
  }
];

export const lyapunovFormulaTerms: FormulaTerm[] = [
  {
    label: "能量函数 V",
    symbol: "V(x)",
    meaning: "像能量一样衡量系统离平衡点有多远。"
  },
  {
    label: "正定矩阵 P",
    symbol: "P\\succ0",
    meaning: "保证 V(x)=x^TPx 除原点外都为正。"
  },
  {
    label: "下降条件",
    symbol: "\\dot{V}(x)<0",
    meaning: "能量沿系统轨迹持续下降，状态会回到平衡点附近。"
  }
];

export const stateFeedbackFormulaTerms: FormulaTerm[] = [
  {
    label: "状态反馈",
    symbol: "u=-Kx",
    meaning: "根据当前状态直接给控制输入。"
  },
  {
    label: "闭环矩阵",
    symbol: "A-BK",
    meaning: "控制器接入后真正决定系统动态的矩阵。"
  },
  {
    label: "极点配置",
    symbol: "\\lambda(A-BK)",
    meaning: "通过 K 调整闭环特征值位置，从而改变响应速度和稳定性。"
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

export const kalmanFormulaTerms: FormulaTerm[] = [
  {
    label: "预测状态",
    symbol: "\\hat{x}_{k|k-1}",
    meaning: "只根据模型和上一时刻信息得到的状态估计。"
  },
  {
    label: "Kalman 增益",
    symbol: "K_k",
    meaning: "决定更相信模型预测还是传感器观测。"
  },
  {
    label: "估计修正",
    symbol: "\\hat{x}_{k|k}",
    meaning: "把观测残差加回预测状态后的最终估计。"
  }
];

export const lqgFormulaTerms: FormulaTerm[] = [
  {
    label: "估计状态",
    symbol: "\\hat{x}",
    meaning: "不能直接测全状态时，用 Kalman Filter 得到的状态估计。"
  },
  {
    label: "LQR 控制",
    symbol: "u=-L\\hat{x}",
    meaning: "把最优反馈作用在估计状态上。"
  },
  {
    label: "分离原则",
    symbol: "L,K",
    meaning: "在经典线性高斯条件下，控制器和估计器可以分别设计。"
  }
];

export const mpcFormulaTerms: FormulaTerm[] = [
  {
    label: "预测时域 N",
    symbol: "N",
    meaning: "每次优化往前看多少步。"
  },
  {
    label: "滚动优化",
    symbol: "\\min_{u_{0:N-1}}",
    meaning: "每个控制周期重算一段未来输入，只执行第一步。"
  },
  {
    label: "约束",
    symbol: "x_k\\in\\mathcal{X},\\ u_k\\in\\mathcal{U}",
    meaning: "把车辆边界、速度、加速度、转角等限制写进优化问题。"
  }
];

export const robustFormulaTerms: FormulaTerm[] = [
  {
    label: "扰动输入",
    symbol: "w",
    meaning: "模型误差、外界扰动或不确定输入。"
  },
  {
    label: "性能输出",
    symbol: "z",
    meaning: "我们希望限制的误差、控制代价或安全指标。"
  },
  {
    label: "H 无穷界",
    symbol: "\\|T_{zw}\\|_\\infty<\\gamma",
    meaning: "把最坏情况下的扰动放大控制在阈值以内。"
  }
];

export const nonlinearFormulaTerms: FormulaTerm[] = [
  {
    label: "非线性动力学",
    symbol: "\\dot{x}=f(x,u)",
    meaning: "真实车辆、机器人或世界模型通常不是线性的。"
  },
  {
    label: "线性化 A",
    symbol: "A=\\frac{\\partial f}{\\partial x}",
    meaning: "在工作点附近看状态扰动如何传播。"
  },
  {
    label: "线性化 B",
    symbol: "B=\\frac{\\partial f}{\\partial u}",
    meaning: "在工作点附近看输入扰动如何影响状态。"
  }
];

export const stochasticFormulaTerms: FormulaTerm[] = [
  {
    label: "值函数",
    symbol: "V_t(x)",
    meaning: "从当前状态开始，未来最优期望代价是多少。"
  },
  {
    label: "Bellman 递推",
    symbol: "\\min_u\\mathbb{E}[\\ell+V_{t+1}]",
    meaning: "把长期问题拆成当前动作和下一步值函数。"
  },
  {
    label: "随机扰动",
    symbol: "w",
    meaning: "把噪声、风险和不确定性显式写进控制问题。"
  }
];

export const worldSpatialFormulaTerms: FormulaTerm[] = [
  {
    label: "潜变量动态",
    symbol: "p(z_{t+1}\\mid z_t,a_t)",
    meaning: "世界模型预测动作之后的隐藏状态如何变化。"
  },
  {
    label: "相机投影",
    symbol: "s\\mathbf{u}=K[R|t]X",
    meaning: "把三维点投到图像或 BEV 相关表示。"
  },
  {
    label: "空间场",
    symbol: "f(x,y,z)",
    meaning: "用占据、NeRF 或 3DGS 表达空间几何。"
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
