# Learning Experience Optimization Design

## Purpose

继续优化 Cyrus Learning Manager，但不先扩内容量。当前主要问题是学习页面、交互实验和公式渲染已经集中在少数大文件里，后续继续加入 SLAM、三维重建、空间智能、Manim 和 GoodNotes 教程时会越来越难维护。

这轮设计采用三阶段流程：

1. 先拆学习页面和交互实验结构。
2. 再整理公式渲染系统。
3. 最后整理全局玻璃风格 CSS。

每个阶段都必须保持现有学习内容、GitHub Pages 部署、Manim 视频路径、Obsidian/Notion 学习流程不变。

## Current State

当前代码已经完成上一轮加载性能优化：

- `src/App.tsx` 使用 `React.lazy` 和 `Suspense` 按 tab 加载页面。
- `src/domain/guided-manim.ts` 已经拆出 Guided Lesson 的 Manim storyboard 构建逻辑。
- `npm run build` 已经不再出现上一轮的 Vite 大 chunk 警告。

剩余主要结构压力：

- `src/components/LearnView.tsx` 同时负责首页学习流程、目录、小白入口、3Blue1Brown、Manim Studio、Guided Lesson、Ready Check 和学习启动队列。
- `src/components/SpatialDragLabs.tsx` 同时包含 SLAM、三维重建、四元数和交互 pointer 逻辑。
- `src/components/MathText.tsx` 把 KaTeX 渲染、公式识别规则、文本切片和组件渲染放在同一个文件里。
- `src/styles.css` 超过 4500 行，玻璃质感、学习卡片、Manim、空间交互、公式显示和响应式规则混在一起。

## Phase A: Learning Page Structure

### Goal

把 Learn 页面拆成更小的学习区块，让后续新增课程、交互和教程时不再继续堆进一个大组件。

### Proposed Components

Create focused components under `src/components/learn/`:

- `LearningDirectory.tsx`: 页面内目录和锚点跳转。
- `BeginnerStartPanel.tsx`: Start Here for Beginners。
- `FoundationBridgePanel.tsx`: Zero-Base Bridge。
- `ThreeBlueOneBrownBridge.tsx`: 3Blue1Brown 路径区。
- `GuidedPathPanel.tsx`: Guided Path 容器、课程目录和 lesson open state。
- `GuidedLessonCard.tsx`: 单节课的 details 卡片。
- `GuidedLessonManimStoryboard.tsx`: 单节课 Manim storyboard。
- `LessonReadyCheck.tsx`: 概念题、公式题、GoodNotes 确认。
- `LearningLaunchQueue.tsx`: Learning Launch Queue。

Create focused interaction components under `src/components/spatial/`:

- `pointer.ts`: `clamp`, `format`, `pointFromPointer` 等共享纯函数。
- `SlamChainDragLab.tsx`: SLAM 地标和位姿链交互。
- `ReconstructionDragLab.tsx`: reconstruction baseline 交互。
- `QuaternionDragLab.tsx`: quaternion explorable 交互。
- `SpatialPanelInteraction.tsx`: 根据 `panelId` 选择对应交互。

Keep these existing public imports stable where possible:

- `src/components/LearnView.tsx` still exports `LearnView`.
- `src/components/ManimStudioLab.tsx` still imports `SpatialPanelInteraction`.
- Existing tests continue to render `LearnView` as the user-facing entry.

### Data Flow

`LearnView` becomes an orchestrator:

1. Owns only the open lesson state.
2. Passes `openLesson`, `openLessonIds`, and `syncLessonOpen` into `GuidedPathPanel`.
3. Renders the major learning sections in the same order as today.

Domain data remains in `src/domain/learning-workflow.ts` and `src/domain/manim-studio-content.ts`. Phase A does not move course content yet.

### User Behavior

No visible behavior should change:

