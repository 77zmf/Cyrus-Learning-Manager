import { cs231nCourseResources } from "../domain/cs231n";

interface Cs231nCourseNotesProps {
  className?: string;
}

export function Cs231nCourseNotes({ className = "subsection-block cs231n-notes-block" }: Cs231nCourseNotesProps) {
  return (
    <section className={className} aria-label="CS231n course notes">
      <div className="section-heading">
        <h2>CS231n Course Notes</h2>
        <p>Li Fei-Fei style deep-vision route: neural visual representations that connect to spatial intelligence.</p>
      </div>
      <div className="course-note-grid cs231a-note-grid">
        {cs231nCourseResources.map((resource) => (
          <a
            aria-label={`CS231n ${resource.title}`}
            href={resource.href}
            key={resource.id}
            rel="noreferrer"
            target="_blank"
          >
            <span>{resource.label}</span>
            <strong>{resource.title}</strong>
            <em>{resource.kind}</em>
          </a>
        ))}
      </div>
    </section>
  );
}
