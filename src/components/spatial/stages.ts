export interface StageCopy {
  label: string;
  formula: string;
  note: string;
}

export const slamStages: StageCopy[] = [
  {
    label: "位姿链",
    formula: "T_{map\\leftarrow camera}=T_{map\\leftarrow base}T_{base\\leftarrow camera}",
    note: "先把 map、base、camera 坐标系串起来。坐标链不清楚，后面的投影和优化都会错。"
  },
  {
    label: "投影观测",
    formula: "u_{ij}=\\pi(T_iX_j)",
    note: "同一个三维地标会被不同相机位姿看到。拖动地标时，左右图像里的观测点会一起移动。"
  },
  {
    label: "特征匹配",
    formula: "x_2^TFx_1=0",
    note: "两张图的匹配点不是随便连线，它们必须满足对极约束。"
  },
  {
    label: "后端残差",
    formula: "\\min_{T,X}\\sum_{ij}\\lVert u_{ij}-\\pi(T_iX_j)\\rVert^2",
    note: "后端把所有观测残差放在一起，让轨迹和地图同时更一致。"
  },
  {
    label: "回环约束",
    formula: "T_k\\approx T_0\\Delta T_{loop}",
    note: "回环边把当前位姿拉回已见过的位置，用一条强约束抵消长期漂移。"
  }
];

export const reconstructionStages: StageCopy[] = [
  {
    label: "采集基线",
    formula: "baseline=\\lVert C_2-C_1\\rVert",
    note: "多视角之间要有足够基线。基线太小，深度不稳；基线太大，匹配会变难。"
  },
  {
    label: "COLMAP SfM",
    formula: "\\{R_i,t_i,X_j\\}=SfM(matches)",
    note: "COLMAP 先用匹配点恢复相机位姿和稀疏三维点，然后用 BA 一起优化。"
  },
  {
    label: "MVS 稠密化",
    formula: "D_i=\\arg\\min_D E_{photo}(D)",
    note: "MVS 用多视图光度一致性把稀疏点扩展成更密的深度、点云或表面。"
  },
  {
    label: "NeRF / 3DGS",
    formula: "\\hat{C}(r)=\\sum_iT_i\\alpha_ic_i",
    note: "NeRF 沿光线积分颜色，3DGS 把大量高斯投影到图像上，更适合交互式渲染。"
  },
  {
    label: "验证资产",
    formula: "asset=(scale,frame,dynamics,KPI)",
    note: "漂亮画面还不够。用于自动驾驶验证时，要检查尺度、坐标系、动态物体和 KPI 证据。"
  }
];

export const quaternionStages: StageCopy[] = [
  {
    label: "单位四元数",
    formula: "q=w+xi+yj+zk,\\quad \\lVert q\\rVert=1",
    note: "先把 q 限制在单位长度。这样它只表达姿态，不会把向量额外缩放。"
  },
  {
    label: "双覆盖",
    formula: "q\\sim -q",
    note: "球面上相反的两个点会给出同一个三维旋转。网页里 q 和 -q 会一起移动。"
  },
  {
    label: "立体投影",
    formula: "S^3\\rightarrow \\mathbb{R}^3",
    note: "我们看不见 4D 单位球面，所以用投影把它变成能拖动观察的 3D 形状。"
  },
  {
    label: "四元数乘法",
    formula: "i^2=j^2=k^2=ijk=-1",
    note: "乘法顺序就是旋转顺序。先绕 x 再绕 y，和先绕 y 再绕 x 通常不同。"
  },
  {
    label: "旋转夹心",
    formula: "v'=qvq^{-1}",
    note: "把三维向量 v 放进 q 和 q^{-1} 中间，得到的纯虚部分就是旋转后的向量。"
  }
];
