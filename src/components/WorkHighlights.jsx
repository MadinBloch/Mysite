import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import projects from '../data/projects.json'
import { CASE_STUDIES } from '../data/caseStudies'
import { kesariStats, formatCount } from '../data/siteStats'

const cases = ['kesari-select-backend', 'email-campaign-engine', 'smart-print-operations']
const more = ['HRM System', 'DevCommand AI', 'Book Server'].map(title => projects.find(project => project.title === title))

function CaseCard({ slug }) {
  const project = projects.find(item => item.caseStudySlug === slug)
  const study = CASE_STUDIES[slug]
  const kesari = slug === 'kesari-select-backend'
  const problem = {
    'kesari-select-backend': 'Late ERP records could miss a scheduled export.',
    'email-campaign-engine': 'Operators needed to import a spreadsheet, track delivery and safely pause a campaign.',
    'smart-print-operations': 'Permissions disagreed across screens, and deleting a record could erase operational history.',
  }[slug]
  const built = kesari ? study.decisions[0].body : project.description
  const result = kesari ? study.takeaway : project.contribution
  return (
    <article className="work-case">
      <div className="case-top"><p className="bp-label">{project.type} · {project.year}</p><span className="case-no">Case {study.number}</span></div>
      <h3>{project.title}</h3>
      <dl className="case-columns">
        <div><dt>Problem</dt><dd>{problem}</dd></div>
        <div><dt>What I built</dt><dd>{built}</dd></div>
        <div className="case-result"><dt>Result</dt><dd>{result}</dd></div>
      </dl>
      {kesari && <div className="case-scale" id="impact">
        <ul>{kesariStats.map(({ count, contextLabel }) => <li key={contextLabel}><strong>{formatCount(count)}+</strong> {contextLabel}</li>)}</ul>
        <p>*developer-reported estimates</p>
      </div>}
      <div className="case-foot"><ul className="bp-chips" aria-label="Technologies">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <Link to={'/projects/' + slug} className="bp-text-link" aria-label={'Read the ' + project.title + ' case study'}>Read case study <FiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </article>
  )
}

export default function WorkHighlights() {
  return (
    <section id="selected-work" className="bp-shell bp-section bp-work" aria-labelledby="work-title">
      <p className="bp-kicker">01 · Projects</p>
      <h2 className="bp-section-title" id="work-title">Proof of <mark className="hl">work.</mark></h2>
      <div id="work-sample" className="case-stack">{cases.map(slug => <CaseCard slug={slug} key={slug} />)}</div>
      <h3 className="bp-kicker more-label">More builds</h3>
      <div className="build-tags">{more.map(project => <article className="build-tag" key={project.id}>
        <p className="bp-label">{project.type} · {project.year}</p><h4>{project.title}</h4><p>{project.description}</p>
        {!project.live && !project.github ? <Link className="bp-text-link" to={'/projects#project-' + project.id}>Project details <FiArrowRight aria-hidden="true" /></Link> :
          <a className="bp-text-link" href={project.live || project.github} target="_blank" rel="noreferrer">{project.live ? 'Watch demo' : 'View on GitHub'} <FiArrowUpRight aria-hidden="true" /></a>}
      </article>)}</div>
      <Link className="bp-button all-projects" to="/projects">All projects <FiArrowRight aria-hidden="true" /></Link>
    </section>
  )
}
