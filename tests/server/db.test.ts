import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("openDatabase", () => {
  it("creates required tables", () => {
    tempDir = mkdtempSync(join(tmpdir(), "cyrus-db-"));
    const db = openDatabase(join(tempDir, "app.db"));
    const rows = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
      .all() as Array<{ name: string }>;
    const tables = rows.map((row) => row.name);

    expect(tables).toContain("tasks");
    expect(tables).toContain("tracks");
    expect(tables).toContain("sync_events");

    db.close();
  });
});
