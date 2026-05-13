import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../../src/App";
import { CoursesView } from "../../src/components/CoursesView";
import { HermesConsole } from "../../src/components/HermesConsole";
import { LearnView } from "../../src/components/LearnView";
import { ReviewView } from "../../src/components/ReviewView";
import { SyncCenter } from "../../src/components/SyncCenter";
import type { HealthResponse, LearningTask } from "../../src/domain/types";

const healthResponse: HealthResponse = {
  ok: true,
  service: "cyrus-local-sync",
  notionConfigured: true,
  obsidianConfigured: true,
  hermesConfigured: true,
  hermesModel: "kimi-k2.6",
  hermesProvider: "Kimi / Moonshot China",
  hermesProfilePath: "/Users/cyber/.hermes/profiles/cyrus",
  notionTarget: "tasks-db",
  obsidianVaultPath: "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge"
};

const task: LearningTask = {
  id: "task_ui_audit",
  title: "Sensor calibration chain review",
  track: "world-spatial-models",
  status: "active",
  priority: "high",
  dueDate: null,
  progress: 35,
  source: "Cyrus Learning Manager",
  notes: "Check camera, LiDAR, and IMU calibration notes.",
  obsidianPath: null,
  notionPageId: null,
  createdAt: "2026-05-13T00:00:00.000Z",
  updatedAt: "2026-05-13T00:00:00.000Z"
};

