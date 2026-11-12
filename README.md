# Madin Bloch — Backend Developer Portfolio

Personal portfolio, designed as a clean editorial dark-mode site for backend roles. React 18, Vite and Tailwind CSS.

## Local development

\`\`\`bash
npm ci
npm run dev
node scripts/check-portfolio.mjs
npm run build
\`\`\`

## Edit content

- \`src/data/siteStats.js\` — clearly labeled reported portfolio statistics
- \`src/data/projects.json\` — project metadata and feature cards
- \`src/data/caseStudies.js\` — longer case studies and engineering decisions
- \`src/components/Hero.jsx\`, \`Projects.jsx\`, \`Experience.jsx\`, \`About.jsx\` — homepage
- \`src/components/Media.jsx\` — real workshop/hackathon photos and lazy-loaded demo video links
- \`src/components/AnimatedNumber.jsx\` — IntersectionObserver animation with reduced-motion support
- \`public/Madin_Bloch_Resume.pdf\` — portfolio PDF download
- \`scripts/resume.html\` — printable resume source
- \`src/pages/CaseStudyPage.jsx\` — reusable case-study display

The homepage shows **10K+ total inquiries across the platform**, about **80–100+ new inquiries daily**, and **700–1,000 team users**. These values are developer-reported operational estimates; they are not telemetry from this repository.

The email campaign result is **10K+ recipient records inserted into MySQL in under 4 seconds** (reported benchmark). This is an ingestion metric, **not** 10K emails delivered in seconds. Actual delivery uses Laravel queue workers. The 6,000 / 10,000 progress display is an illustrative UI state.

Production client source and internal screenshots are not public; diagram visuals are explicitly labeled as illustrations. Real workshop photographs and hackathon demo videos already in the repository are displayed separately.

## Deployment

\`vercel.json\` provides SPA route fallback. Pull requests run a content validation script and \`npm run build\`.
