# Concept Card: Learning Loop in Codex

- Date: 2026-04-28
- Track: repo-engineering
- Confidence before: 1
- Confidence after: 2
- Source files: `AGENTS.md`, `.agents/skills/`, `.codex/agents/`, `docs/learning/`
- Related tests: none yet
- Related notes: `docs/learning/README.md`

## One-sentence meaning

A learning loop is a repeatable workflow where each Codex conversation produces both understanding and a durable repository artifact.

## Plain-language model

Do not let a conversation disappear after you understand something. Turn it into a card, test, checklist, or small code change so the repository remembers it.

## Repo example

When learning Notion/Obsidian sync, Codex should inspect `server/sync`, explain one concept such as idempotency, create a concept card, and optionally add a small test that protects the behavior.

## Why it matters

The project becomes a personal learning system instead of only an app. Each session improves both the code and your long-term memory.

## Common mistake

Asking for a long explanation but not capturing the result. This feels productive but creates little compounding value.

## Retrieval questions

1. What are the six steps of the learning loop?
2. Why should a learning session update `knowledge-ledger.md`?
3. What artifact would prove that you understood sync idempotency?
4. What should never be stored in learning notes?

## Next applied task

Run one Codex session using `$cyrus-learning-loop` on a real topic: config validation, Notion sync, Obsidian sync, Vitest, or React state.
