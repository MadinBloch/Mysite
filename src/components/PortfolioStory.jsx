import { Link } from 'react-router-dom'
import { FiGrid } from 'react-icons/fi'
import Hackathon from './Hackathon'
import Workshop from './Workshop'

export default function PortfolioStory() {
  return (
    <section id="story" className="journal-section" aria-labelledby="journal-title">
      <div className="portfolio-shell">
        <div className="spread-heading">
          <h2 id="journal-title" className="editorial-heading">Photo <em>journal.</em></h2>
          <Link to="/gallery" className="quiet-link"><FiGrid aria-hidden="true" />View photo archive</Link>
        </div>
        <Workshop />
        <Hackathon />
      </div>
    </section>
  )
}
