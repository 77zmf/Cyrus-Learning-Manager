import type Database from "better-sqlite3";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";
import { seedKnowledgeBase } from "../../server/knowledge-seed";
import { knowledgeSeedTasks } from "../../src/domain/knowledge";

let tempDir: string | null = null;
let db: Database.Database | null = null;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "cyrus-knowledge-"));
  db = openDatabase(join(tempDir, "app.db"));
});

afterEach(() => {
  db?.close();
  db = null;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

function database() {
  if (!db) throw new Error("test database was not initialized");
  return db;
}

describe("knowledge base seeding", () => {
  it("inserts the first-batch knowledge tasks idempotently", () => {
    const first = seedKnowledgeBase(database());
    const second = seedKnowledgeBase(database());

    expect(first.inserted).toBe(knowledgeSeedTasks.length);
    expect(second.inserted).toBe(0);

    const rows = database()
      .prepare("SELECT id, title, track, source FROM tasks ORDER BY id")
      .all() as Array<{ id: string; title: string; track: string; source: string }>;

    expect(rows).toHaveLength(knowledgeSeedTasks.length);
    expect(rows[0].id).toMatch(/^seed_/);
    expect(rows.every((row) => row.source.includes("http"))).toBe(true);
  });
});
