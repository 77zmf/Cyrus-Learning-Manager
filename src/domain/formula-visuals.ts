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
    label: "预测时域",
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

export const quaternionFormulaTerms: FormulaTerm[] = [
  {
    label: "单位四元数",
    symbol: "q=w+xi+yj+zk,\\quad \\lVert q\\rVert=1",
    meaning: "只用长度为 1 的四元数表示旋转；它可以理解成 4D 单位球面上的一个点。"
  },
  {
    label: "轴角到四元数",
    symbol: "q=\\cos\\frac{\\theta}{2}+\\sin\\frac{\\theta}{2}(u_xi+u_yj+u_zk)",
    meaning: "旋转轴给方向，半角给标量和向量部分；半角也是双覆盖出现的原因。"
  },
  {
    label: "双覆盖 q 和 -q",
    symbol: "q\\sim -q",
    meaning: "单位四元数球面上相反的两个点，对应同一个三维旋转。"
  },
  {
    label: "立体投影",
    symbol: "S^3\\rightarrow \\mathbb{R}^3",
    meaning: "把 4D 单位球面投到 3D 空间里看，帮助你把抽象旋转变成可拖动的形状。"
  },
  {
    label: "旋转夹心 qvq^{-1}",
    symbol: "v'=qvq^{-1}",
    meaning: "把三维向量当成纯虚四元数，左右各乘一次，得到旋转后的向量。"
  },
  {
    label: "乘法规则",
    symbol: "i^2=j^2=k^2=ijk=-1",
    meaning: "四元数乘法不满足交换律，所以组合旋转时顺序不能随便换。"
  }
];

export const slamTransformFormulaTerms: FormulaTerm[] = [
  {
    label: "齐次位姿",
    symbol: "T_{a\\leftarrow b}",
    meaning: "把同一个点从 b 坐标系表达成 a 坐标系，里面同时包含旋转和平移。"
  },
  {
    label: "旋转矩阵",
    symbol: "R",
    meaning: "描述朝向变化，保持长度和角度不变。"
  },
  {
    label: "平移向量",
    symbol: "t",
    meaning: "描述坐标原点之间的位移。"
  }
];

export const slamProjectionFormulaTerms: FormulaTerm[] = [
  {
    label: "相机内参",
    symbol: "K",
    meaning: "把相机坐标里的归一化点转换成像素坐标，包含焦距和主点。"
  },
  {
    label: "外参",
    symbol: "[R\\mid t]",
    meaning: "把世界点转换到相机坐标，说明相机在世界里的位姿。"
  },
  {
    label: "像素尺度",
    symbol: "s",
    meaning: "齐次坐标里的尺度，投影后要除掉它才得到像素位置。"
  }
];

export const epipolarFormulaTerms: FormulaTerm[] = [
  {
    label: "对极约束",
    symbol: "\\tilde{x}_2^TF\\tilde{x}_1=0",
    meaning: "同一个三维点在两张图里的匹配必须落在对应的对极线上。"
  },
  {
    label: "本质矩阵",
    symbol: "E=[t]_\\times R",
    meaning: "当相机内参已知时，用相对旋转和平移表达两视图几何。"
  },
  {
    label: "三角化",
    symbol: "X",
    meaning: "用多张图里的匹配像素反推出三维点的位置。"
  }
];

export const slamBackendFormulaTerms: FormulaTerm[] = [
  {
    label: "重投影误差",
    symbol: "u_{ij}-\\pi(T_iX_j)",
    meaning: "预测像素和真实匹配像素之间的差，是视觉 SLAM 和 SfM 的核心误差。"
  },
  {
    label: "位姿图残差",
    symbol: "\\log(Z_{ij}^{-1}T_i^{-1}T_j)",
    meaning: "比较两帧相对位姿观测和当前估计是否一致。"
  },
  {
    label: "信息矩阵",
    symbol: "\\Omega_{ij}",
    meaning: "给可靠约束更大权重，给噪声更大的约束更小权重。"
  }
];

export const factorGraphOptimizerFormulaTerms: FormulaTerm[] = [
  {
    label: "变量节点",
    symbol: "x_i,T_i,X_j",
    meaning: "要一起估计的未知量；SLAM 里常见的是关键帧位姿、路标点、速度和 IMU bias。"
  },
  {
    label: "残差因子",
    symbol: "r_k(x)",
    meaning: "每条测量或模型约束都变成一个误差项，告诉优化器当前估计和观测差多少。"
  },
  {
    label: "雅可比",
    symbol: "J_k=\\frac{\\partial r_k}{\\partial x}",
    meaning: "把非线性残差在当前估计附近线性化，说明每个变量小改动会怎样改变残差。"
  },
  {
    label: "鲁棒核",
    symbol: "\\rho(\\lVert r_k\\rVert^2_{\\Omega_k})",
    meaning: "遇到错误匹配或动态物体时，下调离群残差的破坏力，而不是让一条坏边拖垮整张图。"
  },
  {
    label: "正规方程",
    symbol: "J^TWJ\\Delta x=-J^TWr",
    meaning: "Gauss-Newton 或 LM 每轮要求解的线性系统，求出本轮应该怎样更新所有变量。"
  }
];

