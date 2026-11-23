import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowUpRight, FiBookOpen, FiChevronDown, FiCpu, FiGithub, FiMail, FiPrinter, FiTruck, FiUsers,
} from 'react-icons/fi'
import projects from '../data/projects.json'
import { profile } from '../data/profile'
import { SectionReveal } from './motion/SectionReveal'

const filters = ['All', 'Production', 'Internal Product', 'Experimental', 'Early Work']
const earlyProjects = projects.filter(project => project.type === 'Early Work')
const icons = { 1: FiPrinter, 2: FiUsers, 3: FiMail, 6: FiTruck, 7: FiBookOpen, 8: FiCpu }

function ProjectCard({ project }) {
  const Icon = icons[project.id] || FiCpu
  const hasLinks = project.caseStudySlug || project.github || project.live
  const liveLabel = project.live?.includes('youtu') ? 'Watch demo' : project.logo ? 'Public website' : 'Live site'

  return (
    <article id={'project-' + project.id} className="portfolio-panel project-card">
      <div className="project-meta">
        {project.logo ? (
          <img src={project.logo} alt="" width="258" height="113" loading="lazy" decoding="async" />
        ) : (
          <span className="project-icon"><Icon aria-hidden="true" /></span>
        )}
        <p className="portfolio-meta">{project.type} · {project.year}</p>
      </div>
      <h2>{project.title}</h2>
      <p className="portfolio-copy">{project.description}</p>
      <p className="project-contribution">{project.contribution}</p>
      <footer className="project-footer">
        <ul aria-label="Technologies">
          {project.tech.map(technology => <li key={technology} className="tag">{technology}</li>)}
        </ul>
        {hasLinks && (
          <div className="project-links">
            {project.caseStudySlug && (
              <Link to={'/projects/' + project.caseStudySlug} aria-label={'Read ' + project.title + ' case study'}>
                Case study <FiArrowUpRight aria-hidden="true" />
              </Link>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" aria-label={project.title + ' on GitHub'}>
                GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" aria-label={liveLabel + ' for ' + project.title}>
                {liveLabel} <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </footer>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const current = projects.filter(project => project.type !== 'Early Work' && (filter === 'All' || project.type === filter))
  const showEarly = earlyProjects.length > 0 && (filter === 'All' || filter === 'Early Work')

  return (
    <section id="projects" className="section-shell destination-section" aria-labelledby="projects-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-9">
          <h1 id="projects-title" className="destination-title">Selected <em>work.</em></h1>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-outline">
            <FiGithub size={17} aria-hidden="true" /> GitHub profile <FiArrowUpRight size={15} aria-hidden="true" />
          </a>
        </SectionReveal>
        <div className="mb-5 flex flex-wrap gap-2 sm:mb-6" role="group" aria-label="Filter projects">
          {filters.map(item => (
            <button key={item} type="button" className="filter-button" aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{current.length + (showEarly ? earlyProjects.length : 0)} projects</p>
        {current.length > 0 && (
          <div className="project-grid">
            {current.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        )}
        {showEarly && (
          <details className="early-projects" key={filter} open={filter === 'Early Work'}>
            <summary>More early projects <FiChevronDown aria-hidden="true" /></summary>
            <div className="project-grid">
              {earlyProjects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
