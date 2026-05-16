export interface UniversityCourseItem {
  id: string;
  title: string;
  code?: string;
  url: string;
  role: string;
  output: string;
  status: "guided-pdf-ready" | "source-ready" | "needs-syllabus-expansion";
}

export interface UniversityCoursePack {
  id: string;
  university: string;
  theme: string;
  route: string;
  beginnerBridge: string;
  courses: UniversityCourseItem[];
}

export const universityCourseRoadmapPdf = {
  title: "Cyrus university course roadmap PDF",
  href: "/Cyrus-Learning-Manager/courses/university-course-packs/cyrus-university-course-roadmap.pdf"
};

export function courseGuidedPdfHref(courseId: string) {
  return `/Cyrus-Learning-Manager/courses/university-course-packs/${courseId}/cyrus-${courseId}-guided-notes.pdf`;
}

export const universityCoursePacks: UniversityCoursePack[] = [
  {
    id: "tsinghua-automation-control",
    university: "Tsinghua",
    theme: "Automation, control engineering, intelligent systems",
    route: "先把自动化本科的数学、信号、控制、机器学习和机器人主干铺平，再按控制工程研究生方向补鲁棒、非线性、随机、优化和估计。",
    beginnerBridge:
      "清华线用来回答“控制工程到底学什么”。先看状态、信号、反馈、估计，再进入机器人和空间智能。",
    courses: [
      {
        id: "tsinghua-au-home",
        title: "Tsinghua Automation official site",
        url: "https://www.au.tsinghua.edu.cn/",
        role: "院系和研究方向入口，用来核对自动化、控制科学与工程、智能系统的官方范围。",
        output: "Obsidian 建一张清华自动化总图，节点包含数学、信号、控制、智能、机器人。",
        status: "source-ready"
      },
      {
        id: "tsinghua-undergrad-2023",
        title: "Tsinghua Automation undergraduate program PDF",
        url: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf",
        role: "本科课程主干来源，覆盖信号与系统、自动控制、模式识别与机器学习、智能机器人等入口。",
        output: "GoodNotes 做本科主干目录页，每门课只写先修、核心公式、输出物。",
        status: "source-ready"
      },
      {
        id: "tsinghua-control-spine",
        title: "Tsinghua control spine",
        url: "https://www.au.tsinghua.edu.cn/",
        role: "把自动控制、现代控制、优化、估计、鲁棒和非线性控制连成控制工程研究生线。",
        output: "逐批生成单课 guided PDF，目前先由总路线图承接。",
        status: "needs-syllabus-expansion"
      }
    ]
  },
  {
    id: "mit-eecs-control-robotics",
    university: "MIT",
    theme: "EECS foundations, control, robotics, algorithms",
    route: "MIT 线负责公开课可直接学的硬基础：算法、信号、动态系统、反馈控制、多变量控制、欠驱动机器人和工程工具。",
    beginnerBridge:
      "MIT 线用来回答“我不会基础怎么办”。每门 OCW 都变成公式页、题目页和可视化实验页。",
    courses: [
      {
        id: "mit-6006",
        code: "6.006",
        title: "MIT 6.006 Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
        role: "算法基础，服务 SLAM 图搜索、数据结构、复杂度和验证脚本。",
        output: "写一页 graph/search/heap 公式与伪代码，再接到 simctl 数据结构。",
        status: "source-ready"
      },
      {
        id: "mit-6003",
        code: "6.003",
        title: "MIT 6.003 Signals and Systems",
        url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/",
        role: "信号、系统、卷积、频域、滤波和状态空间前置。",
        output: "GoodNotes 写时域到频域桥，网页补卷积可视化。",
        status: "source-ready"
      },
      {
        id: "mit-6241j",
        code: "6.241J",
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/",
        role: "状态空间、可控可观、稳定性、反馈控制的核心控制课。",
        output: "下一批优先做完整 guided PDF，并接入已有控制公式可视化。",
        status: "source-ready"
      },
      {
        id: "mit-6245",
        code: "6.245",
        title: "MIT 6.245 Multivariable Control Systems",
        url: "https://ocw.mit.edu/courses/6-245-multivariable-control-systems-spring-2004/",
        role: "研究生控制工程线，处理 MIMO、鲁棒性和频域设计。",
        output: "做成控制工程研究生章节，不强行放在入门第一轮。",
        status: "source-ready"
      },
      {
        id: "mit-underactuated",
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/",
        role: "机器人动力学、优化控制、轨迹、稳定性和非线性系统入口。",
        output: "网页做倒立摆、相图、轨迹优化拖动实验。",
        status: "source-ready"
      },
      {
        id: "mit-missing-semester",
        title: "MIT Missing Semester",
        url: "https://missing.csail.mit.edu/",
        role: "工程工具课，服务 Git、shell、调试、数据处理和学习系统维护。",
        output: "Notion 做工具检查清单，避免学习卡在环境上。",
        status: "source-ready"
      }
    ]
  },
  {
    id: "stanford-spatial-ai",
    university: "Stanford",
    theme: "Computer vision, machine learning, spatial intelligence",
    route: "Stanford 线负责空间智能主线：相机几何、CNN/视觉表示、机器学习、语言与场景理解、决策与不确定性。",
    beginnerBridge:
      "Stanford 线用来回答“空间智能怎么从图像走到世界模型”。CS231A 管几何，CS231n 管视觉特征，CS229 管学习方法。",
    courses: [
      {
        id: "stanford-cs231a",
        code: "CS231A",
        title: "Stanford CS231A Computer Vision, From 3D Reconstruction to Recognition",
        url: "https://web.stanford.edu/class/cs231a/",
        role: "相机模型、投影、对极几何、光流、估计和三维重建入口。",
        output: "已接入本地 course notes 和 guided PDF。",
        status: "guided-pdf-ready"
      },
      {
        id: "stanford-cs231n",
        code: "CS231n",
        title: "Stanford CS231n Deep Learning for Computer Vision",
        url: "https://cs231n.stanford.edu/",
        role: "CNN、优化、反向传播、视觉表示和视觉任务迁移到空间智能。",
        output: "已接入 guided PDF、notes index 和 assignment 链接。",
        status: "guided-pdf-ready"
      },
      {
        id: "stanford-cs229",
        code: "CS229",
        title: "Stanford CS229 Machine Learning",
        url: "https://cs229.stanford.edu/",
        role: "经验风险、梯度下降、生成模型、SVM、神经网络和泛化。",
        output: "下一批做成机器学习公式与题目路线。",
        status: "source-ready"
      },
      {
        id: "stanford-cs224n",
        code: "CS224N",
        title: "Stanford CS224N Natural Language Processing with Deep Learning",
        url: "https://web.stanford.edu/class/cs224n/",
        role: "语言和表示学习，用来接 Hermes 交互、学习助手和多模态推理。",
        output: "做 NLP/Transformer 辅线，不抢占空间几何第一轮。",
        status: "source-ready"
      },
      {
        id: "stanford-aa228",
        code: "AA228/CS238",
        title: "Stanford AA228/CS238 Decision Making under Uncertainty",
        url: "https://web.stanford.edu/class/aa228/",
        role: "MDP、POMDP、规划、风险和不确定性决策。",
        output: "接到世界模型和自动驾驶决策章节。",
        status: "source-ready"
      }
    ]
  }
];

export const universityCourseProductionQueue = [
  "Tier 1: Stanford CS231A and CS231n are already wired as guided PDFs.",
  "Tier 2: MIT 6.241J, MIT 6.003, Stanford CS229, and MIT Underactuated Robotics become the next individual PDFs.",
  "Tier 3: Tsinghua exact graduate-control syllabus needs course-by-course official syllabus expansion before individual PDFs.",
  "Tier 4: Stanford CS224N and AA228 connect Hermes interaction, world models, and decision-making."
];
