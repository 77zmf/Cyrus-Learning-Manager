import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InteractiveTutor } from "../../src/components/InteractiveTutor";

describe("InteractiveTutor", () => {
  it("checks an answer, gives feedback, and advances one small step", () => {
    render(<InteractiveTutor />);

    expect(screen.getByRole("heading", { name: "Interactive Tutor" })).toBeInTheDocument();
    expect(screen.getByText("001 Controllability: calculate AB")).toBeInTheDocument();
    expect(screen.getByText(/GoodNotes page/)).toBeInTheDocument();
    expect(screen.getByLabelText("Formula visual: Controllability question formula")).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Formula visual line/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("可控性传播 AB")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /B\./ }));

    expect(screen.getByText("Not yet")).toBeInTheDocument();
    expect(screen.getByText(/second row is/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /A\./ }));

    expect(screen.getByText("Correct")).toBeInTheDocument();
    const goodNotesPanel = screen.getByRole("region", { name: "GoodNotes Summary" });
    expect(
      within(goodNotesPanel).getByText(/AB = \\begin\{bmatrix\}0\\\\0\\end\{bmatrix\}/)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next question" }));

    expect(screen.getByText("002 Build the controllability matrix")).toBeInTheDocument();
  });

  it("generates a GoodNotes summary and Hermes closeout after finishing the lesson", () => {
    render(<InteractiveTutor />);

    fireEvent.click(screen.getByRole("button", { name: /A\./ }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    fireEvent.click(screen.getByRole("button", { name: /C\./ }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    fireEvent.click(screen.getByRole("button", { name: /B\./ }));

    expect(screen.getByText("Lesson complete")).toBeInTheDocument();
    const goodNotesPanel = screen.getByRole("region", { name: "GoodNotes Summary" });
    const closeoutPanel = screen.getByRole("region", { name: "Hermes Closeout" });

    expect(within(goodNotesPanel).getByText(/可控性矩阵不满秩/)).toBeInTheDocument();
    expect(within(closeoutPanel).getByText(/Evidence: completed 3\/3 interaction checks/)).toBeInTheDocument();
  });
});
