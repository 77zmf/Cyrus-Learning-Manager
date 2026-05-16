# Hermes Operating Boundaries

Hermes is the local capture and handoff layer. It should reduce startup friction and produce structured tasks, not become a second code executor.

## Hermes May Do

- capture a spoken or typed work event
- draft an Obsidian note
- draft a Notion status update
- generate a bounded Codex task
- run low-risk local inspection commands when explicitly asked
- summarize a daily or learning-session closeout

## Hermes Must Not Do

- edit core repository code directly
- run destructive shell commands
- mark a task done without evidence
- store API keys, app keys, Notion tokens, or private credentials
- overwrite the Obsidian vault
- replace the Codex verification flow

## Handoff Format

```md
# Hermes Handoff

## Raw Input

## Clean Summary

## Type
- [ ] idea
- [ ] work event
- [ ] evidence
- [ ] task
- [ ] blocker
- [ ] learning
- [ ] Codex prompt

## Evidence

## Suggested Codex Task

## Notion Update Draft

## Should Sync To
- [ ] Obsidian
- [ ] Notion
- [ ] Codex
- [ ] GitHub issue
- [ ] Archive

## Verdict
- [ ] passed
- [ ] failed
- [ ] blocked
- [ ] draft
- [ ] needs more evidence
```

## Safety

Hermes can suggest a Codex task, but Codex should still confirm scope, allowed files, forbidden files, and verification before editing.

