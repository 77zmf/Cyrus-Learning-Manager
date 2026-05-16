# Codex Task Template

Use this template for bounded work in Cyrus Learning Manager.

~~~md
# Codex Task

## Goal

[One goal only.]

## Context

[Relevant repo context, user goal, and why this matters.]

## Allowed Files

Codex may modify:

- path/to/file

## Forbidden Files

Codex must not modify:

- secrets
- `.env.local`
- real Obsidian vault content unless explicitly requested
- generated SQLite data
- unrelated UI/style files
- core sync behavior unless explicitly listed

## Verification

Run or explain why unavailable:

```bash
npx vitest run <targeted-test>
npm run test
npm run build
```

## Expected Output

1. Summary
2. Files Changed
3. Verification
4. Evidence
5. Blockers
6. Next Action
7. Risk

## No-Go Rules

- Do not commit secrets or personal credentials.
- Do not make live Notion calls from tests.
- Do not write automated tests to the real Obsidian vault.
- Do not weaken `LOCAL_APP_KEY` write protection.
- Do not expose the sync service outside `127.0.0.1` without explicit review.
- Do not treat a Notion row as evidence without an Obsidian or artifact pointer.

## Risk

[Primary risk and rollback.]
~~~
