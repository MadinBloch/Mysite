import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import projects from '../data/projects.json'
import { SectionReveal } from './motion/SectionReveal'

const filters = ['All', 'Production', 'Internal Product', 'Experimental', 'Early Work']

const typeStyles = {
  Production: 'border-accent/30 bg-accent/10 text-accent',
  'Internal Product': 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  Experimental: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  'Early Work': 'border-zinc-600 bg-zinc-800/80 text-zinc-400',
}

function ProjectCard({ project, featured }) {
  const badgeClass = typeStyles[project.type] || typeStyles['Early Work']

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.985 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/65 p-6 sm:p-7 ' +
        (featured ? 'md:col-span-2 md:flex-row md:items-stretch md:gap-8 md:p-8' : '')
      }
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/12 blur-3xl" />
      </div>

      <div className={'relative ' + (featured ? 'md:w-[44%] md:shrink-0' : '')}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className={'inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide ' + badgeClass}>
            {project.type}
          </span>
          <span className="font-mono text-[11px] text-zinc-500">{project.year}</span>
        </div>

        {project.tagline && (
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">{project.tagline}</p>
        )}

        <div className="mb-3 flex items-center gap-3">
          {project.logo && (
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950/80 p-1.5">
              <img src={project.logo} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
            </span>
          )}
          <h3 className="font-display text-[1.35rem] font-semibold tracking-tight text-white transition-colors group-hover:text-accent sm:text-[1.5rem]">
            {project.title}
          </h3>
        </div>

        <p className={'text-[13px] leading-7 text-zinc-400 ' + (featured ? 'sm:text-[14px] sm:leading-8' : 'min-h-[64px]')}>
          {project.description}
        </p>
      </div>

      <div className={'relative mt-5 flex flex-1 flex-col ' + (featured ? 'md:mt-0 md:border-l md:border-zinc-800/90 md:pl-8' : '')}>
        {project.contribution && (
          <p className="rounded-xl border border-accent/15 bg-accent/[.04] px-3.5 py-3 text-xs leading-5 text-zinc-300">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Outcome</span>
            <span className="mt-1.5 block">{project.contribution}</span>
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="tag transition-colors group-hover:border-accent/25 group-hover:text-zinc-200">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-zinc-800/90 pt-5">
          {project.caseStudySlug && (
            <Link
              to={'/projects/' + project.caseStudySlug}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-zinc-950 transition-transform group-hover:scale-[1.02]"
            >
              Case study <span aria-hidden="true">↗</span>
            </Link>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-zinc-400 hover:text-accent">
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-zinc-400 hover:text-accent">
              {project.live.includes('youtu') ? 'Watch demo ↗' : 'Live ↗'}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.type === filter)),
    [filter],
  )

  return (
    <section id="projects" className="relative border-y border-zinc-900/80 bg-zinc-900/25 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="section-heading mt-2">Projects that shipped</h2>
          </div>
          <p className="max-w-[340px] text-sm leading-7 text-zinc-500">
            Filter by type. Open a case study when you want the engineering story.
          </p>
        </SectionReveal>

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
          {filters.map((item) => {
            const active = filter === item
            const count = item === 'All' ? projects.length : projects.filter((p) => p.type === item).length
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={
                  'rounded-full border px-3.5 py-2 font-mono text-[11px] transition-all duration-200 ' +
                  (active
                    ? 'border-accent/50 bg-accent text-zinc-950 shadow-[0_0_20px_rgba(110,231,183,0.22)]'
                    : 'border-zinc-700/90 bg-zinc-950/30 text-zinc-400 hover:border-zinc-500 hover:text-white')
                }
              >
                {item}
                <span className={'ml-2 ' + (active ? 'text-zinc-800' : 'text-zinc-600')}>{count}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <div key={project.id} className={index === 0 && filter === 'All' ? 'md:col-span-2' : ''}>
                <ProjectCard project={project} featured={index === 0 && filter === 'All'} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-2 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-5 py-10 text-center text-sm text-zinc-500">
            Nothing in this filter yet — try another type.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="btn-outline">
            More on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
