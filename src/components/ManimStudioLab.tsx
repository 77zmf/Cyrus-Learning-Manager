import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { manimStudioPanels } from "../domain/manim-studio-content";
import { FormulaVisual } from "./FormulaVisual";
import { ManimStudio } from "./ManimStudio";
import { MathText } from "./MathText";
import { InlineFormula } from "./MathText";
import { SpatialPanelInteraction } from "./SpatialDragLabs";

type ActiveStageMap = Record<string, string>;

const initialStageMap = manimStudioPanels.reduce<ActiveStageMap>((acc, panel) => {
  acc[panel.id] = panel.stages[0]?.id ?? "";
  return acc;
}, {});

export function ManimStudioLab() {
  const [activePanelId, setActivePanelId] = useState(manimStudioPanels[0].id);
  const [activeStages, setActiveStages] = useState<ActiveStageMap>(initialStageMap);
  const [scrub, setScrub] = useState(42);
  const activePanel = useMemo(
    () => manimStudioPanels.find((panel) => panel.id === activePanelId) ?? manimStudioPanels[0],
    [activePanelId]
  );
  const activeStageId = activeStages[activePanel.id] ?? activePanel.stages[0]?.id;
  const activeStage = activePanel.stages.find((stage) => stage.id === activeStageId) ?? activePanel.stages[0];

  return (
    <section className="panel manim-studio-panel" id="section-manim-studio">
      <div className="section-heading">
        <h2>Manim Studio</h2>
        <p>
          把 SLAM、三维重建和空间智能做成像交互式数学动画一样的学习区：你先拖动和滑动理解，再用 Manim
          渲染成可复盘视频，最后写进 GoodNotes。
        </p>
      </div>

      <div className="manim-reference-strip">
        <a href="https://eater.net/quaternions" rel="noreferrer" target="_blank">
          Quaternion explorable reference
        </a>
        <span>参考它的思路：拖动对象、看状态连续变化、每一步都能暂停解释。</span>
      </div>

      <nav aria-label="Manim studio topics" className="manim-topic-tabs">
        {manimStudioPanels.map((panel) => (
          <button
            aria-label={`打开 ${panel.title}`}
            aria-pressed={panel.id === activePanel.id}
            className={panel.id === activePanel.id ? "active" : undefined}
            key={panel.id}
            type="button"
            onClick={() => {
              setActivePanelId(panel.id);
              setScrub(42);
            }}
          >
            <span>{panel.kicker}</span>
            <strong>{panel.title}</strong>
          </button>
        ))}
      </nav>

      <div className="manim-studio-shell">
        <article className="manim-explorable-focus">
          <div className="spatial-focus-copy">
            <span>{activePanel.kicker}</span>
            <h3>{activePanel.title}</h3>
            <p>
              <MathText text={activePanel.summary} />
            </p>
          </div>
          <ManimExplorablePreview panelId={activePanel.id} stageLabel={activeStage.label} scrub={scrub} setScrub={setScrub} />
          <FormulaVisual label={activePanel.title} latex={activePanel.formula} terms={activePanel.formulaTerms} />
        </article>

        <div className="spatial-stage-strip" aria-label={`${activePanel.title} stages`}>
          {activePanel.stages.map((stage) => (
            <button
              aria-label={`查看 ${stage.label}`}
              aria-pressed={stage.id === activeStage.id}
              className={stage.id === activeStage.id ? "active" : undefined}
              key={stage.id}
              type="button"
              onClick={() =>
                setActiveStages((current) => ({
                  ...current,
                  [activePanel.id]: stage.id
                }))
              }
            >
              <span>{stage.label}</span>
              <em>{stage.beginnerQuestion}</em>
            </button>
          ))}
        </div>

        <article className="spatial-stage-detail" aria-live="polite">
          <span>当前动画段落</span>
          <h3>{activeStage.label}</h3>
          <strong>
            <MathText text={activeStage.beginnerQuestion} />
          </strong>
          <p>
            <MathText text={activeStage.explanation} />
          </p>
          <dl className="compact-dl">
            <div>
              <dt>GoodNotes</dt>
              <dd>{activeStage.goodNotes}</dd>
            </div>
            <div>
              <dt>Obsidian</dt>
              <dd>{activeStage.obsidian}</dd>
            </div>
            <div>
              <dt>Notion</dt>
              <dd>{activeStage.notion}</dd>
            </div>
          </dl>
        </article>

        <SpatialPanelInteraction panelId={activePanel.id} />
        <ManimStudio panelId={activePanel.id} />

        <div className="spatial-source-row" aria-label={`${activePanel.title} sources`}>
          {activePanel.sourceLinks.map((source) => (
            <a href={source.url} key={source.label} rel="noreferrer" target="_blank">
              <strong>{source.label}</strong>
              <span>{source.note}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManimExplorablePreview({
  panelId,
  stageLabel,
  scrub,
  setScrub
}: {
  panelId: string;
  stageLabel: string;
  scrub: number;
  setScrub: (value: number) => void;
}) {
  const normalized = scrub / 100;
  const caption =
    panelId === "slam"
      ? "点从世界坐标穿过相机，落到 image plane。拖动下方时间轴，看投影线如何移动。"
      : panelId === "reconstruction"
        ? "相机基线越清楚，稀疏点越能长成稠密点，再进入 3DGS 渲染资产。"
        : panelId === "quaternion"
          ? "把单位四元数看成 4D 球面上的点。滑动时间轴时，q 和 -q 同步变化，但代表同一个姿态。"
          : "空间智能把观测变成三维世界，再让策略基于世界状态行动。";
  const formula =
    panelId === "slam"
      ? "u=f_xX/Z+c_x"
      : panelId === "reconstruction"
        ? "depth\\propto baseline/disparity"
        : panelId === "quaternion"
          ? "q=\\cos(\\theta/2)+\\mathbf{u}\\sin(\\theta/2)"
          : "a_t=\\pi(o_t,\\hat W_{3D})";

  return (
    <div
      className={`manim-explorable-preview ${panelId}`}
      style={{ "--scrub": normalized } as CSSProperties}
    >
      <div className="manim-preview-stage" role="application" aria-label="Manim explorable preview">
        <span className="manim-axis horizontal" />
        <span className="manim-axis vertical" />
        <span className="manim-camera">K</span>
        <span className="manim-world-point">X</span>
        <span className="manim-ray primary" />
        <span className="manim-ray secondary" />
        <span className="manim-plane" />
        <span className="manim-pixel">u</span>
        <span className="manim-pose p0">T0</span>
        <span className="manim-pose p1">T1</span>
        <span className="manim-pose p2">T2</span>
        <span className="manim-cloud c1" />
        <span className="manim-cloud c2" />
        <span className="manim-cloud c3" />
        <span className="manim-quat-sphere" />
        <span className="manim-quat-equator" />
        <span className="manim-quat-point">q</span>
        <span className="manim-quat-point antipode">-q</span>
        <span className="manim-quat-vector">v</span>
        <span className="manim-quat-arc" />
      </div>
      <div className="manim-preview-copy">
        <span>{stageLabel}</span>
        <strong>{caption}</strong>
        <InlineFormula latex={formula} label={`${panelId} explorable formula`} />
        <label>
          Manim animation scrubber
          <input
            aria-label="Manim animation scrubber"
            max="100"
            min="0"
            type="range"
            value={scrub}
            onChange={(event) => setScrub(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
