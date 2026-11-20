import { Link } from 'react-router-dom'
import { FiLayers, FiBriefcase, FiMail, FiPrinter } from 'react-icons/fi'
import projects from '../data/projects.json'
import { SectionReveal } from './motion/SectionReveal'

const coverIcons = {
  'kesari-select-backend': FiBriefcase,
  'email-campaign-engine': FiMail,
  'smart-print-operations': FiPrinter,
}
const selected = projects.filter(project => coverIcons[project.caseStudySlug])

export default function WorkHighlights() {
  return (
    <section id="selected-work" className="paper-work" aria-labelledby="work-highlights-title">
      <div className="portfolio-shell">
        <SectionReveal className="spread-heading">
          <h2 id="work-highlights-title" className="editorial-heading">Selected <em>work.</em></h2>
          <Link to="/projects" className="paper-link"><FiLayers aria-hidden="true" />All projects</Link>
        </SectionReveal>
        <div className="paper-grid">
          {selected.map(project => {
            const Icon = coverIcons[project.caseStudySlug]
            return (
              <article key={project.id} className="paper-card">
                <div className="paper-card-meta">
                  <span className="paper-icon"><Icon aria-hidden="true" /></span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="paper-card-foot">
                  <Link to={'/projects/' + project.caseStudySlug} className="paper-link" aria-label={'Read the ' + project.title + ' case study'}>
                    Read the case study
                  </Link>
                  <span>{project.year}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
