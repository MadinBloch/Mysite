import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import PhotoDeck from './PhotoDeck'
import { hackathonPhotos, meetupPhotos, workshopPhotos } from '../data/photos'

const photos = [
  {
    id: 'portrait',
    src: '/profile-portrait.png',
    title: 'Madin Bloch',
    alt: 'Formal portrait of Madin Bloch',
    caption: 'Ahmedabad, India',
    position: 'center 30%',
  },
  workshopPhotos[1],
  hackathonPhotos[0],
  meetupPhotos[0],
]

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="portfolio-shell grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
        <div className="hero-enter min-w-0">
          <p className="mb-5 flex items-center gap-2.5 text-sm font-medium text-[#c1e3ce] sm:mb-8">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_#6ee7b77a]" aria-hidden="true" />
            Open to backend roles
          </p>
          <h1 id="home-title" className="hero-title">Madin Bloch<span className="text-accent">.</span></h1>
          <p className="mt-4 font-display text-2xl font-medium tracking-tight text-[#b8efd2] sm:mt-5 sm:text-[2rem]">
            Laravel Backend Developer
          </p>
          <p className="portfolio-copy mt-4 max-w-[29rem] text-base sm:text-[1.04rem]">
            I build and deploy Laravel APIs, ERP integrations, and background jobs for Kesari Select’s travel operations platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-9 sm:gap-3">
            <Link to="/projects/kesari-select-backend" className="btn-primary">
              Kesari Select case study <FiArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">
              Resume <FiDownload size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#385044] pt-4 text-sm text-[#a9b8ad] sm:mt-10">
            <span className="inline-flex items-center gap-2">
              <FiMapPin className="text-accent" aria-hidden="true" /> Ahmedabad, India
            </span>
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="link-accent">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="link-accent">
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </div>

        <PhotoDeck
          photos={photos}
          label="Portrait and highlights"
          priority
          className="hero-enter mx-auto w-full max-w-[36rem] [--enter-delay:110ms]"
        />
      </div>
    </section>
  )
}
