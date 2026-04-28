# Codex Task Backlog

Use these as direct tasks for Codex. Each task is intentionally scoped so it can be reviewed and tested.

## P0 — Stabilize the repository

### P0.1 Add a root README

Prompt:

```text
Use $cyrus-repo-onboarding. Create a root README.md for Cyrus Learning Manager explaining purpose, architecture, local setup, env variables, commands, GitHub Pages deployment, and troubleshooting. Do not change source code.
```

Expected files:

- `README.md`
- maybe updates to `docs/codex/repo-map.md` if new facts are discovered

Checks:

- Markdown is readable.
- Commands match `package.json`.
- No secrets or personal paths.

### P0.2 Add formatting and linting

Prompt:

```text
Use $cyrus-testing-review. Add Prettier and ESLint for a strict TypeScript React/Vite + Node repo. Add npm scripts, reformat files, and keep behavior unchanged. Run npm run test and npm run build.
```

Expected files:

- `package.json`
- lockfile
- formatting/lint config files
- reformatted TS/TSX/CSS/YAML files

Checks:

- Diffs are formatting-only except scripts/config.
- Tests/build pass.

### P0.3 Run tests in GitHub Pages CI

Prompt:

```text
Use $cyrus-testing-review. Update .github/workflows/pages.yml so deployment runs npm run test before npm run build. Keep GitHub Pages deploy behavior unchanged.
```

Expected files:

- `.github/workflows/pages.yml`

Checks:

- Workflow YAML remains valid.
- Test step happens before build/deploy.

### P0.4 Remove personal defaults from config

Prompt:

```text
Use $cyrus-sync-development. Refactor server/config.ts so personal-looking defaults are removed or neutralized, validate env with Zod, update tests and .env.example, and document the behavior.
```

Expected files:

- `server/config.ts`
- `tests/server/config.test.ts`
- `.env.example`
- docs update

Checks:

- Missing Notion config is still allowed.
- Obsidian path behavior is explicit.
- Tests pass.

## P1 — Improve sync reliability

### P1.1 Add safe generated Markdown marker

Prompt:

```text
Use $cyrus-sync-development. Add a clear generated-file marker to Obsidian task Markdown, prevent unsafe overwrite of non-generated files, and add tests for repeat sync plus user-authored file protection.
```

Checks:

- Generated task files are deterministic.
- Non-generated files are not overwritten.
- Tests cover the new safety rule.

### P1.2 Add sync events endpoint

Prompt:

```text
Use $cyrus-sync-development. Add a read-only endpoint to list sync events with filters by task id, target, and status. Add server tests and a small SyncCenter UI section if appropriate.
```

Checks:

- Endpoint is read-only.
- Filters are validated.
- UI handles empty and error states.

### P1.3 Centralize API validation with Zod

Prompt:

```text
Use $cyrus-sync-development. Replace manual task input validation with Zod schemas shared or mirrored between server and frontend. Preserve existing error behavior where tests rely on it.
```

Checks:

- Invalid track/status/priority/progress are covered.
- Frontend form constraints align with server validation.

### P1.4 Configurable frontend API base URL

Prompt:

```text
Use $cyrus-testing-review. Replace the hardcoded frontend API base URL with a Vite env value that defaults to http://127.0.0.1:8787. Add tests or docs to cover the default.
```

Checks:

- GitHub Pages still works.
- Local dev default remains unchanged.

## P2 — Product and learning features

### P2.1 Learning note export

Prompt:

```text
Use $cyrus-learning-roadmap. Add a learning note export flow that turns a completed task into a structured note template with concept, evidence, next action, and track mapping.
```

### P2.2 Weekly validation digest

Prompt:

```text
Use $cyrus-learning-roadmap and $cyrus-sync-development. Add a weekly validation digest generator for work-validation tasks, producing an Obsidian-ready Markdown summary from active/done/blocked tasks.
```

### P2.3 Accessibility pass

Prompt:

```text
Use $cyrus-testing-review. Review the React UI for accessibility: labels, keyboard navigation, status text, contrast assumptions, and form feedback. Implement the smallest improvements and add frontend tests where practical.
```

### P2.4 Import/export backup

Prompt:

```text
Use $cyrus-sync-development. Add JSON export/import for tasks so local SQLite state can be backed up and restored. Include tests for round-trip and invalid import data.
```
