import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InteractiveTutor } from "../../src/components/InteractiveTutor";
import { CoursesView } from "../../src/components/CoursesView";
import { LearnView } from "../../src/components/LearnView";
import { NotebookView } from "../../src/components/NotebookView";
import { StudyLab } from "../../src/components/StudyLab";

const rawFormulaPatterns = [
  /\\(?:dot|mathcal|lambda|begin|end|int|infty|cdots)/,
  /x_dot\s*=/,
  /rank\(C\)\s*[<=>]/,
  /C=\[B AB/,
  /A\^2B/,
  /e\^\{(?:At|\\lambda t)\}/,
  /u=-R\^{-1\}/,
  /\$\$/
];

describe("formula visibility", () => {
  it("does not expose raw formula notation in learning and notebook surfaces", () => {
    const learn = render(<LearnView />);
    expectNoRawFormulaText(learn.container);
    learn.unmount();

    const notebook = render(<NotebookView />);
    expectNoRawFormulaText(notebook.container);
    notebook.unmount();

    const courses = render(<CoursesView />);
    expectNoRawFormulaText(courses.container);
    courses.unmount();
  });

  it("renders tutor choices and summaries without raw formula notation", () => {
    const tutor = render(<InteractiveTutor />);

    expectNoRawFormulaText(tutor.container);

    fireEvent.click(screen.getByRole("button", { name: /A\./ }));
    expectNoRawFormulaText(tutor.container);

    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expectNoRawFormulaText(tutor.container);
    tutor.unmount();
  });

  it("does not show raw display-math placeholders in study templates", () => {
    const studyLab = render(<StudyLab onCreateTask={vi.fn()} />);

    expectNoRawFormulaText(studyLab.container);

    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "world-spatial-models" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Paper" }));

    expectNoRawFormulaText(studyLab.container);
  });
});

function expectNoRawFormulaText(container: HTMLElement) {
  const visibleText = visibleTextWithoutRenderedMath(container);
  const matchedPattern = rawFormulaPatterns.find((pattern) => pattern.test(visibleText));

  expect(matchedPattern, `raw formula pattern ${matchedPattern} found in visible text: ${visibleText}`).toBeUndefined();
}

function visibleTextWithoutRenderedMath(container: HTMLElement) {
  const clone = container.cloneNode(true) as HTMLElement;

  clone.querySelectorAll(".katex, script, style").forEach((node) => node.remove());

  return clone.textContent ?? "";
}
