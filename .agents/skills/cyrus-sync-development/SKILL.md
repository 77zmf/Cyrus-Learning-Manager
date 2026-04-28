---
name: cyrus-sync-development
description: Use for any change touching local sync, Express routes, SQLite tasks, Obsidian Markdown output, Notion sync, app-key authorization, CORS, or environment config in Cyrus Learning Manager.
---

# Cyrus sync development workflow

This repository has a local-first sync architecture. Treat sync code as safety-critical because it writes to local files and external Notion pages.

## Files to inspect first

- `server/config.ts`
- `server/auth.ts`
- `server/db.ts`
- `server/routes.ts`
- `server/tasks.ts`
- `server/sync/obsidian.ts`
- `server/sync/notion.ts`
- `server/sync/queue.ts`
- `src/api/client.ts`
- `src/domain/types.ts`
- matching tests under `tests/server/`

## Invariants

- The service listens on `127.0.0.1` unless an explicit reviewed change says otherwise.
- Hosted GitHub Pages writes require `LOCAL_APP_KEY`.
- Missing Notion config returns `skipped`, not a fatal task creation failure.
- Obsidian writes use a configured vault path and generated file location.
- SQLite should be usable with `:memory:` in tests.
- No live Notion or real vault writes in automated tests.

## Implementation steps

1. Clarify whether the change is config, route, database, task validation, Obsidian rendering, Notion mapping, or sync queue behavior.
2. Write or update tests before changing behavior when feasible.
3. Keep route handlers small; move validation/mapping logic into functions that can be unit tested.
4. Use schema validation for request and config inputs when possible.
5. Add failure tests for invalid inputs, missing config, missing task IDs, failed Obsidian writes, failed Notion sync, and repeat syncs.
6. After implementation, run targeted server tests, then the full test/build commands.

## Output checklist

- [ ] No secrets or personal paths committed.
- [ ] Notion schema/property expectations documented if changed.
- [ ] Obsidian Markdown remains deterministic and safe.
- [ ] SQLite schema changes are backward-compatible or documented.
- [ ] Frontend API behavior still handles disconnected local sync.
- [ ] Tests cover success, skipped, and failure paths.
