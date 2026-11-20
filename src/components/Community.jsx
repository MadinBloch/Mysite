import PhotoGrid from './PhotoGrid'
import { SectionReveal } from './motion/SectionReveal'
import { meetupPhotos } from '../data/photos'

export default function Community() {
  return (
    <section id="community" className="section-shell" aria-labelledby="community-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-7 grid items-end gap-3 sm:grid-cols-2 sm:gap-8">
          <h2 id="community-title" className="section-heading">Laravel meetups</h2>
          <p className="portfolio-copy text-sm sm:text-base">
            I meet other PHP and Laravel developers to discuss how they structure applications and ship them to production.
          </p>
        </SectionReveal>
        <PhotoGrid photos={meetupPhotos} className="grid gap-4 sm:grid-cols-2" />
      </div>
    </section>
  )
}
