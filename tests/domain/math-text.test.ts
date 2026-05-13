import { describe, expect, it } from "vitest";
import { findNextFormula, splitMathText, trimFormulaMatch } from "../../src/domain/math-text";

describe("math text parsing", () => {
  it("normalizes beginner state-space shorthand into renderable latex", () => {
    expect(splitMathText("系统写成 x_dot=Ax+Bu。")).toEqual([
      { kind: "text", text: "系统写成 " },
      { kind: "formula", text: "x_dot=Ax+Bu", latex: "\\dot{x}=Ax+Bu" },
      { kind: "text", text: "。" }
    ]);
  });

  it("detects projection and transform formulas used by SLAM and 3D reconstruction lessons", () => {
    expect(findNextFormula("投影模型 s\\tilde{u}=K[R|t]\\tilde{X}", 0)).toEqual({
      index: 5,
      text: "s\\tilde{u}=K[R|t]\\tilde{X}",
      latex: "s\\tilde{u}=K[R\\mid t]\\tilde{X}"
    });

    expect(findNextFormula("坐标链 T_{map\\leftarrow base}T_{base\\leftarrow lidar}", 0)).toEqual({
      index: 4,
      text: "T_{map\\leftarrow base}",
      latex: "T_{map\\leftarrow base}"
    });
  });

  it("detects quaternion and reconstruction formulas without leaking display syntax", () => {
    expect(findNextFormula("旋转可写成 qvq^{-1}", 0)).toEqual({
      index: 6,
      text: "qvq^{-1}",
      latex: "qvq^{-1}"
    });

    expect(splitMathText("协方差投影 $$\\Sigma'=JW\\Sigma W^TJ^T$$")).toEqual([
      { kind: "text", text: "协方差投影 " },
      {
        kind: "formula",
        text: "$$\\Sigma'=JW\\Sigma W^TJ^T$$",
        latex: "\\Sigma'=JW\\Sigma W^TJ^T"
      }
    ]);
  });

  it("detects factor-graph optimizer formulas from study templates", () => {
    expect(findNextFormula("\\min_x \\sum_k \\rho(\\lVert r_k(x)\\rVert^2_{\\Omega_k})", 0)).toEqual({
      index: 0,
      text: "\\min_x \\sum_k \\rho(\\lVert r_k(x)\\rVert^2_{\\Omega_k})",
      latex: "\\min_x \\sum_k \\rho(\\lVert r_k(x)\\rVert^2_{\\Omega_k})"
    });

    expect(findNextFormula("更新 J^TWJ\\Delta x=-J^TWr", 0)).toEqual({
      index: 3,
      text: "J^TWJ\\Delta x=-J^TWr",
      latex: "J^TWJ\\Delta x=-J^TWr"
    });
  });

  it("keeps ordinary Chinese text unchanged", () => {
    expect(splitMathText("先看图，再写一句自己的解释。")).toEqual([
      { kind: "text", text: "先看图，再写一句自己的解释。" }
    ]);
  });

  it("trims punctuation around formula matches", () => {
    expect(trimFormulaMatch("x_dot=Ax+Bu，")).toBe("x_dot=Ax+Bu");
  });
});
