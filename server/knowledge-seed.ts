import type Database from "better-sqlite3";
import { knowledgeSeedTasks } from "../src/domain/knowledge";

export interface SeedKnowledgeResult {
  inserted: number;
}

export function seedKnowledgeBase(db: Database.Database): SeedKnowledgeResult {
  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT OR IGNORE INTO tasks (
      id,
      title,
      track,
      status,
      priority,
      due_date,
      progress,
      source,
      notes,
      obsidian_path,
      notion_page_id,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, ?, ?)
  `);

  const transaction = db.transaction(() => {
    let inserted = 0;
    for (const task of knowledgeSeedTasks) {
      const result = insert.run(
        task.id,
        task.title,
        task.track,
        task.status,
        task.priority,
        task.dueDate,
        task.progress,
        task.source,
        task.notes,
        now,
        now
      );
      inserted += result.changes;
    }
    return inserted;
  });

  return { inserted: transaction() };
}
