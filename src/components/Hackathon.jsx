import { FiArrowUpRight, FiPlay } from 'react-icons/fi'
import PhotoDeck from './PhotoDeck'
import { SectionReveal } from './motion/SectionReveal'
import { hackathonPhotos } from '../data/photos'

const recordings = [
  { label: 'Regional round recording', href: 'https://www.youtube.com/watch?v=N-U6c92QPeA' },
  { label: 'Project walkthrough', href: 'https://www.youtube.com/watch?v=yLy_fBdOT7M' },
]

export default function Hackathon() {
  return (
    <section id="hackathon" className="section-shell" aria-labelledby="hackathon-title">
      <div className="portfolio-shell grid items-center gap-7 lg:grid-cols-[1.28fr_.72fr] lg:gap-14">
        <SectionReveal>
          <p className="section-label">Grand Finalist · PDEU · 2023</p>
          <h2 id="hackathon-title" className="mt-3 font-display text-[clamp(2.1rem,4.5vw,3.65rem)] font-semibold leading-[1.03] tracking-tight">
            New India Vibrant Hackathon
          </h2>
          <p className="portfolio-copy mt-4 max-w-xl text-sm sm:text-base">
            Our team advanced from the regional round to the Grand Finale. I worked on the backend, presented the data flow, and explained our architecture choices to the judges.
          </p>
          <ul className="mt-6 space-y-2 border-t border-[#34483c] pt-4">
            {recordings.map(({ label, href }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" className="link-accent min-h-10 text-sm">
                  <FiPlay size={16} aria-hidden="true" /> {label} <FiArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>
        <SectionReveal className="lg:order-first">
          <PhotoDeck photos={hackathonPhotos} label="Hackathon photos" />
        </SectionReveal>
      </div>
    </section>
  )
}
