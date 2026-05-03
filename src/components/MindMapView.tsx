import { mindMapEntries } from "../domain/learning-workflow";

export function MindMapView() {
  return (
    <section className="panel mindmap-view">
      <div className="section-heading">
        <h2>Map</h2>
        <p>Obsidian Canvas 是思维导图层：把课程、公式、论文、工程应用连成知识网络。</p>
      </div>

      <div className="map-layout">
        <article className="study-main">
          <span>Obsidian Canvas</span>
          <h3>课程 -&gt; 公式 -&gt; 论文 -&gt; 工程应用</h3>
          <strong>每次学完一节课，都只补一个概念节点和一条关系边。</strong>
          <p>
            网页负责互动学习；GoodNotes 负责手写推导；Obsidian 负责把推导后的概念放回全局图谱。
          </p>
        </article>

        {mindMapEntries.map((entry) => (
          <article className="study-card" key={entry.path}>
            <h3>{entry.title}</h3>
            <dl className="compact-dl">
              <div>
                <dt>Canvas file</dt>
                <dd>{entry.path}</dd>
              </div>
              <div>
                <dt>Purpose</dt>
                <dd>{entry.purpose}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
