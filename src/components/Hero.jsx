import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiDownload, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import Lightbox from './Lightbox'
import PhotoPrint from './PhotoPrint'
import { profile } from '../data/profile'
import { hackathonPhotos, workshopPhotos } from '../data/photos'

const photos = [
  {
    id: 'portrait',
    src: '/profile-portrait.png',
    printSrc: '/photos/madin-portrait.webp',
    title: 'Madin Bloch',
    alt: 'Portrait of Madin Bloch in a navy suit',
    position: 'center 8%',
  },
  {
    ...hackathonPhotos.find(photo => photo.id === 'finale-team'),
    title: 'Hackathon Grand Finale',
    alt: 'Madin and his teammates at the New India Vibrant Hackathon finale',
    caption: 'PDEU · 2023',
  },
  {
    ...workshopPhotos.find(photo => photo.id === 'workshop-certificate'),
    title: 'Git and Docker workshop',
    alt: 'Madin with the workshop team at Dr. Subhash University',
    caption: 'Dr. Subhash University · August 2026',
  },
]

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
        <div className="cover-visual" role="group" aria-label="Portrait and milestones">
          <PhotoPrint photo={photos[0]} className="cover-portrait" priority onOpen={() => setPreview(0)} />
          <div className="cover-moments">
            {photos.slice(1).map((photo, index) => (
              <PhotoPrint
                key={photo.id}
                photo={photo}
                caption={<><strong>{photo.title}</strong><span>{photo.caption}</span></>}
                className="cover-moment"
                onOpen={() => setPreview(index + 1)}
              />
            ))}
          </div>
        </div>
      </div>
      {preview !== null && (
        <Lightbox photos={photos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />
      )}
    </section>
  )
}
