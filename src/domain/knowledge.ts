import type { TaskPriority, TaskStatus, TrackId } from "./types";

export interface KnowledgeSource {
  title: string;
  url: string;
}

export interface KnowledgeModule {
  id: string;
  track: TrackId;
  title: string;
  stage: string;
  focus: string;
  outputs: string[];
  sources: KnowledgeSource[];
}

export interface KnowledgeSeedTask {
  id: string;
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
}

export const knowledgeModules: KnowledgeModule[] = [
  {
    id: "tsinghua-control-spine",
    track: "tsinghua-automation",
    title: "Signals, systems, and control spine",
    stage: "Foundation to core",
    focus:
      "Use signal representation, system response, feedback, and control theory as the automation backbone.",
    outputs: [
      "one concept sheet for signal transforms and system response",
      "one control-theory note connected to vehicle control or trajectory review",
      "one lab note using simulation, logs, or KPI evidence"
    ],
    sources: [
      {
        title: "Tsinghua Automation undergraduate program",
        url: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf"
      },
      {
        title: "MIT OCW 6.003 Signals and Systems",
        url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/"
      }
    ]
  },
  {
    id: "tsinghua-intelligent-systems",
    track: "tsinghua-automation",
    title: "Intelligent sensing, optimization, and robotics bridge",
    stage: "Professional extension",
    focus:
      "Connect AI, pattern recognition, intelligent sensing, optimization, and robotics to autonomous-driving validation work.",
    outputs: [
      "one perception failure taxonomy note",
      "one optimization or planning comparison note",
      "one robotics-to-CARLA scenario idea"
    ],
    sources: [
      {
        title: "Tsinghua Automation research directions",
        url: "https://www.au.tsinghua.edu.cn/?columnId=00509"
      },
      {
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/"
      }
    ]
  },
  {
    id: "mit-algorithms-systems",
    track: "mit-eecs",
    title: "Algorithms, software, and systems execution line",
    stage: "Executable CS",
    focus:
      "Treat MIT EECS as the execution companion for building reliable tools, data paths, and simulation workflows.",
    outputs: [
      "one solved algorithms problem with complexity notes",
      "one software construction refactor note",
      "one systems reliability note tied to simctl or batch runs"
    ],
    sources: [
      {
        title: "MIT OCW 6.006 Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"
      },
      {
        title: "MIT OCW 6.033 Computer System Engineering",
        url: "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/"
      }
    ]
  },
  {
    id: "mit-ai-robotics",
    track: "mit-eecs",
    title: "Machine learning and robotics line",
    stage: "AI and autonomy",
    focus:
      "Use machine learning and robotics materials only when they produce a concrete experiment, metric, or failure analysis.",
    outputs: [
      "one ML concept note on over-fitting, generalization, or reinforcement learning",
      "one robotics dynamics/control note",
      "one validation experiment proposal"
    ],
    sources: [
      {
        title: "MIT OCW 6.036 Introduction to Machine Learning",
        url: "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/"
      },
      {
        title: "MIT Underactuated Robotics",
        url: "https://underactuated.mit.edu/"
      }
    ]
  },
  {
    id: "ielts-scoring-loop",
    track: "ielts",
    title: "IELTS scoring and rubric loop",
    stage: "Diagnostic to weekly loop",
    focus:
      "Use official band-score logic and public descriptors to drive practice, not generic English study.",
    outputs: [
      "one baseline score sheet",
      "one writing rubric checklist",
      "one speaking recording review with fluency, vocabulary, grammar, and pronunciation notes"
    ],
    sources: [
      {
        title: "IELTS scoring in detail",
        url: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail"
      },
      {
        title: "IELTS Speaking band descriptors",
        url: "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf"
      }
    ]
  },
  {
    id: "philosophy-argument-ethics",
    track: "philosophy",
    title: "Argument clarity and technology ethics line",
    stage: "Reading to decision quality",
    focus:
      "Convert philosophy readings into argument maps, objections, and judgment notes for engineering decisions.",
    outputs: [
      "one argument map",
      "one strongest-objection note",
      "one AI or autonomous-systems ethics decision memo"
    ],
    sources: [
      {
        title: "Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/"
      },
      {
        title: "SEP Ethics of Artificial Intelligence and Robotics",
        url: "https://plato.stanford.edu/entries/ethics-ai/"
      },
      {
        title: "Open Yale Philosophy courses",
        url: "https://oyc.yale.edu/philosophy"
      }
    ]
  },
  {
    id: "work-validation-closure",
    track: "work-validation",
    title: "Stable validation closure line",
    stage: "Work integration",
    focus:
      "Keep work notes connected to repeatable run results, KPI gates, failcase packages, and owner-ready digests.",
    outputs: [
      "one weekly validation digest",
      "one failcase closure note",
      "one KPI gate or scenario-readiness review"
    ],
    sources: [
      {
        title: "PIX Simulation Validation Platform",
        url: "https://github.com/77zmf/PIX-Simulation-Validation-Platform"
      }
    ]
  }
];

