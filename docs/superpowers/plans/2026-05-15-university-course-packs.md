# University Course Packs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a scalable Tsinghua, MIT, and Stanford course-pack layer that follows the CS231A/CS231n pattern: official source links, LaTeX formulas, guided PDF, and web navigation.

**Architecture:** Keep the first phase as a master index, not one giant page. The React app reads a typed course-pack dataset, renders source cards and batch priorities, and links to a generated roadmap PDF. Individual course PDFs then get produced in later batches from the same source map.

**Tech Stack:** React, TypeScript, Vite, Vitest, KaTeX, Tectonic LaTeX.

---

### Task 1: Course-Pack Dataset And Web Entry

**Files:**
- Create: `src/domain/university-course-packs.ts`
- Create: `src/components/UniversityCoursePacks.tsx`
- Modify: `src/components/CoursesView.tsx`
- Test: `tests/frontend/CoursesView.test.tsx`

- [x] **Step 1: Add a typed course-pack dataset**

Create `src/domain/university-course-packs.ts` with source cards for Tsinghua Automation, MIT EECS/control/robotics, and Stanford vision/spatial AI.

- [x] **Step 2: Render the dataset in the Library**

Create `UniversityCoursePacks.tsx` and render it from `CoursesView.tsx` near the CS231A/CS231n course-note blocks.

- [x] **Step 3: Add frontend assertions**

Update `tests/frontend/CoursesView.test.tsx` so the Library must expose the master heading, roadmap PDF, and representative official course links.

### Task 2: LaTeX Roadmap Artifact

**Files:**
- Create: `docs/courses/university-course-packs/README.md`
- Create: `docs/courses/university-course-packs/source-links.json`
- Create: `docs/courses/university-course-packs/cyrus-university-course-roadmap.tex`
- Create: `docs/courses/university-course-packs/build/cyrus-university-course-roadmap.pdf`
- Create: `public/courses/university-course-packs/cyrus-university-course-roadmap.pdf`

- [x] **Step 1: Write the source map and README**

Record official course home pages, role in the learning system, and whether an individual guided PDF already exists.

- [x] **Step 2: Write and compile the LaTeX roadmap**

Use Tectonic to compile the route PDF. Include formulas for state space, controllability, LQR, Kalman filtering, projection geometry, empirical risk, and Bellman recursion.

- [x] **Step 3: Copy the PDF into `public/`**

Place the built PDF at `/Cyrus-Learning-Manager/courses/university-course-packs/cyrus-university-course-roadmap.pdf`.

### Task 3: Verification

**Files:**
- Test: `tests/frontend/CoursesView.test.tsx`
- Test: full repository test and build commands

- [x] **Step 1: Run targeted frontend test**

Run: `npm test -- tests/frontend/CoursesView.test.tsx`

- [x] **Step 2: Run full test suite**

Run: `npm test`

- [x] **Step 3: Run production build**

Run: `npm run build`

### Task 4: Per-Course Guided PDFs

**Files:**
- Create: `scripts/courses/generate-university-course-pdfs.ts`
- Modify: `package.json`
- Modify: `src/domain/university-course-packs.ts`
- Modify: `src/components/UniversityCoursePacks.tsx`
- Generate: `docs/courses/university-course-packs/<course-id>/cyrus-<course-id>-guided-notes.tex`
- Generate: `public/courses/university-course-packs/<course-id>/cyrus-<course-id>-guided-notes.pdf`

- [x] **Step 1: Add a repeatable generator**

Use the bundled Tectonic executable to build one guided PDF per course-pack item.

- [x] **Step 2: Surface every course PDF in the web UI**

Each course card now has a source link and a guided PDF link.

- [x] **Step 3: Verify generated artifacts**

Run the generator, targeted tests, full tests, and production build.
