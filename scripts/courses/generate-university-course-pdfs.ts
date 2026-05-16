import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { universityCoursePacks } from "../../src/domain/university-course-packs";

interface CoursePdfDetail {
  prerequisite: string[];
  formulas: string[];
  visual: string;
  goodNotes: string[];
  webInteraction: string;
  obsidian: string;
  notion: string;
}

const details: Record<string, CoursePdfDetail> = {
  "tsinghua-au-home": {
    prerequisite: ["Linear algebra", "Calculus", "Probability and signals"],
    formulas: [
      "\\dot{\\bm{x}}=A\\bm{x}+B\\bm{u}",
      "\\bm{y}=C\\bm{x}+D\\bm{u}",
      "\\mathcal{C}=[B\\;AB\\;\\cdots\\;A^{n-1}B]",
      "\\hat{\\bm{x}}_{k|k}=\\hat{\\bm{x}}_{k|k-1}+K_k(\\bm{z}_k-H\\hat{\\bm{x}}_{k|k-1})"
    ],
    visual: "Draw one department map: math -> signals -> control -> estimation -> robotics -> spatial intelligence.",
    goodNotes: ["Page THU-000: automation field map", "Page THU-001: state/input/output vocabulary"],
    webInteraction: "A clickable concept graph that opens the correct course pack node.",
    obsidian: "Tsinghua Automation -> field map",
    notion: "Source status, syllabus status, and expansion blocker."
  },
  "tsinghua-undergrad-2023": {
    prerequisite: ["Advanced mathematics", "Linear algebra", "Programming"],
    formulas: [
      "y(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau",
      "\\dot{\\bm{x}}=A\\bm{x}+B\\bm{u}",
      "\\min_{\\theta}\\frac{1}{N}\\sum_{i=1}^{N}\\ell(f_{\\theta}(\\bm{x}_i),y_i)",
      "s\\bm{u}=K[R\\;\\bm{t}]\\bm{X}"
    ],
    visual: "Turn the undergraduate program into a prerequisite graph instead of a calendar.",
    goodNotes: ["Page THU-B001: undergraduate course spine", "Page THU-B002: where each formula first appears"],
    webInteraction: "A filterable curriculum map by math, control, AI, robotics, and spatial intelligence.",
    obsidian: "Tsinghua Automation -> undergraduate spine",
    notion: "Course-source evidence and next PDF expansion status."
  },
  "tsinghua-control-spine": {
    prerequisite: ["Differential equations", "Signals and systems", "Matrix rank and eigenvalues"],
    formulas: [
      "\\mathcal{C}=[B\\;AB\\;\\cdots\\;A^{n-1}B],\\quad \\operatorname{rank}(\\mathcal{C})=n",
      "\\mathcal{O}=\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}",
      "V(\\bm{x})=\\bm{x}^{\\mathsf T}P\\bm{x},\\quad \\dot{V}(\\bm{x})<0",
      "A^{\\mathsf T}P+PA-PBR^{-1}B^{\\mathsf T}P+Q=0"
    ],
    visual: "Draw controllability, observability, stability, and LQR as four connected gates.",
    goodNotes: ["Page THU-C001: controllability and observability", "Page THU-C002: Lyapunov and LQR"],
    webInteraction: "A rank-gate visual where the learner toggles B and C and watches rank change.",
    obsidian: "Control Engineering -> Tsinghua control spine",
    notion: "Mastery levels for control gates."
  },
  "mit-6006": {
    prerequisite: ["Discrete math", "Python or pseudocode", "Proof by induction"],
    formulas: [
      "T(n)=aT(n/b)+f(n)",
      "d[v]=\\min_{(u,v)\\in E}\\{d[u]+w(u,v)\\}",
      "O((V+E)\\log V)",
      "\\operatorname{heapify}=O(\\log n)"
    ],
    visual: "Draw a graph search frontier and show why a priority queue changes the exploration order.",
    goodNotes: ["Page MIT-A001: asymptotic notation", "Page MIT-A002: graph search and Dijkstra"],
    webInteraction: "A draggable graph where edge weights update the shortest-path table.",
    obsidian: "MIT EECS -> 6.006 algorithms",
    notion: "Solved problem evidence and algorithm notes."
  },
  "mit-6003": {
    prerequisite: ["Complex numbers", "Calculus", "Differential equations"],
    formulas: [
      "y(t)=x(t)*h(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau",
      "X(j\\omega)=\\int_{-\\infty}^{\\infty}x(t)e^{-j\\omega t}dt",
      "H(s)=\\frac{Y(s)}{X(s)}",
      "\\dot{\\bm{x}}=A\\bm{x}+B\\bm{u}"
    ],
    visual: "Show an input signal sliding across an impulse response to create convolution.",
    goodNotes: ["Page MIT-S001: convolution", "Page MIT-S002: frequency response"],
    webInteraction: "A slider for frequency that updates magnitude and phase.",
    obsidian: "MIT EECS -> 6.003 signals systems",
    notion: "Signal exercise and formula status."
  },
  "mit-6241j": {
    prerequisite: ["Linear algebra", "Eigenvalues", "Differential equations"],
    formulas: [
      "\\dot{\\bm{x}}=A\\bm{x}+B\\bm{u}",
      "e^{At}=\\mathcal{L}^{-1}\\{(sI-A)^{-1}\\}",
      "\\operatorname{rank}[B\\;AB\\;\\cdots\\;A^{n-1}B]=n",
      "\\bm{u}=-K\\bm{x}"
    ],
    visual: "Make state propagation visible: A moves the state, B injects input, K closes feedback.",
    goodNotes: ["Page MIT-C001: state space", "Page MIT-C002: controllability", "Page MIT-C003: feedback"],
    webInteraction: "A two-state system where dragging eigenvalues changes stability.",
    obsidian: "MIT Control -> 6.241J dynamic systems",
    notion: "Control gate status and solved derivation evidence."
  },
  "mit-6245": {
    prerequisite: ["State space", "Frequency response", "Linear systems"],
    formulas: [
      "\\bm{y}(s)=G(s)\\bm{u}(s)",
      "\\bar{\\sigma}(G(j\\omega))",
      "\\|T_{zw}\\|_{\\infty}<\\gamma",
      "S=(I+GK)^{-1},\\quad T=GK(I+GK)^{-1}"
    ],
    visual: "Draw MIMO as many inputs pushing many outputs, then show singular values as worst-direction gain.",
    goodNotes: ["Page MIT-M001: MIMO transfer matrix", "Page MIT-M002: sensitivity and robustness"],
    webInteraction: "A gain-direction widget that rotates an input vector and shows output amplification.",
    obsidian: "MIT Control -> 6.245 multivariable control",
    notion: "Robust-control expansion queue."
  },
  "mit-underactuated": {
    prerequisite: ["Dynamics", "Optimization", "State-space control"],
    formulas: [
      "M(\\bm{q})\\ddot{\\bm{q}}+C(\\bm{q},\\dot{\\bm{q}})\\dot{\\bm{q}}+\\bm{g}(\\bm{q})=B\\bm{u}",
      "J=\\sum_{k=0}^{N}\\ell(\\bm{x}_k,\\bm{u}_k)",
      "V(\\bm{x})>0,\\quad \\dot{V}(\\bm{x})<0",
      "\\bm{x}_{k+1}=f(\\bm{x}_k,\\bm{u}_k)"
    ],
    visual: "Use an inverted pendulum phase portrait to show underactuation and stabilization.",
    goodNotes: ["Page MIT-R001: underactuated dynamics", "Page MIT-R002: trajectory optimization"],
    webInteraction: "A pendulum slider for angle and control effort.",
    obsidian: "MIT Robotics -> underactuated robotics",
    notion: "Robot-control concepts and experiment state."
  },
  "mit-missing-semester": {
    prerequisite: ["Terminal basics", "Files and paths", "Git basics"],
    formulas: [
      "\\text{pipeline}=f_n\\circ f_{n-1}\\circ\\cdots\\circ f_1",
      "\\text{commit}=H(\\text{tree},\\text{parents},\\text{message})",
      "\\text{debugging}=\\text{reproduce}\\rightarrow\\text{isolate}\\rightarrow\\text{verify}",
      "\\text{automation}=\\text{input}\\rightarrow\\text{script}\\rightarrow\\text{checked output}"
    ],
    visual: "Draw shell, editor, git, tests, and browser as one reproducible learning loop.",
    goodNotes: ["Page MIT-T001: shell and git workflow", "Page MIT-T002: debugging checklist"],
    webInteraction: "A command checklist that marks environment readiness.",
    obsidian: "MIT Tools -> Missing Semester",
    notion: "Tool blocker, command evidence, and next action."
  },
  "stanford-cs231a": {
    prerequisite: ["Linear algebra", "Projective geometry", "Probability and estimation"],
    formulas: [
      "s\\begin{bmatrix}u\\\\v\\\\1\\end{bmatrix}=K[R\\;\\bm{t}]\\begin{bmatrix}X\\\\Y\\\\Z\\\\1\\end{bmatrix}",
      "\\bm{x}'^{\\mathsf T}F\\bm{x}=0",
      "E=[\\bm{t}]_{\\times}R",
      "\\min_{T_i,P_j}\\sum_{i,j}\\rho(\\|\\bm{u}_{ij}-\\pi(T_iP_j)\\|_2^2)"
    ],
    visual: "Show a 3D point, camera pose, image plane, and projection ray.",
    goodNotes: ["Page ST-CV001: camera projection", "Page ST-CV002: epipolar geometry", "Page ST-CV003: bundle adjustment"],
    webInteraction: "A draggable projection lab showing how depth changes image coordinates.",
    obsidian: "Stanford Spatial AI -> CS231A",
    notion: "Geometry notes and PDF evidence."
  },
  "stanford-cs231n": {
    prerequisite: ["Linear algebra", "Calculus", "Python and NumPy"],
    formulas: [
      "p_k=\\frac{e^{s_k}}{\\sum_j e^{s_j}}",
      "L=-\\log p_y",
      "(I*K)_{i,j}=\\sum_{m,n}I_{i+m,j+n}K_{m,n}",
      "\\frac{\\partial L}{\\partial W}=\\frac{\\partial L}{\\partial s}\\frac{\\partial s}{\\partial W}"
    ],
    visual: "Draw pixels -> convolution -> activation -> class score -> loss.",
    goodNotes: ["Page ST-DL001: softmax and cross entropy", "Page ST-DL002: convolution", "Page ST-DL003: backprop"],
    webInteraction: "A small convolution kernel visual that updates feature responses.",
    obsidian: "Stanford Spatial AI -> CS231n",
    notion: "Assignment and formula-progress status."
  },
  "stanford-cs229": {
    prerequisite: ["Calculus", "Linear algebra", "Probability"],
    formulas: [
      "\\min_{\\theta}\\frac{1}{N}\\sum_{i=1}^{N}\\ell(f_{\\theta}(\\bm{x}_i),y_i)+\\lambda\\Omega(\\theta)",
      "\\theta\\leftarrow\\theta-\\alpha\\nabla_{\\theta}J(\\theta)",
      "p(y=1|\\bm{x})=\\sigma(\\theta^{\\mathsf T}\\bm{x})",
      "p(\\bm{x}|y)=\\mathcal{N}(\\bm{x};\\bm{\\mu}_y,\\Sigma_y)"
    ],
    visual: "Draw data, model, loss surface, gradient step, and validation error.",
    goodNotes: ["Page ST-ML001: empirical risk", "Page ST-ML002: gradient descent", "Page ST-ML003: probabilistic model"],
    webInteraction: "A loss-landscape slider that changes learning rate and overfitting.",
    obsidian: "Stanford ML -> CS229",
    notion: "Problem-set status and formula mastery."
  },
  "stanford-cs224n": {
    prerequisite: ["Linear algebra", "Probability", "Neural networks"],
    formulas: [
      "\\operatorname{sim}(\\bm{u},\\bm{v})=\\frac{\\bm{u}^{\\mathsf T}\\bm{v}}{\\|\\bm{u}\\|\\|\\bm{v}\\|}",
      "\\operatorname{Attention}(Q,K,V)=\\operatorname{softmax}\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}}\\right)V",
      "\\bm{h}_t=f(\\bm{x}_t,\\bm{h}_{t-1})",
      "L=-\\sum_t \\log p(y_t|y_{<t},\\bm{x})"
    ],
    visual: "Show tokens -> embeddings -> attention map -> context vector -> prediction.",
    goodNotes: ["Page ST-NLP001: embeddings", "Page ST-NLP002: attention", "Page ST-NLP003: sequence loss"],
    webInteraction: "An attention heatmap that highlights which token reads which token.",
    obsidian: "Stanford NLP -> CS224N",
    notion: "Hermes interaction bridge and assignment status."
  },
  "stanford-aa228": {
    prerequisite: ["Probability", "Dynamic programming", "Basic optimization"],
    formulas: [
      "V^{\\star}(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'|s,a)V^{\\star}(s')\\right]",
      "\\pi^{\\star}(s)=\\arg\\max_a Q^{\\star}(s,a)",
      "b'(s')=\\eta O(o|s',a)\\sum_s P(s'|s,a)b(s)",
      "\\mathbb{E}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\right]"
    ],
    visual: "Draw state, action, transition, observation, belief, and value as a decision loop.",
    goodNotes: ["Page ST-DM001: MDP", "Page ST-DM002: POMDP belief update", "Page ST-DM003: risk and planning"],
    webInteraction: "A grid-world widget where transition uncertainty changes the best action.",
    obsidian: "Stanford Decision Making -> AA228 CS238",
    notion: "World-model decision bridge."
  }
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const docsRoot = path.join(repoRoot, "docs/courses/university-course-packs");
const publicRoot = path.join(repoRoot, "public/courses/university-course-packs");
const tectonicBin =
  process.env.TECTONIC_BIN ??
  path.join(homedir(), ".codex/plugins/cache/openai-bundled/latex-tectonic/0.1.1/bin/tectonic");

if (!existsSync(tectonicBin)) {
  throw new Error(`Tectonic binary not found: ${tectonicBin}`);
}

const courses = universityCoursePacks.flatMap((pack) =>
  pack.courses.map((course) => ({
    ...course,
    packId: pack.id,
    university: pack.university,
    theme: pack.theme
  }))
);

const manifest = courses.map((course) => {
  const detail = details[course.id];

  if (!detail) {
    throw new Error(`Missing PDF detail for ${course.id}`);
  }

  const courseDir = path.join(docsRoot, course.id);
  const buildDir = path.join(courseDir, "build");
  const publicDir = path.join(publicRoot, course.id);
  const texFile = path.join(courseDir, `cyrus-${course.id}-guided-notes.tex`);
  const pdfFile = path.join(buildDir, `cyrus-${course.id}-guided-notes.pdf`);
  const publicPdf = path.join(publicDir, `cyrus-${course.id}-guided-notes.pdf`);

  mkdirSync(buildDir, { recursive: true });
  mkdirSync(publicDir, { recursive: true });
  writeFileSync(texFile, renderCourseTex(course, detail));

  execFileSync(tectonicBin, ["-X", "compile", texFile, "--outdir", buildDir], {
    cwd: repoRoot,
    stdio: "inherit"
  });
  execFileSync("cp", [pdfFile, publicPdf], { cwd: repoRoot, stdio: "inherit" });

  return {
    id: course.id,
    title: course.title,
    university: course.university,
    sourceUrl: course.url,
    docsTex: path.relative(repoRoot, texFile),
    docsPdf: path.relative(repoRoot, pdfFile),
    publicPdf: path.relative(repoRoot, publicPdf),
    appHref: `/Cyrus-Learning-Manager/courses/university-course-packs/${course.id}/cyrus-${course.id}-guided-notes.pdf`
  };
});

writeFileSync(path.join(docsRoot, "course-pdf-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync(path.join(publicRoot, "course-pdf-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated ${manifest.length} course PDFs.`);

function renderCourseTex(
  course: (typeof courses)[number],
  detail: CoursePdfDetail
) {
  return `\\documentclass[11pt]{article}
\\usepackage[margin=0.78in]{geometry}
\\usepackage{amsmath,amssymb,bm}
\\usepackage{booktabs}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\hypersetup{colorlinks=true, linkcolor=black, urlcolor=black}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0.55em}

\\title{Cyrus Guided Notes: ${escapeTex(course.title)}}
\\author{${escapeTex(course.university)} course pack}
\\date{2026-05-15}

\\begin{document}
\\maketitle

\\section*{Course source}
\\textbf{Official source:} \\url{${course.url}}

\\textbf{Why this course is in the system.} ${escapeTex(toEnglish(course.role))}

\\textbf{Learning output.} ${escapeTex(toEnglish(course.output))}

\\section*{Prerequisite checkpoint}
\\begin{itemize}[leftmargin=1.4em]
${detail.prerequisite.map((item) => `  \\item ${escapeTex(item)}`).join("\n")}
\\end{itemize}

\\section*{Formula checkpoint}
Do not memorize these first. Read each formula as a sentence: what changes, what is observed, what is optimized, and what output it produces.
\\begin{align*}
${detail.formulas.map((formula) => `  ${formula}`).join("\\\\\n")}
\\end{align*}

\\section*{Visual page}
${escapeTex(detail.visual)}

\\section*{GoodNotes pages}
\\begin{itemize}[leftmargin=1.4em]
${detail.goodNotes.map((item) => `  \\item ${escapeTex(item)}`).join("\n")}
\\end{itemize}

\\section*{Web interaction}
${escapeTex(detail.webInteraction)}

\\section*{Obsidian and Notion}
\\begin{tabular}{p{0.22\\linewidth}p{0.68\\linewidth}}
\\toprule
Layer & Output \\\\
\\midrule
Obsidian & ${escapeTex(detail.obsidian)} \\\\
Notion & ${escapeTex(detail.notion)} \\\\
\\bottomrule
\\end{tabular}

\\section*{First study move}
Open the official source, copy the prerequisite checkpoint into GoodNotes, then write one formula in your own words before watching or reading more.

\\end{document}
`;
}

function escapeTex(value: string) {
  return value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

function toEnglish(value: string) {
  const replacements: Record<string, string> = {
    "院系和研究方向入口，用来核对自动化、控制科学与工程、智能系统的官方范围。":
      "Department and research-direction entry point for automation, control science, and intelligent systems.",
    "Obsidian 建一张清华自动化总图，节点包含数学、信号、控制、智能、机器人。":
      "Build an Obsidian field map covering math, signals, control, intelligence, and robotics.",
    "本科课程主干来源，覆盖信号与系统、自动控制、模式识别与机器学习、智能机器人等入口。":
      "Undergraduate curriculum source for signals, automatic control, pattern recognition, machine learning, and robotics.",
    "GoodNotes 做本科主干目录页，每门课只写先修、核心公式、输出物。":
      "Create a GoodNotes undergraduate spine page with prerequisites, formulas, and outputs.",
    "把自动控制、现代控制、优化、估计、鲁棒和非线性控制连成控制工程研究生线。":
      "Connect automatic control, modern control, optimization, estimation, robust control, and nonlinear control.",
    "逐批生成单课 guided PDF，目前先由总路线图承接。":
      "Generate individual guided PDFs in batches, with the roadmap as the current index.",
    "算法基础，服务 SLAM 图搜索、数据结构、复杂度和验证脚本。":
      "Algorithm foundation for SLAM graph search, data structures, complexity, and validation scripts.",
    "写一页 graph/search/heap 公式与伪代码，再接到 simctl 数据结构。":
      "Write a graph, search, and heap formula page, then connect it to simctl data structures.",
    "信号、系统、卷积、频域、滤波和状态空间前置。":
      "Prerequisite for signals, systems, convolution, frequency response, filtering, and state space.",
    "GoodNotes 写时域到频域桥，网页补卷积可视化。":
      "Write the time-domain to frequency-domain bridge in GoodNotes and add convolution visualization on the web.",
    "状态空间、可控可观、稳定性、反馈控制的核心控制课。":
      "Core control course for state space, controllability, observability, stability, and feedback.",
    "下一批优先做完整 guided PDF，并接入已有控制公式可视化。":
      "Priority course for a complete guided PDF connected to existing control formula visuals.",
    "研究生控制工程线，处理 MIMO、鲁棒性和频域设计。":
      "Graduate control course for MIMO systems, robustness, and frequency-domain design.",
    "做成控制工程研究生章节，不强行放在入门第一轮。":
      "Keep it in the graduate control chapter instead of forcing it into the first beginner round.",
    "机器人动力学、优化控制、轨迹、稳定性和非线性系统入口。":
      "Entry point for robot dynamics, optimal control, trajectories, stability, and nonlinear systems.",
    "网页做倒立摆、相图、轨迹优化拖动实验。":
      "Build inverted-pendulum, phase-portrait, and trajectory-optimization interactions on the web.",
    "工程工具课，服务 Git、shell、调试、数据处理和学习系统维护。":
      "Engineering tools course for Git, shell, debugging, data processing, and learning-system maintenance.",
    "Notion 做工具检查清单，避免学习卡在环境上。":
      "Use Notion as the tool readiness checklist so environment blockers are visible.",
    "相机模型、投影、对极几何、光流、估计和三维重建入口。":
      "Entry point for camera models, projection, epipolar geometry, optical flow, estimation, and 3D reconstruction.",
    "已接入本地 course notes 和 guided PDF。":
      "Already connected to local course notes and a guided PDF.",
    "CNN、优化、反向传播、视觉表示和视觉任务迁移到空间智能。":
      "CNNs, optimization, backpropagation, visual representation, and spatial-intelligence transfer.",
    "已接入 guided PDF、notes index 和 assignment 链接。":
      "Already connected to guided PDF, notes index, and assignment links.",
    "经验风险、梯度下降、生成模型、SVM、神经网络和泛化。":
      "Empirical risk, gradient descent, generative models, SVMs, neural networks, and generalization.",
    "下一批做成机器学习公式与题目路线。":
      "Next batch target for a machine-learning formula and problem route.",
    "语言和表示学习，用来接 Hermes 交互、学习助手和多模态推理。":
      "Language and representation learning for Hermes interaction, tutoring, and multimodal reasoning.",
    "做 NLP/Transformer 辅线，不抢占空间几何第一轮。":
      "Keep it as the NLP and Transformer side line after the spatial geometry first round.",
    "MDP、POMDP、规划、风险和不确定性决策。":
      "MDPs, POMDPs, planning, risk, and decision-making under uncertainty.",
    "接到世界模型和自动驾驶决策章节。":
      "Connect it to world models and autonomous-driving decision chapters."
  };

  return replacements[value] ?? value;
}
