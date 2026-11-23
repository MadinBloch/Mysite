import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { EventPhoto, frames } from './BoardingPhotos'

const stops = [
  { id: 'hackathon', date: '2023', place: 'PDEU', title: 'Grand Finalist', photo: frames.team,
    text: 'New India Vibrant Hackathon. I built the backend and walked the judges through how data moved across our application.', to: '/about#hackathon' },
  { id: 'first-role', date: 'Dec 2024', place: 'Magecurious', title: 'First PHP role', language: 'PHP',
    text: 'Delivered PHP features and business workflow updates in a collaborative team.', to: '/about#experience' },
  { id: 'kesari-chapter', date: 'May 2025', place: 'Shine Infosoft', title: 'Laravel Developer', language: 'Laravel',
    text: 'Own Laravel backend features, integrations, and production fixes for travel operations software.', to: '/projects/kesari-select-backend' },
  { id: 'workshop', date: 'Aug 2026', place: 'Junagadh', title: 'Git & Docker workshop', photo: frames.workshop,
    text: 'Version control and containers with BCA and MCA students at Dr. Subhash University.', to: '/about#workshop' },
]

function RouteLine() {
  return (
    <svg className="journey-route" viewBox="0 0 1200 122" aria-hidden="true" focusable="false">
      <path d="M150 68 Q300 0 450 68 T750 68 T1050 68" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />
      {[150, 450, 750, 1050].map(x => <circle key={x} cx={x} cy="68" r="10" className={x === 750 ? 'current-stop' : undefined} />)}
      <text x="1090" y="49" fontSize="30">✈</text>
    </svg>
  )
}

export default function Journey() {
  return (
    <section id="story" className="journey-section" aria-labelledby="journey-heading">
      <div className="bp-shell bp-section">
        <p className="bp-kicker">03 · Journey</p>
        <h2 className="bp-section-title" id="journey-heading">Four stops <em>so far.</em></h2>
        <RouteLine />
        <ol className="journey-grid">
          {stops.map(stop => <li key={stop.id} id={stop.id}>
            <Link to={stop.to} className={'journey-stop' + (stop.id === 'kesari-chapter' ? ' current' : '')}>
              {stop.photo ? <EventPhoto photo={stop.photo} sizes="(min-width: 1024px) 24vw, (min-width: 600px) 45vw, 90vw" /> : <span className="journey-type" aria-hidden="true">{stop.language}</span>}
              <div className="journey-copy">
                <p className="bp-label">{stop.date} · {stop.place}</p>
                <h3>{stop.title} <FiArrowUpRight aria-hidden="true" /></h3>
                <p>{stop.text}</p>
              </div>
            </Link>
          </li>)}
        </ol>
      </div>
    </section>
  )
}
