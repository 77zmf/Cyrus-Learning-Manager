import { useState } from "react";
import {
  deepStudyCards,
  modulesForTrack,
  type DeepStudyCard,
  type DeepStudyFormulaChoice
} from "../domain/knowledge";
import { libraryTrackRoutes } from "../domain/learning-workflow";
import { tracks } from "../domain/tracks";
import { MathText } from "./MathText";

export function CoursesView() {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Library</h2>
        <p>
          Course modules, source links, video entry points, derivation outputs, and paper queues.
        </p>
      </div>
      <section className="subsection-block route-block">
        <div className="section-heading">
          <h2>Track Routes</h2>
          <p>Routes are self-paced paths across the source library. Pick by output, not by date.</p>
        </div>
        <div className="route-grid">
          {libraryTrackRoutes.map((route) => (
            <article className="route-card" key={route.title}>
              <span>{route.tracks}</span>
              <h3>{route.title}</h3>
              <p>
                <MathText text={route.output} />
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="subsection-block deep-study-block">
        <div className="section-heading">
          <h2>Deep Study Cards</h2>
          <p>These cards turn large course areas into concrete study moves: foundation, concept, derivation, and output.</p>
        </div>
        <div className="deep-study-grid">
          {deepStudyCards.map((card) => (
            <article className="deep-study-card" key={card.id}>
              <span>{card.layer}</span>
              <h3>{card.title}</h3>
              <p>
                <MathText text={card.beginnerBridge} />
              </p>
              <dl className="deep-study-dl">
                <div>
                  <dt>先补基础</dt>
                  <dd>
                    <ul>
                      {card.coreIdeas.map((idea) => (
                        <li key={idea}>
                          <MathText text={idea} />
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>推导入口</dt>
                  <dd>
                    <MathText text={card.derivationEntry} />
                  </dd>
                </div>
                <div>
                  <dt>输出动作</dt>
                  <dd>
                    <MathText text={card.practice} />
                  </dd>
                </div>
              </dl>
              <div className="study-destinations">
                <em>{card.goodNotes}</em>
                <em>{card.obsidian}</em>
                <em>{card.notion}</em>
              </div>
              <DeepStudyPractice card={card} />
              <div className="source-links">
                {card.sources.map((source) => (
                  <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                    {source.title}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="track-grid">
        {tracks.map((track) => {
          const modules = modulesForTrack(track.id);
          return (
            <article className="track-card" key={track.id}>
              <h3>{track.name}</h3>
              <p>{track.description}</p>
              <dl>
                <div>
                  <dt>Obsidian entry</dt>
                  <dd>{track.obsidianEntry}</dd>
                </div>
                <div>
                  <dt>Canvas entry</dt>
                  <dd>{track.canvasEntry}</dd>
                </div>
              </dl>
              <div className="module-block">
                <h4>Knowledge modules</h4>
                <ul>
                  {modules.map((module) => (
                    <li key={module.id}>
                      <strong>{module.title}</strong>
                      <span>{module.stage}</span>
                      <p>
                        <MathText text={module.focus} />
                      </p>
                      <div className="module-output">
                        {module.outputs.map((output) => (
                          <em key={output}>
                            <MathText text={output} />
                          </em>
                        ))}
                      </div>
                      <div className="source-links">
                        {module.sources.map((source) => (
                          <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DeepStudyPractice({ card }: { card: DeepStudyCard }) {
  const [openAnswers, setOpenAnswers] = useState<Set<number>>(() => new Set());
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [goodNotesDone, setGoodNotesDone] = useState(false);
  const selectedFormula = card.formulaCheck.choices.find(
    (choice) => choice.label === selectedChoice
  );

  function toggleAnswer(index: number) {
    setOpenAnswers((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className="deep-study-practice" aria-label={`${card.title} interactive practice`}>
      <h4>交互练习</h4>
      <div className="micro-question-list">
        {card.practiceQuestions.map((question, index) => {
          const isOpen = openAnswers.has(index);

          return (
            <article className="micro-question" key={question.prompt}>
              <span>小白题</span>
              <p>
                <MathText text={question.prompt} />
              </p>
              <button
                aria-label={`显示 ${card.title} 第 ${index + 1} 题答案`}
                onClick={() => toggleAnswer(index)}
                type="button"
              >
                {isOpen ? "收起答案" : "点击查看答案"}
              </button>
              {isOpen ? (
                <strong>
                  <MathText text={question.answer} />
                </strong>
              ) : null}
            </article>
          );
        })}
      </div>
      <div className="formula-check">
        <span>公式选择</span>
        <p>
          <MathText text={card.formulaCheck.prompt} />
        </p>
        <div className="formula-choice-grid">
          {card.formulaCheck.choices.map((choice) => (
            <button
              aria-label={`${card.title} 公式选项 ${choice.label}`}
              className={formulaChoiceClass(choice, selectedFormula)}
              key={choice.label}
              onClick={() => setSelectedChoice(choice.label)}
              type="button"
            >
              <span>{choice.label}. </span>
              <MathText text={choice.value} />
            </button>
          ))}
        </div>
        {selectedFormula ? (
          <div
            className={selectedFormula.isCorrect ? "feedback is-correct" : "feedback is-wrong"}
            role="status"
          >
            <MathText text={selectedFormula.feedback} />
          </div>
        ) : null}
      </div>
      <div className="goodnotes-output-check">
        <span>GoodNotes 输出检查</span>
        <p>
          <MathText text={card.goodNotesCheck.prompt} />
        </p>
        <label>
          <input
            aria-label={`确认 ${card.title} GoodNotes 输出`}
            checked={goodNotesDone}
            onChange={(event) => setGoodNotesDone(event.target.checked)}
            type="checkbox"
          />
          我已写完 GoodNotes 输出检查
        </label>
        {goodNotesDone ? (
          <strong role="status">
            <MathText text={card.goodNotesCheck.expected} />
          </strong>
        ) : null}
      </div>
    </section>
  );
}

function formulaChoiceClass(
  choice: DeepStudyFormulaChoice,
  selectedChoice: DeepStudyFormulaChoice | undefined
) {
  if (!selectedChoice) {
    return "";
  }

  if (choice.label === selectedChoice.label && choice.isCorrect) {
    return "is-correct";
  }

  if (choice.label === selectedChoice.label) {
    return "is-wrong";
  }

  if (choice.isCorrect) {
    return "is-correct";
  }

  return "";
}
