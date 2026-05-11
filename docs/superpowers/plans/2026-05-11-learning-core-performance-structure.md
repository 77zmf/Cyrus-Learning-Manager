# Learning Core Performance And Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Cyrus Learning Manager lighter to load and easier to extend without changing the current learning content.

**Architecture:** Split tab views with React lazy loading so the shell does not import every learning surface up front. Move guided Manim scene derivation into a focused domain module while preserving the existing `guidedControlLessons` API. Keep deployment behavior compatible with GitHub Pages.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, CSS.

---

### Task 1: Lazy Tab Loading

**Files:**
- Modify: `src/App.tsx`
- Modify: `tests/frontend/App.test.tsx`

- [ ] **Step 1: Write failing App test**

Add assertions that the shell exposes a loading state while lazy tab content resolves and still renders the default Learn tab.

- [ ] **Step 2: Run App test to verify failure**

Run: `npm test -- tests/frontend/App.test.tsx`
Expected: fail before `React.Suspense` loading state exists.

- [ ] **Step 3: Implement lazy tab imports**

Replace direct tab imports with `React.lazy`, wrap the active tab area in `Suspense`, and keep Review/Hermes props unchanged.

- [ ] **Step 4: Run App test to verify pass**

Run: `npm test -- tests/frontend/App.test.tsx`
Expected: pass.

### Task 2: Guided Manim Domain Split

**Files:**
- Create: `src/domain/guided-manim.ts`
- Modify: `src/domain/learning-workflow.ts`
- Modify: `tests/domain/learning-workflow.test.ts`

- [ ] **Step 1: Write failing domain test**

Require guided Manim scene asset derivation to come from a reusable exported helper and match the render script output names.

- [ ] **Step 2: Run domain test to verify failure**

Run: `npm test -- tests/domain/learning-workflow.test.ts`
Expected: fail before helper exists.

- [ ] **Step 3: Extract guided Manim data and builder**

Move guided scene names, titles, visual models, output filename derivation, and `buildGuidedLessonManimScene` into `guided-manim.ts`.

- [ ] **Step 4: Run domain test to verify pass**

Run: `npm test -- tests/domain/learning-workflow.test.ts`
Expected: pass.

### Task 3: Vite Chunk Structure

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Add chunk assertions through build evidence**

Use `npm run build` output as the verification target. The output should show separate route chunks and no single app chunk above the previous monolithic `index-*.js` size.

- [ ] **Step 2: Configure manual chunks**

Add Rollup manual chunks for React, KaTeX, and learning-domain-heavy modules only if lazy loading alone still leaves a warning.

- [ ] **Step 3: Run full verification**

Run: `npm test`, `npm run build`, and `git diff --check`.

### Task 4: Publish

**Files:**
- Existing git and GitHub Pages workflow.

- [ ] **Step 1: Commit worktree changes**

Commit as `refactor: optimize learning core loading`.

- [ ] **Step 2: Merge back to main and push**

After verification, merge the worktree branch into `main`, push to GitHub, and confirm GitHub Pages workflow succeeds.
