import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";
import { splitMathText } from "../domain/math-text";

interface InlineFormulaProps {
  latex: string;
  label?: string;
}

interface MathTextProps {
  text: string;
}

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