export const vioImuFormulaTerms: FormulaTerm[] = [
  {
    label: "IMU 预积分",
    symbol: "\\Delta R_{ij},\\Delta v_{ij},\\Delta p_{ij}",
    meaning: "把 i 到 j 之间很多个 IMU 小测量压缩成一个相对运动约束，避免每次优化都重算全部积分。"
  },
  {
    label: "陀螺/加计偏置",
    symbol: "b_g,b_a",
    meaning: "IMU 会慢慢漂，偏置不估计清楚，视觉再准也会被惯性积分拉歪。"
  },
  {
    label: "VIO 残差",
    symbol: "r_{imu}(x_i,x_j,b_i)",
    meaning: "比较预积分预测和当前两个关键帧状态是否一致，是视觉惯性融合的核心约束。"
  }
];

export const lidarSlamFormulaTerms: FormulaTerm[] = [
  {
    label: "点到点 ICP",
    symbol: "\\min_{R,t}\\sum_i\\lVert Rp_i+t-q_i\\rVert^2",
    meaning: "找一个刚体变换，让当前点云和目标点云的对应点尽量重合。"
  },
  {
    label: "点到面残差",
    symbol: "n_i^T(Rp_i+t-q_i)",
    meaning: "点云配准常用点到局部平面的距离，比点到点更适合 LiDAR scan-to-map。"
  },
  {
    label: "LIO 因子图",
    symbol: "\\mathcal{G}=\\{r_{lidar},r_{imu},r_{prior},r_{loop}\\}",
    meaning: "把 LiDAR、IMU、先验和回环都写成因子，共同约束轨迹和地图。"
  }
];

export const semanticNeuralSlamFormulaTerms: FormulaTerm[] = [
  {
    label: "语义地图",
    symbol: "\\mathcal{M}_s=(\\mathcal{G},\\mathcal{L})",
    meaning: "地图不只存几何，还要存物体、类别、可通行区域和场景关系。"
  },
  {
    label: "神经场",
    symbol: "F_\\theta(x)\\rightarrow (\\sigma,c,s)",
    meaning: "用连续函数表示空间里某点的密度、颜色和语义标签。"
  },
  {
    label: "跟踪-建图一致性",
    symbol: "\\min_{T,\\theta}\\sum\\lVert I-\\hat{I}(T,F_\\theta)\\rVert+\\lambda\\mathcal{L}_{sem}",
    meaning: "同时调整相机轨迹和神经地图，让重渲染结果和语义监督都更一致。"
  }
];

export const sensorCalibrationFormulaTerms: FormulaTerm[] = [
  {
    label: "相机内参标定",
    symbol: "s\\tilde{u}=K[R\\mid t]\\tilde{X}",
    meaning: "用已知三维/平面标定板点和像素点反求相机内参、畸变和外参。"
  },
  {
    label: "外参链",
    symbol: "T_{camera\\leftarrow lidar},\\ T_{imu\\leftarrow camera}",
    meaning: "传感器之间的刚体变换，决定点云、图像和惯性测量能否对到同一坐标系。"
  },
  {
    label: "时间偏移",
    symbol: "\\Delta t",
    meaning: "相机、LiDAR、IMU 时间戳不同步时，同一运动会被错误解释为空间误差。"
  }
];

export const stereoDepthMvsFormulaTerms: FormulaTerm[] = [
  {
    label: "双目深度",
    symbol: "Z=\\frac{fb}{d}",
    meaning: "焦距 f 和基线 b 已知时，视差 d 越小，深度 Z 越远。"
  },
  {
    label: "深度图",
    symbol: "D(u,v)",
    meaning: "给每个像素一个距离或深度值，是稠密重建和点云生成的入口。"
  },
  {
    label: "多视图一致性",
    symbol: "\\rho(I_i(u),I_j(\\pi(T_{ji},D_i(u))))",
    meaning: "同一个三维表面投到多张图时，外观和几何应该相互一致。"
  }
];

export const dynamicReconstructionFormulaTerms: FormulaTerm[] = [
  {
    label: "场景流",
    symbol: "\\mathbf{v}(x,t)",
    meaning: "描述三维空间点随时间如何移动，是动态重建和运动分解的核心。"
  },
  {
    label: "动态神经场",
    symbol: "F_\\theta(x,t)\\rightarrow(\\sigma,c)",
    meaning: "把位置和时间一起输入，表示会随时间变化的几何和外观。"
  },
  {
    label: "运动分解",
    symbol: "X_t=T_k(t)X_0+\\epsilon",
    meaning: "把动态场景分成若干刚体/非刚体运动，避免把动态物体烤进静态地图。"
  }
];

