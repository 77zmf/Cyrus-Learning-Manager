import type { TaskPriority, TrackId } from "./types";

export type StudyMode = "formula" | "paper" | "course" | "ielts-output" | "argument" | "closure";

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
}

export const studyModeLabels: Record<StudyMode, string> = {
  formula: "Formula",
  paper: "Paper",
  course: "Course",
  "ielts-output": "IELTS Output",
  argument: "Argument",
  closure: "Closure"
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
  }
];

export function modesForTrack(track: TrackId) {
  return studyPlans.filter((plan) => plan.track === track).map((plan) => plan.mode);
}

export function findStudyPlan(track: TrackId, mode: StudyMode) {
  return studyPlans.find((plan) => plan.track === track && plan.mode === mode);
}
