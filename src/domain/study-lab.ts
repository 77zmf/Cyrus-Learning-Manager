import type { TaskPriority, TrackId } from "./types";
import { factorGraphOptimizerFormulaTerms, loopClosureFormulaTerms, type FormulaTerm } from "./formula-visuals";

export type StudyMode =
  | "formula"
  | "paper"
  | "course"
  | "ielts-output"
  | "argument"
  | "closure"
  | "spatial-intelligence"
  | "loop-closure"
  | "reconstruction";

export interface StudySource {
  title: string;
  url: string;
}

export interface StudyPlan {
  id: string;
  track: TrackId;
  mode: StudyMode;
  title: string;
  question: string;
  prompt: string;
  checklist: string[];
  template: string;
  sources: StudySource[];
  taskTitle: string;
  priority: TaskPriority;
  formulaCue?: {
    label: string;
    latex: string;
    terms: FormulaTerm[];
  };
}

export const studyModeLabels: Record<StudyMode, string> = {
  formula: "Formula",
  paper: "Paper",
  course: "Course",
  "ielts-output": "IELTS Output",
  argument: "Argument",
  closure: "Closure",
  "spatial-intelligence": "Spatial Intelligence",
  "loop-closure": "Loop Closure",
  reconstruction: "Reconstruction"
};

export const hermesCloseoutFields = [
  "Evidence",
  "Status",
  "Blocker",
  "Owner",
  "Next action",
  "Verification path"
];

