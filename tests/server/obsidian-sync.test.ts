import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { writeTaskMarkdownToObsidian } from "../../server/sync/obsidian";
import type { LearningTask } from "../../src/domain/types";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("Obsidian task sync", () => {
  it("writes generated Markdown under the Tasks folder and returns the relative path", () => {
    tempDir = mkdtempSync(join(tmpdir(), "cyrus-obsidian-"));
    const task = makeTask({
      id: "task_123",
      title: "Read planning paper!",
      notes: "Focus on proofs.",
      source: "MIT notes",
      dueDate: "2026-05-01"
    });

    const result = writeTaskMarkdownToObsidian(task, { vaultPath: tempDir });

    expect(result.relativePath).toBe(
      "60_Learning-App/Tasks/task_123-read-planning-paper.md"
    );
    const content = readFileSync(join(tempDir, result.relativePath), "utf8");
    expect(content).toContain("---\n");
    expect(content).toContain('id: "task_123"');
    expect(content).toContain('title: "Read planning paper!"');
    expect(content).toContain('track: "mit-eecs"');
    expect(content).toContain("generated: true");
    expect(content).toContain("<!-- CYRUS_LEARNING_MANAGER:GENERATED -->");
    expect(content).toContain("## Summary");
    expect(content).toContain("- Status: backlog");
    expect(content).toContain("## Notes\nFocus on proofs.");
    expect(content).toContain("## Evidence or Output\nMIT notes");
    expect(content).toContain("## Next Action");
    expect(content).toContain("## Sync Metadata");
    expect(content).toContain(
      "- Obsidian Path: 60_Learning-App/Tasks/task_123-read-planning-paper.md"
    );
  });
});

function makeTask(overrides: Partial<LearningTask> = {}): LearningTask {
  return {
    id: "task_default",
    title: "Default task",
    track: "mit-eecs",
    status: "backlog",
    priority: "medium",
    dueDate: null,
    progress: 0,
    source: "",
    notes: "",
    obsidianPath: null,
    notionPageId: null,
    createdAt: "2026-04-29T00:00:00.000Z",
    updatedAt: "2026-04-29T00:00:00.000Z",
    ...overrides
  };
}
