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

- `src/components/Hero.jsx`: Personal introduction, profile photo from the university workshop and calls to action.
- `src/components/About.jsx`: Short biography.
- `src/components/Skills.jsx`: Backend, data and deployment skills.
- `src/components/Projects.jsx`: Four selected project cards, including Kesari Select, Email Campaign, Smart Print and DevCommand AI.
- `src/components/Experience.jsx`: Employment history.
- `src/components/Media.jsx`: Workshop and hackathon photos with links to genuine recordings.
- `src/components/Contact.jsx`: Contact and social links.
- `src/pages/CaseStudyPage.jsx`: Optional details after clicking a project.
- `src/data/projects.json`: Project card content.
- `src/data/caseStudies.js`: Long-form project notes (only shown on click).
- `public/Madin_Bloch_Resume.pdf`: Downloadable resume.
- `scripts/resume.html`: Printable resume source.

This is a personal site first, not a business metrics dashboard. Operational numbers are limited to relevant project details. The Kesari Select figures are 10K+ **total** inquiries and approximately 80–100+ **new inquiries daily**, not 10K per day. The email campaign benchmark concerns database insertion rather than email delivery speed. These figures are developer-reported, not independent analytics.

The portfolio uses real workshop/hackathon photos. No confidential client screenshots or invented product UIs are shown.

## Deployment

Vercel deploys the default `main` branch. The project CI runs content validation and a Vite production build. The `vercel.json` rewrite supports case-study deep links.
