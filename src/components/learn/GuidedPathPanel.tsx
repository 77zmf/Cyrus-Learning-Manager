import { guidedControlLessons } from "../../domain/learning-workflow";
import { GuidedLessonCard } from "./GuidedLessonCard";

interface GuidedPathPanelProps {
  openLessonIds: Set<string>;
  openLesson: (lessonId: string) => void;
  syncLessonOpen: (lessonId: string, isOpen: boolean) => void;
}

export function GuidedPathPanel({ openLessonIds, openLesson, syncLessonOpen }: GuidedPathPanelProps) {
  return (
    <section className="panel guided-path" id="section-guided-path">
      <div className="section-heading">
        <h2>Cyrus Guided Path</h2>
        <p>不用每日计划。每次想学时，打开这一节，从第一张卡开始：网页读、GoodNotes 写、Obsidian 连、Notion 留证据。</p>
      </div>
      <nav aria-label="Course directory" className="course-toc">
        <h3>课程目录</h3>
        <ol>
          {guidedControlLessons.map((lesson) => (
            <li key={lesson.id}>
              <a href={`#${lesson.id}`} onClick={() => openLesson(lesson.id)}>
                {lesson.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="guided-lesson-grid">
        {guidedControlLessons.map((lesson) => (
          <GuidedLessonCard
            isOpen={openLessonIds.has(lesson.id)}
            key={lesson.title}
            lesson={lesson}
            onToggle={syncLessonOpen}
          />
        ))}
      </div>
    </section>
  );
}
