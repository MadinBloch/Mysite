import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArchive, FiBriefcase, FiLayers, FiMail, FiPrinter, FiShield } from 'react-icons/fi'
import projects from '../data/projects.json'
import { CASE_STUDIES } from '../data/caseStudies'
import { kesariPageLoad } from '../data/siteStats'

const samples = [
  {
    slug: 'kesari-select-backend',
    icon: FiBriefcase,
    heading: 'Laravel backend for travel operations',
    contribution: 'I added export logs and recovery checks for late ERP records. Finance can trace which records went out and include missed ones in a later export.',
  },
  {
    slug: 'email-campaign-engine',
    icon: FiMail,
    heading: 'Excel imports and queued email campaigns',
    contribution: 'I built an Excel import that validates recipients and saves them in batches. Laravel workers send the campaign in the background while operators track progress, pause or resume sending.',
  },
  {
    slug: 'smart-print-operations',
    icon: FiPrinter,
    heading: 'Consistent job sheets for print teams',
    contribution: 'I updated inquiry intake and made print, web and other job sheets use the same VAT and validation rules.',
  },
].map(sample => ({ ...sample, project: projects.find(project => project.caseStudySlug === sample.slug) }))

function Evidence({ slug }) {
  if (slug === 'kesari-select-backend') {
    const { before, after } = kesariPageLoad
    return (
      <figure className="work-evidence" aria-label="Before and after page load times">
        <figcaption>Production page load</figcaption>
        <dl className="load-times">
          {[['Before', before], ['After', after]].map(([label, seconds]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <strong>{seconds}<span> s</span></strong>
                <span className="load-track" aria-hidden="true"><i style={{ width: (seconds / before * 100) + '%' }} /></span>
              </dd>
            </div>
          ))}
        </dl>
        <p>Approximate times I observed on one Travel Assist Platform page.</p>
      </figure>
    )
  }

  if (slug === 'smart-print-operations') {
    return (
      <div className="work-evidence">
        <p className="evidence-label">Changes in Smart Print</p>
        <ul className="work-changes">
          <li>
            <FiShield aria-hidden="true" />
            <div><strong>Role checks</strong><p>Apply the same permissions across screens.</p></div>
          </li>
          <li>
            <FiArchive aria-hidden="true" />
            <div><strong>Soft deletes</strong><p>Keep deleted records available for recovery.</p></div>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="work-evidence">
      <p className="evidence-label">Recipient import benchmark</p>
      <dl className="work-measures">
        {CASE_STUDIES[slug].metrics.slice(0, 2).map(({ label, value }) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <p>I measured the database insert for the batch.</p>
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
              <p className="sample-context">{sample.project.title} <span aria-hidden="true">·</span> {sample.project.year}</p>
              <h3>{sample.heading}</h3>
              <p>{sample.contribution}</p>
              <Link to={'/projects/' + sample.slug} className="sample-link">
                Read the case study<span className="sr-only"> for {sample.project.title}</span>
              </Link>
            </div>
            <Evidence slug={sample.slug} />
          </div>
        </div>
      </div>
    </section>
  )
}
