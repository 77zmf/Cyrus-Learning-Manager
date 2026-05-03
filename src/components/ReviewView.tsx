import type { CreateTaskInput } from "../api/client";
import { notionLearningFields, notionReviewViews } from "../domain/learning-workflow";
import type { LearningTask, TaskPriority, TaskStatus, TrackId } from "../domain/types";
import { ProgressView } from "./ProgressView";
import { TasksView } from "./TasksView";

interface ReviewViewProps {
  tasks: LearningTask[];
  search: string;
  track: TrackId | "";
  status: TaskStatus | "";
  priority: TaskPriority | "";
  onSearchChange: (value: string) => void;
  onTrackChange: (value: TrackId | "") => void;
  onStatusChange: (value: TaskStatus | "") => void;
  onPriorityChange: (value: TaskPriority | "") => void;
  onCreateTask: (input: CreateTaskInput) => void;
  onStatusUpdate: (taskId: string, status: TaskStatus, progress: number) => void;
}

export function ReviewView(props: ReviewViewProps) {
  return (
    <section className="learning-cockpit">
      <div className="panel review-overview">
        <div className="section-heading">
          <h2>Review</h2>
          <p>
            Notion 的作用是结构化索引和复习系统：记录掌握度、下次复习、资源链接和证据，不承载长笔记。
          </p>
        </div>

        <article className="study-main">
          <span>Notion Learning Database</span>
          <h3>Structured review and resource index</h3>
          <strong>Notion tracks what to review next; Obsidian keeps the knowledge graph.</strong>
          <p>
            Notion rows should point back to Obsidian concepts and GoodNotes pages instead of duplicating
            long explanations.
          </p>
        </article>

        <div className="field-grid" aria-label="Notion learning database fields">
          {notionLearningFields.map((field) => (
            <span key={field}>{field}</span>
          ))}
        </div>

        <section className="subsection-block">
          <div className="section-heading">
            <h2>Notion Review Views</h2>
            <p>Notion 负责筛选和复盘，不负责长篇解释。</p>
          </div>
          <div className="review-view-grid">
            {notionReviewViews.map((view) => (
              <article className="study-card" key={view.name}>
                <h3>{view.name}</h3>
                <dl className="compact-dl">
                  <div>
                    <dt>Filter</dt>
                    <dd>{view.filter}</dd>
                  </div>
                  <div>
                    <dt>Purpose</dt>
                    <dd>{view.purpose}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </div>

      <ProgressView tasks={props.tasks} />
      <TasksView {...props} />
    </section>
  );
}
