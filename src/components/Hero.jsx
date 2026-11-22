import { Link } from 'react-router-dom'
import { FiBookOpen, FiDownload, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import PhotoDeck from './PhotoDeck'
import { profile } from '../data/profile'
import { hackathonPhotos, workshopPhotos } from '../data/photos'

const photos = [
  {
    id: 'portrait',
    width: 800,
    height: 800,
    src: '/profile-portrait.png',
    printSrc: '/photos/madin-portrait.webp',
    title: 'Madin Bloch',
    alt: 'Portrait of Madin Bloch in a navy suit',
    caption: 'Ahmedabad, India',
    position: 'center 12%',
    shortLabel: 'Portrait',
  },
  {
    ...hackathonPhotos.find(photo => photo.id === 'presentation'),
    height: 960,
    shortLabel: 'Hackathon',
    title: 'Presenting our backend',
    caption: 'New India Vibrant Hackathon · 2023',
  },
  {
    ...workshopPhotos[0],
    width: 800,
    height: 600,
    shortLabel: 'Workshop',
    title: 'Teaching Git and Docker',
    caption: 'Dr. Subhash University · August 2026',
  },
]

export default function Hero() {
  return (
    <section id="home" className="profile-cover" aria-labelledby="home-title">
      <div className="portfolio-shell cover-layout">
        <div className="cover-copy">
          <p className="availability"><span aria-hidden="true" />Open to backend roles</p>
          <h1 id="home-title" className="cover-title">Madin <em>Bloch.</em></h1>
          <p className="cover-role">Laravel Backend Developer</p>
          <p className="cover-intro">
            I build the software Kesari Select’s teams use to take a travel inquiry through to a booking. At Shine Infosoft, I write the Laravel APIs, connect them to the ERP, and deploy the changes on AWS.
          </p>
          <div className="cover-actions">
            <Link to="/#selected-work" className="btn-primary">Explore my work</Link>
            <a href={profile.resume} download className="btn-outline"><FiDownload aria-hidden="true" /> Download resume</a>
          </div>
          <div className="cover-links">
            <span><FiMapPin aria-hidden="true" />Ahmedabad, India</span>
            <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" />LinkedIn</a>
          </div>
        </div>
        <PhotoDeck photos={photos} label="Madin in photos" appearance="cover" priority />
      </div>
      <div className="portfolio-shell">
        <div className="cover-note">
          <p>Outside client work, I teach Git and Docker and meet other Laravel developers.</p>
          <Link to="/#story"><FiBookOpen aria-hidden="true" />Read my story</Link>
        </div>
      </div>
    </section>
  )
}
