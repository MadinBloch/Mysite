import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiDownload, FiTerminal } from 'react-icons/fi'
import Lightbox from './Lightbox'
import PhotoPrint from './PhotoPrint'
import { profile } from '../data/profile'

const portrait = {
  id: 'portrait',
  src: '/profile-portrait.png',
  printSrc: '/photos/madin-portrait.webp',
  title: 'Madin Bloch',
  alt: 'Madin Bloch in a navy suit',
  width: 800,
  height: 800,
}

const trace = [
  ['inquiry', 'received'],
  ['laravel', 'validated'],
  ['erp', 'export queued'],
  ['finance', 'file ready'],
]

export default function Hero() {
  const [showPortrait, setShowPortrait] = useState(false)

  return (
    <section id="home" className="story-cover" aria-labelledby="home-title">
      <div className="portfolio-shell hero-grid">
        <div className="hero-copy">
          <p className="hero-status"><span aria-hidden="true" />Open to backend roles · Ahmedabad</p>
          <p className="hero-role">Laravel Backend Developer</p>
          <h1 id="home-title">From hackathon <span>to <em>production.</em></span></h1>
          <p className="hero-intro">
            At Shine Infosoft, I build the Laravel APIs that take a Kesari Select inquiry from quote to booking. I connect them to the ERP and deploy releases on AWS.
          </p>
          <div className="hero-actions">
            <Link to="/#story" className="btn-primary"><FiBookOpen aria-hidden="true" />Read my story</Link>
            <a href={profile.resume} download className="btn-outline"><FiDownload aria-hidden="true" />Resume</a>
          </div>
        </div>

        <div className="portrait-stage">
          <PhotoPrint photo={portrait} priority className="portrait-print" caption={portrait.title} onOpen={() => setShowPortrait(true)} />
          <figure className="trace-card">
            <figcaption><FiTerminal aria-hidden="true" />trace · illustrative</figcaption>
            <ul>
              {trace.map(([event, message]) => (
                <li key={event}><code>{event}</code><span>{message}</span></li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
      {showPortrait && <Lightbox photos={[portrait]} index={0} onClose={() => setShowPortrait(false)} />}
    </section>
  )
}
