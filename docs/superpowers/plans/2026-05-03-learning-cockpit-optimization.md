# Learning Cockpit Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every Cyrus Learning Manager tab more actionable for self-paced web study, GoodNotes handwritten work, Obsidian mapping, Notion review, Hermes handoff, and local sync.

**Architecture:** Keep the existing React/Vite frontend and local sync service. Add structured workflow data in `src/domain/learning-workflow.ts`, render it in the existing tab components, and preserve the black/white/gray visual system.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, CSS.

---

### Task 1: Workflow Domain

**Files:**
- Modify: `src/domain/learning-workflow.ts`
- Modify: `tests/frontend/LearningWorkflowViews.test.tsx`

- [x] **Step 1: Write failing assertions**

Require concrete learning launch items, GoodNotes derivation cards, Obsidian graph relations, Notion views, and sync readiness labels.

- [x] **Step 2: Add workflow data**

Export arrays for `learningLaunchQueue`, `goodNotesDerivationCards`, `canvasGraphNodes`, `canvasGraphEdges`, `notionReviewViews`, `syncReadinessChecks`, and `hermesLearningPresets`.

### Task 2: Tab Optimizations

**Files:**
- Modify: `src/components/LearnView.tsx`
- Modify: `src/components/NotebookView.tsx`
- Modify: `src/components/MindMapView.tsx`
- Modify: `src/components/ReviewView.tsx`
- Modify: `src/components/CoursesView.tsx`
- Modify: `src/components/HermesConsole.tsx`
- Modify: `src/components/SyncCenter.tsx`
- Modify: `src/styles.css`

- [x] **Step 1: Implement page-specific action surfaces**

Show the launch queue in Learn, derivation cards in Notebook, graph nodes/edges in Map, database views in Review, track route summaries in Library, presets in Hermes, and readiness checks in Sync.

- [x] **Step 2: Keep layouts responsive**

Add CSS grids that collapse to one column below the existing mobile breakpoint.

### Task 3: Verification And Publish

**Files:**
- Existing test/build/deploy files.

- [x] **Step 1: Run targeted tests**

Run `npx vitest run tests/frontend/LearningWorkflowViews.test.tsx tests/frontend/CoursesView.test.tsx tests/frontend/HermesConsole.test.tsx`.

- [x] **Step 2: Run full verification**

Run `npm test`, `npm run build`, and `git diff --check`.

- [x] **Step 3: Commit and push**

Commit as `feat: optimize learning cockpit sections` and push to GitHub Pages.
