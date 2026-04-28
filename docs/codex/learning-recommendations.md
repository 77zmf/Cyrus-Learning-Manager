# Learning Recommendations Based on This Repository

## Diagnosis

Your repository already covers a useful full-stack learning loop: React/Vite frontend, TypeScript domain modeling, Express API, SQLite persistence, Notion API integration, Obsidian file generation, GitHub Pages deployment, and Vitest tests. That is a strong project for learning because each improvement can produce both code evidence and a study artifact.

The next learning step is not to add more features immediately. First make the repository easier to read, verify, and operate. After that, use feature work to deepen backend reliability, frontend state design, and autonomous-driving validation thinking.

## Highest-leverage learning goals

### 1. TypeScript maintainability and formatting

Several source files are effectively one-line or very long-line files. This makes review and debugging harder than the code itself needs to be.

Recommended learning outcome:

- Add formatting/linting tooling.
- Reformat TS/TSX/CSS/YAML without behavior changes.
- Learn how formatting improves diffs, review, and Codex reliability.

Codex prompt:

```text
Use $cyrus-testing-review. Add Prettier and ESLint for this TypeScript React/Vite + Node repo, reformat source files, add npm scripts, and run tests/build. Keep the change behavior-preserving.
```

### 2. Runtime configuration and secret safety

The repo has `.env.example`, but `server/config.ts` still contains personal-looking defaults. Treat configuration as a learning topic: safe defaults, validation, and local-only behavior.

Recommended learning outcome:

- Replace personal path/id defaults with neutral defaults or required env values.
- Validate env with Zod.
- Document local setup in a root README.
- Confirm no tests depend on personal paths.

Codex prompt:

```text
Use $cyrus-sync-development. Refactor server/config.ts to validate environment with Zod, remove personal defaults, keep tests passing, and update .env.example plus docs.
```

### 3. Sync reliability and idempotency

The project writes to SQLite, Obsidian, and Notion. That is the best place to learn robust local-first engineering.

Recommended learning outcome:

- Make Obsidian generated files clearly marked and safe to overwrite only when generated.
- Add retry semantics or a sync-events view.
- Add tests for partial failure: Obsidian succeeds but Notion fails, Notion skipped, Obsidian path missing, repeated sync.

Codex prompt:

```text
Use $cyrus-sync-development. Add a safe generated-file marker to Obsidian task Markdown and tests proving repeat sync does not destroy user-authored notes.
```

### 4. Frontend state and offline UX

The app should remain useful when the local sync service is disconnected. That is a good React learning axis: loading states, error states, optimistic updates, local app-key setup, and clear sync status.

Recommended learning outcome:

- Separate task loading state from health state.
- Improve UI messages for disconnected service versus invalid app key.
- Add component tests for those states.
- Consider Vite env config for the API base URL.

Codex prompt:

```text
Use $cyrus-testing-review. Improve frontend disconnected-sync UX: separate health loading/error states, document local app-key setup, and add tests for disconnected and invalid-key cases.
```

### 5. CI quality gate

GitHub Pages deployment builds the app, but the workflow should explicitly run tests before deploy.

Recommended learning outcome:

- Add `npm run test` to the GitHub Actions workflow before `npm run build`.
- Learn the difference between type/build gates and behavioral tests.
- Keep workflow logs easy to interpret.

Codex prompt:

```text
Use $cyrus-testing-review. Update the GitHub Pages workflow to run npm run test before npm run build, then explain the CI quality gate.
```

## 30-day learning plan

### Week 1 — Make the repo readable and reproducible

Daily loop:

1. Read one source area.
2. Write a one-paragraph explanation.
3. Add or improve one test.
4. Run `npm run test` and `npm run build`.
5. Log one learning note.

Deliverables:

- Root README.
- Formatting/linting scripts.
- CI runs tests before deploy.
- `.env.example` and config docs aligned.

### Week 2 — Backend and SQLite mastery

Focus:

- Express route boundaries.
- SQLite schema and migrations.
- Request validation.
- Failure-path tests.

Deliverables:

- Zod request/env validation.
- Better task service tests.
- A `GET /sync-events` or equivalent debug surface.
- A short note explaining the data model.

### Week 3 — React and learning UX

Focus:

- Component state and derived data.
- Forms and validation.
- Health/sync status.
- Accessibility and error copy.

Deliverables:

- Better task creation/editing UX.
- Component tests for search/filter/status updates.
- Configurable API base URL.
- A UI note explaining the local-first model.

### Week 4 — Integration, validation, and autonomous-driving connection

Focus:

- Treat sync like a validation pipeline.
- Record evidence for every state transition.
- Connect `work-validation` tasks to failcase closure and KPI gates.

Deliverables:

- Sync retry/idempotency design.
- Obsidian/Notion sync checklist.
- Weekly validation digest template.
- A learning task seed that maps one autonomous-driving validation workflow to this app.

## How this maps to autonomous-driving work

Your strongest leverage is the `work-validation` track. Use this app as a miniature validation platform:

- A task is like a validation issue or failcase.
- Status/progress are closure state.
- Source/notes are evidence.
- Obsidian is the detailed engineering log.
- Notion is the structured tracking view.
- Sync events are the audit trail.

That means every repository improvement can double as practice for production validation thinking: define states, collect evidence, handle partial failure, and make closure reviewable.
