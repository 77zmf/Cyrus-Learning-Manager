---
name: cyrus-learning-loop
description: Use when the user wants to learn while working in Cyrus Learning Manager; turns questions into diagnosis, explanation, small repo artifacts, verification, durable notes, and review questions.
---

# Cyrus Learning Loop

Use this skill when the user wants to learn while working in the Cyrus Learning Manager repository.

## Purpose

Turn each interaction into a learning cycle:

`question -> diagnosis -> explanation -> tiny implementation/exercise -> durable note -> retrieval quiz -> next action`

The goal is not only to answer the user. The goal is to grow the repository's knowledge base and the user's engineering ability.

## Inputs to inspect first

Read these files if they exist:

- `docs/learning/README.md`
- `docs/learning/learning-contract.md`
- `docs/learning/knowledge-ledger.md`
- `docs/learning/open-questions.md`
- `src/domain/tracks.ts`
- `package.json`
- nearby source and test files relevant to the user's topic

If a file is missing, create the smallest useful version.

## Session protocol

### 1. Frame the session

Identify:
- track: one of `tsinghua-automation`, `mit-eecs`, `ielts`, `philosophy`, `work-validation`, or `repo-engineering`
- topic
- desired output
- current confusion
- timebox if the user gave one

If the user did not provide these, infer them from context and proceed.

### 2. Diagnose before teaching

Find:
- what the repo already contains,
- which source/test files are relevant,
- what the user likely needs to learn next,
- the smallest runnable or writable artifact that can prove progress.

### 3. Teach with active recall

Explain the concept in Chinese using:
- one plain-language model,
- one concrete example from this repository,
- one "why it matters" note,
- one likely pitfall.

Then ask or generate 2-4 retrieval questions.

### 4. Convert knowledge into a repo artifact

Choose one:
- create/update a concept card under `docs/learning/cards/`,
- update `docs/learning/knowledge-ledger.md`,
- add/update a test,
- add/update a small implementation,
- add/update a checklist,
- add/update an issue-like backlog item.

For coding work, keep changes small and verifiable.

### 5. Verify

When code changes, run the smallest relevant command:
- `npm run test`
- targeted `npx vitest run <file>`
- `npm run build`

If verification cannot run, state exactly why and add a manual verification note.

### 6. Capture

Update:
- `docs/learning/knowledge-ledger.md`
- `docs/learning/open-questions.md` if unresolved questions remain
- `docs/learning/review-schedule.md` if a concept needs spaced review

Every card should include:
- track
- topic
- source files
- concise explanation
- example
- common mistake
- retrieval questions
- next task

### 7. Close the loop

End with:
- "本轮你学到了什么"
- "证据是什么"
- "下一轮 Codex prompt"
- "需要复习的问题"

## File naming

Use lowercase kebab-case.

Concept cards:
`docs/learning/cards/YYYY-MM-DD-topic.md`

Session logs:
`docs/learning/sessions/YYYY-MM-DD-topic.md`

## Safety and privacy

Never write secrets, tokens, API keys, private absolute paths, or personal credentials into learning notes.
For Notion/Obsidian sync topics, prefer placeholders such as `${NOTION_TOKEN}` and `${OBSIDIAN_VAULT_PATH}`.

## Good prompt starters

- `使用 $cyrus-learning-loop，围绕 Notion/Obsidian 同步幂等性教我，并给一个小测试任务。`
- `使用 $cyrus-learning-loop，带我理解这个 failing test，然后把知识沉淀成 concept card。`
- `使用 $cyrus-learning-loop，今天只学一个 TypeScript 后端设计点，最后更新 knowledge-ledger。`
