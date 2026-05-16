export interface Cs231nCourseResource {
  id: string;
  title: string;
  label: string;
  href: string;
  kind: "guided-pdf" | "official" | "notes" | "assignment";
}

export const cs231nCourseResources: Cs231nCourseResource[] = [
  {
    id: "cyrus-guided-notes",
    title: "Cyrus CS231n Guided Notes",
    label: "PDF",
    href: "/Cyrus-Learning-Manager/courses/cs231n/cyrus-cs231n-guided-notes.pdf",
    kind: "guided-pdf"
  },
  {
    id: "official-home",
    title: "Official CS231n Course Home",
    label: "Official",
    href: "https://cs231n.stanford.edu/",
    kind: "official"
  },
  {
    id: "official-schedule",
    title: "Schedule and Slides",
    label: "Slides",
    href: "https://cs231n.stanford.edu/schedule.html",
    kind: "official"
  },
  {
    id: "notes-index",
    title: "Course Notes Index",
    label: "Notes",
    href: "https://cs231n.github.io/",
    kind: "notes"
  },
  {
    id: "image-classification",
    title: "Image Classification and kNN",
    label: "Notes 01",
    href: "https://cs231n.github.io/classification/",
    kind: "notes"
  },
  {
    id: "linear-classification",
    title: "Linear SVM and Softmax",
    label: "Notes 02",
    href: "https://cs231n.github.io/linear-classify/",
    kind: "notes"
  },
  {
    id: "optimization",
    title: "Optimization and SGD",
    label: "Notes 03",
    href: "https://cs231n.github.io/optimization-1/",
    kind: "notes"
  },
  {
    id: "backprop",
    title: "Backpropagation",
    label: "Notes 04",
    href: "https://cs231n.github.io/optimization-2/",
    kind: "notes"
  },
  {
    id: "cnn",
    title: "Convolutional Neural Networks",
    label: "Notes 05",
    href: "https://cs231n.github.io/convolutional-networks/",
    kind: "notes"
  },
  {
    id: "rnn",
    title: "Recurrent Neural Networks",
    label: "Notes 06",
    href: "https://cs231n.github.io/rnn/",
    kind: "notes"
  },
  {
    id: "assignment-1-2026",
    title: "Assignment 1: kNN, SVM, Softmax, Fully Connected Nets",
    label: "A1",
    href: "https://cs231n.github.io/assignments2026/assignment1/",
    kind: "assignment"
  },
  {
    id: "assignment-2-2026",
    title: "Assignment 2: BatchNorm, Dropout, ConvNets, Visualization, Captioning",
    label: "A2",
    href: "https://cs231n.github.io/assignments2026/assignment2/",
    kind: "assignment"
  }
];
