import { beginnerFoundations } from "../../domain/learning-workflow";
import { MathText } from "../MathText";

export function FoundationBridgePanel() {
  return (
    <section className="panel beginner-bridge" id="section-foundations">
      <div className="section-heading">
        <h2>Zero-Base Bridge</h2>
        <p>先补最小前置概念。这里不要求你会证明，只要求你能用自己的话说出概念在干什么。</p>
      </div>
      <div className="foundation-grid">
        {beginnerFoundations.map((item) => (
          <article className="foundation-card" key={item.title}>
            <span>小白前置</span>
            <h3>{item.title}</h3>
            <p>
              <MathText text={item.plain} />
            </p>
            <dl className="beginner-dl">
              <div>
                <dt>例子</dt>
                <dd>
                  <MathText text={item.example} />
                </dd>
              </div>
              <div>
                <dt>最小练习</dt>
                <dd>
                  <MathText text={item.exercise} />
                </dd>
              </div>
              <div>
                <dt>GoodNotes</dt>
                <dd>
                  <MathText text={item.goodNotes} />
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
