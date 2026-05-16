import { cs231aCourseNotes } from "../domain/cs231a";

interface Cs231aCourseNotesProps {
  className?: string;
}

export function Cs231aCourseNotes({ className = "subsection-block cs231a-notes-block" }: Cs231aCourseNotesProps) {
  return (
    <section className={className} aria-label="CS231A course notes">
      <div className="section-heading">
        <h2>CS231A Course Notes</h2>
        <p>Local PDFs from Stanford CS231A, wired into the spatial-intelligence route.</p>
      </div>
      <div className="cs231a-note-grid">
        {cs231aCourseNotes.map((note) => (
          <a
            aria-label={`Course Notes ${note.number}: ${note.title}`}
            href={note.localUrl}
            key={note.file}
            rel="noreferrer"
            target="_blank"
          >
            <span>PDF {String(note.number).padStart(2, "0")}</span>
            <strong>{`Course Notes ${note.number}: ${note.title}`}</strong>
            <em>{note.pages} pages</em>
          </a>
        ))}
      </div>
    </section>
  );
}