describe("full UI button audit", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens every top-level app tab button", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(
              url.endsWith("/health")
                ? healthResponse
                : {
                    tasks: [task]
                  }
            )
        })
      )
    );

    render(<App />);

    expect(await screen.findByText("Local Sync: connected")).toBeInTheDocument();

    for (const tabName of ["Learn", "Notebook", "Map", "Library", "Review", "Hermes", "Sync"]) {
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: tabName }));
        await Promise.resolve();
      });
      expect(screen.getByRole("button", { name: tabName })).toHaveClass("active");
    }
  });

  it("exercises Learn view buttons, checkboxes, and scrubbers", () => {
    const { container } = render(<LearnView />);

    expect(screen.getByRole("heading", { name: "Learn" })).toBeInTheDocument();
    expect(container.querySelectorAll("details.guided-lesson-card").length).toBe(26);

    for (const topic of [
      "打开 SLAM Interface",
      "打开 3D Reconstruction Interface",
      "打开 Fei-Fei Li Spatial Intelligence",
      "打开 Quaternion Explorable"
    ]) {
      fireEvent.click(screen.getByRole("button", { name: topic }));
      clickEveryButton(container, `Learn topic ${topic}`);
      exerciseRangeInputs(container);
    }

    toggleEveryCheckbox(container);
    expect(container.querySelector(".latex-source")).toBeNull();
  });

  it("exercises Library study controls and deep-study card buttons", () => {
    const onCreateTask = vi.fn();
    const { container } = render(<CoursesView onCreateTask={onCreateTask} />);
    const trackSelect = screen.getByLabelText("Track") as HTMLSelectElement;
    const trackOptions = Array.from(trackSelect.options).map((option) => option.value);

    for (const track of trackOptions) {
      fireEvent.change(trackSelect, { target: { value: track } });
      clickEveryButton(container, `Library track ${track}`);
    }

    toggleEveryCheckbox(container);

    expect(onCreateTask).toHaveBeenCalled();
    expect(container.querySelector(".latex-source")).toBeNull();
  });

  it("exercises Review task filters, creation, and status controls", () => {
    const onSearchChange = vi.fn();
    const onTrackChange = vi.fn();
    const onStatusChange = vi.fn();
    const onPriorityChange = vi.fn();
    const onCreateTask = vi.fn();
    const onStatusUpdate = vi.fn();

    render(
      <ReviewView
        tasks={[task]}
        search=""
        track=""
        status=""
        priority=""
        onSearchChange={onSearchChange}
        onTrackChange={onTrackChange}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
        onCreateTask={onCreateTask}
        onStatusUpdate={onStatusUpdate}
      />
    );

    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "calibration" }
    });
    fireEvent.change(screen.getByLabelText("Track"), {
      target: { value: "world-spatial-models" }
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "active" }
    });
    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "high" }
    });
    fireEvent.change(screen.getByLabelText("New task title"), {
      target: { value: "Write calibration GoodNotes page" }
    });
    fireEvent.change(screen.getByLabelText("New task track"), {
      target: { value: "tsinghua-automation" }
    });
    fireEvent.change(screen.getByLabelText("New task priority"), {
      target: { value: "urgent" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Create task" }));
    fireEvent.change(screen.getByLabelText("Status for Sensor calibration chain review"), {
      target: { value: "done" }
    });

    expect(onSearchChange).toHaveBeenCalledWith("calibration");
    expect(onTrackChange).toHaveBeenCalledWith("world-spatial-models");
    expect(onStatusChange).toHaveBeenCalledWith("active");
    expect(onPriorityChange).toHaveBeenCalledWith("high");
    expect(onCreateTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Write calibration GoodNotes page",
        track: "tsinghua-automation",
        priority: "urgent"
      })
    );
    expect(onStatusUpdate).toHaveBeenCalledWith("task_ui_audit", "done", 100);
  });

  it("exercises Hermes preset and task buttons with form controls", () => {
    const onCreateTask = vi.fn();
    const { container } = render(<HermesConsole onCreateTask={onCreateTask} />);

    fireEvent.change(screen.getByLabelText("Topic"), {
      target: { value: "Quaternion lesson handoff" }
    });
    fireEvent.change(screen.getByLabelText("Scope"), {
      target: { value: "learning-plan" }
    });
    fireEvent.change(screen.getByLabelText("Line"), {
      target: { value: "learning" }
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "mixed" }
    });
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "GoodNotes page and Manim interaction checked" }
    });
    fireEvent.change(screen.getByLabelText("Blocker"), {
      target: { value: "Need one more derivation pass" }
    });
    fireEvent.change(screen.getByLabelText("Owner"), {
      target: { value: "Cyrus" }
    });
    fireEvent.change(screen.getByLabelText("Next action"), {
      target: { value: "Explain qvq^-1 from memory" }
    });
    fireEvent.change(screen.getByLabelText("Verification path"), {
      target: { value: "web interaction + GoodNotes summary" }
    });
    fireEvent.change(screen.getByLabelText("Rollback or risk"), {
      target: { value: "No production risk" }
    });

    clickEveryButton(container, "Hermes console");

    expect(onCreateTask).toHaveBeenCalled();
    expect(screen.getByText(/## Hermes Handoff/)).toBeInTheDocument();
  });

  it("keeps Sync Center readable in connected and disconnected states", () => {
    const connected = render(<SyncCenter health={healthResponse} error={null} />);

    expect(screen.getByRole("heading", { name: "Sync Center" })).toBeInTheDocument();
    expect(connected.container.querySelectorAll("button").length).toBe(0);
    connected.unmount();

    render(
      <SyncCenter
        health={null}
        error="Local sync service unavailable. Obsidian and Notion writes are paused."
      />
    );

    expect(screen.getByRole("region", { name: "Local Recovery" })).toBeInTheDocument();
    expect(screen.getAllByText("npm run dev:sync").length).toBeGreaterThanOrEqual(1);
  });
});

function clickEveryButton(container: HTMLElement, label: string) {
  const buttons = Array.from(container.querySelectorAll("button")) as HTMLButtonElement[];

  expect(buttons.length, `${label} should expose buttons`).toBeGreaterThan(0);

  for (const button of buttons) {
    if (!button.disabled) {
      fireEvent.click(button);
    }
  }
}

function toggleEveryCheckbox(container: HTMLElement) {
  const checkboxes = Array.from(
    container.querySelectorAll('input[type="checkbox"]')
  ) as HTMLInputElement[];

  expect(checkboxes.length).toBeGreaterThan(0);

  for (const checkbox of checkboxes) {
    fireEvent.click(checkbox);
  }
}

function exerciseRangeInputs(container: HTMLElement) {
  const ranges = Array.from(container.querySelectorAll('input[type="range"]')) as HTMLInputElement[];

  expect(ranges.length).toBeGreaterThan(0);

  for (const range of ranges) {
    const min = Number(range.min || 0);
    const max = Number(range.max || 100);
    const midpoint = String((min + max) / 2);

    fireEvent.change(range, { target: { value: midpoint } });
  }
}
