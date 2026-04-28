import { openDatabase } from "./db";
import { seedKnowledgeBase } from "./knowledge-seed";

const db = openDatabase();

try {
  const result = seedKnowledgeBase(db);
  console.log(`Seeded ${result.inserted} knowledge task(s).`);
} finally {
  db.close();
}
