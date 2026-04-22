import { useState } from 'react'
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
  client: { label: 'Client Work', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  learning: { label: 'Early Work', color: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
}

function ProjectCard({ project }) {
  const cat = CATEGORY_LABELS[project.category]
  return (
    <div className="card flex flex-col gap-3 h-full hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)] transition-all">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-zinc-100 text-base leading-tight">{project.title}</h3>
        <span className={`font-mono text-xs px-2 py-0.5 rounded border whitespace-nowrap ${cat.color}`}>
          {cat.label}
        </span>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 min-h-[40px]">{project.description}</p>

      {project.role && (
        <div>
          <p className="font-mono text-xs text-zinc-600 mb-1">// my role</p>
          <p className="text-zinc-500 text-xs">{project.role}</p>
        </div>
      )}

      {project.learning && (
        <div className="border-l-2 border-amber-400/30 pl-3">
          <p className="text-amber-400/70 text-xs">{project.learning}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <span className="font-mono text-xs text-zinc-600">{project.year}</span>
        <div className="flex gap-3 ml-auto">
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
  )
}

const FILTERS = ['All', 'Production', 'Client Work', 'Early Work']
const filterMap = { 'All': null, 'Production': 'production', 'Client Work': 'client', 'Early Work': 'learning' }

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filterMap[filter])

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Work</p>
        <h2 className="section-heading mb-2">Projects</h2>
        <p className="text-zinc-500 text-sm mb-8">
          Real projects — production systems, client work, and early experiments.
        </p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
                filter === f
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
