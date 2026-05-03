import { goodNotesDerivationCards, goodNotesSections } from "../domain/learning-workflow";

export function NotebookView() {
  return (
    <section className="panel notebook-view">
      <div className="section-heading">
        <h2>Notebook</h2>
        <p>GoodNotes 是手写推导和错题复盘层。网页负责出题，iPad 负责让你真正写一遍。</p>
      </div>

      <div className="notebook-layout">
        <article className="study-main">
          <span>GoodNotes</span>
          <h3>Cyrus Control Engineering</h3>
          <strong>每节课只写一页主笔记，必要时追加错题页。</strong>
          <p>
            推荐页名格式：001 状态空间模型，002 可控性，003 可观性，004 LQR。网页生成的
            GoodNotes Summary 直接复制到页尾，手写部分只保留关键推导。
          </p>
        </article>

        <article className="study-card">
          <h3>Page Sections</h3>
          <ol>
            {goodNotesSections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ol>
        </article>

        <article className="study-card template-card">
          <h3>GoodNotes Page Template</h3>
          <pre>{`Title:
Definitions:
公式推导:
工程直觉:
错题重写:
GoodNotes Summary:
Next:`}</pre>
        </article>
      </div>

      <section className="subsection-block">
        <div className="section-heading">
          <h2>Derivation Cards</h2>
          <p>这些卡片用于 GoodNotes：先抄公式，再补步骤，最后写工程解释。</p>
        </div>
        <div className="derivation-grid">
          {goodNotesDerivationCards.map((card) => (
            <article className="study-card derivation-card" key={card.title}>
              <h3>{card.title}</h3>
              <pre className="formula-block">{card.formula}</pre>
              <ol>
                {card.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <strong>{card.output}</strong>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
