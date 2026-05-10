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

const quaternionStages: StageCopy[] = [
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

  if (panelId === "quaternion") {
    return <QuaternionDragLab />;
  }

  return null;
}

function QuaternionDragLab() {
  const [angle, setAngle] = useState(72);
  const [axisMix, setAxisMix] = useState(0.58);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [manualStep, setManualStep] = useState<number | null>(null);

  const derived = useMemo(() => {
    const radians = (angle * Math.PI) / 180;
    const half = radians / 2;
    const vectorScale = Math.sin(half);
    const scalar = Math.cos(half);
    const axisX = clamp(1 - axisMix * 0.64, 0.18, 0.88);
    const axisZ = clamp(axisMix, 0.12, 0.92);
    const projectedX = 50 + Math.cos(radians) * 26;
    const projectedY = 50 - Math.sin(radians) * 20;

    return {
      activeStep: manualStep ?? Math.min(quaternionStages.length - 1, Math.floor(angle / 72)),
      antipodeX: 100 - projectedX,
      antipodeY: 100 - projectedY,
      axisX,
      axisZ,
      halfDegrees: angle / 2,
      projectedX,
      projectedY,
      scalar,
      vectorScale
    };
  }, [angle, axisMix, manualStep]);

  const currentStep = quaternionStages[derived.activeStep];

  function setAngleFromPointer(event: PointerEvent<HTMLDivElement>) {
    const point = pointFromPointer(event, { x: angle / 360, y: 0.5 });
    setAngle(Math.round(point.x * 360));
    setManualStep(null);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    setAngleFromPointer(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setAngleFromPointer(event);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
    setDragCount((current) => current + 1);
  }

  return (
    <section className="spatial-drag-lab quaternion-drag-lab" aria-label="Quaternion drag interaction lab">
      <div className="projection-lab-heading">
        <span>Quaternion Visual Chain</span>
        <h3>拖动四元数角度，看三维姿态如何旋转</h3>
        <p>拖动圆盘或滑动角度，观察半角、q / -q 对跖点、旋转轴和 v'=qvq^-1 如何同步变化。</p>
      </div>

      <div className="quaternion-lab-grid">
        <div
          aria-label="Drag quaternion rotation lab"
          className={`quaternion-stage ${isDragging ? "is-dragging" : ""}`}
          role="application"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              setAngle((current) => clamp(current - 5, 0, 360));
              setManualStep(null);
            }
            if (event.key === "ArrowRight") {
              setAngle((current) => clamp(current + 5, 0, 360));
              setManualStep(null);
            }
          }}
          onPointerCancel={finishDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          style={
            {
              "--quat-angle": `${angle}deg`,
              "--quat-x": `${derived.projectedX}%`,
              "--quat-y": `${derived.projectedY}%`,
              "--quat-antipode-x": `${derived.antipodeX}%`,
              "--quat-antipode-y": `${derived.antipodeY}%`,
              "--axis-x": `${derived.axisX * 100}%`,
              "--axis-z": `${derived.axisZ * 100}%`
            } as CSSProperties
          }
        >
          <span className="mini-label map-label">unit quaternion sphere</span>
          <span className="quat-sphere" />
          <span className="quat-equator" />
          <span className="quat-axis-line" />
          <span className="quat-vector-line" />
          <span className="quat-point q">q</span>
          <span className="quat-point minus-q">-q</span>
          <span className="quat-vector-tip">v'</span>
          <span className="quat-half-angle">theta/2</span>
        </div>

        <div className="quaternion-readout">
          <article>
            <span>Quaternion angle: {angle}°</span>
            <strong>half-angle {format(derived.halfDegrees)}°</strong>
          </article>
          <article>
            <span>scalar part</span>
            <strong>w={format(derived.scalar)}</strong>
          </article>
          <article>
            <span>vector part</span>
            <strong>sin(theta/2)={format(derived.vectorScale)}</strong>
          </article>
          <article>
            <span>axis mix</span>
            <strong>
              ux={format(1 - axisMix * 0.64)}, uz={format(axisMix)}
            </strong>
          </article>
        </div>
      </div>

      <div className="projection-control-row">
        <label>
          Angle
          <input
            aria-label="Quaternion rotation angle"
            max="360"
            min="0"
            step="1"
            type="range"
            value={angle}
            onChange={(event) => {
              setAngle(Number(event.target.value));
              setManualStep(null);
            }}
          />
        </label>
        <label>
          Axis
          <input
            aria-label="Quaternion rotation axis mix"
            max="0.92"
            min="0.12"
            step="0.01"
            type="range"
            value={axisMix}
            onChange={(event) => setAxisMix(Number(event.target.value))}
          />
        </label>
        <div className="projection-equation" aria-label="Quaternion equation">
          <InlineFormula latex="q=\\cos(\\theta/2)+\\mathbf{u}\\sin(\\theta/2)" label="quaternion axis angle relation" />
        </div>
      </div>

      <div className="projection-step-strip" aria-label="Quaternion visual pipeline">
        {quaternionStages.map((step, index) => (
          <button
            aria-label={`Show quaternion visual stage ${step.label}`}
            aria-pressed={index === derived.activeStep}
            className={index === derived.activeStep ? "active" : undefined}
            key={step.label}
            type="button"
            onClick={() => setManualStep(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step.label}
          </button>
        ))}
      </div>

      <article className="projection-step-card" aria-live="polite">
        <span>Quaternion drag count: {dragCount}</span>
        <h3>{currentStep.label}</h3>
        <InlineFormula latex={currentStep.formula} label={currentStep.label} />
        <p>{currentStep.note}</p>
      </article>
    </section>
  );
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
