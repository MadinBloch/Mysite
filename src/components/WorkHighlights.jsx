import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiMail } from 'react-icons/fi'
import projects from '../data/projects.json'
import { CASE_STUDIES } from '../data/caseStudies'
import { kesariPageLoad } from '../data/siteStats'

const cases = ['kesari-select-backend', 'email-campaign-engine', 'smart-print-operations']
const more = ['HRM System', 'DevCommand AI', 'Book Server'].map(title => projects.find(project => project.title === title))

function CaseFigure({ slug, study }) {
  if (slug === 'kesari-select-backend') {
    return (
      <figure className="case-figure load-study">
        <figcaption>Kesari Select <span>/ Performance</span></figcaption>
        <div className="load-plot">
          {Object.entries(kesariPageLoad).map(([label, seconds]) => (
            <div className="load-series" key={label}>
              <span>{label}</span><strong>≈ {seconds}<small>s</small></strong>
              <i aria-hidden="true" style={{ width: (seconds / kesariPageLoad.before * 100) + '%' }} />
            </div>
          ))}
        </div>
        <p>One production page · developer-reported</p>
      </figure>
    )
  }
  if (slug === 'email-campaign-engine') {
    const [rows, ingestion] = study.metrics
    return (
      <figure className="case-figure import-study">
        <figcaption>Campaign engine <span>/ Batch import</span></figcaption>
        <div className="import-art">
          <strong>{rows.value}<small> rows</small></strong>
          <span className="mail-stack" aria-hidden="true"><FiMail /><FiMail /><FiMail /></span>
        </div>
        <p>{ingestion.value} database ingestion · reported benchmark</p>
      </figure>
    )
  }
  return (
    <figure className="case-figure print-study">
      <figcaption>Smart Print <span>/ Operations</span></figcaption>
      <div className="print-art" aria-hidden="true"><div className="proof-paper">
        <span>Smart Print</span><strong>Job sheet</strong><i /><i /><i />
      </div></div>
      <p>Inquiry intake · role checks · record recovery</p>
    </figure>
  )
}

function CaseCard({ slug }) {
  const project = projects.find(item => item.caseStudySlug === slug)
  const study = CASE_STUDIES[slug]
  return (
    <article className="case-spread">
      <CaseFigure slug={slug} study={study} />
      <div className="spread-copy">
        <p className="bp-label"><span>{study.number}</span> / {project.category} · {project.year}</p>
        <h3><Link to={'/projects/' + slug}>{project.title}</Link></h3>
        <p>{project.description}</p>
        <ul className="bp-chips" aria-label="Technologies">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <Link to={'/projects/' + slug} aria-label={'Read case study for ' + project.title} className="bp-text-link">Read case study <FiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </article>
  )
}

export default function WorkHighlights() {
  return (
    <section id="selected-work" className="bp-shell bp-section work-section" aria-labelledby="work-title">
      <p className="bp-kicker">02 / Selected work</p>
      <div className="bp-heading-row">
        <h2 className="bp-section-title" id="work-title">Systems in <em>production.</em></h2>
        <Link to="/projects" className="bp-text-link">All projects <FiArrowUpRight aria-hidden="true" /></Link>
      </div>
      <div id="work-sample">{cases.map(slug => <CaseCard slug={slug} key={slug} />)}</div>
      <h3 className="bp-kicker more-label">More builds</h3>
      <div className="more-builds">{more.map(project => <Link key={project.id} to={'/projects#project-' + project.id}>
        <span className="bp-label">{project.type}</span><span>{project.title}</span><FiArrowRight aria-hidden="true" />
      </Link>)}</div>
    </section>
  )
}
