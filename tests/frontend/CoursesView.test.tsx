import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CoursesView } from "../../src/components/CoursesView";

describe("CoursesView", () => {
  it("renders sourced first-batch knowledge modules", () => {
    render(<CoursesView />);

    expect(screen.getByText("Tsinghua Automation undergraduate full path")).toBeInTheDocument();
    expect(screen.getByText("Graduate control engineering path")).toBeInTheDocument();
    expect(screen.getByText("World models and latent dynamics")).toBeInTheDocument();
    expect(screen.getByText("Spatial models, 3D geometry, BEV, and occupancy")).toBeInTheDocument();
    expect(screen.getByText("IELTS scoring and rubric loop")).toBeInTheDocument();
    expect(screen.getAllByText("Knowledge modules").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MIT 6.241J Dynamic Systems and Control")[0]).toHaveAttribute(
      "href",
      "https://ocw.mit.edu/courses/6-241j-dynamic-systems-and-control-spring-2011/"
    );
  });
});
