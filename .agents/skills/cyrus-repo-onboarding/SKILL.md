---
name: cyrus-repo-onboarding
description: Use when a user asks to understand Cyrus Learning Manager, summarize the repository, plan a change, or choose the next development task. Triggers include repo map, onboarding, architecture, explain this codebase, plan a feature, and where should I start.
---

# Cyrus repo onboarding workflow

Follow this workflow before broad changes or when the user asks for repo guidance.

## Inputs

- User goal or question.
- Current repository files and diff, if any.
- `AGENTS.md` and `docs/codex/repo-map.md`.

## Steps

1. Read `AGENTS.md` first.
2. Read `package.json`, `src/domain/types.ts`, `src/domain/tracks.ts`, `src/domain/knowledge.ts`, `src/api/client.ts`, `server/routes.ts`, `server/tasks.ts`, `server/sync/*`, and the relevant tests.
3. Classify the requested work as one or more of:
   - frontend UI/state,
   - domain/learning-model change,
   - server/API/SQLite change,
   - Notion/Obsidian sync change,
   - tests/CI/docs.
4. Draw the data path in words: React UI → frontend API client → Express route → task service/SQLite → Obsidian/Notion sync → sync events.
5. Identify the smallest safe implementation slice and the tests needed.
6. Call out risks around secrets, local paths, GitHub Pages origin, Notion schema, Obsidian overwrite behavior, and hardcoded values.

## Output format

Return:

```markdown
## Architecture summary
...

## Relevant files
- ...

## Risks and constraints
- ...

## Recommended next 3 tasks
1. ...
2. ...
3. ...

## Tests/checks to run
- ...
```

If the user asks for code, keep this plan concise and then implement the smallest coherent change.