export const knowledgeSeedTasks: KnowledgeSeedTask[] = [
  {
    id: "seed_tsinghua_signal_control_spine",
    title: "Build the Tsinghua signals and control spine",
    track: "tsinghua-automation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf",
    notes:
      "Create one spine note linking signal transforms, system response, feedback, and automatic control to vehicle-control validation."
  },
  {
    id: "seed_tsinghua_intelligent_systems_bridge",
    title: "Map intelligent sensing and robotics to validation cases",
    track: "tsinghua-automation",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://www.au.tsinghua.edu.cn/?columnId=00509",
    notes:
      "Turn intelligent sensing, optimization, and robotics topics into concrete perception, planning, and CARLA scenario notes."
  },
  {
    id: "seed_mit_6006_algorithms_problem",
    title: "Start MIT 6.006 with one algorithms problem note",
    track: "mit-eecs",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
    notes:
      "Use one lecture/problem set to capture model, data structure, correctness argument, complexity, and implementation hook."
  },
  {
    id: "seed_mit_6003_signals_companion",
    title: "Use MIT 6.003 as the signals companion",
    track: "mit-eecs",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/",
    notes:
      "Capture discrete/continuous signal representations and connect them to filtering, control, and vehicle-state analysis."
  },
  {
    id: "seed_ielts_diagnostic_score_sheet",
    title: "Create IELTS baseline score sheet",
    track: "ielts",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail",
    notes:
      "Record listening, reading, writing, and speaking baseline bands, then pick the weakest two modules for the first two weeks."
  },
  {
    id: "seed_ielts_speaking_rubric_review",
    title: "Record one IELTS speaking answer against band descriptors",
    track: "ielts",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf",
    notes:
      "Review fluency, lexical resource, grammatical range and accuracy, and pronunciation with concrete fixes."
  },
  {
    id: "seed_philosophy_argument_map",
    title: "Create the first philosophy argument map",
    track: "philosophy",
    status: "active",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://plato.stanford.edu/",
    notes:
      "Pick one SEP entry or lecture and extract thesis, premises, inference, strongest objection, and work relevance."
  },
  {
    id: "seed_philosophy_ai_ethics_memo",
    title: "Draft an AI ethics memo for autonomous validation",
    track: "philosophy",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "https://plato.stanford.edu/entries/ethics-ai/",
    notes:
      "Connect autonomy, responsibility, opacity, fairness, and safety to one validation or failcase decision."
  },
  {
    id: "seed_work_weekly_validation_digest",
    title: "Create this week's validation digest shell",
    track: "work-validation",
    status: "active",
    priority: "high",
    dueDate: null,
    progress: 0,
    source: "https://github.com/77zmf/PIX-Simulation-Validation-Platform",
    notes:
      "Summarize run results, KPI gates, failcases, issue closures, and next owner actions in one weekly note."
  }
];

export function modulesForTrack(track: TrackId) {
  return knowledgeModules.filter((module) => module.track === track);
}
