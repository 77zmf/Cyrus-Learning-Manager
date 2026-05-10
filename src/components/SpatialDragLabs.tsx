import { useMemo, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "./MathText";
import { ProjectionDragLab } from "./ProjectionDragLab";

interface StageCopy {
  label: string;
  formula: string;
  note: string;
}

interface Point2D {
  x: number;
  y: number;
}

const slamStages: StageCopy[] = [
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

const reconstructionStages: StageCopy[] = [
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function format(value: number) {
  return value.toFixed(2);
}

function pointFromPointer(event: PointerEvent<HTMLDivElement>, previous: Point2D) {
  const rect = event.currentTarget.getBoundingClientRect();
  const width = rect.width || 420;
  const height = rect.height || 260;
  const left = rect.width ? rect.left : 0;
  const top = rect.height ? rect.top : 0;
  const pctX = clamp((event.clientX - left) / width, 0, 1);
  const pctY = clamp((event.clientY - top) / height, 0, 1);

  return {
    x: Number.isFinite(pctX) ? pctX : previous.x,
    y: Number.isFinite(pctY) ? pctY : previous.y
  };
}

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

  return null;
}

function SlamChainDragLab() {
  const [landmark, setLandmark] = useState<Point2D>({ x: 0.62, y: 0.36 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const derived = useMemo(() => {
    const residual = Math.hypot(landmark.x - 0.5, landmark.y - 0.48) * 8.4;
    const imageAX = clamp(landmark.x * 72 + 12, 8, 92);
    const imageAY = clamp(landmark.y * 60 + 18, 8, 92);
    const imageBX = clamp(landmark.x * 66 + 18, 8, 92);
    const imageBY = clamp(landmark.y * 54 + 23, 8, 92);

    return {
      residual,
      imageAX,
      imageAY,
      imageBX,
      imageBY,
      loopTension: clamp(100 - residual * 12, 18, 98)
    };
  }, [landmark]);

  const currentStep = slamStages[activeStep];

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const nextPoint = pointFromPointer(event, landmark);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    setLandmark(nextPoint);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setLandmark(pointFromPointer(event, landmark));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
    setDragCount((current) => current + 1);
    setActiveStep((current) => (current + 1) % slamStages.length);
  }

  return (
    <section className="spatial-drag-lab slam-drag-lab" aria-label="SLAM drag interaction lab">
      <div className="projection-lab-heading">
        <span>SLAM Visual Chain</span>
        <h3>拖动 SLAM 地标，看位姿链如何收紧</h3>
        <p>拖动地图里的地标点，观察左右相机观测、残差大小和当前学习阶段如何同步变化。</p>
      </div>

      <div className="spatial-visual-grid">
        <div
          aria-label="Drag SLAM landmark lab"
          className={`slam-map-stage ${isDragging ? "is-dragging" : ""}`}
          role="application"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setLandmark((current) => ({ ...current, x: clamp(current.x - 0.04, 0.08, 0.92) }));
            if (event.key === "ArrowRight") setLandmark((current) => ({ ...current, x: clamp(current.x + 0.04, 0.08, 0.92) }));
            if (event.key === "ArrowUp") setLandmark((current) => ({ ...current, y: clamp(current.y - 0.04, 0.08, 0.92) }));
            if (event.key === "ArrowDown") setLandmark((current) => ({ ...current, y: clamp(current.y + 0.04, 0.08, 0.92) }));
          }}
          onPointerCancel={finishDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          style={
            {
              "--landmark-x": `${landmark.x * 100}%`,
              "--landmark-y": `${landmark.y * 100}%`,
              "--loop-tension": `${derived.loopTension}%`
            } as CSSProperties
          }
        >
          <span className="mini-label map-label">map frame</span>
          <span className="pose-node pose-start">T0</span>
          <span className="pose-node pose-mid">T1</span>
          <span className="pose-node pose-current">Tk</span>
          <span className="trajectory-line line-a" />
          <span className="trajectory-line line-b" />
          <span className="loop-constraint" />
          <span className="slam-landmark" />
          <span className="slam-observation obs-a" />
          <span className="slam-observation obs-b" />
        </div>

        <div className="slam-observation-panel" aria-label="SLAM observation image A">
          <span className="mini-label">image A</span>
          <span
            className="image-feature"
            style={{ left: `${derived.imageAX}%`, top: `${derived.imageAY}%` }}
          />
          <span className="epipolar-line" />
        </div>

        <div className="slam-observation-panel" aria-label="SLAM observation image B">
          <span className="mini-label">image B</span>
          <span
            className="image-feature"
            style={{ left: `${derived.imageBX}%`, top: `${derived.imageBY}%` }}
          />
          <span className="epipolar-line shifted" />
        </div>
      </div>

      <div className="projection-readout-grid">
        <article>
          <span>landmark</span>
          <strong>
            X={format(landmark.x)}, Y={format(landmark.y)}
          </strong>
        </article>
        <article>
          <span>reprojection residual</span>
          <strong>{format(derived.residual)} px</strong>
        </article>
        <article>
          <span>loop tension</span>
          <strong>{Math.round(derived.loopTension)}%</strong>
        </article>
      </div>

      <div className="projection-step-strip" aria-label="SLAM visual pipeline">
        {slamStages.map((step, index) => (
          <button
            aria-label={`Show SLAM visual stage ${step.label}`}
            aria-pressed={index === activeStep}
            className={index === activeStep ? "active" : undefined}
            key={step.label}
            type="button"
            onClick={() => setActiveStep(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step.label}
          </button>
        ))}
      </div>

      <article className="projection-step-card" aria-live="polite">
        <span>SLAM drag count: {dragCount}</span>
        <h3>{currentStep.label}</h3>
        <InlineFormula latex={currentStep.formula} label={currentStep.label} />
        <p>{currentStep.note}</p>
      </article>
    </section>
  );
}

function ReconstructionDragLab() {
  const [camera, setCamera] = useState<Point2D>({ x: 0.58, y: 0.45 });
  const [baseline, setBaseline] = useState(1.6);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const derived = useMemo(() => {
    const sparsePoints = Math.round(32 + baseline * 18 + camera.x * 24);
    const densePoints = Math.round(sparsePoints * (1.7 + camera.y));
    const assetScore = clamp((baseline / 3.2) * 70 + (1 - Math.abs(camera.y - 0.48)) * 28, 32, 98);

    return {
      sparsePoints,
      densePoints,
      assetScore,
      cameraLeft: clamp(camera.x * 100, 12, 88),
      cameraTop: clamp(camera.y * 100, 16, 84),
      baselineWidth: clamp(baseline * 18, 28, 68)
    };
  }, [baseline, camera]);

  const currentStep = reconstructionStages[activeStep];
  const splats = Array.from({ length: 18 }, (_, index) => {
    const x = 20 + ((index * 17 + Math.round(baseline * 11)) % 58);
    const y = 22 + ((index * 23 + Math.round(camera.y * 40)) % 48);
    return { x, y };
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const nextPoint = pointFromPointer(event, camera);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    setCamera(nextPoint);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setCamera(pointFromPointer(event, camera));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
    setDragCount((current) => current + 1);
    setActiveStep((current) => (current + 1) % reconstructionStages.length);
  }

  return (
    <section className="spatial-drag-lab reconstruction-drag-lab" aria-label="3D reconstruction drag interaction lab">
      <div className="projection-lab-heading">
        <span>Reconstruction Visual Chain</span>
        <h3>拖动相机基线，看三维重建如何变密</h3>
        <p>拖动相机视角，调节 baseline，观察稀疏点、稠密点、可渲染高斯和验证资产评分的变化。</p>
      </div>

      <div
        aria-label="Drag reconstruction camera rig"
        className={`reconstruction-stage ${isDragging ? "is-dragging" : ""}`}
        role="application"
        tabIndex={0}
        onPointerCancel={finishDrag}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        style={
          {
            "--camera-left": `${derived.cameraLeft}%`,
            "--camera-top": `${derived.cameraTop}%`,
            "--baseline-width": `${derived.baselineWidth}%`
          } as CSSProperties
        }
      >
        <span className="mini-label map-label">capture rig</span>
        <span className="recon-object">object</span>
        <span className="camera-pose camera-primary">C1</span>
        <span className="camera-pose camera-secondary">C2</span>
        <span className="baseline-bar" />
        <span className="ray ray-left" />
        <span className="ray ray-right" />
        {splats.map((splat, index) => (
          <span
            aria-hidden="true"
            className={index % 3 === 0 ? "recon-splat large" : "recon-splat"}
            key={`${splat.x}-${splat.y}-${index}`}
            style={{ left: `${splat.x}%`, top: `${splat.y}%` }}
          />
        ))}
      </div>

      <div className="projection-control-row">
        <label>
          Baseline
          <input
            aria-label="Reconstruction baseline"
            max="3.2"
            min="0.6"
            step="0.1"
            type="range"
            value={baseline}
            onChange={(event) => {
              setBaseline(Number(event.target.value));
              setActiveStep(2);
            }}
          />
        </label>
        <div className="projection-equation" aria-label="Reconstruction equation">
          <InlineFormula latex="depth\\propto f\\cdot baseline / disparity" label="baseline depth relation" />
        </div>
      </div>

      <div className="projection-readout-grid">
        <article>
          <span>baseline</span>
          <strong>{format(baseline)} m</strong>
        </article>
        <article>
          <span>sparse / dense</span>
          <strong>
            {derived.sparsePoints} / {derived.densePoints}
          </strong>
        </article>
        <article>
          <span>asset readiness</span>
          <strong>{Math.round(derived.assetScore)}%</strong>
        </article>
      </div>

      <div className="projection-step-strip" aria-label="Reconstruction visual pipeline">
        {reconstructionStages.map((step, index) => (
          <button
            aria-label={`Show reconstruction visual stage ${step.label}`}
            aria-pressed={index === activeStep}
            className={index === activeStep ? "active" : undefined}
            key={step.label}
            type="button"
            onClick={() => setActiveStep(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step.label}
          </button>
        ))}
      </div>

      <article className="projection-step-card" aria-live="polite">
        <span>Reconstruction drag count: {dragCount}</span>
        <h3>{currentStep.label}</h3>
        <InlineFormula latex={currentStep.formula} label={currentStep.label} />
        <p>{currentStep.note}</p>
      </article>
    </section>
  );
}
