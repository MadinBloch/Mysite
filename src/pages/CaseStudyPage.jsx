import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CASE_STUDIES } from '../data/caseStudies'
import projects from '../data/projects.json'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = CASE_STUDIES[slug]
  const project = projects.find(item => item.caseStudySlug === slug)

  useEffect(() => {
    const oldTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content')
    const canonical = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href')
    if (study) {
      document.title = (project?.title || 'Project') + ' | Madin Bloch'
      description?.setAttribute('content', study.subtitle)
      canonical?.setAttribute('href', 'https://madin-bloch.vercel.app/projects/' + slug)
    }
    return () => {
      document.title = oldTitle
      if (previousDescription) description?.setAttribute('content', previousDescription)
      if (previousCanonical) canonical?.setAttribute('href', previousCanonical)
    }
  }, [slug, study, project])

  if (!study || !project) {
    return (
      <section className="mx-auto max-w-4xl px-5 pb-36 pt-36">
        <h1 className="font-display text-3xl font-semibold text-white">Project not found</h1>
        <Link to="/#projects" className="mt-5 inline-flex text-accent">Back to projects ↗</Link>
      </section>
    )
  }

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Link to="/#projects" className="inline-flex text-xs font-medium text-[#a9b6d2] hover:text-accent">← Back to projects</Link>
        <p className="eyebrow mt-12">{project.category} / {project.year}</p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-[-.055em] text-white">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#b3bed7]">{study.subtitle}</p>
        <div className="mt-7 flex flex-wrap gap-2">{study.stack.map(stack => <span key={stack} className="tag">{stack}</span>)}</div>

        <div className="my-12 h-px bg-white/10" />

        <section className="grid gap-4 sm:grid-cols-[150px_1fr] sm:gap-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">Overview</h2>
          <p className="text-sm leading-8 text-[#bec7d9]">{study.intro}</p>
        </section>

        <div className="my-10 h-px bg-white/10" />

        <div className="grid gap-5 sm:grid-cols-2">
          <section className="rounded-[20px] border border-white/10 bg-[#151e2d] p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-white">The challenge</h2>
            <p className="mt-4 text-[13px] leading-7 text-[#acb8d0]">{study.challenge}</p>
          </section>
          <section className="rounded-[20px] border border-white/10 bg-[#151e2d] p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-white">My approach</h2>
            <p className="mt-4 text-[13px] leading-7 text-[#acb8d0]">{study.approach}</p>
          </section>
        </div>

        <section className="mt-12">
          <p className="eyebrow">Behind the implementation</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">A few engineering decisions</h2>
          <div className="mt-6 space-y-3">
            {study.decisions.slice(0, 4).map((decision, index) => (
              <div key={decision.title} className="flex gap-5 rounded-2xl border border-white/10 bg-[#141c2b] p-5 sm:p-6">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{decision.title}</h3>
                  <p className="mt-2 text-[13px] leading-7 text-[#aab6cf]">{decision.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[20px] border border-accent/20 bg-accent/[.065] p-6 sm:p-7">
          <h2 className="font-display text-xl font-semibold text-white">Outcome</h2>
          <p className="mt-3 text-[13px] leading-7 text-[#bfcae1]">{study.takeaway}</p>
          {study.note && <p className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-6 text-[#8393b3]">{study.note}</p>}
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/#projects" className="btn-primary">See more projects ↗</Link>
          <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">Download resume ↓</a>
        </div>
      </div>
    </article>
  )
}
