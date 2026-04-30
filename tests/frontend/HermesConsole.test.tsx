import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HermesConsole } from "../../src/components/HermesConsole";

describe("HermesConsole", () => {
  it("builds a Hermes handoff from user input", () => {
    render(<HermesConsole onCreateTask={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Topic"), {
      target: { value: "120th KPI gate review" }
    });
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "run_result.json shows control gate failed and localization passed" }
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "mixed" }
    });
    fireEvent.change(screen.getByLabelText("Owner"), {
      target: { value: "Cyrus" }
    });

    expect(screen.getByText("Hermes Console")).toBeInTheDocument();
    expect(screen.getByText(/cyrus -s obsidian/)).toBeInTheDocument();
    expect(screen.getByText(/model authentication is still missing/i)).toBeInTheDocument();
    expect(screen.getByText(/## Hermes Handoff/)).toBeInTheDocument();
    expect(screen.getByText(/Topic: 120th KPI gate review/)).toBeInTheDocument();
    expect(screen.getByText(/Status: mixed/)).toBeInTheDocument();
    expect(screen.getByText(/Evidence: run_result\.json shows control gate failed/i)).toBeInTheDocument();
    expect(screen.getByText(/Owner: Cyrus/)).toBeInTheDocument();
  });

  it("creates a work-validation task from the Hermes handoff", () => {
    const onCreateTask = vi.fn();
    render(<HermesConsole onCreateTask={onCreateTask} />);

    fireEvent.change(screen.getByLabelText("Topic"), {
      target: { value: "Failcase closure note" }
    });
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "GitHub issue comment and KPI report attached" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Create Hermes task" }));

    expect(onCreateTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Hermes handoff: Failcase closure note",
        track: "work-validation",
        status: "active",
        priority: "high",
        source: "Hermes Console",
        notes: expect.stringContaining("Evidence: GitHub issue comment and KPI report attached")
      })
    );
  });
});
