import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CoursesView } from "../../src/components/CoursesView";

describe("CoursesView", () => {
  it("renders sourced first-batch knowledge modules", () => {
    render(<CoursesView />);

    expect(screen.getByText("Signals, systems, and control spine")).toBeInTheDocument();
    expect(screen.getByText("IELTS scoring and rubric loop")).toBeInTheDocument();
    expect(screen.getAllByText("First knowledge blocks").length).toBeGreaterThan(0);
  });
});
