import { learningToolRoles } from "../domain/learning-workflow";
import { useState } from "react";
import { InteractiveTutor } from "./InteractiveTutor";
import { ManimStudioLab } from "./ManimStudioLab";
import { LearningDirectory } from "./learn/LearningDirectory";
import { BeginnerStartPanel } from "./learn/BeginnerStartPanel";
import { FoundationBridgePanel } from "./learn/FoundationBridgePanel";
import { ThreeBlueOneBrownBridge } from "./learn/ThreeBlueOneBrownBridge";
import { GuidedPathPanel } from "./learn/GuidedPathPanel";
import { LearningLaunchQueue } from "./learn/LearningLaunchQueue";

export function LearnView() {
  const [openLessonIds, setOpenLessonIds] = useState<Set<string>>(() => new Set(["lesson-state-space"]));

  function openLesson(lessonId: string) {
    setOpenLessonIds((current) => new Set(current).add(lessonId));
  }

  function syncLessonOpen(lessonId: string, isOpen: boolean) {
    setOpenLessonIds((current) => {
      const next = new Set(current);

      if (isOpen) {
        next.add(lessonId);
      } else {
        next.delete(lessonId);
      }

      return next;
    });
  }

  return (
    <section className="learning-cockpit">
      <div className="panel cockpit-hero">
        <div className="section-heading">
          <h2>Learn</h2>
          <p>网页是主学习入口：先做互动题，再把推导写进 GoodNotes，最后沉淀到 Obsidian 和 Notion。</p>
        </div>
        <div className="workflow-strip" aria-label="Learning workflow">
          {learningToolRoles.map((item) => (
            <article key={item.tool}>
              <strong>{item.tool}</strong>
              <span>{item.role}</span>
              <p>{item.output}</p>
            </article>
          ))}
        </div>
      </div>

      <LearningDirectory />

      <BeginnerStartPanel />

      <FoundationBridgePanel />

      <ThreeBlueOneBrownBridge />

      <ManimStudioLab />

      <GuidedPathPanel
        openLesson={openLesson}
        openLessonIds={openLessonIds}
        syncLessonOpen={syncLessonOpen}
      />

      <LearningLaunchQueue />

      <div className="tutor-anchor" id="section-tutor">
        <InteractiveTutor />
      </div>
    </section>
  );
}
