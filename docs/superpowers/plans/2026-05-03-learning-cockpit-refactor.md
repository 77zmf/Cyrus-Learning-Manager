# Learning Cockpit Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the app around the user's learning workflow: web learning, GoodNotes handwriting, Obsidian mind maps, and Notion review/index tracking.

**Architecture:** Keep the local-first React/Vite app and existing sync backend. Refactor the frontend navigation into a learning cockpit, add focused workflow pages, and keep Notion as a structured review/index projection rather than a primary notebook.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, existing CSS and Express sync service.

---

### Task 1: Navigation Contract

**Files:**
- Modify: `tests/frontend/App.test.tsx`
- Modify: `src/App.tsx`

- [x] **Step 1: Write failing navigation assertions**

Require the main tabs to be `Learn`, `Notebook`, `Map`, `Library`, `Review`, `Hermes`, and `Sync`, and remove the old task-manager-first labels from the main nav.

- [x] **Step 2: Implement tab model**

Change the `Tab` union and rendered view switch to the new learning cockpit structure.

### Task 2: Workflow Pages

**Files:**
- Create: `src/domain/learning-workflow.ts`
- Create: `src/components/LearnView.tsx`
- Create: `src/components/NotebookView.tsx`
- Create: `src/components/MindMapView.tsx`
- Create: `src/components/ReviewView.tsx`
- Create: `tests/frontend/LearningWorkflowViews.test.tsx`
- Modify: `src/styles.css`

- [x] **Step 1: Write failing workflow-view tests**

Cover the web/GoodNotes/Obsidian/Notion responsibilities and the Notion database field model.

- [x] **Step 2: Add workflow domain data**

Define tool roles, GoodNotes template sections, Obsidian Canvas entries, and Notion learning database fields.

- [x] **Step 3: Implement focused pages**

Use `LearnView` for web interactive study, `NotebookView` for GoodNotes guidance, `MindMapView` for Obsidian Canvas thinking, and `ReviewView` for Notion review/index tracking.

### Task 3: Verification And Publish

**Files:**
- Existing test/build/deploy files.

- [x] **Step 1: Run targeted tests**

Run `npx vitest run tests/frontend/App.test.tsx tests/frontend/LearningWorkflowViews.test.tsx`.

- [x] **Step 2: Run full verification**

Run `npm test`, `npm run build`, and `git diff --check`.

- [x] **Step 3: Commit and push**

Commit as `feat: refactor learning cockpit` and push to GitHub Pages.
