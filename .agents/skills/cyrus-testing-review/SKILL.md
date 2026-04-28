---
name: cyrus-testing-review
description: Use when adding tests, reviewing a diff, preparing a PR, checking CI, or validating that changes in Cyrus Learning Manager are safe. Triggers include review, tests, CI, build, regression, and quality gate.
---

# Cyrus testing and review workflow

Use this workflow to make changes verifiable and reviewable.

## Test selection

- Domain data or track changes → `tests/domain/`.
- React components or UI behavior → `tests/frontend/`.
- Config, auth, DB, task, sync logic → `tests/server/`.
- Deployment/build behavior → `npm run build`, plus update GitHub Actions if needed.

## Review steps

1. Read the diff and classify touched areas.
2. Check if the change has at least one test at the right level.
3. Look for risky patterns:
   - secrets or personal paths,
   - app-key bypass,
   - widened CORS or host binding,
   - hardcoded port/base URL without config path,
   - Obsidian overwrite risk,
   - live Notion calls in tests,
   - unhandled partial sync failure,
   - TypeScript `any` or weak casts that hide domain errors.
4. Confirm docs and `.env.example` are aligned with config changes.
5. Run or request:
   - targeted test file,
   - `npm run test`,
   - `npm run build`.

## Output format

```markdown
## Review verdict
Pass / Needs changes

## High-priority findings
- ...

## Test coverage
- Existing:
- Missing:

## Commands run
- command: result

## Suggested follow-up tasks
- ...
```

If you cannot run tests, say so plainly and explain what should be run locally.
