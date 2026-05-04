import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

interface InlineFormulaProps {
  latex: string;
  label?: string;
}

interface MathTextProps {
  text: string;
}

interface TextSegment {
  kind: "text";
  text: string;
}

interface FormulaSegment {
  kind: "formula";
  text: string;
  latex: string;
}

type Segment = TextSegment | FormulaSegment;

interface FormulaMatcher {
  pattern: RegExp;
  normalize?: (match: string) => string;
}

const formulaMatchers: FormulaMatcher[] = [
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
    pattern: /C=\[B AB(?: \.\.\.)?\]/,
    normalize: (match) => (match.includes("...") ? "\\mathcal{C}=[B\\;AB\\;\\cdots]" : "\\mathcal{C}=[B\\;AB]")
  },
  {
    pattern: /rank\(\\mathcal\{C\}\)\s*=\s*n/
  },
  {
    pattern: /rank\(C\)\s*<\s*n/
  },
  {
    pattern: /rank\(C\)\s*=\s*n/
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
    pattern: /p\(z_\{t\+1\}\|z_t,a_t\)/
  },
  {
    pattern: /s u = K\[R\|t\]X/,
    normalize: () => "s u = K[R\\mid t]X"
  },
  {
    pattern: /f\(x,y,z\)/
  }
];

export function InlineFormula({ latex, label }: InlineFormulaProps) {
  const renderedFormula = useMemo(
    () =>
      katex.renderToString(latex, {
        displayMode: false,
        strict: false,
        throwOnError: false,
        trust: false
      }),
    [latex]
  );

  return (
    <span
      aria-label={label ? `Formula: ${label}` : `Formula: ${latex}`}
      className="math-inline"
      dangerouslySetInnerHTML={{ __html: renderedFormula }}
    />
  );
}

export function MathText({ text }: MathTextProps) {
  const segments = useMemo(() => splitMathText(text), [text]);

  return (
    <>
      {segments.map((segment, index) =>
        segment.kind === "formula" ? (
          <InlineFormula key={`${segment.text}-${index}`} label={segment.text} latex={segment.latex} />
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        )
      )}
    </>
  );
}

export function MathLines({ lines }: { lines: string[] }) {
  return (
    <div className="math-line-stack">
      {lines.map((line) => (
        <p key={line}>
          <MathText text={line} />
        </p>
      ))}
    </div>
  );
}

function splitMathText(text: string): Segment[] {
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

function findNextFormula(text: string, cursor: number) {
  let bestMatch: { index: number; text: string; latex: string } | null = null;
  const searchText = text.slice(cursor);

  for (const matcher of formulaMatchers) {
    const match = matcher.pattern.exec(searchText);

    if (!match?.[0]) {
      continue;
    }

    const matchText = trimFormulaMatch(match[0]);
    const index = cursor + match.index;
    const latex = matcher.normalize ? matcher.normalize(matchText) : matchText;

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

function trimFormulaMatch(match: string) {
  return match.trim().replace(/[，。；,.;:]+$/, "").trim();
}
