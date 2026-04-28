# Notion and Obsidian Sync Checklist

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `OBSIDIAN_VAULT_PATH` to the local Cyrus Knowledge vault.
3. Optionally set `NOTION_TOKEN` and `NOTION_TASKS_DATABASE_ID`.
4. If using the deployed GitHub Pages frontend for writes, set `LOCAL_APP_KEY` and store the same value in browser localStorage under `cyrus_local_app_key`.
5. Start the local service:

```bash
npm run dev:sync
```

6. Start the frontend:

```bash
npm run dev:web
```

## Required Notion database properties

The Notion task database should have these properties:

| Property | Type |
|---|---|
| Name | title |
| Track | select |
| Status | select |
| Priority | select |
| Due | date |
| Progress | number |
| Source | rich_text |
| Obsidian Path | rich_text |
| Updated At | date |

## Obsidian expectations

- Generated task notes should live under `60_Learning-App/Tasks` inside the vault.
- File names should include the stable task id plus a slugified title.
- Generated Markdown should include frontmatter for id, title, track, status, priority, due, progress, source, generated flag, created/updated timestamps.
- Repeat sync should update the generated task note deterministically.
- Future improvement: add a strong generated marker and refuse to overwrite non-generated files.

## Sync failure cases to test

- Obsidian vault path is empty or invalid.
- Notion token is missing.
- Notion database id is missing.
- Notion API call fails.
- Task has no due date.
- Task title contains filesystem-hostile characters.
- Notion succeeds after Obsidian succeeds, requiring Obsidian to be updated with Notion page id.
- Repeating sync for the same task does not duplicate or corrupt data.

## Manual smoke test

```bash
npm run dev:sync
npm run dev:web
```

Then in the app:

1. Confirm `Local Sync: connected`.
2. Create a task in `work-validation`.
3. Confirm the task appears in SQLite/list view.
4. Confirm Obsidian note appears in the vault.
5. If Notion is configured, confirm the task page appears or updates.
6. Update status/progress and confirm the Obsidian/Notion records update.
7. Inspect sync events if/when a sync-events UI/API exists.

## Codex prompt

```text
Use $cyrus-sync-development. Validate the Notion/Obsidian sync path against docs/codex/notion-obsidian-sync-checklist.md. Add missing tests first, then implement the smallest safe fix.
```
