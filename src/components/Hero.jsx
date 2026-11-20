import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCamera, FiDownload, FiMapPin } from 'react-icons/fi'
import Impact from './Impact'
import Lightbox from './Lightbox'
import PhotoPrint from './PhotoPrint'
import { profile } from '../data/profile'

const portrait = {
  id: 'portrait',
  src: '/profile-portrait.png',
  printSrc: '/photos/madin-portrait.webp',
  title: 'Madin Bloch',
  alt: 'Madin Bloch in a navy suit',
  position: '50% 10%',
}

export default function Hero() {
  const [showPortrait, setShowPortrait] = useState(false)

  return (
    <section id="home" className="profile-cover" aria-labelledby="home-title">
      <div className="cover-stage">
        <div className="portfolio-shell">
          <div className="cover-heading">
            <p className="cover-role">Laravel Backend Developer</p>
            <h1 id="home-title" className="cover-title">Madin <em>Bloch.</em></h1>
          </div>
          <div className="cover-copy">
            <p className="cover-intro">
              At Shine Infosoft, I build the Laravel APIs that take a Kesari Select inquiry from quote to booking. I connect them to the ERP and deploy releases on AWS.
            </p>
            <div className="cover-actions">
              <Link to="/#selected-work" className="btn-primary">Explore my work</Link>
              <a href={profile.resume} download className="resume-link"><FiDownload aria-hidden="true" />Download resume</a>
            </div>
            <div className="cover-details">
              <p className="availability"><span aria-hidden="true" />Open to backend roles</p>
              <p className="cover-location"><FiMapPin aria-hidden="true" />Ahmedabad, India</p>
            </div>
          </div>
        </div>
        <PhotoPrint photo={portrait} priority className="cover-portrait" onOpen={() => setShowPortrait(true)} />
        <Link to="/#story" className="cover-journal-link"><FiCamera aria-hidden="true" />Photo journal</Link>
      </div>
      <div className="cover-impact">
        <div className="portfolio-shell"><Impact /></div>
      </div>
      {showPortrait && <Lightbox photos={[portrait]} index={0} onClose={() => setShowPortrait(false)} />}
    </section>
  )
}
