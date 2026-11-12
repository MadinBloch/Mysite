import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CASE_STUDIES } from '../data/caseStudies'

function DetailList({ title, items }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-zinc-100 mb-5">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm sm:text-base text-zinc-300 leading-7">
            <span className="text-accent" aria-hidden="true">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = CASE_STUDIES[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
    const previousTitle = document.title
    const canonical = document.querySelector('link[rel="canonical"]')
    const oldCanonical = canonical?.getAttribute('href')
    const description = document.querySelector('meta[name="description"]')
    const originalDescription = description?.getAttribute('content')
    if (study) {
      document.title = study.title + ' | Madin Bloch'
      description?.setAttribute('content', study.subtitle)
      canonical?.setAttribute('href', 'https://madin-bloch.vercel.app/projects/' + slug)
    }
    return () => {
      document.title = previousTitle
      if (originalDescription) description?.setAttribute('content', originalDescription)
      if (oldCanonical) canonical?.setAttribute('href', oldCanonical)
    }
  }, [slug, study])

  if (!study) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-36 pb-32">
        <h1 className="font-display text-3xl text-white mb-5">Case study not found</h1>
        <Link className="link-accent" to="/#projects">Back to projects</Link>
      </div>
    )
  }

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-28">
      <Link to="/#projects" className="inline-flex text-sm text-zinc-400 hover:text-accent mb-8">← All projects</Link>
      <div className="border-b border-zinc-800 pb-10 mb-8">
        <div className="font-mono text-xs text-accent uppercase tracking-wider mb-4">Technical case study · {study.period}</div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white max-w-4xl">{study.title}</h1>
        <p className="text-lg text-zinc-300 mt-5 max-w-3xl">{study.subtitle}</p>
        <p className="text-sm sm:text-base text-zinc-400 leading-7 mt-5 max-w-3xl">{study.summary}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {study.stack.map((skill) => <span className="tag" key={skill}>{skill}</span>)}
        </div>
        {study.external && <a href={study.external} target="_blank" rel="noreferrer" className="link-accent inline-flex mt-6 text-sm">{study.externalLabel} ↗</a>}
      </div>

      <div className="grid gap-5">
        <section className="grid sm:grid-cols-2 gap-5">
          <div className="card"><h2 className="font-display text-xl font-semibold text-white mb-3">The problem</h2><p className="text-zinc-300 text-sm leading-7">{study.problem}</p></div>
          <div className="card"><h2 className="font-display text-xl font-semibold text-white mb-3">My role</h2><p className="text-zinc-300 text-sm leading-7">{study.role}</p></div>
        </section>
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-white mb-6">How it works</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {study.architecture.map((part, index) => (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5" key={part.title}>
                <p className="text-accent font-mono text-xs mb-3">0{index + 1}</p>
                <h3 className="font-semibold text-zinc-100 mb-2">{part.title}</h3>
                <p className="text-sm text-zinc-400 leading-6">{part.description}</p>
              </div>
            ))}
          </div>
        </section>
        <DetailList title="What I implemented" items={study.contributions} />
        <DetailList title="Engineering decisions" items={study.decisions} />
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-white mb-4">Outcome & evidence</h2>
          <p className="text-zinc-300 text-sm leading-7">{study.outcome}</p>
          <p className="text-zinc-500 text-xs leading-6 border-t border-zinc-800 mt-5 pt-4">{study.evidence}</p>
        </section>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/#projects" className="btn-primary">Back to projects</Link>
        <a href="/Madin_Bloch_Resume.pdf" download className="btn-ghost">Download resume</a>
      </div>
    </article>
  )
}
