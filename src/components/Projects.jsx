import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowUpRight, FiBookOpen, FiCpu, FiGithub, FiMail, FiPrinter, FiTruck, FiUsers,
} from 'react-icons/fi'
import projects from '../data/projects.json'
import Impact from './Impact'
import { SectionReveal } from './motion/SectionReveal'

const filters = ['All', 'Production', 'Internal Product', 'Experimental', 'Early Work']
const featured = projects.find((project) => project.caseStudySlug === 'kesari-select-backend')
const icons = {
  1: FiPrinter,
  2: FiUsers,
  3: FiMail,
  6: FiTruck,
  7: FiBookOpen,
  8: FiCpu,
}

function Stack({ technologies }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
      {technologies.map((technology) => <li key={technology} className="tag">{technology}</li>)}
    </ul>
  )
}

function FeaturedProject({ project }) {
  return (
    <article className="project-feature">
      <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1fr_.7fr] lg:items-center lg:gap-12 lg:p-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#b7edcd]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {project.type}
            </span>
            <span className="portfolio-meta">{project.year}</span>
          </div>
          <h3 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.045em]">
            {project.title}
          </h3>
          <p className="portfolio-copy mt-4 max-w-[36rem] text-[0.95rem] sm:text-base">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link to={'/projects/' + project.caseStudySlug} className="btn-primary">
              Read case study <FiArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={project.live} target="_blank" rel="noreferrer" className="btn-outline">
              Public website <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-[#426051] bg-[#14231b] p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            <div className="grid min-h-[3.2rem] w-24 shrink-0 place-items-center rounded-xl bg-[#0b130e] px-2.5">
              <img src={project.logo} alt="" width="258" height="113" loading="lazy" decoding="async" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-tight">Travel Assist Platform</p>
              <p className="portfolio-meta mt-1">Laravel · ERP · AWS</p>
            </div>
          </div>
          <p className="portfolio-copy my-4 border-y border-[#345043] py-4 text-sm">{project.contribution}</p>
          <Stack technologies={project.tech} />
        </div>
      </div>
      <Impact />
    </article>
  )
}

function ProjectCard({ project }) {
  const Icon = icons[project.id] || FiCpu

  return (
    <article className="portfolio-panel group flex h-full min-w-0 flex-col p-5 transition-colors hover:border-[#527c67] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#3a5847] bg-[#213529] text-accent">
          <Icon size={20} aria-hidden="true" />
        </span>
        <p className="portfolio-meta text-right">{project.type} · {project.year}</p>
      </div>
      <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-tight tracking-tight">{project.title}</h3>
      <p className="portfolio-copy mt-2 flex-1 text-sm">{project.description}</p>
      <p className="mb-4 mt-4 text-sm font-medium leading-relaxed text-[#cee9d8]">{project.contribution}</p>
      <Stack technologies={project.tech} />

      {(project.caseStudySlug || project.github || project.live) && (
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#33443a] pt-4 text-sm">
          {project.caseStudySlug && (
            <Link to={'/projects/' + project.caseStudySlug} className="link-accent" aria-label={'Read ' + project.title + ' case study'}>
              Case study <FiArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="link-accent">
              GitHub <FiArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="link-accent">
              {project.live.includes('youtu') ? 'Watch demo' : 'Live site'} <FiArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const reduce = useReducedMotion()
  const visibleProjects = projects.filter((project) => filter === 'All' || project.type === filter)
  const otherProjects = visibleProjects.filter((project) => project !== featured)

  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-9">
          <h2 id="projects-title" className="section-heading">Selected work</h2>
          <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="btn-outline">
            <FiGithub size={17} aria-hidden="true" /> GitHub profile <FiArrowUpRight size={15} aria-hidden="true" />
          </a>
        </SectionReveal>

        <div className="mb-5 flex flex-wrap gap-2 sm:mb-6" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className="filter-button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{visibleProjects.length} projects</p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            className="space-y-4 sm:space-y-5"
          >
            {visibleProjects.includes(featured) && <FeaturedProject project={featured} />}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {otherProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
