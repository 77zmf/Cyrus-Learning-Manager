import { useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "../MathText";
import { clamp, format, pointFromPointer } from "./pointer";
import { quaternionStages } from "./stages";

export function QuaternionDragLab() {
  const [angle, setAngle] = useState(72);
  const [axisMix, setAxisMix] = useState(0.58);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [manualStep, setManualStep] = useState<number | null>(null);
  const isDraggingRef = useRef(false);

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
    isDraggingRef.current = true;
    setIsDragging(true);
    setAngleFromPointer(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    setAngleFromPointer(event);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    isDraggingRef.current = false;
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
