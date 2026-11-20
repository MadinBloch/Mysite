import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiGrid } from 'react-icons/fi'
import Hackathon from './Hackathon'
import Workshop from './Workshop'
import Impact from './Impact'
import { jobs } from './Experience'
import { SectionReveal } from './motion/SectionReveal'

const mage = jobs.find(job => job.id === 'mage')
const flow = ['Inquiry', 'Laravel API', 'ERP export', 'Finance']

function Chapter({ date, month, children }) {
  const year = date.slice(0, 4)
  return (
    <li className="timeline-chapter">
      <time dateTime={date} className="chapter-date">
        {month && <span>{month} </span>}{year}
      </time>
      <SectionReveal className="chapter-content">{children}</SectionReveal>
    </li>
  )
}

export default function PortfolioStory() {
  return (
    <section id="story" className="timeline-section" aria-labelledby="story-title">
      <div className="portfolio-shell">
        <div className="spread-heading">
          <h2 id="story-title" className="editorial-heading">My <em>story.</em></h2>
          <Link to="/gallery" className="quiet-link"><FiGrid aria-hidden="true" />View photo archive</Link>
        </div>
        <ol className="story-timeline">
          <Chapter date="2023"><Hackathon /></Chapter>
          <Chapter date="2024-12" month="Dec">
            <article aria-labelledby="mage-title">
              <p className="chapter-label">{mage.title}</p>
              <h3 id="mage-title" className="chapter-heading">{mage.company}</h3>
              <p className="chapter-prose">{mage.points.join(' ')}</p>
            </article>
          </Chapter>
          <Chapter date="2025-05" month="May">
            <article id="kesari-chapter" className="kesari-chapter" aria-labelledby="kesari-title">
              <p className="chapter-label">Shine Infosoft · Travel Assist Platform</p>
              <h3 id="kesari-title" className="chapter-heading">Kesari <em>Select.</em></h3>
              <p className="chapter-prose">Finance could miss an ERP record that arrived after the nightly export. I changed the Laravel job to pick it up on the next run and log each delivery.</p>
              <ol className="workflow-chips" aria-label="Travel inquiry workflow">
                {flow.map((step, index) => (
                  <li key={step}>
                    {index > 0 && <FiArrowRight aria-hidden="true" />}<span>{step}</span>
                  </li>
                ))}
              </ol>
              <Impact />
              <p className="chapter-prose">After release, I recorded internal TAP walkthroughs for the Sales and Operations teams.</p>
              <Link to="/projects/kesari-select-backend" className="journal-link">Read the case study <FiArrowUpRight aria-hidden="true" /></Link>
            </article>
          </Chapter>
          <Chapter date="2026-08" month="Aug"><Workshop /></Chapter>
        </ol>
      </div>
    </section>
  )
}