- The default open lesson remains `lesson-state-space`.
- Course directory links still open the selected lesson.
- Ready Check buttons and checkbox behavior stay the same.
- Manim video paths remain under `/Cyrus-Learning-Manager/manim/...`.
- SLAM projection, SLAM landmark, reconstruction, and quaternion drag interactions continue to update their readouts.

## Phase B: Formula Rendering System

### Goal

Make formula rendering easier to extend and test, especially for SLAM, reconstruction, quaternion, control, world model, and spatial intelligence formulas.

### Proposed Modules

Create `src/domain/math-text.ts`:

- `FormulaMatcher`
- `splitMathText`
- `findNextFormula`
- `trimFormulaMatch`
- `formulaMatchers`

Keep React rendering in `src/components/MathText.tsx`:

- `InlineFormula`
- `MathText`
- `MathLines`

Add focused tests in `tests/domain/math-text.test.ts`:

- raw `x_dot=Ax+Bu` normalizes to `\dot{x}=Ax+Bu`
- SLAM projection formulas are detected
- quaternion formulas are detected
- display-like raw LaTeX snippets do not leak as text when passed through `MathText`
- ordinary Chinese text remains unchanged

### User Behavior

The formula visual policy stays the same:

- Render formulas through KaTeX.
- Do not show raw `\mathcal`, `\begin`, `x_dot`, `A^2B`, or `$$` strings in visible learning pages.
- Keep `throwOnError: false` so one bad expression does not break the page.

## Phase C: Glass Style And CSS Structure

### Goal

Make iOS-style glass material consistent across the app and make the stylesheet maintainable.

### Proposed CSS Split

Split `src/styles.css` into imported CSS files under `src/styles/`:

- `tokens.css`: color, spacing, typography, glass variables.
- `base.css`: body, shell, topbar, tabs, common panels.
- `learning.css`: Learn page, directories, beginner panels, guided cards.
- `math.css`: KaTeX, formula visual, formula terms, ready checks.
- `manim.css`: Manim Studio, Manim preview, guided storyboard.
- `spatial.css`: SLAM, reconstruction, quaternion drag labs.
- `responsive.css`: media queries.

Keep `src/styles.css` as the single import surface from `src/main.tsx`; it should only import the split files in order.

### Visual Rules

- Keep the black/white/gray visual direction from the current GitHub Pages style.
- Apply glass material consistently to panels, learning cards, formula cards, Manim cards, and interaction labs.
- Do not introduce decorative gradient blobs or unrelated color themes.
- Keep text readable on mobile and desktop.

## Error Handling And Safety

- The app must still work when the local sync service is disconnected.
- Notion and Obsidian writes are not touched by this optimization.
- No tokens, local `.env.local`, SQLite files, or generated vault files are committed.
- No new runtime dependencies are introduced unless a later implementation plan explicitly justifies one.

## Testing Strategy

Each phase needs narrow tests first, then full verification.

Phase A tests:

- `tests/frontend/LearningWorkflowViews.test.tsx`
- Existing interaction tests remain the behavioral contract.
- Add source-level or component-level checks only where they prove the split.

Phase B tests:

- Add `tests/domain/math-text.test.ts`.
- Keep `tests/frontend/FormulaVisibility.test.tsx` as the user-visible regression suite.

Phase C tests:

- Keep frontend behavior tests unchanged.
- Run Playwright or browser screenshot checks after CSS split if layout risk is high.

Full verification for each implementation pass:

```bash
npm test
npm run build
git diff --check
```

If the change is pushed:

```bash
git push
```

Then confirm the GitHub Pages workflow succeeds.

## Implementation Boundary

The first implementation plan should cover Phase A only. Phase B and Phase C should each get a separate plan after Phase A is verified, because each phase touches different risk areas and should remain reviewable.

The first implementation pass is done only when:

- `LearnView.tsx` is visibly smaller and mostly orchestration.
- `SpatialDragLabs.tsx` no longer owns every interaction implementation.
- Existing learning, formula visibility, Manim, and drag interaction tests pass.
- `npm run build` passes.
