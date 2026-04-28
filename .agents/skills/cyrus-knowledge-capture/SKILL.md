---
name: cyrus-knowledge-capture
description: Use when a conversation, debugging session, reading session, or code review should be captured as durable learning notes, concept cards, ledger updates, and review items.
---

# Cyrus Knowledge Capture

Use this skill when the user learned something and wants it captured in the repository.

## Goal

Create durable, searchable knowledge from a conversation, debugging session, reading session, or coding session.

## Capture targets

Prefer these files:

- `docs/learning/knowledge-ledger.md` for the index
- `docs/learning/cards/YYYY-MM-DD-topic.md` for concept-level notes
- `docs/learning/sessions/YYYY-MM-DD-topic.md` for session-level logs
- `docs/learning/open-questions.md` for unresolved questions
- `docs/learning/review-schedule.md` for spaced repetition

## Capture rules

1. Use the user's own repository context whenever possible.
2. Capture principles, not just conclusions.
3. Include one concrete example.
4. Include one common mistake.
5. Include retrieval questions.
6. Include a next action.
7. Link to source files or tests when applicable.
8. Do not store secrets.

## Concept card format

Use the template in `docs/learning/concept-card-template.md`.

## Session log format

Use the template in `docs/learning/session-log-template.md`.

## Knowledge ledger update

Append or update a row with:

- date
- track
- concept
- confidence 1-5
- evidence
- review date
- next task
- card path
