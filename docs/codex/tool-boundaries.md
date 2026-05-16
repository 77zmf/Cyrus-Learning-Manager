# Tool Boundaries

This repository is both a learning app and a local-first sync system. Use this boundary map before adding workflows, templates, Hermes behavior, or Notion/Obsidian sync changes.

## Boundary Summary

| Tool | Role | Store Here | Do Not Store Here |
| --- | --- | --- | --- |
| Obsidian | Long-term knowledge and evidence | concept cards, learning notes, generated task notes, evidence pointers, review logs | raw large assets, secrets, current status board only |
| Notion | Structured status and review dashboard | status, priority, owner, review date, evidence pointer, task relation | full notes, raw logs, private drafts, credentials |
| Hermes | Local capture and handoff console | quick capture, daily closeout, Codex task draft, Notion update draft | direct core repo edits, destructive commands, final evidence verdicts |
| Codex | Engineering executor | bounded code/doc/test patches, verification, review, PR-ready output | unbounded refactors, secret handling, unverified “done” claims |
| GitHub Pages | Public web surface | built static app from `main` | local sync secrets or write-capable service |

## Evidence Rules

- A learning task is done only when it produces a durable artifact: note, test, code patch, checklist, or review entry.
- A sync task is done only when SQLite, Obsidian, and Notion skipped/failure paths are handled correctly.
- A Notion row is a status pointer, not the source of truth.
- Obsidian notes should link to evidence, not embed secrets or large raw files.
- Hermes handoffs should use `needs more evidence` when evidence is incomplete.

## Existing Vault Mapping

Do not create a parallel vault structure. Map imported workflow ideas to the current Cyrus Knowledge layout:

- Generic `05_Evidence` -> `10_Work/Run-Results`, `10_Work/Failcases`, `10_Work/GitHub-Issues`
- Generic `06_Runbooks` -> `10_Work/PIX-Simulation-Validation` or project-specific pages
- Generic `08_Agents` -> `99_Index`, `70_Notion`, or a future lightweight `08_Agents` section if needed
- Generic `90_Templates` -> existing `90_Templates`
- Generic `Learning Board` -> existing app/domain learning tracks and `60_Learning-App/Tasks`

## Codex Task Boundary

Use `docs/codex/templates/codex-task-template.md` for sync, Hermes, Notion, Obsidian, config, CI, or broad UI work.

Every risky task should state:

- allowed files
- forbidden files
- verification command
- what remains manual or external
- risk and rollback

