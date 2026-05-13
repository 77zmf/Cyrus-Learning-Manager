export interface TextSegment {
  kind: "text";
  text: string;
}

export interface FormulaSegment {
  kind: "formula";
  text: string;
  latex: string;
}

export type Segment = TextSegment | FormulaSegment;

export interface FormulaMatcher {
  pattern: RegExp;
  normalize?: (match: string, captures: RegExpExecArray) => string;
}

export interface FormulaMatch {
  index: number;
  text: string;
  latex: string;
}

export const formulaMatchers: FormulaMatcher[] = [
  {
    pattern: /\$\$([^$]+?)\$\$/,
    normalize: (_match, captures) => captures[1]?.trim() ?? ""
  },
  {
    pattern:
      /(?:\\mathcal\{C\}|AB|B|A)\s*=\s*\\begin\{bmatrix\}.*?\\end\{bmatrix\}/
  },
  {
    pattern: /\\int_0\^t\s*e\^\{A\(t-\\tau\)\}Bu\(\\tau\)d\\tau/
  },
  {
    pattern: /\\mathcal\{C\}=\[B\\ AB\]/
  },
  {
    pattern: /\\dot\{[^}]+\}\s*=\s*[-+*/^_{}\\A-Za-z0-9\s()[\]]+/
  },
  {
    pattern: /x_dot\s*=\s*Ax\s*\+\s*Bu/,
    normalize: () => "\\dot{x}=Ax+Bu"
  },
  {
    pattern: /x_dot\s*=\s*ax/,
    normalize: () => "\\dot{x}=ax"
  },
  {
    pattern: /x_dot\s*=\s*f\(x,u\)/,
    normalize: () => "\\dot{x}=f(x,u)"
  },
  {
    pattern: /p_dot/,
    normalize: () => "\\dot{p}"
  },
  {
    pattern: /v_dot/,
    normalize: () => "\\dot{v}"
  },
  {
    pattern: /x_hat/,
    normalize: () => "\\hat{x}"
  },
  {
    pattern: /V_dot/,
    normalize: () => "\\dot{V}"
  },
  {
    pattern: /a=f\(u\)/
  },
  {
    pattern: /x=\[位置, 速度\]/,
    normalize: () => "x=[\\text{位置},\\text{速度}]"
  },
  {
    pattern: /C=\[B AB(?: \.\.\.)?\]/,
    normalize: (match) => (match.includes("...") ? "\\mathcal{C}=[B\\;AB\\;\\cdots]" : "\\mathcal{C}=[B\\;AB]")
  },
  {
    pattern: /O=\[C; CA; \.\.\.\]/,
    normalize: () => "\\mathcal{O}=[C;CA;\\cdots]"
  },
  {
    pattern: /y=Cx/
  },
  {
    pattern: /rank\(\\mathcal\{C\}\)\s*=\s*n/
  },
  {
    pattern: /rank\(\\mathcal\{O\}\)\s*=\s*n/
  },
  {
    pattern: /rank\(C\)\s*<\s*n/
  },
  {
    pattern: /rank\(O\)\s*<\s*n/
  },
  {
    pattern: /rank\(C\)\s*=\s*n/
  },
  {
    pattern: /rank\(O\)\s*=\s*n/
  },
  {
    pattern: /rank\(C\)\s*=\s*\d+/
  },
  {
    pattern: /rank\(\\mathcal\{C\}\)\s*=\s*\d+/
  },
  {
    pattern: /Re\(\\lambda_i\(A\)\)\s*<\s*0/
  },
  {
    pattern: /\\lambda\s*=\s*[+-]?\d+/
  },
  {
    pattern: /x_h\(t\)\s*=\s*e\^\{At\}x\(0\)/
  },
  {
    pattern: /x\(t\)\s*=\s*e\^\{\\lambda t\}x\(0\)/
  },
  {
    pattern: /x\(t\)\s*=\s*e\^\{At\}x\(0\)/
  },
  {
    pattern: /x\(t\)=e\^\{at\}x\(0\)/
  },
  {
    pattern: /e\^\{At\}x\(0\)/
  },
  {
    pattern: /e\^\{At\}/
  },
  {
    pattern: /A\^2B/
  },
  {
    pattern: /u=-R\^{-1\}B\^TPx/
  },
  {
    pattern: /u=-Kx/
  },
  {
    pattern: /u=-Lx_hat/,
    normalize: () => "u=-L\\hat{x}"
  },
  {
    pattern: /A-BK/
  },
  {
    pattern: /x_\{k\+1\}=Ax_k\+Bu_k/
  },
  {
    pattern: /K_k/
  },
  {
    pattern: /\\hat\{x\}/
  },
  {
    pattern: /V_t\(x\)/
  },
  {
    pattern: /\\dot\{V\}/
  },
  {
    pattern: /\\\|T_\{zw\}\\\|_\\infty/
  },
  {
    pattern: /\\dot\{x\}=f\(x,u\)/
  },
  {
    pattern: /A=\\frac\{\\partial f\}\{\\partial x\}/
  },
  {
    pattern: /p\(z_\{t\+1\}\|z_t,a_t\)/
  },
  {
    pattern: /p\(z_\{t\+1\}\\mid z_t,a_t\)/
  },
  {
    pattern: /z_\{t\+1\}/,
    normalize: () => "z_{t+1}"
  },
  {
    pattern: /z_t/
  },
  {
    pattern: /a_t/
  },
  {
    pattern: /s u = K\[R\|t\]X/,
    normalize: () => "s u = K[R\\mid t]X"
  },
  {
    pattern: /s\\mathbf\{u\}=K\[R\|t\]X/,
    normalize: () => "s\\mathbf{u}=K[R\\mid t]X"
  },
  {
    pattern: /s\\tilde\{u\}=K\[R\|t\]\\tilde\{X\}/,
    normalize: () => "s\\tilde{u}=K[R\\mid t]\\tilde{X}"
  },
  {
    pattern: /s\\tilde\{u\}=K\[R\\mid t\]\\tilde\{X\}/
  },
  {
    pattern: /s\\tilde\{u\}=K\[R\|t\]\\tilde\{X\}/,
    normalize: () => "s\\tilde{u}=K[R\\mid t]\\tilde{X}"
  },
  {
    pattern: /T_\{[a-zA-Z]+\\leftarrow [a-zA-Z]+\}/
  },
  {
    pattern: /T_\{w\\leftarrow c\}/
  },
  {
    pattern: /T_\{map\\leftarrow base\}/
  },
  {
    pattern: /T_\{map\\leftarrow base\}T_\{base\\leftarrow lidar\}/
  },
  {
    pattern: /\\tilde\{x\}_2\^TF\\tilde\{x\}_1=0/
  },
  {
    pattern: /E=\[t\]_\\times R/
  },
  {
    pattern: /u_\{ij\}-\\pi\(T_iX_j\)/
  },
  {
    pattern: /u_ij - pi\(T_i X_j\)/,
    normalize: () => "u_{ij}-\\pi(T_iX_j)"
  },
  {
    pattern: /\\log\(Z_\{ij\}\^-1T_i\^-1T_j\)/
  },
  {
    pattern: /i\^\*=\\arg\\max_i s\(q,i\)/
  },
  {
    pattern: /s\(q,i\)=\\frac\{v_q\^Tv_i\}\{\\lVert v_q\\rVert\\lVert v_i\\rVert\}/
  },
  {
    pattern: /r_\{loop\}=\\log\(Z_\{qi\}\^\{-1\}T_q\^\{-1\}T_i\)/
  },
  {
    pattern: /r_\{loop\}=\\log\(Z_\{qi\}\^-1T_q\^-1T_i\)/
  },
  {
    pattern: /\\mathbf\{[A-Za-z]+\}\([^)]*\)/
  },
  {
    pattern: /\\Delta t/
  },
  {
    pattern: /\\min_x\s*\\sum_k\s*\\rho\(\\lVert r_k\(x\)\\rVert\^2_\{\\Omega_k\}\)/
  },
  {
    pattern: /J\^TWJ\\Delta x=-J\^TWr/
  },
  {
    pattern: /\\hat\{C\}\(r\)/
  },
  {
    pattern: /\\Sigma'=JW\\Sigma W\^TJ\^T/
  },
  {
    pattern: /qvq\^\{-1\}/
  },
  {
    pattern:
      /[A-Za-z0-9_{}^()+\-*/=,.[\]|<>\\][A-Za-z0-9_{}^()+\-*/=,.[\]|<>\\\s]*(?:\\(?:frac|lVert|rVert|arg|max|sum|rho|Delta|Omega|leftarrow|log|theta|nabla|mathbb|mathbf|hat|min|tilde|pi|Sigma|lambda|int|cdots))[A-Za-z0-9_{}^()+\-*/=,.[\]|<>\\\s]*/
  },
  {
    pattern: /f\(x,y,z\)/
  }
];

