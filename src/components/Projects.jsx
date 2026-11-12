import { useState } from 'react'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

const CATEGORY_LABELS = {
  production: { label: 'Production', color: 'text-accent bg-accent/10 border-accent/20' },
  client: { label: 'Client', color: 'text-sky-300 bg-sky-400/10 border-sky-400/20' },
  learning: { label: 'Early Work', color: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
  engineering: { label: 'Experimental', color: 'text-amber-300 bg-amber-400/10 border-amber-400/20' },
}

const ACCENT_GLOW = {
  emerald: 'from-emerald-500/25 via-emerald-500/5 to-transparent',
  sky: 'from-sky-500/25 via-sky-500/5 to-transparent',
  violet: 'from-violet-500/25 via-violet-500/5 to-transparent',
  amber: 'from-amber-500/25 via-amber-500/5 to-transparent',
  rose: 'from-rose-500/25 via-rose-500/5 to-transparent',
  kesari: 'from-red-500/20 via-amber-500/10 to-transparent',
  zinc: 'from-zinc-500/20 via-zinc-500/5 to-transparent',
}

const FILTERS = ['All', 'Production', 'Client', 'Engineering', 'Early Work']
const filterMap = { All: null, Production: 'production', Client: 'client', Engineering: 'engineering', 'Early Work': 'learning' }

function KesariSpotlight({ project }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-red-500/25 bg-zinc-900/80 mb-8 group">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-600/15 via-zinc-950/40 to-amber-500/10" />
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-red-500/15 blur-3xl group-hover:bg-red-500/25 transition-colors" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-400/40 text-red-300 bg-red-500/10">
                Flagship project
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-accent/30 text-accent bg-accent/10">
                Main work
              </span>
              <span className="font-mono text-[10px] text-zinc-400 bg-zinc-950/60 border border-zinc-800 px-2.5 py-1 rounded-full">
                {project.company}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 ml-auto">{project.year}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              {project.logo && (
                <div className="rounded-xl border border-zinc-700/80 bg-zinc-950/80 px-4 py-3 shadow-[0_0_30px_rgba(227,30,36,0.12)]">
                  <img
                    src={project.logo}
                    alt="Kesari Select"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              )}
              <div>
                <p className="font-mono text-xs text-red-300 mb-1">{project.tagline}</p>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-zinc-50 tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-5">
              {project.description}
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-red-400/50 pl-3 mb-6 max-w-3xl">
              {project.role}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              {project.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-red-200 transition-colors"
                >
                  <ExternalLinkIcon /> Visit kesariselect.com
                </a>
              )}
            </div>
          </div>
        </div>

        {project.flow?.length > 0 && (
          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-4">
              Delivery flow
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.flow.map((step, index) => (
                <div
                  key={step.label}
                  className="relative rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] text-red-300 bg-red-500/10 border border-red-500/20 rounded-full w-6 h-6 inline-flex items-center justify-center">
                      {index + 1}
                    </span>
                    {index < project.flow.length - 1 && (
                      <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-600 text-sm z-10">→</span>
                    )}
                  </div>
                  <p className="font-display font-semibold text-zinc-100 text-sm">{step.label}</p>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-zinc-500 text-xs leading-relaxed max-w-3xl">
              A clean product path — public site, Laravel backend, integrations, and production shipping.
            </p>
          </div>
        )}

        {project.caseStudySlug && (
          <div className="mt-6">
            <Link to={'/projects/' + project.caseStudySlug} className="btn-primary">
              Read technical case study <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {project.highlights?.length > 0 && (
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {project.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-zinc-800/90 bg-zinc-950/40 px-3.5 py-3"
              >
                <span className="text-red-400 mt-0.5 text-xs">▸</span>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function FeaturedCard({ project }) {
  const cat = CATEGORY_LABELS[project.category]
  const glow = ACCENT_GLOW[project.accent] || ACCENT_GLOW.zinc

  return (
    <article className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 group hover:border-accent/30 transition-all duration-300">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} opacity-80`} />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-colors" />

      <div className="relative flex flex-col h-full gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.color}`}>
            {cat.label}
          </span>
          {project.company && (
            <span className="font-mono text-[10px] text-zinc-400 bg-zinc-950/50 border border-zinc-800 px-2 py-0.5 rounded-full">
              {project.company}
            </span>
          )}
          <span className="font-mono text-[10px] text-zinc-500 ml-auto">{project.year}</span>
        </div>

        <div>
          <p className="font-mono text-xs text-accent mb-2">{project.tagline}</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed border-l-2 border-accent/30 pl-3">
          {project.role}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          <div className="flex gap-3 ml-auto">
            {project.caseStudySlug && (
              <Link to={'/projects/' + project.caseStudySlug} className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-dim">Case study →</Link>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-dim transition-colors"
              >
                <ExternalLinkIcon /> Live site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-accent transition-colors"
              >
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }) {
  const cat = CATEGORY_LABELS[project.category]
  const glow = ACCENT_GLOW[project.accent] || ACCENT_GLOW.zinc

  return (
    <article className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col gap-3 h-full group hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-300">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} opacity-40 group-hover:opacity-70 transition-opacity`} />
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="font-mono text-[10px] text-accent mb-1">{project.tagline}</p>
            <h3 className="font-display font-semibold text-zinc-100 text-lg leading-tight">{project.title}</h3>
          </div>
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${cat.color}`}>
            {cat.label}
          </span>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 min-h-[60px]">{project.description}</p>

        {project.company && (
          <p className="font-mono text-[11px] text-zinc-500 mt-3">{project.company}</p>
        )}

        {project.learning && (
          <div className="border-l-2 border-amber-400/30 pl-3 mt-3">
            <p className="text-amber-400/70 text-xs">{project.learning}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 mt-auto">
          <span className="font-mono text-xs text-zinc-600">{project.year}</span>
          <div className="flex gap-3 ml-auto">
            {project.caseStudySlug && (
              <Link to={'/projects/' + project.caseStudySlug} className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-dim">Case study →</Link>
            )}
            {project.caseStudySlug && (
              <Link to={'/projects/' + project.caseStudySlug} className="text-xs text-accent hover:text-accent-dim">Case study →</Link>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-accent transition-colors">
                <ExternalLinkIcon /> Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-accent transition-colors">
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filterMap[filter])

  const spotlight = filtered.find((p) => p.spotlight)
  const featured = filtered.filter((p) => p.featured && !p.spotlight)
  const rest = filtered.filter((p) => !p.featured && !p.spotlight)

  return (
    <section id="projects" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(227,30,36,0.06),transparent_45%)]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="section-heading mb-2">Projects</h2>
            <p className="text-zinc-500 text-sm max-w-xl">
              Verified contributions across <span className="text-zinc-300">Kesari Select</span>, email automation and backend engineering experiments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filter === f
                    ? 'border-accent text-zinc-950 bg-accent shadow-[0_0_20px_rgba(110,231,183,0.25)]'
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {spotlight && <KesariSpotlight project={spotlight} />}

        {featured.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-5 mb-5">
            {featured.slice(0, 2).map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {(featured.length > 2 || rest.length > 0) && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
