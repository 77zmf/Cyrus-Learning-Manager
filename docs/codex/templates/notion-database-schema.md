# Notion Tasks Database Schema Template

Create a Notion database with these properties before enabling Notion task sync.

| Property | Type | Notes |
|---|---|---|
| Name | title | Task title |
| Track | select | `tsinghua-automation`, `mit-eecs`, `ielts`, `philosophy`, `work-validation` |
| Status | select | `backlog`, `active`, `blocked`, `done`, `archived` |
| Priority | select | `low`, `medium`, `high`, `urgent` |
| Due | date | Nullable |
| Progress | number | 0–100 |
| Source | rich_text | URL or evidence pointer |
| Obsidian Path | rich_text | Generated note path inside vault |
| Updated At | date | Last task update timestamp |

After creating the database, set `NOTION_TASKS_DATABASE_ID` in `.env.local`.
