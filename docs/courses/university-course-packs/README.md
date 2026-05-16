# Cyrus University Course Packs

This folder is the master course-pack layer for turning Tsinghua, MIT, and Stanford sources into the same learning format already used for CS231A and CS231n:

- official source link
- beginner bridge
- core formula sheet
- GoodNotes output page
- Obsidian concept graph node
- Notion evidence/status entry
- later per-course guided PDF

## Current phase

Phase 1 creates the cross-university roadmap and web entry. It does not pretend every individual course has already been fully expanded.

Already expanded:

- Stanford CS231A
- Stanford CS231n

Phase 2 adds a local guided PDF for every course-pack item. These are concise course-start PDFs, not replacements for the official course materials. They give the first formula checkpoint, GoodNotes page, Obsidian node, Notion record, and web-interaction idea for each course.

Generated index:

- `course-pdf-manifest.json`
- `public/courses/university-course-packs/course-pdf-manifest.json`

Regenerate all course PDFs with:

```bash
npm run courses:build-pdfs
```

Next expansion batch:

- MIT 6.241J Dynamic Systems and Control
- MIT 6.003 Signals and Systems
- Stanford CS229 Machine Learning
- MIT Underactuated Robotics

Tsinghua graduate-control courses need official syllabus-by-syllabus expansion before creating individual PDFs, because public exact course pages are less uniform than MIT OCW and Stanford class pages.
