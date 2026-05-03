export interface TutorChoice {
  id: string;
  label: string;
  value: string;
}

export interface TutorStep {
  id: string;
  title: string;
  goodNotesPage: string;
  prompt: string;
  formula: string;
  choices: TutorChoice[];
  correctChoiceId: string;
  correctFeedback: string;
  incorrectFeedback: string;
  noteLine: string;
}

export const controllabilityTutorSteps: TutorStep[] = [
  {
    id: "calculate-ab",
    title: "001 Controllability: calculate AB",
    goodNotesPage: "002 可控性 Controllability",
    prompt: "Calculate AB for the system below.",
    formula:
      "A = \\begin{bmatrix}0 & 0\\\\0 & 1\\end{bmatrix},\\quad B = \\begin{bmatrix}1\\\\0\\end{bmatrix}",
    choices: [
      {
        id: "A",
        label: "A",
        value: "AB = \\begin{bmatrix}0\\\\0\\end{bmatrix}"
      },
      {
        id: "B",
        label: "B",
        value: "AB = \\begin{bmatrix}1\\\\0\\end{bmatrix}"
      },
      {
        id: "C",
        label: "C",
        value: "AB = \\begin{bmatrix}0\\\\1\\end{bmatrix}"
      },
      {
        id: "D",
        label: "D",
        value: "AB = \\begin{bmatrix}1\\\\1\\end{bmatrix}"
      }
    ],
    correctChoiceId: "A",
    correctFeedback:
      "Correct. The first row is 0*1 + 0*0 = 0, and the second row is 0*1 + 1*0 = 0.",
    incorrectFeedback:
      "Not yet. Recompute row by row: the second row is 0*1 + 1*0, so it is also 0.",
    noteLine: "AB = \\begin{bmatrix}0\\\\0\\end{bmatrix}"
  },
  {
    id: "build-c-matrix",
    title: "002 Build the controllability matrix",
    goodNotesPage: "002 可控性 Controllability",
    prompt: "Use B and AB to build the controllability matrix C = [B AB].",
    formula:
      "B = \\begin{bmatrix}1\\\\0\\end{bmatrix},\\quad AB = \\begin{bmatrix}0\\\\0\\end{bmatrix}",
    choices: [
      {
        id: "A",
        label: "A",
        value: "\\mathcal{C}=\\begin{bmatrix}0 & 1\\\\0 & 0\\end{bmatrix}"
      },
      {
        id: "B",
        label: "B",
        value: "\\mathcal{C}=\\begin{bmatrix}1 & 0\\\\0 & 1\\end{bmatrix}"
      },
      {
        id: "C",
        label: "C",
        value: "\\mathcal{C}=\\begin{bmatrix}1 & 0\\\\0 & 0\\end{bmatrix}"
      },
      {
        id: "D",
        label: "D",
        value: "\\mathcal{C}=\\begin{bmatrix}0 & 0\\\\1 & 0\\end{bmatrix}"
      }
    ],
    correctChoiceId: "C",
    correctFeedback: "Correct. The first column is B and the second column is AB.",
    incorrectFeedback: "Not yet. Put B as the first column and AB as the second column.",
    noteLine: "\\mathcal{C}=\\begin{bmatrix}1 & 0\\\\0 & 0\\end{bmatrix}"
  },
  {
    id: "rank-judgment",
    title: "003 Rank and controllability judgment",
    goodNotesPage: "002 可控性 Controllability",
    prompt: "The system has n = 2 states. What does this controllability matrix imply?",
    formula: "\\mathcal{C}=\\begin{bmatrix}1 & 0\\\\0 & 0\\end{bmatrix}",
    choices: [
      {
        id: "A",
        label: "A",
        value: "rank(C)=2, so the system is controllable"
      },
      {
        id: "B",
        label: "B",
        value: "rank(C)=1, so the system is not controllable"
      },
      {
        id: "C",
        label: "C",
        value: "rank(C)=0, so the system is controllable"
      },
      {
        id: "D",
        label: "D",
        value: "rank(C)=1, so the system is stable"
      }
    ],
    correctChoiceId: "B",
    correctFeedback:
      "Correct. There is only one independent column, so rank(C)=1<n=2. The system is not controllable.",
    incorrectFeedback:
      "Not yet. Count independent columns. The second column is zero, so the rank cannot reach 2.",
    noteLine: "可控性矩阵不满秩：rank(\\mathcal{C})=1<2，因此系统不可控。"
  }
];
