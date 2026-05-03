import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";
import type { FormulaTerm } from "../domain/formula-visuals";

interface FormulaVisualProps {
  label: string;
  latex: string;
  terms?: FormulaTerm[];
}

function splitFormulaLines(latex: string) {
  const primaryLines = latex
    .split(/,\\quad|\\quad/g)
    .map((line) => line.trim().replace(/^,/, "").trim())
    .filter(Boolean);

  const lines = primaryLines.flatMap((line) => {
    const integralIndex = line.indexOf("+\\int");

    if (integralIndex <= 0) {
      return [line];
    }

    return [line.slice(0, integralIndex).trim(), line.slice(integralIndex).trim()].filter(Boolean);
  });

  return lines.length > 0 ? lines : [latex];
}

export function FormulaVisual({ label, latex, terms = [] }: FormulaVisualProps) {
  const formulaLines = useMemo(() => splitFormulaLines(latex), [latex]);
  const renderedLines = useMemo(
    () =>
      formulaLines.map((line) =>
        katex.renderToString(line, {
          displayMode: true,
          strict: false,
          throwOnError: false,
          trust: false
        })
      ),
    [formulaLines]
  );

  return (
    <figure className="formula-visual" aria-label={`Formula visual: ${label}`}>
      <figcaption>Formula Visual</figcaption>
      <div className="formula-render-stack">
        {renderedLines.map((renderedLine, index) => (
          <div
            key={`${formulaLines[index]}-${index}`}
            aria-label={`Formula visual line ${index + 1}: ${label}`}
            className="formula-render"
            dangerouslySetInnerHTML={{ __html: renderedLine }}
          />
        ))}
      </div>
      <code className="latex-source">{latex}</code>
      {terms.length > 0 ? (
        <dl className="formula-term-grid">
          {terms.map((term) => (
            <div key={term.label}>
              <dt>{term.label}</dt>
              <dd>
                <code>{term.symbol}</code>
                <span>{term.meaning}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </figure>
  );
}
