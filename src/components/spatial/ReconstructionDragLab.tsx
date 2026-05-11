import { useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "../MathText";
import { clamp, format, pointFromPointer, type Point2D } from "./pointer";
import { reconstructionStages } from "./stages";

export function ReconstructionDragLab() {
  const [camera, setCamera] = useState<Point2D>({ x: 0.58, y: 0.45 });
  const [baseline, setBaseline] = useState(1.6);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const isDraggingRef = useRef(false);

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
    isDraggingRef.current = true;
    setIsDragging(true);
    setCamera(nextPoint);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    setCamera(pointFromPointer(event, camera));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    isDraggingRef.current = false;
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
