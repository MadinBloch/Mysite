# Madin Bloch — Developer Portfolio

A personal portfolio built with React, Vite and Tailwind CSS.

## Run locally

```bash
npm ci
npm run dev
npm run build
node scripts/check-portfolio.mjs
```

## Site structure

- `src/components/Hero.jsx`: Personal introduction, portrait carousel, and links to work and the resume.
- `src/components/About.jsx`: Short biography.
- `src/components/Skills.jsx`: Backend, data and deployment skills.
- `src/components/Projects.jsx`: Filterable project cards with a featured Kesari Select case study and its operating figures.
- `src/components/Experience.jsx`: Employment history.
- `src/components/Media.jsx`: Certificates and awards. Workshop, hackathon, and meetup photos are shown in their own sections.
- `src/components/Contact.jsx`: Contact and social links.
- `src/pages/CaseStudyPage.jsx`: Optional details after clicking a project.
- `src/data/projects.json`: Project card content.
- `src/data/caseStudies.js`: Long-form project notes (only shown on click).
- `public/Madin_Bloch_Resume.pdf`: Downloadable resume.
- `scripts/resume.html`: Printable resume source.

This is a personal site first, not a business metrics dashboard. Kesari Select figures shown in the portfolio are approximately 200+ daily inquiries, 30K+ customer records handled, and 10K+ website visitors. These are separate measures and are developer-reported estimates, not independent analytics. The email campaign benchmark concerns database insertion rather than email delivery speed. Training videos were created for internal Kesari team learning and are not shared publicly.

The portfolio uses real workshop/hackathon photos. No confidential client screenshots or invented product UIs are shown.

The photo carousels support swipe, thumbnails, and arrow keys. The full-size viewer supports zoom, arrow keys, and Escape.

## Deployment

Vercel deploys the default `main` branch. The project CI runs content validation and a Vite production build. The `vercel.json` rewrite supports case-study deep links.
