# Cyrus Learning Manager Design

Date: 2026-04-29

## Goal

Build a local-first learning management web app for the Cyrus knowledge system. The app is the primary operational surface for tasks, course progress, filtering, search, and sync status. It automatically writes durable records back into Obsidian Markdown and synchronizes structured task/progress data to Notion through the official Notion API.

The app should support four learning/work tracks from the existing knowledge base:

- Tsinghua Automation
- MIT EECS
- IELTS
- Philosophy
- Work validation and engineering closure

## Non-Goals

- Do not replace Obsidian as the durable knowledge base.
- Do not store Notion API tokens in source code.
- Do not upload raw logs, private screenshots, credentials, or large local evidence files to Notion.
- Do not build a multi-user cloud SaaS in the first version.
- Do not depend on Notion as the system of record.

## Product Shape

The first version is a hybrid app named `Cyrus Learning Manager`.

- Public/static frontend: deployable to GitHub Pages.
- Local sync service: runs on the user's machine and owns all private operations.

The GitHub Pages frontend is the user interface. It cannot store secrets, write Obsidian files directly, or call Notion with a private token. The local sync service handles those operations through `http://127.0.0.1`.

Primary screens:

1. Dashboard
   - Today focus
   - overdue tasks
   - current week progress
   - sync health for Obsidian and Notion
2. Tasks
   - task list
   - status, priority, due date, track, source, search, and filters
3. Courses
   - track overview for Tsinghua Automation, MIT EECS, IELTS, Philosophy, and Work
   - per-track progress summary
   - links into Obsidian course maps and Canvas files
4. Progress
   - weekly completion view
   - completed outputs
   - study/work balance across tracks
5. Sync Center
   - recent sync attempts
   - pending retries
   - failed writes with actionable error messages

## Architecture

Use a GitHub Pages frontend plus a local backend:

- Frontend: React plus Vite, built as a static project site for GitHub Pages
- Backend: Node.js local sync service
- Local database: SQLite
- Obsidian sync: file writer that generates Markdown under the Cyrus vault
- Notion sync: official Notion API client using an internal integration token from environment variables

Runtime flow:

```text
User action in GitHub Pages frontend
  -> API request to local Node sync service at 127.0.0.1
  -> SQLite transaction
  -> sync job queued
  -> Obsidian Markdown write
  -> Notion API upsert
  -> sync status recorded in SQLite
  -> UI updates from local state
```

SQLite is the system of record. Obsidian and Notion are synchronized projections.

Deployment flow:

```text
GitHub repository
  -> GitHub Actions build
  -> GitHub Pages static site
  -> browser connects to local sync service when available
```

If the local sync service is not running, the frontend should still load and show a clear offline/setup state. It should not pretend that Obsidian or Notion sync is active.

## GitHub Pages

Target repository:

```text
77zmf/Cyrus-Learning-Manager
```

Project Pages URL:

```text
https://77zmf.github.io/Cyrus-Learning-Manager/
```

GitHub Pages constraints:

- Pages hosts static HTML, CSS, and JavaScript only.
- Pages must not contain `NOTION_TOKEN` or any other private credential.
- Pages cannot directly write local Obsidian Markdown files.
- Pages cannot safely perform Notion writes that require a private integration token.
- If the repository remains private, Pages availability depends on the GitHub account plan. If Pages is unavailable for the private repository, either keep local-only development or explicitly make the repository public after reviewing what is committed.

Recommended Pages setup:

- Vite base path: `/Cyrus-Learning-Manager/`
- GitHub Actions workflow: build frontend and deploy `dist/` to Pages
- The frontend reads the sync service URL from runtime config, defaulting to `http://127.0.0.1:8787`
- The UI shows `Local Sync Service: disconnected` when the backend is not reachable

## Local Sync Service

The local sync service is the only component allowed to touch private resources.

Responsibilities:

- manage SQLite
- expose local REST endpoints to the frontend
- write generated Markdown to Obsidian
- call the Notion API using `NOTION_TOKEN`
- record sync events and retry failures
- redact secrets from logs and UI responses

