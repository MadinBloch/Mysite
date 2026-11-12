import { Link } from 'react-router-dom'
import AnimatedNumber from './AnimatedNumber'
import projects from '../data/projects.json'

const surfaces = {
  blue: 'from-[#192947] via-[#172a48] to-[#111b2f]',
  purple: 'from-[#362753] via-[#292344] to-[#181c30]',
  teal: 'from-[#163a3e] via-[#193140] to-[#101e2b]',
  slate: 'from-[#262e44] via-[#1d2740] to-[#141e2e]'
}

function ProjectVisual({ project }) {
  return (
    <div className={'relative flex h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br ' + (surfaces[project.theme] || surfaces.slate)}>
      <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-3 -top-10 h-44 w-44 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-12 h-64 w-64 rounded-full bg-white/[.035]" />
      {project.logo ? (
        <div className="relative flex h-[92px] w-[205px] items-center justify-center rounded-2xl border border-white/15 bg-[#0c1220]/65 px-6 shadow-2xl shadow-black/30 backdrop-blur-md">
          <img src={project.logo} alt="Kesari Select logo" loading="lazy" className="max-h-[65px] w-auto max-w-full object-contain" />
        </div>
      ) : project.id === 3 ? (
        <div className="relative flex items-center gap-4 rounded-2xl border border-white/20 bg-[#121528]/55 px-6 py-5 shadow-xl backdrop-blur-md">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bbadff]/20 text-3xl text-[#d0c3ff]" aria-hidden="true">✉</span>
          <div><p className="text-base font-semibold tracking-tight text-white">Email Campaign</p><p className="mt-1 font-mono text-xs text-[#c1b9dd]">Excel → Queue → Send</p></div>
        </div>
      ) : project.id === 1 ? (
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#adf8e1]/25 bg-[#b5ffee]/10 font-display text-[44px] font-bold tracking-[-.07em] text-[#c1fff0] shadow-2xl shadow-black/20">SP.</div>
      ) : (
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 font-mono text-[36px] font-semibold tracking-[-.1em] text-white shadow-2xl shadow-black/20">&lt;/&gt;</div>
      )}
      <span className="absolute bottom-4 right-5 rounded-md border border-white/15 bg-[#0b1020]/30 px-2.5 py-1 font-mono text-[10px] text-[#cdd6e8] backdrop-blur-sm">{project.category}</span>
    </div>
  )
}

function ProjectCard({ project }) {
  const destination = project.caseStudySlug ? '/projects/' + project.caseStudySlug : project.github
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[23px] border border-white/10 bg-[#151e2d] transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_20px_60px_rgba(0,0,0,.2)]">
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[.09em] text-accent">{project.type}</span>
          <span className="font-mono text-[11px] text-[#7f8ca7]">{project.year}</span>
        </div>
        <h3 className="font-display text-[27px] font-semibold tracking-tight text-white">{project.title}</h3>
        <p className="mt-3 min-h-[74px] text-[13px] leading-7 text-[#aeb9d0]">{project.description}</p>
        {project.metric ? (
          <p className="mt-5 flex flex-wrap items-baseline gap-2 border-l-2 border-accent/60 pl-3 text-xs text-[#aeb9d0]">
            <AnimatedNumber a={project.metric.value} suffix={project.metric.suffix} className="font-display text-[22px] font-bold text-white" />
            <span>{project.metric.label}</span>
          </p>
        ) : (
          <p className="mt-5 border-l-2 border-white/20 pl-3 text-xs leading-5 text-[#9daac3]">{project.contribution}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="mt-auto border-t border-white/10 pt-5">
          {project.caseStudySlug ? (
            <Link to={destination} className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent hover:text-white">View project <span aria-hidden="true">↗</span></Link>
          ) : (
            <a href={destination} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent hover:text-white">View on GitHub <span aria-hidden="true">↗</span></a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="border-t border-white/[.06] bg-[#101726] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Things I've built</p>
            <h2 className="section-heading mt-3">Selected projects<span className="text-accent">.</span></h2>
          </div>
          <p className="max-w-[355px] text-sm leading-7 text-[#92a0be]">A mix of production experience, business software and personal experiments.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
        <p className="mt-6 text-[11px] leading-6 text-[#8290ad]">Reported platform and ingestion figures are approximate and reflect developer-provided context. Email import speed is separate from email delivery speed.</p>
        <div className="mt-8 flex justify-center">
          <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="btn-outline">More on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
