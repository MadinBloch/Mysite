import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Hackathon from './Hackathon'
import Workshop from './Workshop'
import Impact from './Impact'

const chapters = [
  { id: 'hackathon', label: 'The hackathon', period: '2023' },
  { id: 'production', label: 'Kesari Select', period: 'Since 2025' },
  { id: 'workshop', label: 'The classroom', period: 'August 2026' },
]

function ChapterIndex() {
  const [current, setCurrent] = useState(chapters[0].id)

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id))
    let frame = 0
    function update() {
      const line = Math.min(window.innerHeight * 0.35, 260)
      const reached = sections.filter(section => section && section.getBoundingClientRect().top <= line)
      setCurrent(reached.at(-1)?.id || chapters[0].id)
      frame = 0
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav className="chapter-index" aria-label="Story chapters">
      <p>In this story</p>
      <ol>
        {chapters.map(({ id, label, period }) => (
          <li key={id}>
            <Link to={'/#' + id} aria-current={current === id ? 'location' : undefined}>
              <span className="index-dot" aria-hidden="true" />
              <span><small>{period}</small>{label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function ProductionChapter() {
  return (
    <section id="production" className="story-chapter" aria-labelledby="production-title">
      <p className="chapter-date">Since 2025 <span>/</span> Kesari Select</p>
      <h2 id="production-title" className="chapter-title">When a record arrives<br /><em>after the export.</em></h2>
      <div className="chapter-prose">
        <p>At Kesari Select, Sales, Operations and Finance work in the same Travel Assist Platform (TAP). I build its Laravel features, connect them to the ERP and handle deployments. One problem landed right at the boundary between those systems.</p>
        <p>A scheduled export could finish before the ERP sent a record. Finance would receive a complete file with a record missing. I added logs to show what went out and a lookback check to pick up late records in a later delivery. I also staged each file before publishing it, so Finance only received finished files.</p>
      </div>
      <aside className="story-impact" aria-label="Kesari Select operating figures">
        <h3>Kesari Select in numbers</h3>
        <Impact />
      </aside>
      <div className="chapter-prose">
        <p>My work continued after deployment. I recorded internal TAP walkthroughs so Kesari’s Sales and Operations teams could learn the workflows themselves.</p>
      </div>
      <div className="flex flex-wrap gap-x-6">
        <Link to="/projects/kesari-select-backend" className="story-link">Read the TAP case study <FiArrowRight aria-hidden="true" /></Link>
        <Link to="/projects" className="story-link secondary-link">See all projects <FiArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  )
}

export default function PortfolioStory() {
  return (
    <div id="story" className="portfolio-shell story-layout">
      <ChapterIndex />
      <div className="story-pages">
        <Hackathon />
        <ProductionChapter />
        <Workshop />
      </div>
    </div>
  )
}