Default local address:

```text
http://127.0.0.1:8787
```

CORS policy:

- allow `http://localhost:*` during local development
- allow `https://77zmf.github.io` for the GitHub Pages frontend
- reject arbitrary origins by default

For local development, the service can run without an app key. For the deployed GitHub Pages frontend, write endpoints must require `LOCAL_APP_KEY`; read-only health endpoints may remain unauthenticated. The design must not rely on an unauthenticated public web page being able to write local data without user intent.

## Data Model

Core tables:

- `tasks`
  - `id`
  - `title`
  - `track`
  - `status`
  - `priority`
  - `due_date`
  - `progress`
  - `source`
  - `notes`
  - `obsidian_path`
  - `notion_page_id`
  - `created_at`
  - `updated_at`
- `tracks`
  - `id`
  - `name`
  - `description`
  - `obsidian_entry`
  - `canvas_entry`
- `sync_events`
  - `id`
  - `entity_type`
  - `entity_id`
  - `target`
  - `status`
  - `message`
  - `attempt_count`
  - `created_at`
  - `updated_at`

Track values:

- `tsinghua-automation`
- `mit-eecs`
- `ielts`
- `philosophy`
- `work-validation`

Status values:

- `backlog`
- `active`
- `blocked`
- `done`
- `archived`

Priority values:

- `low`
- `medium`
- `high`
- `urgent`

## Obsidian Sync

The app writes Markdown to:

```text
/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge/60_Learning-App/
```

Suggested structure:

```text
60_Learning-App/
  Tasks/
  Weekly/
  Sync/
  README.md
```

Each task gets one Markdown file with frontmatter:

```yaml
---
type: learning-task
id: task-id
track: mit-eecs
status: active
priority: high
due: 2026-05-10
progress: 30
notion_page_id:
updated: 2026-04-29
---
```

Body sections:

- Summary
- Notes
- Evidence or Output
- Next Action
- Sync Metadata

Obsidian write rules:

- Use stable filenames derived from task ID and title.
- Never overwrite unrelated manual notes.
- Preserve a generated-file marker so the app only rewrites files it owns.
- If the user edits generated Markdown manually, keep app-owned metadata authoritative and avoid deleting unknown body text.

## Notion Sync

Use the official Notion API through an internal integration.

Environment variables:

```text
NOTION_TOKEN=
NOTION_PARENT_PAGE_ID=
NOTION_TASKS_DATABASE_ID=
OBSIDIAN_VAULT_PATH=
LOCAL_SYNC_PORT=
LOCAL_APP_KEY=
```

`.env.example` intentionally documents variable names with empty values only. Local development defaults, including the parent page ID, Obsidian vault path, and sync port, are applied by `server/config.ts` and must not be committed into `.env.example`.

Notion target:

- Parent page: `Cyrus Knowledge Hub`
- Task database: `Learning Tasks`

Database fields:

- `Name`
- `Track`
- `Status`
- `Priority`
- `Due`
- `Progress`
- `Source`
- `Obsidian Path`
- `Updated At`

The app should create or validate the database schema during setup. If a required field is missing, the Sync Center should show a clear setup error instead of silently failing.

Security rules:

- Token stays in `.env.local`.
- `.env.local` is ignored by Git.
- The UI never displays the full token.
- Sync calls are made by the backend only.
- GitHub Pages never receives `NOTION_TOKEN`.
- Public frontend requests to the local service should be origin-checked and optionally app-key protected.

## Automatic Sync Behavior

Every task create/update/delete-like state change triggers automatic sync.

For version 1, avoid hard deletion:

- `archived` in SQLite
- archived Markdown status in Obsidian
- archived or status-updated page in Notion

Sync should be resilient:

- SQLite write completes first.
- Obsidian write is attempted next.
- Notion sync is attempted after local write.
- Failures are recorded in `sync_events`.
- Failed syncs can be retried automatically and manually.

