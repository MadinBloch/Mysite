import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

const stops = [
  { id: 'hackathon', date: '2023', place: 'PDEU', title: 'Grand Finalist',
    text: 'New India Vibrant Hackathon. I built the backend and walked the judges through how data moved across our application.', to: '/about#hackathon' },
  { id: 'first-role', date: 'Dec 2024', place: 'Magecurious', title: 'First PHP role',
    text: 'Delivered PHP features and business workflow updates in a collaborative team.', to: '/about#experience' },
  { id: 'kesari-chapter', date: 'May 2025', place: 'Shine Infosoft', title: 'Laravel Developer',
    text: 'Own Laravel backend features, integrations, and production fixes for travel operations software.', to: '/projects/kesari-select-backend' },
  { id: 'workshop', date: 'Aug 2026', place: 'Junagadh', title: 'Git & Docker workshop',
    text: 'Version control and containers with BCA and MCA students at Dr. Subhash University.', to: '/about#workshop' },
]

export default function Journey() {
  return (
    <section id="story" className="journey-section" aria-labelledby="journey-heading">
      <div className="bp-shell bp-section">
        <p className="bp-kicker">03 / Journey</p>
        <div className="journey-layout">
          <h2 className="bp-section-title" id="journey-heading">From hackathon<br />to <em>production.</em></h2>
          <ol className="journey-list">
            {stops.map(stop => <li key={stop.id} id={stop.id}>
              <Link to={stop.to} className="journey-stop">
                <span className="journey-date">{stop.date}</span>
                <div className="journey-copy"><p className="bp-label">{stop.place}</p><h3>{stop.title}</h3><p>{stop.text}</p></div>
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            </li>)}
          </ol>
        </div>
      </div>
    </section>
  )
}