export function splitMathText(text: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const nextMatch = findNextFormula(text, cursor);

    if (!nextMatch) {
      segments.push({ kind: "text", text: text.slice(cursor) });
      break;
    }

    if (nextMatch.index > cursor) {
      segments.push({ kind: "text", text: text.slice(cursor, nextMatch.index) });
    }

    segments.push({
      kind: "formula",
      latex: nextMatch.latex,
      text: nextMatch.text
    });
    cursor = nextMatch.index + nextMatch.text.length;
  }

  return segments.filter((segment) => segment.text.length > 0);
}

export function findNextFormula(text: string, cursor: number): FormulaMatch | null {
  let bestMatch: FormulaMatch | null = null;
  const searchText = text.slice(cursor);

  for (const matcher of formulaMatchers) {
    const match = matcher.pattern.exec(searchText);

    if (!match?.[0]) {
      continue;
    }

    const matchText = trimFormulaMatch(match[0]);
    const index = cursor + match.index;
    const latex = matcher.normalize ? matcher.normalize(matchText, match) : matchText;

    if (
      !bestMatch ||
      index < bestMatch.index ||
      (index === bestMatch.index && matchText.length > bestMatch.text.length)
    ) {
      bestMatch = { index, latex, text: matchText };
    }
  }

  return bestMatch;
}

export function trimFormulaMatch(match: string) {
  return match.trim().replace(/[，。；,.;:]+$/, "").trim();
}
