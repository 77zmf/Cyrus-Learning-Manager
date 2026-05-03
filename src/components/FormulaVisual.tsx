import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";
import type { FormulaTerm } from "../domain/formula-visuals";

interface FormulaVisualProps {
  label: string;
  latex: string;
  terms?: FormulaTerm[];
}

export function FormulaVisual({ label, latex, terms = [] }: FormulaVisualProps) {
  const renderedFormula = useMemo(
    () =>
      katex.renderToString(latex, {
        displayMode: true,
        strict: false,
        throwOnError: false,
        trust: false
      }),
    [latex]
  );

  return (
    <figure className="formula-visual" aria-label={`Formula visual: ${label}`}>
      <figcaption>Formula Visual</figcaption>
      <div
        className="formula-render"
        dangerouslySetInnerHTML={{ __html: renderedFormula }}
      />
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
