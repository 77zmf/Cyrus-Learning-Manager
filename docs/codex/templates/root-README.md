# Cyrus Learning Manager

Local-first learning manager for Cyrus Knowledge with Obsidian and Notion sync.

## What it does

Cyrus Learning Manager helps turn learning/work items into structured tasks, evidence, and notes. The frontend can run locally or on GitHub Pages. A local sync service stores tasks in SQLite and writes them to Obsidian Markdown and optionally Notion.

## Architecture

```text
React/Vite frontend
  → local API client
  → Express sync service on 127.0.0.1
  → SQLite tasks and sync events
  → Obsidian generated Markdown
  → optional Notion database pages
```

## Install

```bash
npm ci
```

## Environment

Copy `.env.example` to `.env.local` and fill only what you need.

```bash
cp .env.example .env.local
```

Variables:

- `NOTION_TOKEN`: optional Notion integration token.
- `NOTION_PARENT_PAGE_ID`: optional parent page id if used by future Notion setup flows.
- `NOTION_TASKS_DATABASE_ID`: optional Notion task database id.
- `OBSIDIAN_VAULT_PATH`: local path to the Obsidian vault.
- `LOCAL_SYNC_PORT`: local sync port, default should be 8787.
- `LOCAL_APP_KEY`: required for write calls from hosted GitHub Pages origin.

Never commit `.env.local`, tokens, local vault content, or SQLite data.

## Development

```bash
npm run dev:sync
npm run dev:web
```

## Tests and build

```bash
npm run test
npm run build
```

## Seed knowledge

```bash
npm run seed:knowledge
```

## Deployment

GitHub Pages deploys the built Vite app from `main`. Before deploying, CI should run tests and build.

## Troubleshooting

- `Local Sync: disconnected`: start `npm run dev:sync` and confirm port 8787 or configured port.
- Write returns 401 from GitHub Pages: set `LOCAL_APP_KEY` locally and store the same value in browser localStorage as `cyrus_local_app_key`.
- Notion does not update: verify token, database id, and required database schema.
- Obsidian note missing: verify `OBSIDIAN_VAULT_PATH` and write permissions.
