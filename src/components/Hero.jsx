import { Link } from 'react-router-dom'
import { FiBookOpen, FiDownload, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import PhotoDeck from './PhotoDeck'
import { profile } from '../data/profile'
import { hackathonPhotos, workshopPhotos } from '../data/photos'

const photos = [
  {
    id: 'portrait',
    src: '/profile-portrait.png',
    printSrc: '/photos/madin-portrait.webp',
    title: 'Madin Bloch',
    alt: 'Portrait of Madin Bloch in a navy suit',
    position: 'center 7%',
    thumbPosition: 'center 6%',
    shortLabel: 'Portrait',
  },
  {
    ...hackathonPhotos.find(photo => photo.id === 'finale-team'),
    shortLabel: 'Hackathon',
    title: 'With my team at the Grand Finale',
    caption: 'New India Vibrant Hackathon · 2023',
    thumbPosition: 'center 15%',
  },
  {
    ...workshopPhotos.find(photo => photo.id === 'workshop-certificate'),
    shortLabel: 'Workshop',
    title: 'After the Git and Docker workshop',
    caption: 'Dr. Subhash University · August 2026',
    fit: 'contain',
  },
]

export default function Hero() {
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
        <PhotoDeck photos={photos} label="Madin in photos" appearance="cover" priority />
      </div>
    </section>
  )
}
