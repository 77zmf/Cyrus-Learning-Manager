import { describe, expect, it, vi } from "vitest";
import {
  syncTaskToNotion,
  validateNotionDatabaseSchema
} from "../../server/sync/notion";
import type { LearningTask } from "../../src/domain/types";

const retrieveMock = vi.fn();

vi.mock("@notionhq/client", () => ({
  Client: vi.fn(() => ({
    databases: {
      retrieve: retrieveMock
    },
    pages: {
      create: vi.fn(),
      update: vi.fn()
    }
  }))
}));

describe("Notion task sync", () => {
  it("skips task sync without token or database id", async () => {
    const result = await syncTaskToNotion(makeTask(), {
      notionToken: null,
      notionTasksDatabaseId: null
    });

    expect(result).toEqual({
      status: "skipped",
      message: "Notion token or tasks database id is not configured"
    });
  });

  it("returns an invalid schema result without calling Notion when config is missing", async () => {
    const result = await validateNotionDatabaseSchema({
      notionToken: null,
      notionTasksDatabaseId: null
    });

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Notion token or tasks database id is not configured");
  });

  it("validates required Notion property names and types", async () => {
    retrieveMock.mockResolvedValueOnce({
      properties: {
        Name: { type: "title" },
        Track: { type: "rich_text" },
        Status: { type: "select" },
        Priority: { type: "select" },
        Due: { type: "date" },
        Progress: { type: "number" },
        Source: { type: "rich_text" },
        "Obsidian Path": { type: "rich_text" },
        "Updated At": { type: "date" }
      }
    });

    const result = await validateNotionDatabaseSchema({
      notionToken: "secret",
      notionTasksDatabaseId: "db"
    });

    expect(result.ok).toBe(false);
    expect(result.missingProperties).toEqual(["Track:select"]);
  });
});

function makeTask(overrides: Partial<LearningTask> = {}): LearningTask {
  return {
    id: "task_notion",
    title: "Sync to Notion",
    track: "work-validation",
    status: "active",
    priority: "high",
    dueDate: "2026-05-02",
    progress: 40,
    source: "local task",
    notes: "push metadata",
    obsidianPath: "60_Learning-App/Tasks/task_notion-sync-to-notion.md",
    notionPageId: null,
    createdAt: "2026-04-29T00:00:00.000Z",
    updatedAt: "2026-04-29T00:00:00.000Z",
    ...overrides
  };
}
