import { useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "../MathText";
import { clamp, format, pointFromPointer, type Point2D } from "./pointer";
import { slamStages } from "./stages";

export function SlamChainDragLab() {
  const [landmark, setLandmark] = useState<Point2D>({ x: 0.62, y: 0.36 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const isDraggingRef = useRef(false);

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
    isDraggingRef.current = true;
    setIsDragging(true);
    setLandmark(nextPoint);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    setLandmark(pointFromPointer(event, landmark));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    isDraggingRef.current = false;
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
