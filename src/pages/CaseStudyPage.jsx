import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight, FiPlus } from 'react-icons/fi'
import { CASE_STUDIES } from '../data/caseStudies'
import projects from '../data/projects.json'

function ProjectStory({ study }) {
  const sections = [
    ['Overview', study.intro],
    ['Challenge', study.challenge],
    ['Approach', study.approach],
  ]

  return (
    <section className="case-reading" aria-labelledby="story-title">
      <h2 id="story-title" className="font-display text-3xl font-semibold tracking-tight">Project story</h2>
      {sections.map(([label, body]) => (
        <section key={label} className="case-paragraph">
          <h3>{label}</h3>
          <p className="portfolio-copy">{body}</p>
        </section>
      ))}
    </section>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.caseStudySlug === slug)
  const study = project && CASE_STUDIES[slug]
  const related = projects.filter((item) => item.caseStudySlug && item.caseStudySlug !== slug).slice(0, 2)

  useEffect(() => {
    if (!study) return

    const description = document.querySelector('meta[name="description"]')
    const canonical = document.querySelector('link[rel="canonical"]')
    const oldTitle = document.title
    const oldDescription = description?.getAttribute('content')
    const oldCanonical = canonical?.getAttribute('href')

    document.title = project.title + ' | Madin Bloch'
    description?.setAttribute('content', study.subtitle)
    canonical?.setAttribute('href', 'https://madin-bloch.vercel.app/projects/' + slug)

    return () => {
      document.title = oldTitle
      if (oldDescription) description?.setAttribute('content', oldDescription)
      if (oldCanonical) canonical?.setAttribute('href', oldCanonical)
    }
  }, [slug, study, project])

  if (!study) {
    return (
      <section className="portfolio-shell pb-24 pt-36">
        <h1 className="section-heading">Project not found</h1>
        <Link to="/projects" className="btn-primary mt-6">Back to work</Link>
      </section>
    )
  }

  return (
    <article className="portfolio-shell pb-20 pt-28 sm:pb-28 sm:pt-36">
      <Link to="/projects" className="link-accent mb-5 min-h-10 text-sm">
        <FiArrowLeft size={17} aria-hidden="true" /> Selected work
      </Link>
      <header className="project-feature hero-enter grid items-end gap-7 p-5 sm:p-8 lg:grid-cols-[1fr_.43fr] lg:p-10">
        <div>
          <p className="section-label">{project.category} · {project.year}</p>
          <h1 className="section-heading mt-3">{project.title}</h1>
          <p className="mt-4 max-w-2xl font-display text-[1.45rem] font-medium leading-tight text-[#d1f4df] sm:text-3xl">{study.title}</p>
          <p className="portfolio-copy mt-3 max-w-xl text-base">{study.subtitle}</p>
          {study.ctaUrl && (
            <a href={study.ctaUrl} target="_blank" rel="noreferrer" className="btn-outline mt-6">
              {study.ctaLabel} <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
        <div className="rounded-xl border border-[#365345] bg-[#142219] p-4">
          <p className="portfolio-meta mb-3">Tech stack</p>
          <ul className="flex flex-wrap gap-1.5">
            {study.stack.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
          </ul>
        </div>
      </header>

      {study.metrics?.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] sm:gap-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="portfolio-panel p-4 sm:p-5">
                <dt className="portfolio-copy text-xs font-semibold sm:text-sm">{metric.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-[#a8f3cb] sm:text-3xl">
                  {metric.value}
                </dd>
                <dd className="portfolio-meta mt-2">{metric.detail}</dd>
              </div>
            ))}
          </dl>
          {study.note && <p className="portfolio-meta mt-3">{study.note}</p>}
        </div>
      )}

      <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1fr_.85fr] lg:gap-7">
        <ProjectStory study={study} key={slug} />
        <section aria-labelledby="decision-title">
          <h2 id="decision-title" className="mb-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Engineering decisions</h2>
          <div className="grid gap-2.5">
            {study.decisions.map((decision, index) => (
              <details key={decision.title} className="portfolio-panel group" name={'decisions-' + slug} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.5rem] px-4 py-4 font-display text-lg font-medium leading-tight hover:text-accent sm:px-5 [&::-webkit-details-marker]:hidden">
                  {decision.title}
                  <FiPlus className="shrink-0 text-accent transition-transform group-open:rotate-45" size={19} aria-hidden="true" />
                </summary>
                <p className="portfolio-copy px-4 pb-4 text-sm sm:px-5">{decision.body}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="project-feature mt-8 p-5 sm:p-8" aria-labelledby="outcome-title">
        <h2 id="outcome-title" className="font-display text-2xl font-semibold tracking-tight">Outcome</h2>
        <p className="portfolio-copy mt-3 max-w-3xl text-base">{study.takeaway}</p>
      </section>

      {related.length > 0 && (
        <section className="mt-9 sm:mt-12" aria-labelledby="related-title">
          <h2 id="related-title" className="font-display text-2xl font-semibold tracking-tight">More case studies</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.id} to={'/projects/' + item.caseStudySlug} className="portfolio-panel group flex items-center justify-between gap-3 p-5 transition-colors hover:border-accent/55">
                <div>
                  <p className="portfolio-meta">{item.category}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold transition-colors group-hover:text-accent">{item.title}</h3>
                </div>
                <FiArrowUpRight className="shrink-0 text-accent" size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
