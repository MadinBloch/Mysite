import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CASE_STUDIES } from '../data/caseStudies'
import projects from '../data/projects.json'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = CASE_STUDIES[slug]
  const project = projects.find((item) => item.caseStudySlug === slug)
  const related = projects.filter((item) => item.caseStudySlug && item.caseStudySlug !== slug).slice(0, 2)
  const [storyTab, setStoryTab] = useState('overview')
  const [decisionIndex, setDecisionIndex] = useState(0)

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
    setStoryTab('overview')
    setDecisionIndex(0)
    window.scrollTo(0, 0)
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
        <Link to="/#projects" className="mt-5 inline-flex text-accent">
          Back to projects ↗
        </Link>
      </section>
    )
  }

  const storyTabs = [
    { id: 'overview', label: 'Overview', body: study.intro },
    { id: 'challenge', label: 'The challenge', body: study.challenge },
    { id: 'approach', label: 'My approach', body: study.approach },
  ]
  const activeStory = storyTabs.find((tab) => tab.id === storyTab) || storyTabs[0]
  const activeDecision = study.decisions[decisionIndex] || study.decisions[0]

  return (
    <article className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(110,231,183,0.12),transparent_60%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/#projects" className="inline-flex text-xs font-medium text-zinc-400 transition-colors hover:text-accent">
            ← Back to projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Case study {study.number}
            </span>
            <span className="rounded-full border border-zinc-700 px-3 py-1 font-mono text-[10px] text-zinc-400">
              {project.category} · {project.year}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.05] tracking-[-.04em] text-white">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-zinc-200">{study.title}</p>
          <p className="mt-3 max-w-2xl text-base leading-8 text-zinc-400">{study.subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {study.stack.map((stack) => (
              <span key={stack} className="tag">
                {stack}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {study.ctaUrl && (
              <a href={study.ctaUrl} target="_blank" rel="noreferrer" className="btn-primary">
                {study.ctaLabel || 'Open live'} <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">
              Download resume ↓
            </a>
            <a
              href={`mailto:madinkhan0633@gmail.com?subject=${encodeURIComponent('About your project - ' + project.title)}`}
              className="btn-ghost"
            >
              Say hello
            </a>
          </div>
        </motion.div>

        {study.metrics?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {study.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
                <p className="font-display text-2xl font-bold text-accent">{metric.value}</p>
                <p className="mt-2 text-sm font-medium text-zinc-200">{metric.label}</p>
                <p className="mt-1 text-[11px] leading-5 text-zinc-500">{metric.detail}</p>
              </div>
            ))}
          </motion.section>
        )}

        <section className="mt-14">
          <p className="section-label">Project story</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">Overview path</h2>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Project story tabs">
            {storyTabs.map((tab) => {
              const active = storyTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setStoryTab(tab.id)}
                  className={
                    'rounded-full border px-4 py-2.5 text-sm font-medium transition-all ' +
                    (active
                      ? 'border-accent/50 bg-accent text-zinc-950 shadow-[0_0_24px_rgba(110,231,183,0.2)]'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white')
                  }
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 min-h-[160px] rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{activeStory.label}</p>
                <p className="mt-3 text-sm leading-8 text-zinc-300">{activeStory.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="mt-14">
          <p className="section-label">Behind the implementation</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">Engineering decisions</h2>
          <p className="mt-2 text-sm text-zinc-500">Click a decision tab — details open below.</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap" role="tablist" aria-label="Engineering decisions">
            {study.decisions.map((decision, index) => {
              const active = decisionIndex === index
              return (
                <button
                  key={decision.title}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDecisionIndex(index)}
                  className={
                    'rounded-2xl border px-4 py-3 text-left transition-all sm:min-w-[220px] sm:flex-1 ' +
                    (active
                      ? 'border-accent/45 bg-accent/10 shadow-[0_0_30px_rgba(110,231,183,0.08)]'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600')
                  }
                >
                  <span className="font-mono text-[11px] text-accent">0{index + 1}</span>
                  <span className={'mt-1 block text-sm font-semibold ' + (active ? 'text-accent' : 'text-white')}>
                    {decision.title}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDecision.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">0{decisionIndex + 1}</span>
                  <h3 className="font-display text-xl font-semibold text-accent">{activeDecision.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-8 text-zinc-300">{activeDecision.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/[.09] via-zinc-900 to-zinc-950 p-6 sm:p-8">
          <p className="section-label">Outcome</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-200">{study.takeaway}</p>
          {study.note && <p className="mt-5 border-t border-zinc-800 pt-4 text-[11px] leading-6 text-zinc-500">{study.note}</p>}
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <p className="section-label">Keep exploring</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">Related project stories</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={'/projects/' + item.caseStudySlug}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:-translate-y-1 hover:border-accent/35"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{item.type}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white group-hover:text-accent">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">{item.description}</p>
                  <span className="mt-4 inline-flex text-xs font-semibold text-zinc-300 group-hover:text-accent">
                    Open story ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link to="/#projects" className="btn-primary">
            See more projects ↗
          </Link>
          <a href="mailto:madinkhan0633@gmail.com?subject=Let's%20connect" className="btn-outline">
            Say hello ↗
          </a>
        </div>
      </div>
    </article>
  )
}
