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
  "Evidence"
];