Conflict policy:

- SQLite wins.
- Obsidian and Notion are projections.
- If Notion is edited outside the app, the app does not import those changes in version 1.
- If generated Obsidian files are edited outside the app, unknown body text should be preserved where practical, but structured frontmatter follows SQLite.

## UI Requirements

The UI should be practical and dense, not a marketing page.

Dashboard:

- current date and week
- active tasks by track
- overdue and due-soon tasks
- progress summary
- sync status strip

Tasks:

- searchable table or list
- filters for track, status, priority, due date
- quick status update
- detail drawer for notes and next action

Courses:

- track cards with progress and links
- direct links to Obsidian entries and Canvas files
- separate rows for IELTS and Philosophy, not hidden under general learning

Sync Center:

- last successful Obsidian write
- last successful Notion write
- failed sync events
- retry action

## Error Handling

Expected errors:

- missing `.env.local`
- missing Notion token
- GitHub Pages frontend cannot reach local sync service
- browser blocks local service request because of CORS or HTTPS/private-network restrictions
- Notion integration not shared with the parent page/database
- Notion database schema mismatch
- Obsidian vault path missing
- Markdown write permission failure
- SQLite migration failure

Behavior:

- Show user-readable messages in Sync Center.
- Keep local SQLite changes even if Notion fails.
- Do not lose task state because a projection failed.
- Log backend errors with enough detail for debugging without printing secrets.

## Testing And Verification

Minimum verification for version 1:

- build the static frontend with Vite
- confirm the generated `dist/` works under `/Cyrus-Learning-Manager/`
- confirm GitHub Pages workflow can deploy the frontend
- confirm the frontend shows disconnected state when the local sync service is stopped
- start the local sync service and confirm the frontend connects to `127.0.0.1`
- create a task and confirm it appears in SQLite
- confirm Markdown file is created under `60_Learning-App/Tasks`
- confirm Notion page/database row is created or updated
- update task status and confirm both projections update
- search by title and filter by track/status
- simulate missing Notion token and confirm Sync Center reports setup error
- simulate missing Obsidian path and confirm local task state is retained

Visual verification:

- run the dev server locally
- open the app in browser
- open the GitHub Pages build locally or after deployment
- inspect desktop layout
- inspect a narrow viewport layout
- confirm no overlapping text or broken navigation

## Initial Seed Data

Seed tracks from the existing Cyrus vault:

- Tsinghua Automation: `20_Courses/Tsinghua-Automation/00-Course-Map.md`
- MIT EECS: `20_Courses/MIT-EECS/00-Course-Map.md`
- IELTS: `20_Courses/IELTS/00-IELTS-Study-Map.md`
- Philosophy: `20_Courses/Philosophy/00-Philosophy-Study-Map.md`
- Work validation: `99_Index/Work Dashboard.md`

Seed Canvas links:

- `80_Canvas/Learning System.canvas`
- `80_Canvas/90-Day Plan.canvas`
- `80_Canvas/Work Closure Loop.canvas`
- `80_Canvas/Notion Obsidian Loop.canvas`

## Rollback Plan

Because SQLite is the system of record, rollback is local:

1. Stop the dev server.
2. Back up or remove the app SQLite database.
3. Remove generated Markdown under `60_Learning-App/`.
4. Archive generated Notion task rows/pages if needed.
5. Disable or unpublish GitHub Pages if the static frontend should no longer be available.
6. Restore from SQLite backup if available.

Do not delete unrelated Obsidian notes or existing Notion pages.

## Open Setup Inputs

Implementation can begin without secrets, but Notion sync cannot be fully verified until these are configured locally:

- `NOTION_TOKEN`
- `NOTION_TASKS_DATABASE_ID` or permission to create the database under `Cyrus Knowledge Hub`
- `LOCAL_APP_KEY` if the deployed Pages frontend will be allowed to send write requests to the local sync service

The app should run with Notion disabled and show setup guidance until those values exist.
