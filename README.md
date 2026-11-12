# Madin Bloch — Backend Developer Portfolio

Portfolio built with React 18, Vite and Tailwind CSS. Dark, responsive layout featuring production backend engineering case studies.

## Development

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Content

- `src/data/projects.json` — featured work and project cards
- `src/data/caseStudies.js` — technical case study content
- `src/pages/CaseStudyPage.jsx` — case study page layout
- `src/components/Hero.jsx`, `About.jsx`, `Experience.jsx` — profile copy
- `public/Madin_Bloch_Resume.pdf` — downloadable resume; update when experience changes
- `index.html` — title, description, social meta, canonical URL
- `public/robots.txt`, `public/sitemap.xml` — crawling metadata

## Routes

`/`, `/projects/kesari-select-backend`, `/projects/email-campaign-engine`, `/blogs`, `/blog/:slug`.

`vercel.json` enables SPA fallback for deep routes. Static assets with file extensions are not rewritten.

## Content accuracy and privacy

Statements about client work should describe the developer's contributions, not claim full ownership of collaborative projects. Private backend source, internal credentials and customer records must not be published. The ~15s → ~3s observed page-load result is developer-reported and should not be presented as an independently audited benchmark.

The personal projects are deliberately labeled as internal, experimental or learning work where relevant.