export const studyPlans: StudyPlan[] = [
  {
    id: "control-formula-ladder",
    track: "tsinghua-automation",
    mode: "formula",
    title: "Control formula derivation ladder",
    question: "Pick one control formula and make the assumptions, derivation, result, and engineering use explicit.",
    prompt:
      "Start from state-space, controllability, Lyapunov, LQR, Kalman, MPC, or robust control. Derive one formula in LaTeX and connect it to vehicle control or state estimation.",
    checklist: [
      "Define every symbol before deriving.",
      "Write the assumptions and system model.",
      "Derive the result line by line.",
      "Explain the engineering meaning and one failure mode."
    ],
    template:
      "Definitions:\nAssumptions:\nObjective:\nDerivation:\n$$\n\n$$\nResult:\nEngineering use:\nFailure modes:",
    sources: [
      {
        title: "MIT 6.241J Dynamic Systems and Control",
        url: "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
      },
      {
        title: "MIT 2.14 Feedback Control",
        url: "https://ocw.mit.edu/courses/2-14-analysis-and-design-of-feedback-control-systems-spring-2014/"
      }
    ],
    taskTitle: "Control formula derivation: choose one formula",
    priority: "high"
  },
  {
    id: "mit-course-exercise",
    track: "mit-eecs",
    mode: "course",
    title: "MIT EECS executable course session",
    question: "Which MIT lecture, assignment, or reading produces one durable artifact today?",
    prompt:
      "Choose algorithms, systems, signals, AI, ML, or robotics. Do one small exercise and connect the result to validation tooling, control, or world/spatial models.",
    checklist: [
      "Choose one lecture or assignment.",
      "Write the core model or theorem.",
      "Solve one small exercise or implement one small example.",
      "Record how it connects to the Cyrus stack."
    ],
    template:
      "Course:\nLecture or assignment:\nCore idea:\nExercise:\nSolution:\nComplexity or assumptions:\nCyrus connection:\nNext question:",
    sources: [
      {
        title: "MIT EECS undergraduate programs",
        url: "https://www.eecs.mit.edu/academics/undergraduate-programs/"
      },
      {
        title: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu/"
      }
    ],
    taskTitle: "MIT EECS study session: choose one executable artifact",
    priority: "medium"
  },
  {
    id: "3blue1brown-video-note",
    track: "3blue1brown",
    mode: "course",
    title: "3Blue1Brown video note",
    question: "Which visual math idea can unlock one autonomous-driving engineering concept today?",
    prompt:
      "Pick one 3Blue1Brown video. Write the visual intuition, connect it to SLAM, control, perception, E2E, simulation, or reconstruction, then define one minimal experiment.",
    checklist: [
      "Name the course or topic and video.",
      "Summarize the visual intuition in your own words.",
      "Connect it to one Autoware/CARLA/simctl object.",
      "Write one minimal Python, diagram, log, or formula experiment."
    ],
    template:
      "Video:\nCore intuition:\nAutonomous-driving connection:\nMinimal experiment:\nReusable sentence:\nOpen question:\nNext video:",
    formulaCue: {
      label: "First 3Blue1Brown video formula",
      latex: "\\mathbf{p}_{map}=T_{map\\leftarrow base}T_{base\\leftarrow lidar}\\mathbf{p}_{lidar}",
      terms: [
        {
          label: "点向量",
          symbol: "\\mathbf{p}",
          meaning: "把视频里的箭头或空间点写成可计算的向量。"
        },
        {
          label: "坐标变换",
          symbol: "T_{a\\leftarrow b}",
          meaning: "把同一个点从 b 坐标语言翻译到 a 坐标语言。"
        },
        {
          label: "坐标变换链",
          symbol: "T_{map\\leftarrow base}T_{base\\leftarrow lidar}",
          meaning: "矩阵连续相乘，把 LiDAR 点一步步翻译到地图坐标。"
        }
      ]
    },
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
    ],
    taskTitle: "3Blue1Brown video note: math intuition to engineering intuition",
    priority: "high"
  },
  {
    id: "spatial-intelligence-route",
    track: "world-spatial-models",
    mode: "spatial-intelligence",
    title: "Spatial intelligence route",
    question: "Which spatial-intelligence question are you closing today: location, scene content, motion, action, or evidence?",
    prompt:
      "Use the five-question loop as the learning unit. Pick one scene, write the coordinate frames and representation, define the action interface, then decide whether the result is learning material, shadow/reconstruction exploration, regression evidence, or stable validation evidence.",
    checklist: [
      "Draw the camera, ego, map, and BEV frame chain before discussing models.",
      "Choose exactly one representation: point cloud, BEV, occupancy, mesh, 3DGS, or world model.",
      "Name the action interface: planner cost, trajectory, control target, VLA action, or case generation.",
      "Mark the validation boundary: learning, shadow, reconstruction, regression, or stable evidence."
    ],
    template:
      "Scene:\nQuestion: where | what | motion | action | evidence\nCoordinate frames:\nRepresentation:\nAction interface:\nFailure mode:\nEvidence path:\nValidation boundary:\nNext experiment:",
    sources: [
      {
        title: "Spatial Intelligence Learning Route",
        url: "20_Courses/World-Spatial-Models/12-Spatial-Intelligence-Learning-Route.md"
      },
      {
        title: "World Labs World API",
        url: "https://www.worldlabs.ai/blog/announcing-the-world-api"
      },
      {
        title: "DeepMind Genie 3",
        url: "https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/"
      },
      {
        title: "Waymo World Model",
        url: "https://waymo.com/blog/2026/02/the-waymo-world-model-a-new-frontier-for-autonomous-driving-simulation/"
      },
      {
        title: "OpenVLA",
        url: "https://openvla.github.io/"
      }
    ],
    taskTitle: "Spatial intelligence route: one validation-ready case card",
    priority: "high"
  },
  {
    id: "world-spatial-paper",
    track: "world-spatial-models",
    mode: "paper",
    title: "Paper reading and reproduction",
    question: "Turn one world/spatial paper into representation, objective, failure mode, and minimal reproduction.",
    prompt:
      "Choose PlaNet, DreamerV3, Lift-Splat-Shoot, BEVFormer, NeRF, or 3DGS. Extract the representation, derive the objective, identify failure modes, and define a small reproduction.",
    checklist: [
      "State the paper's problem and representation.",
      "Write the training, planning, rendering, or cost objective.",
      "List expected failure modes.",
      "Define a minimal reproduction tied to CARLA, Autoware, or KPI evidence."
    ],
    template:
      "Paper:\nProblem:\nRepresentation:\nObjective:\n$$\n\n$$\nAssumptions:\nFailure modes:\nMinimal reproduction:\nAutoware/CARLA connection:",
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
    ],
    taskTitle: "World/spatial paper reproduction card",
    priority: "high"
  },
  {
    id: "slam-reconstruction-first-line",
    track: "world-spatial-models",
    mode: "reconstruction",
    title: "SLAM and 3D reconstruction first line",
    question:
      "Which object are you learning today: pose, projection, matching, backend optimization, COLMAP reconstruction, NeRF, or 3DGS?",
    prompt:
      "Work through pose graph, bundle adjustment, COLMAP, NeRF, and 3DGS as one asset chain. Start from the beginner object, write the core formula, then decide whether the output is learning evidence, reconstruction evidence, or a validation asset.",
    checklist: [
      "Name the representation: pose, pixel, feature match, point cloud, mesh, radiance field, or Gaussian set.",
      "Write one formula in LaTeX and define every symbol.",
      "State the failure mode: drift, bad calibration, wrong match, poor depth, dynamic object, or nonphysical asset.",
      "Connect it to GoodNotes, Obsidian Canvas, and one Notion row.",
      "Mark whether the output is only visual/research or can support stable validation."
    ],
    template:
      "Topic:\nBeginner object:\nRepresentation:\nFormula:\n$$\n\n$$\nSymbols:\nFailure mode:\nGoodNotes page:\nObsidian links:\nNotion row:\nValidation asset boundary:",
    sources: [
      {
        title: "COLMAP",
        url: "https://colmap.org/"
      },
      {
        title: "ORB-SLAM3",
        url: "https://arxiv.org/abs/2007.11898"
      },
      {
        title: "3D Gaussian Splatting",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
      }
    ],
    taskTitle: "SLAM and 3D reconstruction first-line study session",
    priority: "high"
  },
  {
    id: "factor-graph-optimizer-session",
    track: "world-spatial-models",
    mode: "formula",
    title: "Factor graph optimizer session",
    question: "Can you explain one SLAM backend update from variable nodes to residuals to a solved update step?",
    prompt:
      "Use factor graph, residual, Jacobian, robust kernel, and normal-equation update as the bridge from BA/pose graph theory into GTSAM, Ceres, and g2o practice.",
    checklist: [
      "Name every variable node: camera pose, landmark, velocity, bias, or map state.",
      "Turn every measurement into a residual factor and define its information weight.",
      "Write the Jacobian and the J^TWJ update once, even if the algebra feels heavy.",
      "Mark which residuals need a robust kernel because of outliers, dynamic objects, or wrong matches."
    ],
    template:
      "Graph object:\nVariable nodes:\nResidual factors:\nObjective:\n$$\n\\min_x \\sum_k \\rho(\\lVert r_k(x)\\rVert^2_{\\Omega_k})\n$$\nJacobian:\nUpdate equation:\nRobust-kernel reason:\nGTSAM/Ceres/g2o connection:\nGoodNotes page:",
    formulaCue: {
      label: "Factor graph least-squares objective",
      latex:
        "\\min_x\\sum_k\\rho(\\lVert r_k(x)\\rVert^2_{\\Omega_k}),\\quad J^TWJ\\Delta x=-J^TWr",
      terms: factorGraphOptimizerFormulaTerms
    },
    sources: [
      {
        title: "GTSAM Docs",
        url: "https://gtsam.org/docs/"
      },
      {
        title: "Ceres Solver Non-linear Least Squares",
        url: "https://ceres-solver.org/nnls_tutorial.html"
      },
      {
        title: "g2o paper",
        url: "https://ais.informatik.uni-freiburg.de/publications/papers/kuemmerle11icra.pdf"
      }
    ],
    taskTitle: "Factor graph optimizer: BA/GTSAM/Ceres derivation",
    priority: "high"
  },
  {
    id: "loop-closure-relocalization-session",
    track: "world-spatial-models",
    mode: "loop-closure",
    title: "Loop closure and relocalization session",
    question: "Can you explain how SLAM decides that the current place is an old place, then uses that claim safely?",
    prompt:
      "Connect DBoW2, NetVLAD, Scan Context, geometric verification, and relocalization into one loop: retrieve a candidate, verify it geometrically, add a loop edge, then recover pose when tracking is lost.",
    checklist: [
      "Separate visual or LiDAR place recognition from geometric verification.",
      "Write the descriptor similarity score and explain why it only creates a candidate.",
      "Draw the loop-closure edge as a factor-graph constraint, then mark what happens if the edge is wrong.",
      "Explain relocalization as recovering T_map_camera from a known map after tracking is lost."
    ],
    template:
      "Query frame:\nCandidate database:\nDescriptor:\n$$\ns(q,i)=\\frac{v_q^Tv_i}{\\lVert v_q\\rVert\\lVert v_i\\rVert}\n$$\nCandidate:\nGeometric verification:\n$$\nr_{loop}=\\log(Z_{qi}^{-1}T_q^{-1}T_i)\n$$\nFailure mode:\nRelocalization result:\nGoodNotes page:",
    formulaCue: {
      label: "Loop closure candidate score and verification edge",
      latex:
        "i^*=\\arg\\max_i s(q,i),\\quad s(q,i)=\\frac{v_q^Tv_i}{\\lVert v_q\\rVert\\lVert v_i\\rVert},\\quad r_{loop}=\\log(Z_{qi}^{-1}T_q^{-1}T_i)",
      terms: loopClosureFormulaTerms
    },
    sources: [
      {
        title: "DBoW2",
        url: "https://github.com/dorian3d/DBoW2"
      },
      {
        title: "NetVLAD",
        url: "https://arxiv.org/abs/1511.07247"
      },
      {
        title: "Scan Context",
        url: "https://ieeexplore.ieee.org/document/8593953"
      }
    ],
    taskTitle: "Loop closure and relocalization: candidate, verification, recovery",
    priority: "high"
  },
  {
    id: "ielts-output-loop",
    track: "ielts",
    mode: "ielts-output",
    title: "IELTS output and error attribution",
    question: "Produce one answer, estimate the score, and identify the exact error cause.",
    prompt:
      "Choose listening, reading, writing, or speaking. Capture raw output, score it against the rubric or answer key, and log the error cause and fix.",
    checklist: [
      "Choose one IELTS task type.",
      "Produce an answer or recording record.",
      "Estimate score or correct rate.",
      "Log one concrete error cause and fix."
    ],
    template:
      "Module:\nSource:\nRaw output:\nScore estimate:\nError type:\nCause:\nBetter version:\nNext drill:",
    sources: [
      {
        title: "IELTS scoring in detail",
        url: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail"
      },
      {
        title: "IELTS Speaking band descriptors",
        url: "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf"
      }
    ],
    taskTitle: "IELTS output loop: one scored answer",
    priority: "medium"
  },
  {
    id: "philosophy-argument-map",
    track: "philosophy",
    mode: "argument",
    title: "Philosophy argument map",
    question: "Turn one reading into thesis, premises, objection, response, and a validation judgment connection.",
    prompt:
      "Choose logic, epistemology, philosophy of science, ethics, mind, or AI ethics. Build one argument map and connect it to evidence, responsibility, or model judgment.",
    checklist: [
      "Name the question and thesis.",
      "Separate premises from inference.",
      "Write the strongest objection.",
      "Connect the argument to one learning or validation decision."
    ],
    template:
      "Reading:\nQuestion:\nThesis:\nPremise 1:\nPremise 2:\nInference:\nStrongest objection:\nResponse:\nWork or learning connection:",
    sources: [
      {
        title: "Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/"
      },
      {
        title: "SEP Ethics of Artificial Intelligence and Robotics",
        url: "https://plato.stanford.edu/entries/ethics-ai/"
      }
    ],
    taskTitle: "Philosophy argument map: one reading",
    priority: "medium"
  },
  {
    id: "work-validation-closure",
    track: "work-validation",
    mode: "closure",
    title: "Work validation closure loop",
    question: "Convert one validation topic into evidence, status, blocker, owner, next action, and verification path.",
    prompt:
      "Pick one run result, failcase, KPI gate, issue closure, or scenario-readiness question. Keep stable validation, shadow research, and reconstruction clearly separated.",
    checklist: [
      "Name the validation line: stable, shadow, or reconstruction.",
      "Attach evidence from logs, run results, KPI gates, issues, screenshots, or explicit user validation.",
      "Keep pass/fail nuance instead of flattening mixed evidence into done.",
      "Record owner, next action, rollback impact, and verification path."
    ],
    template:
      "Case:\nLine: stable | shadow | reconstruction\nEvidence:\nStatus:\nBlocker:\nOwner:\nNext action:\nVerification path:\nRollback or risk:\nOpen question:",
    sources: [
      {
        title: "PIX Simulation Validation Platform",
        url: "https://github.com/77zmf/PIX-Simulation-Validation-Platform"
      }
    ],
    taskTitle: "Work validation closure: capture one evidence-backed loop",
    priority: "high"
  },
  {
    id: "reconstruction-slam-handoff",
    track: "work-validation",
    mode: "reconstruction",
    title: "Reconstruction SLAM handoff session",
    question:
      "Which SLAM or reconstruction artifact can become validation evidence, and which line should consume it?",
    prompt:
      "Use the imported Notion page. Treat SLAM as an offline producer: trajectory, GlobalMap.pcdrgb, pose prior, alignment diagnostics, then decide whether the consumer is map refresh, CARLA import, or stable validation. For CARLA, check mesh + OpenDRIVE + collision proxy instead of assuming Gaussian/NeRF output is directly runnable.",
    checklist: [
      "Name the producer: LIO-RF, FAST-LIO, pycolmap, Open3D, or another reconstruction tool.",
      "Name the artifact: trajectory, GlobalMap.pcdrgb, pose_prior_manifest, mesh, OpenDRIVE, or collision proxy.",
      "Name the metric: continuity, RMSE, coverage, drift, or KPI gate.",
      "Name the consumer: map refresh, CARLA asset import, report/replay, or research visualization.",
      "Mark the line as stable, shadow, or reconstruction before creating a task."
    ],
    template:
      "Producer:\nArtifact:\nMetric:\nConsumer:\nValidation Line: stable | shadow | reconstruction\nCan enter stable validation now?:\nMissing evidence:\nNext action:\nRollback or risk:",
    sources: [
      {
        title: "Detailed stack and reconstruction SLAM line",
        url: "https://www.notion.so/35cef7e6aaa981d09be6ffd935e7c748"
      },
      {
        title: "PIX Simulation Validation Platform",
        url: "https://github.com/77zmf/PIX-Simulation-Validation-Platform"
      }
    ],
    taskTitle: "Reconstruction SLAM handoff: classify one artifact",
    priority: "high"
  }
];

export function modesForTrack(track: TrackId) {
  return studyPlans.filter((plan) => plan.track === track).map((plan) => plan.mode);
}

export function findStudyPlan(track: TrackId, mode: StudyMode) {
  return studyPlans.find((plan) => plan.track === track && plan.mode === mode);
}
