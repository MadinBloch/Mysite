import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiLayers, FiMail, FiPrinter } from 'react-icons/fi'
import projects from '../data/projects.json'
import { CASE_STUDIES } from '../data/caseStudies'
import { kesariPageLoad } from '../data/siteStats'

const samples = [
  {
    slug: 'kesari-select-backend',
    icon: FiBriefcase,
    heading: 'Less waiting on a travel workflow.',
    contribution: 'I optimized a slow page in Kesari Select’s Travel Assist Platform. My work also covers the Laravel APIs, ERP exports and production releases used by Sales, Operations and Finance.',
  },
  {
    slug: 'email-campaign-engine',
    icon: FiMail,
    heading: 'From spreadsheet to a queued campaign.',
    contribution: 'I built an Excel import that validates recipients and writes them in batches. Laravel workers handle delivery separately, so operators can check progress and pause or resume sending.',
  },
  {
    slug: 'smart-print-operations',
    icon: FiPrinter,
    heading: 'Safer changes to live print jobs.',
    contribution: 'I worked on a running print-operations app. I aligned role checks across screens, added recoverable deletes and made job sheets use the same validation rules.',
  },
].map(sample => ({ ...sample, project: projects.find(project => project.caseStudySlug === sample.slug) }))

function Evidence({ slug }) {
  if (slug === 'kesari-select-backend') {
    const { before, after } = kesariPageLoad
    return (
      <figure className="work-evidence" aria-label="Observed load time on one TAP page">
        <figcaption>Observed page load</figcaption>
        <dl className="load-times">
          {[['Before', before], ['After', after]].map(([label, seconds]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <strong>≈ {seconds} s</strong>
                <span className="load-track" aria-hidden="true"><i style={{ width: (seconds / before * 100) + '%' }} /></span>
              </dd>
            </div>
          ))}
        </dl>
        <p>One production page, timed by me.</p>
      </figure>
    )
  }

  const study = CASE_STUDIES[slug]
  return (
    <div className="work-evidence">
      <p className="evidence-label">{slug === 'email-campaign-engine' ? 'Database import test' : 'Contribution record'}</p>
      <dl className="work-measures">
        {study.metrics.slice(0, 2).map(({ label, value }) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <p>{slug === 'email-campaign-engine' ? 'Timed from insertion to completion of the database batch.' : 'May–June 2025, including 22 non-merge commits.'}</p>
    </div>
  )
}

export default function WorkHighlights() {
  const [active, setActive] = useState(0)
  const controls = useRef([])
  const sample = samples[active]

  function handleKeys(event, index) {
    const last = samples.length - 1
    const next = { ArrowLeft: (index + last) % samples.length, ArrowRight: (index + 1) % samples.length, Home: 0, End: last }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    controls.current[next]?.focus()
  }

  return (
    <section id="selected-work" className="work-highlights" aria-labelledby="work-highlights-title">
      <div className="portfolio-shell">
        <div className="work-heading">
          <h2 id="work-highlights-title" className="editorial-heading">Selected <em>work.</em></h2>
          <Link to="/projects" className="quiet-link"><FiLayers aria-hidden="true" />All projects</Link>
        </div>
        <div className="work-tabs" role="tablist" aria-label="Featured projects">
          {samples.map(({ slug, icon: Icon, project }, index) => (
            <button
              key={slug}
              id={'tab-' + slug}
              type="button"
              role="tab"
              tabIndex={active === index ? 0 : -1}
              aria-selected={active === index}
              aria-controls="work-sample"
              ref={node => { controls.current[index] = node }}
              onKeyDown={event => handleKeys(event, index)}
              onClick={() => setActive(index)}
            >
              <Icon aria-hidden="true" /> {project.title}
            </button>
          ))}
        </div>
        <div id="work-sample" role="tabpanel" aria-labelledby={'tab-' + sample.slug} tabIndex={0} className="work-sample">
          <div className="sample-layout" key={sample.slug}>
            <div className="sample-story">
              <p className="sample-context">{sample.project.category} <span>·</span> {sample.project.year}</p>
              <h3>{sample.heading}</h3>
              <p>{sample.contribution}</p>
              <Link to={'/projects/' + sample.slug} className="sample-link">Read the case study<span className="sr-only"> for {sample.project.title}</span></Link>
            </div>
            <Evidence slug={sample.slug} />
          </div>
        </div>
      </div>
    </section>
  )
}
