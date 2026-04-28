---
name: cyrus-learning-roadmap
description: Use when converting repository work into learning advice, study plans, task seeds, track updates, or measurable learning outputs for Cyrus Learning Manager. Triggers include learning advice, roadmap, study plan, seed tasks, tracks, and progress loop.
---

# Cyrus learning roadmap workflow

Use this skill to keep the project aligned with the user's learning system, especially for autonomous-driving validation, TypeScript/React/Node skills, Notion/Obsidian workflows, and evidence-based study.

## Existing tracks

- `tsinghua-automation`: math, signals, control, intelligent systems.
- `mit-eecs`: executable CS, systems, algorithms, AI, robotics.
- `ielts`: English practice and rubric-driven improvement.
- `philosophy`: argument clarity, ethics, technology judgment.
- `work-validation`: validation, failcase closure, KPI gates, weekly digests.

## Steps

1. Start from the user's goal and map it to one or two tracks.
2. Propose tasks with concrete outputs, not vague study items.
3. For each task, include:
   - `title`,
   - `track`,
   - `status`,
   - `priority`,
   - `source`,
   - `notes`,
   - expected evidence/output.
4. Prefer tasks that exercise the codebase itself:
   - add a test,
   - build a sync feature,
   - improve a type/schema,
   - write an Obsidian/Notion note template,
   - connect a concept to autonomous-driving validation.
5. If editing source, update `src/domain/knowledge.ts` and tests together. Keep IDs stable and descriptive.
6. Keep learning loops small: each task should be finishable in 30–90 minutes or split it.

## Output format

```markdown
## Learning diagnosis
...

## Track focus
- Primary: ...
- Secondary: ...

## Recommended tasks
| Priority | Track | Task | Output evidence |
|---|---|---|---|
| P0 | ... | ... | ... |

## Codex task prompt
...
```

For code changes, also list the tests and files that must be updated.
