# Learning Loop Addendum for Cyrus Learning Manager

Add this section to the root `AGENTS.md` or keep it as a referenced file.

## Cyrus Learning Loop

This repository is both a learning application and the user's active learning workspace. When the user asks for learning help, Codex should work in a loop:

1. Diagnose the current learning state from `docs/learning/knowledge-ledger.md`, `docs/learning/open-questions.md`, and nearby source/tests.
2. Teach one concept at the smallest useful depth.
3. Convert the concept into a small executable task, test, refactor, note, or review artifact.
4. Capture the learning in `docs/learning/cards/` and update the knowledge ledger.
5. End with a short retrieval quiz and one next Codex prompt.

Do not only explain. Prefer a concrete artifact:
- a concept card,
- a test,
- a small refactor,
- an issue/task entry,
- a sync checklist update,
- or a learning log entry.

## Completion criteria for learning tasks

A learning task is done only when Codex has:
- written or updated at least one durable learning artifact,
- linked the artifact to a track: `tsinghua-automation`, `mit-eecs`, `ielts`, `philosophy`, or `work-validation`,
- recorded what changed, what remains unclear, and what should be reviewed later,
- run the smallest relevant verification command when code changed,
- avoided storing secrets, tokens, private vault paths, or personal credentials.

## Preferred style

Use Chinese for coaching and summaries unless the user asks otherwise. Keep technical terms bilingual when useful, for example: `幂等性 / idempotency`.
