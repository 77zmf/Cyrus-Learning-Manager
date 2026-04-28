---
name: cyrus-review-and-exam
description: Use when the user wants active recall, spaced review, a mini exam, or grading based on docs/learning knowledge cards and repository-specific applied questions.
---

# Cyrus Review and Exam

Use this skill when the user wants to review, test understanding, or prepare a mini exam.

## Goal

Turn existing learning notes into active recall, spaced repetition, and practical tasks.

## Inputs

Read:
- `docs/learning/knowledge-ledger.md`
- `docs/learning/review-schedule.md`
- recent cards under `docs/learning/cards/`
- relevant source/tests for applied questions

## Review protocol

1. Select due concepts from `review-schedule.md`.
2. Ask 5-10 questions:
   - definition
   - why it matters
   - code reading
   - debugging
   - design tradeoff
   - application to this repo
3. Grade answers generously but honestly.
4. Update confidence scores in `knowledge-ledger.md`.
5. Add missed questions to `open-questions.md` or a concept card.
6. Produce one next applied task.

## Exam output format

- Topic
- Questions
- Expected answers
- Mistakes observed
- Score estimate
- Next review date
- Next Codex prompt
