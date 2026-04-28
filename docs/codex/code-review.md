# Cyrus Learning Manager Code Review Checklist

Use this checklist for Codex `/review`, pull requests, and manual review.

## 1. Security and local-first boundaries

- [ ] No tokens, app keys, `.env.local`, SQLite DB files, or generated vault content are committed.
- [ ] The Express service still binds to `127.0.0.1` unless explicitly approved.
- [ ] Hosted GitHub Pages origin writes require `LOCAL_APP_KEY`.
- [ ] CORS is not widened without a documented reason.
- [ ] User-specific paths and IDs are not hardcoded into source defaults.

## 2. Domain model consistency

- [ ] `TrackId`, `TaskStatus`, and `TaskPriority` changes are reflected in types, server validation, UI filters/forms, seed data, and tests.
- [ ] New task fields flow through SQLite, mapping, API responses, frontend display/forms, Obsidian Markdown, Notion properties, and tests.
- [ ] Learning tasks have concrete outputs and evidence, not vague study goals.

## 3. Sync reliability

- [ ] Missing Notion config returns `skipped` rather than failing local task creation.
- [ ] Obsidian writes are deterministic and safe for repeat runs.
- [ ] Non-generated user-authored notes are protected from accidental overwrite.
- [ ] Partial failures record useful sync events.
- [ ] Notion schema expectations are documented and tested.
- [ ] Tests avoid live Notion calls and real Obsidian vault writes.

## 4. Frontend behavior

- [ ] Disconnected local sync state is clear and actionable.
- [ ] Invalid app-key or failed writes produce understandable messages.
- [ ] Loading, empty, error, and success states are covered where practical.
- [ ] Forms validate required fields and do not silently submit invalid data.
- [ ] UI changes have Testing Library coverage for critical behavior.

## 5. TypeScript and maintainability

- [ ] Strict TypeScript is preserved.
- [ ] Avoid broad `any`, unsafe casts, and untyped JSON parsing without validation.
- [ ] Long or one-line files are formatted into reviewable code.
- [ ] Dependencies are justified and kept minimal.
- [ ] Route handlers stay thin; mapping/validation logic is testable.

## 6. Tests and CI

- [ ] Targeted tests were added/updated for behavior changes.
- [ ] `npm run test` is expected to pass.
- [ ] `npm run build` is expected to pass.
- [ ] GitHub Pages workflow runs tests before deployment.
- [ ] Docs and `.env.example` are updated for workflow/config changes.

## Review prompt for Codex

```text
Use $cyrus-testing-review. Review the current diff against docs/codex/code-review.md. Focus on P0/P1 issues: security, local-first boundaries, sync partial failure, data loss, type safety, and missing tests. Return only actionable findings with file paths and suggested fixes.
```
