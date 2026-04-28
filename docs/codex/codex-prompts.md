# Codex Prompts for Cyrus Learning Manager

These are copy-paste prompts. Use the `$skill-name` references when the skills in `.agents/skills/` are installed in the repository.

## Onboarding

```text
Please use $cyrus-repo-onboarding. Read AGENTS.md and docs/codex/repo-map.md, then explain the architecture, the data flow, and the top 5 risks before making any code changes.
```

## Learning advice

```text
Please use $cyrus-learning-roadmap. Based on the current repository and my autonomous-driving validation background, propose a 2-week learning plan with tasks that produce code, tests, and Obsidian/Notion evidence.
```

## Safe sync change

```text
Please use $cyrus-sync-development. Add a safety improvement to Obsidian task syncing so generated files are clearly marked and non-generated files are not overwritten. Write tests first and keep Notion behavior unchanged.
```

## Test and review pass

```text
Please use $cyrus-testing-review. Review the current diff against docs/codex/code-review.md, identify missing tests, then add the smallest tests needed. Run npm run test and npm run build if available.
```

## CI quality gate

```text
Please use $cyrus-testing-review. Update GitHub Pages CI so npm run test runs before npm run build. Keep deployment behavior unchanged and explain the resulting quality gate.
```

## Config cleanup

```text
Please use $cyrus-sync-development. Refactor environment loading in server/config.ts to remove personal defaults, validate env with Zod, update tests, and keep missing Notion config as a skipped sync state.
```

## README creation

```text
Please use $cyrus-repo-onboarding. Create a root README.md using docs/codex/templates/root-README.md as a starting point. Match the actual package scripts and environment variables.
```
