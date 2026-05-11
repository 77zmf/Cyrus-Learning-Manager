# Learning Page Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the Learn page and spatial interaction labs into focused modules without changing visible learning behavior.

**Architecture:** Keep `src/components/LearnView.tsx` and `src/components/SpatialDragLabs.tsx` as stable public entry points. Move Learn sections into `src/components/learn/` and spatial drag labs into `src/components/spatial/`. Use source-level structure tests plus existing behavior tests to prove the refactor preserves the current learning workflow.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, CSS.

---

## File Structure

Create these Learn components:

- `src/components/learn/LearningDirectory.tsx`: page jump directory.
- `src/components/learn/BeginnerStartPanel.tsx`: beginner five-step start panel.
- `src/components/learn/FoundationBridgePanel.tsx`: zero-base foundation cards.
- `src/components/learn/ThreeBlueOneBrownBridge.tsx`: imported 3Blue1Brown source strip, route directory, and route cards.
- `src/components/learn/GuidedPathPanel.tsx`: guided lesson directory and lesson grid container.
- `src/components/learn/GuidedLessonCard.tsx`: one guided lesson card body.
- `src/components/learn/GuidedLessonManimStoryboard.tsx`: one guided lesson Manim storyboard and video.
- `src/components/learn/LessonReadyCheck.tsx`: concept answer, formula choice, and GoodNotes confirmation.
- `src/components/learn/LearningLaunchQueue.tsx`: launch queue cards.

Create these spatial modules:

- `src/components/spatial/pointer.ts`: `Point2D`, `clamp`, `format`, `pointFromClientRect`, `pointFromPointer`.
- `src/components/spatial/stages.ts`: `StageCopy`, `slamStages`, `reconstructionStages`, `quaternionStages`.
- `src/components/spatial/SpatialPanelInteraction.tsx`: selects projection, SLAM, reconstruction, or quaternion lab by `panelId`.
- `src/components/spatial/SlamChainDragLab.tsx`: SLAM landmark and pose-chain interaction.
- `src/components/spatial/ReconstructionDragLab.tsx`: reconstruction camera baseline interaction.
- `src/components/spatial/QuaternionDragLab.tsx`: quaternion rotation interaction.

Keep these public files:

- `src/components/LearnView.tsx`: orchestration only.
- `src/components/SpatialDragLabs.tsx`: compatibility re-export for `SpatialPanelInteraction`.

Add tests:

- `tests/frontend/LearningStructure.test.ts`: source-level guard that the split exists and large internal functions no longer live in `LearnView.tsx` / `SpatialDragLabs.tsx`.
- `tests/domain/spatial-pointer.test.ts`: pure helper coverage for clamp, formatting, and pointer normalization fallback.

## Task 1: Add Structure And Pointer Tests

**Files:**
- Create: `tests/frontend/LearningStructure.test.ts`
- Create: `tests/domain/spatial-pointer.test.ts`

- [ ] **Step 1: Write the failing Learn/spatial structure test**

