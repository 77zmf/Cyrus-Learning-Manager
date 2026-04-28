#!/usr/bin/env node
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

const topic = process.argv.slice(2).join(" ").trim();
if (!topic) {
  console.error("Usage: node scripts/learning/new-session.mjs <topic>");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(topic);
const dir = path.join("docs", "learning", "sessions");
const file = path.join(dir, `${today}-${slug}.md`);

await mkdir(dir, { recursive: true });

try {
  await access(file);
  console.error(`Session already exists: ${file}`);
  process.exit(1);
} catch {
  // file does not exist
}

const body = `# Learning Session: ${topic}

- Date: ${today}
- Track:
- Timebox:
- Goal:
- Starting question:

## What I thought before

## What changed

## Artifact changed

-

## Verification

Command:

\`\`\`bash

\`\`\`

Result:

## Retrieval questions

1.
2.
3.

## Mistakes or confusion

-

## Next Codex prompt

\`\`\`text

\`\`\`
`;

await writeFile(file, body, "utf8");
console.log(file);
