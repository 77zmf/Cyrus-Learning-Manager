import {
  courseGuidedPdfHref,
  universityCoursePacks,
  universityCourseProductionQueue,
  universityCourseRoadmapPdf
} from "../domain/university-course-packs";

const statusLabel = {
  "guided-pdf-ready": "Guided PDF ready",
  "source-ready": "Source ready",
  "needs-syllabus-expansion": "Needs syllabus expansion"
};

interface UniversityCoursePacksProps {
  className?: string;
}

export function UniversityCoursePacks({
  className = "subsection-block university-course-packs-block"
}: UniversityCoursePacksProps) {
  return (
    <section className={className} aria-label="University course packs">
      <div className="section-heading">
        <h2>University Course Packs</h2>
        <p>
          Tsinghua, MIT, and Stanford course sources organized into the same guided PDF,
          source-link, GoodNotes, Obsidian, and Notion workflow.
        </p>
      </div>
      <div className="course-pack-toolbar">
        <a href={universityCourseRoadmapPdf.href} rel="noreferrer" target="_blank">
          <span>Roadmap PDF</span>
          <strong>{universityCourseRoadmapPdf.title}</strong>
        </a>
        <div>
          <span>Production queue</span>
          <ul>
            {universityCourseProductionQueue.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="university-course-grid">
        {universityCoursePacks.map((pack) => (
          <article className="university-course-pack" key={pack.id}>
            <span>{pack.university}</span>
            <h3>{pack.theme}</h3>
            <p>{pack.beginnerBridge}</p>
            <strong>{pack.route}</strong>
            <div className="university-course-list">
              {pack.courses.map((course) => (
                <article className="university-course-item" key={course.id}>
                  <a
                    className="university-course-source"
                    href={course.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{course.code ?? pack.university}</span>
                    <strong>{course.title}</strong>
                    <em>{statusLabel[course.status]}</em>
                    <p>{course.role}</p>
                    <small>{course.output}</small>
                  </a>
                  <a
                    className="course-guided-pdf-link"
                    href={courseGuidedPdfHref(course.id)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Guided PDF {course.title}
                  </a>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
