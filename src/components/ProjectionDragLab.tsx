import { useMemo, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { InlineFormula } from "./MathText";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const intrinsics = {
  fx: 160,
  fy: 160,
  cx: 160,
  cy: 105,
  width: 320,
  height: 210
};

const pipelineSteps = [
  {
    label: "World point",
    formula: "P_w=(X,Y,Z)",
    note: "你拖动的是三维世界里的一个点，先看它相对相机在左/右/上/下。"
  },
  {
    label: "Camera frame",
    formula: "P_c=T_{cw}P_w",
    note: "如果相机位姿变了，世界点会先被换到相机坐标系。这个实验把相机固定。"
  },
  {
    label: "Normalized plane",
    formula: "x_n=X/Z,\\ y_n=Y/Z",
    note: "除以深度 Z 后，近处的点移动一点，投影会变化更大。"
  },
  {
    label: "Pixel projection",
    formula: "u=f_xX/Z+c_x",
    note: "相机内参 K 把归一化坐标放大并平移到像素平面。"
  },
  {
    label: "Reprojection error",
    formula: "e=u_{obs}-\\pi(P_w)",
    note: "SLAM 后端常常最小化真实像素和预测像素之间的误差。"
  }
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function format(value: number) {
  return value.toFixed(2);
}

function formatPixel(value: number) {
  return Math.round(value).toString();
}

export function ProjectionDragLab() {
  const [point, setPoint] = useState<Point3D>({ x: 0.8, y: 0.45, z: 4.2 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const projection = useMemo(() => {
    const normalizedX = point.x / point.z;
    const normalizedY = point.y / point.z;
    const u = intrinsics.cx + intrinsics.fx * normalizedX;
    const v = intrinsics.cy - intrinsics.fy * normalizedY;

    return {
      normalizedX,
      normalizedY,
      u,
      v,
      screenX: clamp((u / intrinsics.width) * 100, 4, 96),
      screenY: clamp((v / intrinsics.height) * 100, 4, 96),
      stageX: clamp(((point.x + 2) / 4) * 100, 5, 95),
      stageY: clamp(((1.35 - point.y) / 2.7) * 100, 5, 95)
    };
  }, [point]);

  const currentStep = pipelineSteps[activeStep];

  function pointFromPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width || 360;
    const height = rect.height || 240;
    const left = rect.width ? rect.left : 0;
    const top = rect.height ? rect.top : 0;
    const pctX = clamp((event.clientX - left) / width, 0, 1);
    const pctY = clamp((event.clientY - top) / height, 0, 1);

    return {
      x: pctX * 4 - 2,
      y: (0.5 - pctY) * 2.7,
      z: point.z
    };
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    setPoint(pointFromPointer(event));
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setPoint(pointFromPointer(event));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
    setDragCount((current) => current + 1);
    setActiveStep((current) => (current + 1) % pipelineSteps.length);
  }

  function adjustPoint(deltaX: number, deltaY: number) {
    setPoint((current) => ({
      ...current,
      x: clamp(current.x + deltaX, -2, 2),
      y: clamp(current.y + deltaY, -1.35, 1.35)
    }));
    setDragCount((current) => current + 1);
    setActiveStep((current) => (current + 1) % pipelineSteps.length);
  }

  return (
    <section className="projection-drag-lab" aria-label="3D point projection drag lab">
      <div className="projection-lab-heading">
        <span>Drag Projection Lab</span>
        <h3>拖动三维点，看它如何投影到像素</h3>
        <p>
          左侧拖动 3D 点。右侧图像平面会同步显示像素点，下面的步骤会随着每次拖动轮换，帮你把几何链条拆开看。
        </p>
      </div>

      <div className="projection-lab-grid">
        <div
          aria-label="Drag 3D point projection lab"
          className={`projection-world ${isDragging ? "is-dragging" : ""}`}
          role="application"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") adjustPoint(-0.12, 0);
            if (event.key === "ArrowRight") adjustPoint(0.12, 0);
            if (event.key === "ArrowUp") adjustPoint(0, 0.12);
            if (event.key === "ArrowDown") adjustPoint(0, -0.12);
          }}
          onPointerCancel={finishDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          style={
            {
              "--point-x": `${projection.stageX}%`,
              "--point-y": `${projection.stageY}%`
            } as CSSProperties
          }
        >
          <span className="camera-marker">Camera</span>
          <span className="world-axis axis-x">X</span>
          <span className="world-axis axis-y">Y</span>
          <span className="world-depth">Z depth: {format(point.z)} m</span>
          <span className="projection-ray" />
          <span className="draggable-point" aria-hidden="true" />
        </div>

        <div
          className="projection-image-plane"
          aria-label="Projected image plane"
          style={
            {
              "--pixel-x": `${projection.screenX}%`,
              "--pixel-y": `${projection.screenY}%`
            } as CSSProperties
          }
        >
          <span className="image-plane-title">Image plane</span>
          <span className="pixel-axis pixel-u">u</span>
          <span className="pixel-axis pixel-v">v</span>
          <span className="projected-pixel" />
          <span className="pixel-readout">
            u={formatPixel(projection.u)}, v={formatPixel(projection.v)}
          </span>
        </div>
      </div>

      <div className="projection-control-row">
        <label>
          Depth Z
          <input
            aria-label="Projection depth Z"
            max="7"
            min="2.2"
            step="0.1"
            type="range"
            value={point.z}
            onChange={(event) => {
              setPoint((current) => ({ ...current, z: Number(event.target.value) }));
              setActiveStep(2);
            }}
          />
        </label>
        <div className="projection-equation" aria-label="Projection equation">
          <InlineFormula latex="u=f_xX/Z+c_x,\quad v=f_yY/Z+c_y" label="3D to 2D projection" />
        </div>
      </div>

      <div className="projection-readout-grid">
        <article>
          <span>3D point</span>
          <strong>
            X={format(point.x)}, Y={format(point.y)}, Z={format(point.z)}
          </strong>
        </article>
        <article>
          <span>Normalized</span>
          <strong>
            x={format(projection.normalizedX)}, y={format(projection.normalizedY)}
          </strong>
        </article>
        <article>
          <span>Pixel</span>
          <strong>
            u={formatPixel(projection.u)}, v={formatPixel(projection.v)}
          </strong>
        </article>
      </div>

      <div className="projection-step-strip" aria-label="Projection pipeline">
        {pipelineSteps.map((step, index) => (
          <button
            aria-label={`Show projection step ${step.label}`}
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
        <span>Drag count: {dragCount}</span>
        <h3>{currentStep.label}</h3>
        <InlineFormula latex={currentStep.formula} label={currentStep.label} />
        <p>{currentStep.note}</p>
      </article>
    </section>
  );
}
