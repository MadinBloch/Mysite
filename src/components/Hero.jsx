import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiDownload, FiMapPin } from 'react-icons/fi'
import PhotoPrint from './PhotoPrint'
import Lightbox from './Lightbox'
import { hackathonPhotos } from '../data/photos'

const portrait = {
  id: 'portrait',
  src: '/profile-portrait.png',
  printSrc: '/photos/madin-portrait.webp',
  title: 'Madin Bloch',
  alt: 'Madin Bloch in a navy suit',
  caption: 'Laravel backend developer · Ahmedabad, India',
  position: 'center 34%',
}
const coverPhotos = [portrait, hackathonPhotos.find(photo => photo.id === 'presentation')]

export default function Hero() {
  const [preview, setPreview] = useState(null)

  return (
    <section id="home" className="story-cover" aria-labelledby="home-title">
      <div className="portfolio-shell">
        <div className="cover-layout">
          <div className="hero-enter">
            <p className="cover-byline"><span aria-hidden="true" />Madin Bloch <span className="byline-divider" aria-hidden="true">/</span> Laravel developer</p>
            <h1 id="home-title" className="cover-title">From a <br />hackathon<br /><em>to production.</em></h1>
            <p className="cover-intro">In 2023, I explained our team’s backend to a room of hackathon judges. Today I build and deploy the Laravel software that Kesari Select uses to run travel operations.</p>
            <div className="cover-actions">
              <Link to="/#story" className="btn-primary">Read my story <FiArrowDown size={16} aria-hidden="true" /></Link>
              <a href="/Madin_Bloch_Resume.pdf" download className="cover-resume">Resume <FiDownload size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="cover-photos hero-enter">
            <PhotoPrint photo={portrait} caption="Madin Bloch" className="cover-portrait" priority onOpen={() => setPreview(0)} />
            <PhotoPrint photo={coverPhotos[1]} caption="Hackathon, 2023" className="cover-snapshot" onOpen={() => setPreview(1)} />
          </div>
        </div>
        <div className="cover-footer">
          <span><FiMapPin size={14} aria-hidden="true" />Ahmedabad, India</span>
          <span><i aria-hidden="true" />Open to backend roles</span>
        </div>
      </div>
      {preview !== null && <Lightbox photos={coverPhotos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </section>
  )
}
