import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiDownload, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import Lightbox from './Lightbox'
import PhotoPrint from './PhotoPrint'
import { profile } from '../data/profile'
import { hackathonPhotos, workshopPhotos } from '../data/photos'

const portrait = {
  id: 'portrait',
  src: '/profile-portrait.png',
  printSrc: '/photos/madin-portrait.webp',
  title: 'Madin Bloch',
  alt: 'Portrait of Madin Bloch in a navy suit',
  position: 'center 8%',
}
const workshop = {
  ...workshopPhotos.find(photo => photo.id === 'git-docker'),
  position: 'center top',
}
const hackathonHighlights = ['regional', 'presentation', 'finale-team', 'team-certificates'].map(
  id => hackathonPhotos.find(photo => photo.id === id),
)
const photos = [portrait, workshop, ...hackathonHighlights]

export default function Hero() {
  const [preview, setPreview] = useState(null)

  return (
    <section id="home" className="profile-cover" aria-labelledby="home-title">
      <div className="portfolio-shell cover-layout">
        <div className="cover-copy">
          <div className="cover-context">
            <p className="availability"><span aria-hidden="true" />Open to backend roles</p>
            <p className="cover-location"><FiMapPin aria-hidden="true" />Ahmedabad, India</p>
          </div>
          <h1 id="home-title" className="cover-title">Madin <em>Bloch.</em></h1>
          <p className="cover-role">Laravel Backend Developer</p>
          <p className="cover-intro">
            At Shine Infosoft, I build Laravel APIs and ERP integrations for Kesari Select’s booking and finance teams. I deploy with Docker and verify releases on AWS.
          </p>
          <div className="cover-actions">
            <Link to="/#selected-work" className="btn-primary">Explore my work</Link>
            <a href={profile.resume} download className="btn-outline"><FiDownload aria-hidden="true" /> Download resume</a>
          </div>
          <div className="cover-links">
            <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" />LinkedIn</a>
            <Link to="/#story" className="cover-story-link"><FiBookOpen aria-hidden="true" />My story</Link>
          </div>
        </div>
        <div className="cover-visual" role="group" aria-label="Portrait and workshop">
          <PhotoPrint photo={portrait} className="cover-portrait" priority onOpen={() => setPreview(0)} />
          <PhotoPrint
            photo={workshop}
            caption={<><strong>{workshop.title}</strong><span>{workshop.caption}</span></>}
            className="cover-workshop"
            onOpen={() => setPreview(1)}
          />
        </div>
      </div>
      <section id="landing-hackathon" className="portfolio-shell landing-hackathon" aria-labelledby="landing-hackathon-title">
        <div className="landing-hackathon-heading">
          <h2 id="landing-hackathon-title">New India Vibrant <em>Hackathon</em></h2>
          <Link to="/gallery?album=hackathon" className="quiet-link">Full hackathon album</Link>
        </div>
        <div className="landing-photo-grid">
          {hackathonHighlights.map((photo, index) => (
            <PhotoPrint
              key={photo.id}
              photo={photo}
              caption={photo.title}
              onOpen={() => setPreview(index + 2)}
            />
          ))}
        </div>
      </section>
      {preview !== null && (
        <Lightbox photos={photos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />
      )}
    </section>
  )
}