Create `tests/frontend/LearningStructure.test.ts` with this content:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readSource(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("learning page source structure", () => {
  it("keeps LearnView as an orchestrator instead of owning every section", () => {
    const source = readSource("src/components/LearnView.tsx");

    expect(source).toContain('from "./learn/LearningDirectory"');
    expect(source).toContain('from "./learn/BeginnerStartPanel"');
    expect(source).toContain('from "./learn/FoundationBridgePanel"');
    expect(source).toContain('from "./learn/ThreeBlueOneBrownBridge"');
    expect(source).toContain('from "./learn/GuidedPathPanel"');
    expect(source).toContain('from "./learn/LearningLaunchQueue"');
    expect(source).not.toContain("function LearningDirectory(");
    expect(source).not.toContain("function ThreeBlueOneBrownBridge(");
    expect(source).not.toContain("function GuidedLessonManimStoryboard(");
    expect(source).not.toContain("function LessonReadyCheck(");
  });

  it("keeps the spatial public entry as a thin compatibility export", () => {
    const source = readSource("src/components/SpatialDragLabs.tsx");

    expect(source.trim()).toBe('export { SpatialPanelInteraction } from "./spatial/SpatialPanelInteraction";');
  });
});
```

- [ ] **Step 2: Write the failing pointer helper test**

Create `tests/domain/spatial-pointer.test.ts` with this content:

```ts
import { describe, expect, it } from "vitest";
import { clamp, format, pointFromClientRect } from "../../src/components/spatial/pointer";

describe("spatial pointer helpers", () => {
  it("clamps values to the provided range", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
    expect(clamp(2, 0, 1)).toBe(1);
  });

  it("formats readout numbers with two decimals", () => {
    expect(format(1)).toBe("1.00");
    expect(format(1.236)).toBe("1.24");
  });

  it("normalizes client coordinates against a rectangle", () => {
    expect(
      pointFromClientRect({
        clientX: 150,
        clientY: 80,
        previous: { x: 0.2, y: 0.3 },
        rect: { left: 100, top: 40, width: 200, height: 80 }
      })
    ).toEqual({ x: 0.25, y: 0.5 });
  });

  it("falls back to the previous point when layout dimensions are unavailable", () => {
    expect(
      pointFromClientRect({
        clientX: 150,
        clientY: 80,
        previous: { x: 0.2, y: 0.3 },
        rect: { left: 0, top: 0, width: 0, height: 0 }
      })
    ).toEqual({ x: 0.2, y: 0.3 });
  });
});
```

- [ ] **Step 3: Run the new tests to verify failure**

Run:

```bash
npm test -- tests/frontend/LearningStructure.test.ts tests/domain/spatial-pointer.test.ts
```

Expected: fail because `src/components/learn/*`, `src/components/spatial/pointer.ts`, and the thin `SpatialDragLabs.tsx` export do not exist yet.

## Task 2: Extract Learn Page Sections

**Files:**
- Modify: `src/components/LearnView.tsx`
- Create: `src/components/learn/LearningDirectory.tsx`
- Create: `src/components/learn/BeginnerStartPanel.tsx`
- Create: `src/components/learn/FoundationBridgePanel.tsx`
- Create: `src/components/learn/ThreeBlueOneBrownBridge.tsx`
- Create: `src/components/learn/LearningLaunchQueue.tsx`
- Test: `tests/frontend/LearningStructure.test.ts`
- Test: `tests/frontend/LearningWorkflowViews.test.tsx`

- [ ] **Step 1: Create `LearningDirectory.tsx`**

Cut the complete `function LearningDirectory()` from `src/components/LearnView.tsx` into `src/components/learn/LearningDirectory.tsx`.

Use this import header:

```tsx
import {
  beginnerFoundations,
  guidedControlLessons,
  threeBlueOneBrownLearningPath
} from "../../domain/learning-workflow";
```

Keep the exported signature:

```tsx
export function LearningDirectory() {
  const items = [
    { label: "小白入口", href: "#section-start", meta: "5 步开始" },
    { label: "前置概念", href: "#section-foundations", meta: `${beginnerFoundations.length} 张基础卡` },
    {
      label: "3Blue1Brown 数学桥",
      href: "#section-3blue1brown",
      meta: `${threeBlueOneBrownLearningPath.length} 条路线`
    },
    { label: "Manim Studio", href: "#section-manim-studio", meta: "SLAM / 3D / SI" },
    { label: "控制+SLAM课程目录", href: "#section-guided-path", meta: `${guidedControlLessons.length} 节课` },
    { label: "启动队列", href: "#section-launch-queue", meta: "想学时点一个" },
    { label: "互动题", href: "#section-tutor", meta: "即时反馈" }
  ];

  return (
    <nav aria-label="Learning directory" className="panel learning-directory">
      <div className="section-heading">
        <h2>Learning Directory</h2>
        <p>先用目录跳到你要学的部分；课程卡默认收起，展开当前要学的一张就够了。</p>
      </div>
      <div className="directory-grid">
        {items.map((item) => (
          <a aria-label={item.label} href={item.href} key={item.href}>
            <span>{item.label}</span>
            <em>{item.meta}</em>
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create `BeginnerStartPanel.tsx`**

Move the `section` with `id="section-start"` into `src/components/learn/BeginnerStartPanel.tsx`.

Use this component:

```tsx
import { beginnerStartSteps } from "../../domain/learning-workflow";
import { MathText } from "../MathText";

export function BeginnerStartPanel() {
  return (
    <section className="panel start-here-panel" id="section-start">
      <div className="section-heading">
        <h2>Start Here for Beginners</h2>
        <p>每次只走一条最小学习链：选课、补前置、做检查、写 GoodNotes、留证据。</p>
      </div>
      <ol className="beginner-start-list">
        {beginnerStartSteps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.title}</strong>
            <p>
              <MathText text={step.action} />
            </p>
            <em>
              <MathText text={step.output} />
            </em>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 3: Create `FoundationBridgePanel.tsx`**

Move the `section` with `id="section-foundations"` into `src/components/learn/FoundationBridgePanel.tsx`.

Use this import header:

```tsx
import { beginnerFoundations } from "../../domain/learning-workflow";
import { MathText } from "../MathText";
```

The exported component should be:

```tsx
export function FoundationBridgePanel() {
  return (
    <section className="panel beginner-bridge" id="section-foundations">
      <div className="section-heading">
        <h2>Zero-Base Bridge</h2>
        <p>先补最小前置概念。这里不要求你会证明，只要求你能用自己的话说出概念在干什么。</p>
      </div>
      <div className="foundation-grid">
        {beginnerFoundations.map((item) => (
          <article className="foundation-card" key={item.title}>
            <span>小白前置</span>
            <h3>{item.title}</h3>
            <p>
              <MathText text={item.plain} />
            </p>
            <dl className="beginner-dl">
              <div>
                <dt>例子</dt>
                <dd>
                  <MathText text={item.example} />
                </dd>
              </div>
              <div>
                <dt>最小练习</dt>
                <dd>
                  <MathText text={item.exercise} />
                </dd>
              </div>
              <div>
                <dt>GoodNotes</dt>
                <dd>
                  <MathText text={item.goodNotes} />
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `ThreeBlueOneBrownBridge.tsx`**

Move `function ThreeBlueOneBrownBridge()` and `function ThreeBlueOneBrownRouteCard()` into `src/components/learn/ThreeBlueOneBrownBridge.tsx`.

Use this import header:

```tsx
import {
  threeBlueOneBrownLearningPath,
  threeBlueOneBrownSources
} from "../../domain/learning-workflow";
import type { ThreeBlueOneBrownRoute } from "../../domain/learning-workflow";
import { FormulaVisual } from "../FormulaVisual";
import { MathText } from "../MathText";
```

Export only `ThreeBlueOneBrownBridge`. Keep `ThreeBlueOneBrownRouteCard` as a private helper in the same file.

- [ ] **Step 5: Create `LearningLaunchQueue.tsx`**

Move the `section` with `id="section-launch-queue"` into `src/components/learn/LearningLaunchQueue.tsx`.

Use this component:

```tsx
import { learningLaunchQueue } from "../../domain/learning-workflow";
import { MathText } from "../MathText";

export function LearningLaunchQueue() {
  return (
    <section className="panel action-surface" id="section-launch-queue">
      <div className="section-heading">
        <h2>Learning Launch Queue</h2>
        <p>Pick one item only when you want to study. Each item already names the web prompt and where the output should land.</p>
      </div>
      <div className="action-grid">
        {learningLaunchQueue.map((item) => (
          <article className="action-card" key={item.title}>
            <span>{item.focus}</span>
            <h3>{item.title}</h3>
            <strong>
              <MathText text={item.prompt} />
            </strong>
            <dl className="compact-dl">
              <div>
                <dt>GoodNotes</dt>
                <dd>{item.goodNotes}</dd>
              </div>
              <div>
                <dt>Obsidian</dt>
                <dd>{item.obsidian}</dd>
              </div>
              <div>
                <dt>Notion</dt>
                <dd>{item.notion}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Update `LearnView.tsx` imports and JSX**

Replace the large moved sections in `src/components/LearnView.tsx` with focused components.

Use these imports:

```tsx
import { learningToolRoles } from "../domain/learning-workflow";
import { useState } from "react";
import { InteractiveTutor } from "./InteractiveTutor";
import { ManimStudioLab } from "./ManimStudioLab";
import { BeginnerStartPanel } from "./learn/BeginnerStartPanel";
import { FoundationBridgePanel } from "./learn/FoundationBridgePanel";
import { GuidedPathPanel } from "./learn/GuidedPathPanel";
import { LearningDirectory } from "./learn/LearningDirectory";
import { LearningLaunchQueue } from "./learn/LearningLaunchQueue";
import { ThreeBlueOneBrownBridge } from "./learn/ThreeBlueOneBrownBridge";
```

The `LearnView` body should render these sections in this order:

```tsx
<LearningDirectory />
<BeginnerStartPanel />
<FoundationBridgePanel />
<ThreeBlueOneBrownBridge />
<ManimStudioLab />
<GuidedPathPanel
  openLessonIds={openLessonIds}
  openLesson={openLesson}
  syncLessonOpen={syncLessonOpen}
/>
<LearningLaunchQueue />
<div className="tutor-anchor" id="section-tutor">
  <InteractiveTutor />
</div>
```

- [ ] **Step 7: Run the Learn structure test**

Run:

```bash
npm test -- tests/frontend/LearningStructure.test.ts
```

Expected: still fail because Guided Lesson helpers and `SpatialDragLabs.tsx` have not been split yet. The `LearnView` import assertions for the files created in this task should pass.

## Task 3: Extract Guided Lesson Components

**Files:**
- Modify: `src/components/LearnView.tsx`
- Create: `src/components/learn/GuidedPathPanel.tsx`
- Create: `src/components/learn/GuidedLessonCard.tsx`
- Create: `src/components/learn/GuidedLessonManimStoryboard.tsx`
- Create: `src/components/learn/LessonReadyCheck.tsx`
- Test: `tests/frontend/LearningStructure.test.ts`
- Test: `tests/frontend/LearningWorkflowViews.test.tsx`

- [ ] **Step 1: Create `GuidedLessonManimStoryboard.tsx`**

Move the complete `function GuidedLessonManimStoryboard({ lesson }: { lesson: GuidedLesson })` from `LearnView.tsx` into `src/components/learn/GuidedLessonManimStoryboard.tsx`.

Use this header:

```tsx
import { useState } from "react";
import type { CSSProperties } from "react";
import type { GuidedLesson } from "../../domain/learning-workflow";
import { InlineFormula, MathText } from "../MathText";

const publicBasePath = "/Cyrus-Learning-Manager/";
```

Export it:

```tsx
export function GuidedLessonManimStoryboard({ lesson }: { lesson: GuidedLesson })
```

The moved body must be the complete current implementation: it starts by declaring `activeFrameIndex`, `scrub`, `activeFrame`, and `scrubPosition`, and it returns the `<section className="guided-manim-card" ...>` block with the storyboard stage, video, controls, and render metadata.

- [ ] **Step 2: Create `LessonReadyCheck.tsx`**

Move the complete `function LessonReadyCheck({ lesson }: { lesson: GuidedLesson })` and `readyChoiceClass` from `LearnView.tsx` into `src/components/learn/LessonReadyCheck.tsx`.

Use this header:

```tsx
import { useState } from "react";
import type { GuidedLesson, ReadyCheckFormulaChoice } from "../../domain/learning-workflow";
import { MathText } from "../MathText";
```

Export only `LessonReadyCheck`.

- [ ] **Step 3: Create `GuidedLessonCard.tsx`**

Move the `details` markup currently inside `guidedControlLessons.map(...)` into `src/components/learn/GuidedLessonCard.tsx`.

Use this component signature:

```tsx
import { beginnerLessonBridges } from "../../domain/learning-workflow";
import type { GuidedLesson } from "../../domain/learning-workflow";
import { FormulaVisual } from "../FormulaVisual";
import { MathText } from "../MathText";
import { GuidedLessonManimStoryboard } from "./GuidedLessonManimStoryboard";
import { LessonReadyCheck } from "./LessonReadyCheck";

interface GuidedLessonCardProps {
  lesson: GuidedLesson;
  isOpen: boolean;
  onToggle: (lessonId: string, isOpen: boolean) => void;
}

export function GuidedLessonCard({ lesson, isOpen, onToggle }: GuidedLessonCardProps) {
  const beginner = beginnerLessonBridges[lesson.id];

  return (
    <details
      className="guided-lesson-card"
      id={lesson.id}
      open={isOpen}
      onToggle={(event) => onToggle(lesson.id, event.currentTarget.open)}
    >
    </details>
  );
}
```

Fill the body between `<details>` and `</details>` by cutting the current `<summary className="lesson-summary">` and `<div className="lesson-detail-body">` subtree from `LearnView.tsx`. Do not change class names, aria labels, text, or child order.

- [ ] **Step 4: Create `GuidedPathPanel.tsx`**

Create `src/components/learn/GuidedPathPanel.tsx` with this component:

```tsx
import { guidedControlLessons } from "../../domain/learning-workflow";
import { GuidedLessonCard } from "./GuidedLessonCard";

interface GuidedPathPanelProps {
  openLessonIds: Set<string>;
  openLesson: (lessonId: string) => void;
  syncLessonOpen: (lessonId: string, isOpen: boolean) => void;
}

export function GuidedPathPanel({ openLessonIds, openLesson, syncLessonOpen }: GuidedPathPanelProps) {
  return (
    <section className="panel guided-path" id="section-guided-path">
      <div className="section-heading">
        <h2>Cyrus Guided Path</h2>
        <p>不用每日计划。每次想学时，打开这一节，从第一张卡开始：网页读、GoodNotes 写、Obsidian 连、Notion 留证据。</p>
      </div>
      <nav aria-label="Course directory" className="course-toc">
        <h3>课程目录</h3>
        <ol>
          {guidedControlLessons.map((lesson) => (
            <li key={lesson.id}>
              <a href={`#${lesson.id}`} onClick={() => openLesson(lesson.id)}>
                {lesson.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="guided-lesson-grid">
        {guidedControlLessons.map((lesson) => (
          <GuidedLessonCard
            isOpen={openLessonIds.has(lesson.id)}
            key={lesson.title}
            lesson={lesson}
            onToggle={syncLessonOpen}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Remove guided helper functions from `LearnView.tsx`**

Delete these symbols from `src/components/LearnView.tsx` after moving them:

```tsx
function GuidedLessonManimStoryboard
function LessonReadyCheck
function readyChoiceClass
```

Also remove unused imports from `LearnView.tsx`:

```tsx
beginnerFoundations
beginnerLessonBridges
beginnerStartSteps
guidedControlLessons
learningLaunchQueue
threeBlueOneBrownLearningPath
threeBlueOneBrownSources
type GuidedLesson
type ReadyCheckFormulaChoice
type ThreeBlueOneBrownRoute
type CSSProperties
FormulaVisual
InlineFormula
MathText
```

- [ ] **Step 6: Run guided behavior tests**

Run:

```bash
npm test -- tests/frontend/LearningWorkflowViews.test.tsx tests/frontend/FormulaVisibility.test.tsx
```

Expected: pass. These tests prove the extracted guided lesson cards, ready checks, formula visuals, and Manim storyboard still render with the same user-facing text and interactions.

## Task 4: Extract Spatial Drag Labs

**Files:**
- Modify: `src/components/SpatialDragLabs.tsx`
- Create: `src/components/spatial/pointer.ts`
- Create: `src/components/spatial/stages.ts`
- Create: `src/components/spatial/SpatialPanelInteraction.tsx`
- Create: `src/components/spatial/SlamChainDragLab.tsx`
- Create: `src/components/spatial/ReconstructionDragLab.tsx`
- Create: `src/components/spatial/QuaternionDragLab.tsx`
- Test: `tests/domain/spatial-pointer.test.ts`
- Test: `tests/frontend/LearningStructure.test.ts`
- Test: `tests/frontend/LearningWorkflowViews.test.tsx`

- [ ] **Step 1: Create pointer helpers**

Create `src/components/spatial/pointer.ts` with this content:

```ts
import type { PointerEvent } from "react";

export interface Point2D {
  x: number;
  y: number;
}

export interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PointFromClientRectInput {
  clientX: number;
  clientY: number;
  previous: Point2D;
  rect: RectLike;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function format(value: number) {
  return value.toFixed(2);
}

export function pointFromClientRect({ clientX, clientY, previous, rect }: PointFromClientRectInput) {
  if (rect.width <= 0 || rect.height <= 0) {
    return previous;
  }

  const pctX = clamp((clientX - rect.left) / rect.width, 0, 1);
  const pctY = clamp((clientY - rect.top) / rect.height, 0, 1);

  return {
    x: Number.isFinite(pctX) ? pctX : previous.x,
    y: Number.isFinite(pctY) ? pctY : previous.y
  };
}

export function pointFromPointer(event: PointerEvent<HTMLDivElement>, previous: Point2D) {
  return pointFromClientRect({
    clientX: event.clientX,
    clientY: event.clientY,
    previous,
    rect: event.currentTarget.getBoundingClientRect()
  });
}
```

- [ ] **Step 2: Create stage data**

Create `src/components/spatial/stages.ts` and move the current `StageCopy` interface plus `slamStages`, `reconstructionStages`, and `quaternionStages` arrays from `SpatialDragLabs.tsx`.

Export them:

```ts
export interface StageCopy {
  label: string;
  formula: string;
  note: string;
}

export const slamStages: StageCopy[] = [
  {
    label: "位姿链",
    formula: "T_{map\\leftarrow camera}=T_{map\\leftarrow base}T_{base\\leftarrow camera}",
    note: "先把 map、base、camera 坐标系串起来。坐标链不清楚，后面的投影和优化都会错。"
  },
  {
    label: "投影观测",
    formula: "u_{ij}=\\pi(T_iX_j)",
    note: "同一个三维地标会被不同相机位姿看到。拖动地标时，左右图像里的观测点会一起移动。"
  },
  {
    label: "特征匹配",
    formula: "x_2^TFx_1=0",
    note: "两张图的匹配点不是随便连线，它们必须满足对极约束。"
  },
  {
    label: "后端残差",
    formula: "\\min_{T,X}\\sum_{ij}\\lVert u_{ij}-\\pi(T_iX_j)\\rVert^2",
    note: "后端把所有观测残差放在一起，让轨迹和地图同时更一致。"
  },
  {
    label: "回环约束",
    formula: "T_k\\approx T_0\\Delta T_{loop}",
    note: "回环边把当前位姿拉回已见过的位置，用一条强约束抵消长期漂移。"
  }
];

export const reconstructionStages: StageCopy[] = [
  {
    label: "采集基线",
    formula: "baseline=\\lVert C_2-C_1\\rVert",
    note: "多视角之间要有足够基线。基线太小，深度不稳；基线太大，匹配会变难。"
  },
  {
    label: "COLMAP SfM",
    formula: "\\{R_i,t_i,X_j\\}=SfM(matches)",
    note: "COLMAP 先用匹配点恢复相机位姿和稀疏三维点，然后用 BA 一起优化。"
  },
  {
    label: "MVS 稠密化",
    formula: "D_i=\\arg\\min_D E_{photo}(D)",
    note: "MVS 用多视图光度一致性把稀疏点扩展成更密的深度、点云或表面。"
  },
  {
    label: "NeRF / 3DGS",
    formula: "\\hat{C}(r)=\\sum_iT_i\\alpha_ic_i",
    note: "NeRF 沿光线积分颜色，3DGS 把大量高斯投影到图像上，更适合交互式渲染。"
  },
  {
    label: "验证资产",
    formula: "asset=(scale,frame,dynamics,KPI)",
    note: "漂亮画面还不够。用于自动驾驶验证时，要检查尺度、坐标系、动态物体和 KPI 证据。"
  }
];

export const quaternionStages: StageCopy[] = [
  {
    label: "单位四元数",
    formula: "q=w+xi+yj+zk,\\quad \\lVert q\\rVert=1",
    note: "先把 q 限制在单位长度。这样它只表达姿态，不会把向量额外缩放。"
  },
  {
    label: "双覆盖",
    formula: "q\\sim -q",
    note: "球面上相反的两个点会给出同一个三维旋转。网页里 q 和 -q 会一起移动。"
  },
  {
    label: "立体投影",
    formula: "S^3\\rightarrow \\mathbb{R}^3",
    note: "我们看不见 4D 单位球面，所以用投影把它变成能拖动观察的 3D 形状。"
  },
  {
    label: "四元数乘法",
    formula: "i^2=j^2=k^2=ijk=-1",
    note: "乘法顺序就是旋转顺序。先绕 x 再绕 y，和先绕 y 再绕 x 通常不同。"
  },
  {
    label: "旋转夹心",
    formula: "v'=qvq^{-1}",
    note: "把三维向量 v 放进 q 和 q^{-1} 中间，得到的纯虚部分就是旋转后的向量。"
  }
];
```

Keep labels such as `位姿链`, `COLMAP SfM`, and `旋转夹心` unchanged because tests assert those visible strings.

- [ ] **Step 3: Create `QuaternionDragLab.tsx`**

Move the complete `function QuaternionDragLab()` from `SpatialDragLabs.tsx` into `src/components/spatial/QuaternionDragLab.tsx`.

Use this header:

```tsx
import { useMemo, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "../MathText";
import { clamp, format, pointFromPointer } from "./pointer";
import { quaternionStages } from "./stages";
```

Export the function:

```tsx
export function QuaternionDragLab()
```

The moved body is the complete current quaternion interaction implementation: it owns `angle`, `axisMix`, `isDragging`, `dragCount`, and `manualStep`, computes `derived` with `useMemo`, and returns the `<section className="spatial-drag-lab quaternion-drag-lab" ...>` UI.

- [ ] **Step 4: Create `SlamChainDragLab.tsx`**

Move the complete `function SlamChainDragLab()` from `SpatialDragLabs.tsx` into `src/components/spatial/SlamChainDragLab.tsx`.

Use this header:

```tsx
import { useMemo, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "../MathText";
import { clamp, format, pointFromPointer, type Point2D } from "./pointer";
import { slamStages } from "./stages";
```

Export the function:

```tsx
export function SlamChainDragLab()
```

The moved body is the complete current SLAM landmark implementation: it owns `landmark`, `isDragging`, `dragCount`, and `activeStep`, computes residual/readout values with `useMemo`, and returns the `<section className="spatial-drag-lab slam-drag-lab" ...>` UI.

- [ ] **Step 5: Create `ReconstructionDragLab.tsx`**

Move the complete `function ReconstructionDragLab()` from `SpatialDragLabs.tsx` into `src/components/spatial/ReconstructionDragLab.tsx`.

Use this header:

```tsx
import { useMemo, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "../MathText";
import { clamp, format, pointFromPointer, type Point2D } from "./pointer";
import { reconstructionStages } from "./stages";
```

Export the function:

```tsx
export function ReconstructionDragLab()
```

The moved body is the complete current reconstruction implementation: it owns `camera`, `baseline`, `isDragging`, `dragCount`, and `activeStep`, computes sparse/dense/readiness values with `useMemo`, and returns the `<section className="spatial-drag-lab reconstruction-drag-lab" ...>` UI.

- [ ] **Step 6: Create `SpatialPanelInteraction.tsx`**

Create `src/components/spatial/SpatialPanelInteraction.tsx` with this content:

```tsx
import { ProjectionDragLab } from "../ProjectionDragLab";
import { QuaternionDragLab } from "./QuaternionDragLab";
import { ReconstructionDragLab } from "./ReconstructionDragLab";
import { SlamChainDragLab } from "./SlamChainDragLab";

export function SpatialPanelInteraction({ panelId }: { panelId: string }) {
  if (panelId === "slam") {
    return (
      <>
        <ProjectionDragLab />
        <SlamChainDragLab />
      </>
    );
  }

  if (panelId === "reconstruction") {
    return <ReconstructionDragLab />;
  }

  if (panelId === "quaternion") {
    return <QuaternionDragLab />;
  }

  return null;
}
```

- [ ] **Step 7: Replace `SpatialDragLabs.tsx` with the compatibility export**

Replace the entire content of `src/components/SpatialDragLabs.tsx` with:

```tsx
export { SpatialPanelInteraction } from "./spatial/SpatialPanelInteraction";
```

- [ ] **Step 8: Run pointer and structure tests**

Run:

```bash
npm test -- tests/domain/spatial-pointer.test.ts tests/frontend/LearningStructure.test.ts
```

Expected: pass.

- [ ] **Step 9: Run spatial interaction behavior tests**

Run:

```bash
npm test -- tests/frontend/LearningWorkflowViews.test.tsx
```

Expected: pass, including SLAM drag count, reconstruction drag count, quaternion angle, and Manim queue assertions.

## Task 5: Full Verification And Commit

**Files:**
- All files created or modified in Tasks 1-4

- [ ] **Step 1: Run formula visibility regression**

Run:

```bash
npm test -- tests/frontend/FormulaVisibility.test.tsx
```

Expected: pass. This proves the Learn refactor did not reintroduce raw formula text.

- [ ] **Step 2: Run full test suite**

Run:

```bash
npm test
```

Expected: pass. Current baseline before this plan was 19 test files and 66 tests; this plan should add 2 test files, so expect 21 test files and more than 66 tests.

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: pass with TypeScript and Vite build success.

- [ ] **Step 4: Check whitespace**

Run:

```bash
git diff --check
```

Expected: no output.

- [ ] **Step 5: Confirm refactor impact**

Run:

```bash
wc -l src/components/LearnView.tsx src/components/SpatialDragLabs.tsx src/components/learn/*.tsx src/components/spatial/*.tsx | sort -nr | sed -n '1,30p'
```

Expected:

- `src/components/LearnView.tsx` is mostly orchestration and much smaller than the previous 631-line file.
- `src/components/SpatialDragLabs.tsx` is a one-line compatibility export.
- The largest new files are focused Learn or spatial components.

- [ ] **Step 6: Commit Phase A**

Run:

```bash
git add src/components/LearnView.tsx src/components/SpatialDragLabs.tsx src/components/learn src/components/spatial tests/frontend/LearningStructure.test.ts tests/domain/spatial-pointer.test.ts
git commit -m "refactor: split learning page structure"
```

Expected: one commit containing only Phase A source and tests.

- [ ] **Step 7: Push and verify Pages if requested**

If this work is meant to go live immediately, run:

```bash
HTTPS_PROXY=http://127.0.0.1:7890 HTTP_PROXY=http://127.0.0.1:7890 git push https://github.com/77zmf/Cyrus-Learning-Manager.git main
```

Expected: push succeeds. Then verify the GitHub Pages workflow for the pushed commit reaches `success`.
