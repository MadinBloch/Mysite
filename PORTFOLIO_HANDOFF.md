# PORTFOLIO_HANDOFF.md

> **Cursor handoff / implementation brief — 12 November 2026**
>
> **Status:** This document records the work already done, the current repository state, and the owner's **latest requested changes**. It is **not** evidence that the latest visual requests have been implemented. Read it before modifying the UI.
>
> **Owner's current direction (highest priority):** Build a **personal Laravel developer portfolio**, not a Kesari Select product presentation or a SaaS landing page. Restore the **original dark charcoal + green accent visual identity**, use a **capsule/floating navbar**, show the new formal portrait, and bring back all original workshop, hackathon, achievement, blog, event, and older-project sections.

## 1. Repository and current state (verified)

- **Repository:** \`MadinBloch/Mysite\` (private)
- **Production URL:** https://madin-bloch.vercel.app/
- **Default branch:** \`main\`
- **Verified pre-handoff HEAD:** \`744786a9593db251555522924f74fa5fb42135a0\` (PR #5, "Rebuild personal portfolio with balanced projects and streamlined UX")
- **Tech:** React 18, Vite 5, Tailwind CSS 3, React Router 6.
- **Resume currently served from:** \`public/Madin_Bloch_Resume.pdf\`
- **Printable resume source:** \`scripts/resume.html\`
- **Existing CI:** \`.github/workflows/portfolio-build.yml\`
- **Current homepage composition in \`src/App.jsx\`:** Hero → About → Skills → Projects → Experience → Media → Contact.
- **Routes:** \`/\`, \`/projects/:slug\`, \`/blogs\`, \`/blog/:slug\`.
- **Current theme:** navy/indigo (\`#0b101b\` background, \`#9eb3ff\` accent); this **is not the requested final palette**.
- **Current homepage projects:** only Kesari Select, Email Campaign Platform, Smart Print, DevCommand AI.
- **Current media:** only two photos in \`src/components/Media.jsx\` (university workshop and hackathon), despite many additional real assets already in the repo.
- **Important:** The old \`Workshop.jsx\`, \`Hackathon.jsx\`, \`Community.jsx\`, \`Blogs.jsx\` components **still exist**, but are **not rendered on the current homepage**. Do not recreate their content from scratch before inspecting them.

### Change history

| PR | What was done | Feedback / outcome |
| --- | --- | --- |
| [#2](https://github.com/MadinBloch/Mysite/pull/2) | Updated resume, technical case studies, SEO, SPA routing, validation. | Backend content improved, but still too module-centric. |
| [#3](https://github.com/MadinBloch/Mysite/pull/3) | Added operational metrics, Smart Print history, hackathon resume details. | Some scale figures were initially misinterpreted and later corrected. |
| [#4](https://github.com/MadinBloch/Mysite/pull/4) | Large editorial/SaaS-like redesign, metrics, photo cards. | **Rejected by owner**: felt like a company/SaaS website, not a personal portfolio. |
| [#5](https://github.com/MadinBloch/Mysite/pull/5) | Simplified to personal hero, four project cards, short experience, two media cards, indigo theme. | Better, but owner explicitly wants original theme/colors, portrait, capsule nav, ALL old sections/media/projects restored. |

**Do not assume a previous successful build equals visual acceptance.** Build success was checked for these PRs, but visual satisfaction is unresolved.

## 2. Latest owner requirements — implement these next

### A. Original visual identity (not the current navy redesign)

- Restore the **old dark charcoal / near-black theme** with restrained green/mint accent and subtle textured/noise background.
- Earlier original code used approximately \`#09090b\` for dark backgrounds and \`#6ee7b7\` / \`#34d399\` for accent. Verify exact original CSS from Git history before finalizing.
- Preserve the original site's personality: dark, polished, developer-focused; light glow/gradients, visible but not excessive hover effects, readable cards.
- **Avoid** huge business KPI strips, giant corporate-sounding slogans, light-cream blocks, dashboard panels, fake product screenshots, or oversized text with poor hierarchy.
- Balance desktop and mobile layouts. No horizontal overflow, undersized body text, overlapping navigation, giant empty spaces, or decorative clutter.

### B. Capsule navbar

- User supplied an example screenshot of a **floating pill/capsule navigation** (shape inspiration only; do not copy the unrelated brand).
- Rounded outer container, subtle border, slight blur, clean link hierarchy, brand on left, contact/resume CTA on right.
- Suggested destinations: Home, About, Skills, Projects, Experience, University Workshop, Hackathon, Certificates, Blogs, Events & Meetups, Contact.
- **Fit matters**: do not force 11 tiny links into a single 1024px-wide pill. Use compact groups/dropdown or a responsive "More" menu and a real mobile menu.
- Anchors must scroll to correct sections under sticky navbar.

### C. Hero and new portrait

- Hero must center on **Madin Bloch**, "PHP & Laravel Backend Developer," a concise natural introduction, and View Projects / Resume / Contact actions.
- **Owner uploaded a new formal headshot in the conversation (12 Nov 2026)**. That upload is **not currently present in the GitHub tree**. Ask user to provide/copy the image into the working repo (e.g. \`public/profile-portrait.png\`), then use it as the hero portrait.
- Until that portrait exists in the workspace, **do not substitute a random/AI-generated face**. Existing workshop photo \`/workshop/presenting.jpg\` is only a temporary fallback.
- Keep GitHub and LinkedIn links accessible.

### D. Projects — restore old ones, keep Kesari concise

The current 4-card selection omits older work. User requested to restore:

1. **Kesari Select** — one important project card; don't make the whole homepage about this client.
2. **Email Campaign Platform** — showcase Laravel Queues/Workers, Excel upload validation, pause/resume, rich editor, dynamic placeholders, errors, progress and batch-import performance.
3. **Smart Print** — existing Laravel print-operations system work (inquiries, permissions, job-sheet reliability).
4. **HRM System** — previous project.
5. **DevCommand AI** — label as experiment, not verified production service.
6. **Car Web Services** — older PHP/MySQL learning project.
7. **Book Server** — older PHP/MySQL/hackathon-era project.
8. Any further *verified* projects from Git history or old source, if found.

Possible older media: Car Web Services YouTube demo \`https://youtu.be/EMP0RciGICg\`; Book Server project/hackathon video \`https://youtu.be/yLy_fBdOT7M\`. Check context before reusing them as live product links.

Present projects as a responsive, visually consistent card grid with tags, short descriptions, optional media, years and genuine links. A featured project can be slightly larger, but **Kesari must not dominate the entire home page**. Put long case studies behind \`/projects/:slug\`, not in the initial viewport.

**Critical technical note:** \`scripts/check-portfolio.mjs\` currently contains an assertion expecting **exactly 4 projects**. Update that validation when restoring the older projects, or CI will fail.

### E. Restore dedicated University Workshop

File already exists: \`src/components/Workshop.jsx\`.

- **Dr. Subhash University, Aug 2026, Junagadh**
- Facilitated a practical Git & Docker workshop for BCA/MCA students, live demos, installation/setup, version control, containers, Q&A.
- Preserve the original useful information, but keep the section readable, visually modern and *human*.
- Display **all four real workshop photos** (not just one or two) with a responsive gallery/lightbox:
  - \`public/workshop/presenting.jpg\`
  - \`public/workshop/git-docker.jpg\`
  - \`public/workshop/classroom.jpg\`
  - \`public/workshop/certificate.jpg\`
- Additional older uploads already in the repo: \`public/1749549535761.jpeg\`, \`public/1787731945136.jpeg\`, \`public/1787731946534.jpeg\`, \`public/1787731962408.jpeg\` (inspect before duplicating; some may be copies of workshop photos).

### F. Restore Hackathon Achievement + videos

File exists: \`src/components/Hackathon.jsx\`.

- **Grand Finalist — New India Vibrant Hackathon 2023, Pandit Deendayal Energy University (PDEU)**.
- Qualified from regional round; built and presented a backend-focused solution under time pressure; defended architecture decisions; teamwork and technical communication.
- Include real photographs and **both videos**:
  - Regional round: \`https://www.youtube.com/embed/N-U6c92QPeA\`
  - Project video: \`https://www.youtube.com/embed/yLy_fBdOT7M\`
- For performance, click-to-play poster thumbnails are preferable to loading multiple YouTube iframes on initial page load.
- Avoid repeating the same hackathon explanation in four different sections.

### G. Certificates & Achievements — full photo gallery

Original data and lightbox behavior are in \`src/components/Media.jsx\` in Git history (original eight-image gallery), or can be rebuilt with existing assets.

These assets were **verified in the current repository tree**:
- \`public/certificateHackthnone.jpg\` — Grand Finale certificate
- \`public/image3hackthone.jpg\` — Grand Finale moment
- \`public/image5.jpg\` — team achievement
- \`public/image2hackthone.jpg\` — presentation session
- \`public/image9.jpg\` — regional certificate
- \`public/image7.jpg\` — regional moment
- \`public/image6.jpg\` — team moment
- \`public/imag1hackthone.jpg\` — regional moment
- \`public/image8.jpg\` — extra photo, inspect and caption appropriately

Keep a dedicated **Certificates & Achievements** section, all relevant real photographs visible and clickable. Check filenames and captions visually; don't infer context not supported by the image. Include workshop photos in its own section rather than needlessly duplicating everything.

### H. Latest Blog Posts

Files already exist: \`src/components/Blogs.jsx\`, \`src/data/blogs.json\`, \`src/pages/BlogsPage.jsx\`, \`src/pages/BlogPostPage.jsx\`.

- Restore **Latest Blog Posts** preview on homepage and preserve \`/blogs\` route.
- Hashnode profile: \`https://madinbloch.hashnode.dev/\`.
- **Accuracy caution:** \`src/data/blogs.json\` contains locally authored metadata and \`readUrl\` entries that all point to the Hashnode homepage. This is **not proof each named post is published**. Verify real post URLs before claiming "latest published" or fabricating publication dates. If only local writing/drafts exist, label them correctly or fetch verified live articles.

### I. Events & Meetups

File exists: \`src/components/Community.jsx\`, currently not on homepage.

- Restore a tasteful **Events & Meetups** section and adapt it to the final theme.
- Old component mentions the university workshop, local Laravel meetups, and ongoing developer-community engagement.
- **Do not assert attendance at any particular meetup without user confirmation or evidence.** Workshop + hackathon participation are already documented; distinguish events attended from speaking/workshops.
- Avoid duplicating the entire workshop and hackathon gallery in this section. Short event cards with links/anchor jumps are enough.

## 3. Factual context and metrics — keep these distinctions

### Kesari Select

- **10K+ TOTAL inquiries across the platform**, **not** 10K daily.
- Approximately **80–100+ new inquiries on a typical day** (owner-provided estimate).
- Approximately **700–1,000 internal team users**; teams include Sales, **Land Ops, Air Ops, Cashier, Product, Finance**, and others.
- Owner contributed to the Laravel backend and says they **handled end-to-end application deployments** (Docker, Nginx/PHP-FPM, AWS EC2, SSL, troubleshooting).
- Developer-reported observed improvement: one page load from about **15 seconds to 3 seconds** (~80% less wait). This is not an independently benchmarked site-wide average.
- Client product is team-built; **do not claim sole authorship**. Also do not frame the owner only as a CRUD/module developer.
- For homepage: a *brief* project summary suffices. Operational details can live in the project details and resume.

### Email Campaign Platform

- Owner reports **10K+ recipient rows inserted into the database in under 4 seconds** with batch optimization.
- That is **import/DB ingestion**, **not** "10K+ emails delivered in seconds."
- Laravel Queues + Workers process actual asynchronous sending.
- Strict Excel validation (structure, columns, format), rich-text editor, template placeholders \`{Name}\` and \`{Email}\`, test emails, pause/resume, progress dashboard (e.g. **6,000 of 10,000** example state), error handling.
- Earlier Git reports also indicate per-recipient jobs, tracking pixel, hourly batch processing of open events, archive/exports, configurable From/Reply-To.
- Do not invent verified throughput, deliverability, conversion percentages, or customer numbers.

### Smart Print

- Legacy print operations application. Authored changes include a prospect/inquiry flow, role-aware permission updates, AJAX/Blade, task soft deletes, print/prepress option management and job data consistency.
- It is not proven that the owner created the original entire Smart Print product. Present the actual contribution.

### Resume

- Website download currently: \`public/Madin_Bloch_Resume.pdf\`.
- Working source: \`scripts/resume.html\`.
- Previous revisions include corrected platform scale and the full **Grand Finalist — New India Vibrant Hackathon 2023 (PDEU)** accomplishment.
- Do not restore the incorrect "10K daily inquiries" wording.
- Keep resume professionally accurate; current experience begins Dec 2024. No unverified "Senior Laravel Developer with 2+ years" positioning unless dates and role actually substantiate it.
- Resume content was repeatedly revised in this chat, but the latest user request is **UI/theme/media restoration**, not another resume rewrite. Do not alter resume without a clear reason.

## 4. Suggested homepage sequence

1. **Home / Hero** — formal portrait, short intro, clear CTA
2. **About Me**
3. **Skills / Tech Stack**
4. **Projects** — all old & new projects
5. **Experience**
6. **University Workshop** — full 4-photo gallery
7. **Hackathon Achievement** — journey + two videos
8. **Certificates & Achievements** — complete real-photo gallery
9. **Latest Blog Posts** — verified/appropriately labeled articles
10. **Events & Meetups**
11. **Contact**

Design compactly so the page doesn't feel endless. A capsule navbar can group secondary destinations under a **More** dropdown.

## 5. Important files to inspect before editing

\`\`\`text
src/App.jsx                       # Homepage section composition / routes
src/components/Navbar.jsx         # Replace with floating capsule
src/components/Hero.jsx           # Use formal user-provided portrait
src/components/About.jsx
src/components/Skills.jsx
src/components/Projects.jsx
src/components/Experience.jsx
src/components/Workshop.jsx       # EXISTING, NOT CURRENTLY RENDERED
src/components/Hackathon.jsx      # EXISTING, NOT CURRENTLY RENDERED
src/components/Media.jsx          # Currently reduced to two photo cards
src/components/Community.jsx      # EXISTING, NOT CURRENTLY RENDERED
src/components/Blogs.jsx          # EXISTING, NOT CURRENTLY RENDERED
src/components/Lightbox.jsx
src/data/projects.json            # Currently only four projects
src/data/blogs.json               # Verify published article links
src/data/caseStudies.js           # Detailed views only
src/pages/CaseStudyPage.jsx
src/index.css
tailwind.config.js                # Currently navy + indigo; restore old green
scripts/check-portfolio.mjs       # Currently asserts 4 projects!
public/                            # Real workshop/hackathon media, resume
\`\`\`

If unsure of old design details, compare earlier Git history before PR #4 or inspect the old components above. Old screenshot references from the chat show a dark/zinc surface, small green-accent badges, dense but readable cards, workshop with topic cards and four photographs, hackathon with embedded videos, and an eight-photo certificate gallery.

**The newly uploaded formal portrait and screenshot references are chat attachments, not yet committed files.** Cursor needs that image supplied into its working directory before using it.

## 6. Quality / acceptance checklist

- [ ] Person, photo, role and CTAs immediately visible on desktop & mobile hero.
- [ ] Original dark/green theme restored in a coherent, restrained manner.
- [ ] Floating **capsule navbar**, responsive, accessible; mobile links and anchors work.
- [ ] All requested sections actually rendered on \`/\`; not just files sitting unused.
- [ ] Project cards include older work; no fabricated company/project claims.
- [ ] Kesari remains **inside Projects**; no homepage dedicated to client metrics.
- [ ] Workshop all 4 real photos; hackathon both real videos; certificates full gallery.
- [ ] Blog links verified or honestly labeled; meetup claims substantiated.
- [ ] \`src/data/projects.json\` additions reflected in validation script.
- [ ] Existing resume download, \`/blogs\`, \`/blog/:slug\`, \`/projects/:slug\`, sitemap and direct-route reload work.
- [ ] Responsive at ~360px, 768px and 1440px; no layout clipping, unreadable tiny fonts or oversized whitespace.
- [ ] No blocking image loads; use \`loading="lazy"\`, sensible sizes, optional click-to-play video.
- [ ] Keyboard nav, visible focus, image alt text, lightbox close button/Escape, \`prefers-reduced-motion\`.
- [ ] Run \`npm ci\`, \`node scripts/check-portfolio.mjs\`, \`npm run build\`.
- [ ] Visually inspect desktop and mobile before merging. **Don't treat CI success as visual acceptance.**
- [ ] Prefer a feature branch + preview URL before updating \`main\`.

## 7. One-paragraph direction for Cursor

> Redesign Madin Bloch's React/Tailwind portfolio as an authentic **personal Laravel developer website**, restoring the original dark-charcoal/mint-green visual style, subtle textured background, a floating capsule navigation, and the new formal portrait supplied by the owner. Keep the hero personal and avoid corporate KPI dashboards. Show **all verified projects** (Kesari Select as one project card), retain balanced spacing and restrained typography, and restore the original **University Workshop**, **Hackathon Achievement** with both videos, **Certificates & Achievements** full photo gallery, **Latest Blog Posts**, and **Events & Meetups** sections from components/assets already present in the repo. Fix the hardcoded four-project test, keep reported metrics correctly labeled, and review the final appearance on desktop/mobile before deployment.

---
*Prepared as a repository handoff. No source-code redesign is performed by this handoff document.*
