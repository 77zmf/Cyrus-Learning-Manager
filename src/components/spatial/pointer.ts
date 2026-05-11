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
