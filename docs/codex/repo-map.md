# Cyrus Learning Manager — Repo Map for Codex

## System overview

Cyrus Learning Manager has two halves:

1. A static Vite/React frontend that can be deployed to GitHub Pages.
2. A local Express sync service that stores tasks in SQLite and writes to Obsidian/Notion.

The intended runtime path is:

```text
React UI
  ↓ src/api/client.ts fetches http://127.0.0.1:8787
Express routes in server/routes.ts
  ↓
Task validation and persistence in server/tasks.ts + server/db.ts
  ↓
SQLite database: server-data/cyrus-learning.db
  ↓
server/sync/queue.ts
  ├─ Obsidian Markdown writer: server/sync/obsidian.ts
  └─ Notion page/database sync: server/sync/notion.ts
```

## Core domain model

`src/domain/types.ts` defines:

- `TrackId`: `tsinghua-automation`, `mit-eecs`, `ielts`, `philosophy`, `work-validation`.
- `TaskStatus`: `backlog`, `active`, `blocked`, `done`, `archived`.
- `TaskPriority`: `low`, `medium`, `high`, `urgent`.
- `LearningTask`: title, track, status, priority, due date, progress, source, notes, Obsidian path, Notion page id, timestamps.
- `SyncEvent`: per-target sync status and messages.
- `HealthResponse`: local service health plus Notion/Obsidian config flags.

## Learning tracks

`src/domain/tracks.ts` describes five learning lanes:

- Tsinghua Automation: math, signals, control, intelligent systems.
- MIT EECS: executable CS, systems, algorithms, AI, robotics.
- IELTS: rubric-driven English practice and error logs.
- Philosophy: argument clarity, ethics, and technology judgment.
- Work Validation: validation, failcase closure, KPI gates, weekly digest.

`src/domain/knowledge.ts` adds module seeds and seed tasks. Any new learning module should have a concrete output such as a concept sheet, failure taxonomy, solved problem note, score sheet, argument map, validation digest, or KPI review.

## Frontend files

- `src/App.tsx`: top-level tab state, health/task loading, search and filter state, create/update callbacks.
- `src/api/client.ts`: client functions for health, list tasks, create task, update status. Reads `cyrus_local_app_key` from localStorage and sends it as `x-cyrus-app-key`.
- `src/components/Dashboard.tsx`: learning summary and current state.
- `src/components/TasksView.tsx`: task creation, filtering, status/progress updates.
- `src/components/CoursesView.tsx`: track/module view.
- `src/components/ProgressView.tsx`: progress visualization.
- `src/components/SyncCenter.tsx`: local sync status and setup guidance.
- `src/styles.css`: app styling.

## Server files

- `server/index.ts`: loads config, opens DB, seeds knowledge base, sets CORS, registers routes, listens on `127.0.0.1`.
- `server/config.ts`: loads `.env.local` and `.env`, parses Notion/Obsidian/local app key settings.
- `server/auth.ts`: write authorization logic, stricter for hosted GitHub Pages origin.
- `server/db.ts`: SQLite tables for tracks, tasks, sync events.
- `server/tasks.ts`: create/list/get/update task logic and validation.
- `server/routes.ts`: `/health`, `/tasks`, `/tasks/:id/status`.
- `server/knowledge-seed.ts` and `server/seed-knowledge.ts`: seed learning tracks/tasks into the local DB.
- `server/sync/obsidian.ts`: generated Markdown writer.
- `server/sync/notion.ts`: Notion database page creation/update and schema validation.
- `server/sync/queue.ts`: records sync events and coordinates Obsidian + Notion.

## Tests

- `tests/domain/knowledge.test.ts`: domain seed/module behavior.
- `tests/frontend/App.test.tsx`, `CoursesView.test.tsx`, `TasksView.test.tsx`: frontend behavior.
- `tests/server/auth.test.ts`, `config.test.ts`, `db.test.ts`, `knowledge-seed.test.ts`, `notion-sync.test.ts`, `obsidian-sync.test.ts`, `sync-queue.test.ts`, `tasks.test.ts`: server and sync behavior.
- `tests/setup.ts`: jsdom/testing-library setup.

## Current quality observations

- The repo has a meaningful test structure across domain, frontend, and server.
- The package has separate `test` and `build` scripts; `build` runs TypeScript no-emit and Vite build.
- The GitHub Pages workflow currently installs and builds, but should also run `npm run test` before deployment.
- Several source files appear compressed into very long lines. Add formatting tooling before larger refactors.
- `server/config.ts` contains user-specific defaults; prefer moving personal paths and IDs into `.env.local` or documentation only.
- The frontend API base URL is hardcoded to `http://127.0.0.1:8787`; consider Vite env configuration for portability.

## Change impact guide

- Adding a new track: update `src/domain/types.ts`, `src/domain/tracks.ts`, `src/domain/knowledge.ts`, `server/tasks.ts` valid tracks, UI filters, and tests.
- Adding a new task field: update type, DB schema, task mapping, Notion properties, Obsidian Markdown, frontend form/display, and tests.
- Changing sync behavior: update `server/sync/*`, `server/routes.ts` if exposed, sync tests, and `docs/codex/notion-obsidian-sync-checklist.md`.
- Changing deployment: update `vite.config.ts`, `.github/workflows/pages.yml`, and run `npm run build`.
