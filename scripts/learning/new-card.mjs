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
  console.error("Usage: node scripts/learning/new-card.mjs <topic>");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(topic);
const dir = path.join("docs", "learning", "cards");
const file = path.join(dir, `${today}-${slug}.md`);

await mkdir(dir, { recursive: true });

try {
  await access(file);
  console.error(`Card already exists: ${file}`);
  process.exit(1);
} catch {
  // file does not exist
}

const body = `# Concept Card: ${topic}

- Date: ${today}
- Track:
- Confidence before:
- Confidence after:
- Source files:
- Related tests:
- Related notes:

## One-sentence meaning

## Plain-language model

## Formula Or Model

\`\`\`latex
% Use this section when the concept needs math.
\`\`\`

## Repo Or Obsidian Example

## Why it matters

## Common mistake

## Minimal example

\`\`\`ts
// optional
\`\`\`

## Retrieval questions

1.
2.
3.

## Next applied task

## Review history

| Date | Result | Next review |
|---|---|---|
`;

await writeFile(file, body, "utf8");
console.log(file);
