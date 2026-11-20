import { Link } from 'react-router-dom'
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi'
import PhotoDeck from './PhotoDeck'
import { SectionReveal } from './motion/SectionReveal'
import { workshopPhotos } from '../data/photos'

const galleryLinks = [
  ['workshop', 'Workshop'],
  ['hackathon', 'Hackathon'],
  ['certificates', 'Certificates'],
  ['community', 'Meetups'],
]

export default function Workshop() {
  return (
    <section id="workshop" className="section-shell bg-[#101814]" aria-labelledby="gallery-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#34483c] pb-6 sm:mb-11">
          <h2 id="gallery-title" className="section-heading">Gallery & achievements</h2>
          <nav aria-label="Gallery sections" className="flex flex-wrap gap-1">
            {galleryLinks.map(([id, label]) => (
              <Link key={id} to={'/#' + id} className="nav-link px-2.5 text-xs sm:px-3.5 sm:text-sm">{label}</Link>
            ))}
          </nav>
        </SectionReveal>

        <div className="grid items-center gap-7 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <SectionReveal>
            <p className="section-label">University workshop</p>
            <h3 className="mt-3 font-display text-[clamp(1.85rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-tight">
              Teaching Git & Docker
            </h3>
            <p className="portfolio-copy mt-4 max-w-xl text-sm sm:text-base">
              I led a hands-on workshop for BCA and MCA students at Dr. Subhash University. I demonstrated local setup, day-to-day Git commands, and Docker fundamentals.
            </p>
            <ul className="mt-6 space-y-3 border-t border-[#34483c] pt-5 text-sm text-[#d4e5d9]">
              <li className="flex items-center gap-3"><FiMapPin className="shrink-0 text-accent" aria-hidden="true" /> Dr. Subhash University, Junagadh</li>
              <li className="flex items-center gap-3"><FiCalendar className="shrink-0 text-accent" aria-hidden="true" /> August 2026</li>
              <li className="flex items-center gap-3"><FiBookOpen className="shrink-0 text-accent" aria-hidden="true" /> Live demos and student mentoring</li>
            </ul>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <PhotoDeck photos={workshopPhotos} label="University workshop photos" />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
