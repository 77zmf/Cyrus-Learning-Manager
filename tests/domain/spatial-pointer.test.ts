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