export const reconstructionQualityFormulaTerms: FormulaTerm[] = [
  {
    label: "轨迹误差",
    symbol: "ATE,\\ RPE",
    meaning: "ATE 看全局轨迹偏差，RPE 看相邻时间段的相对运动误差。"
  },
  {
    label: "几何距离",
    symbol: "d_{Chamfer}(P,Q)",
    meaning: "比较重建点云 P 和参考几何 Q 的双向最近邻距离。"
  },
  {
    label: "渲染质量",
    symbol: "PSNR,\\ SSIM,\\ LPIPS",
    meaning: "比较渲染图和真实图像，但它们不能替代尺度、碰撞和语义验证。"
  }
];

export const nerfGaussianFormulaTerms: FormulaTerm[] = [
  {
    label: "体渲染颜色",
    symbol: "\\hat{C}(r)",
    meaning: "沿一条相机光线把每个采样点的颜色和密度累加成最终像素颜色。"
  },
  {
    label: "透射率",
    symbol: "T_i",
    meaning: "表示光线走到第 i 个采样点之前还有多少光没有被遮挡。"
  },
  {
    label: "高斯投影",
    symbol: "\\Sigma'=JW\\Sigma W^TJ^T",
    meaning: "把三维高斯的协方差投影到图像平面，用于 3DGS splatting。"
  }
];

export const threeBlueOneBrownLinearAlgebraTerms: FormulaTerm[] = [
  {
    label: "点向量",
    symbol: "\\mathbf{p}",
    meaning: "把一个空间点写成可被坐标变换处理的向量。"
  },
  {
    label: "坐标变换",
    symbol: "T_{a\\leftarrow b}",
    meaning: "把同一个对象从 b 坐标语言翻译到 a 坐标语言。"
  },
  {
    label: "变换链",
    symbol: "T_{map\\leftarrow base}T_{base\\leftarrow lidar}",
    meaning: "矩阵相乘表示连续执行多个空间变换，顺序不能随便换。"
  }
];

export const threeBlueOneBrownCalculusTerms: FormulaTerm[] = [
  {
    label: "变化率",
    symbol: "\\frac{d}{dt}f(x(t))",
    meaning: "沿着运动轨迹看一个量此刻变化得有多快。"
  },
  {
    label: "梯度",
    symbol: "\\nabla f(x)",
    meaning: "多维空间里最敏感的变化方向。"
  },
  {
    label: "累计代价",
    symbol: "\\int_0^T L(x(t),u(t))dt",
    meaning: "把每个时刻的误差、控制和风险累加成一个目标。"
  }
];

export const threeBlueOneBrownDifferentialEquationTerms: FormulaTerm[] = [
  {
    label: "状态演化",
    symbol: "\\dot{x}=f(x,u)",
    meaning: "当前状态和输入决定下一瞬间怎么变化。"
  },
  {
    label: "小步预测",
    symbol: "x(t+\\Delta t)",
    meaning: "用很小的时间步把连续变化近似成下一步状态。"
  },
  {
    label: "局部斜率",
    symbol: "f(x,u)",
    meaning: "系统在当前点的变化方向，也就是相图里的箭头。"
  }
];

export const threeBlueOneBrownSignalsTerms: FormulaTerm[] = [
  {
    label: "欧拉公式",
    symbol: "e^{i\\theta}",
    meaning: "把旋转、振荡和正弦余弦统一成一个对象。"
  },
  {
    label: "模态",
    symbol: "e^{i\\omega_k t}",
    meaning: "把复杂信号拆成不同频率的基本振动。"
  },
  {
    label: "系数",
    symbol: "a_k",
    meaning: "每个频率成分在原始信号里占多少。"
  }
];

export const threeBlueOneBrownNeuralNetworkTerms: FormulaTerm[] = [
  {
    label: "模型参数",
    symbol: "\\theta",
    meaning: "网络内部可学习的权重和偏置。"
  },
  {
    label: "损失函数",
    symbol: "L(\\theta)",
    meaning: "把预测错得有多离谱压成一个可优化的数。"
  },
  {
    label: "梯度下降",
    symbol: "\\theta_{k+1}=\\theta_k-\\eta\\nabla_\\theta L",
    meaning: "沿着让损失下降的方向更新参数。"
  }
];

export const threeBlueOneBrownProbabilityTerms: FormulaTerm[] = [
  {
    label: "先验",
    symbol: "p(x)",
    meaning: "看到新证据之前，对状态或场景的相信程度。"
  },
  {
    label: "似然",
    symbol: "p(z\\mid x)",
    meaning: "如果状态是真的，传感器观测出现的可能性。"
  },
  {
    label: "后验",
    symbol: "p(x\\mid z)",
    meaning: "看到观测之后更新出来的相信程度。"
  }
];

export const threeBlueOneBrownGeometryTerms: FormulaTerm[] = [
  {
    label: "旋转矩阵",
    symbol: "R",
    meaning: "保持长度和角度的空间变换。"
  },
  {
    label: "正交约束",
    symbol: "R^TR=I",
    meaning: "旋转不会把空间拉伸或压扁。"
  },
  {
    label: "位姿",
    symbol: "RX+t",
    meaning: "先旋转再平移，是机器人和场景几何里的基本动作。"
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
