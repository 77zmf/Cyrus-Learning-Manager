# Cyrus Learning Loop

This folder imports and adapts the learning-loop structure from the uploaded Cyrus add-on pack.

The loop is self-paced:

```text
Choose -> Learn -> Derive -> Apply -> Verify -> Capture -> Review
```

## Core Files

- `learning-contract.md` - rules for learning with Codex in this repo.
- `knowledge-ledger.md` - index of learned concepts and confidence.
- `open-questions.md` - unresolved questions waiting for a future session.
- `review-schedule.md` - spaced review queue.
- `concept-card-template.md` - reusable concept-card format.
- `cards/` - durable concept cards.
- `session-log-template.md` - reusable session-log format.
- `error-log-template.md` - reusable mistake/debug log format.
- `prompts.md` - reusable Codex prompts.
- `scripts/learning/new-card.mjs` - create a new concept card.
- `scripts/learning/new-session.mjs` - create a new session note.

## Tracks

- `tsinghua-automation` - math, signals, control, intelligent systems.
- `mit-eecs` - algorithms, systems, AI, robotics.
- `world-spatial-models` - world models, spatial models, BEV, occupancy, NeRF, 3DGS.
- `ielts` - English input/output and error logs.
- `philosophy` - argument clarity, ethics, technology judgment.
- `work-validation` - autonomous-driving validation, failcase closure, KPI gates.
- `repo-engineering` - React, TypeScript, Express, SQLite, Notion/Obsidian sync, GitHub Pages.

## Capture Rule

Capture a note when one of these happens:

- a concept becomes clear,
- a formula derivation is completed,
- a paper becomes useful,
- a code or validation failure is debugged,
- a course idea connects to CARLA, Autoware, simctl, or KPI gates.

Do not capture secrets, tokens, private credentials, or large unprocessed chat transcripts.
