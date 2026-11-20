import PhotoGrid from './PhotoGrid'
import { SectionReveal } from './motion/SectionReveal'
import { certificatePhotos } from '../data/photos'

export default function Media() {
  return (
    <section id="certificates" className="section-shell bg-[#101814]" aria-labelledby="certificates-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-7 sm:mb-9">
          <h2 id="certificates-title" className="section-heading">Certificates & achievements</h2>
        </SectionReveal>
        <PhotoGrid photos={certificatePhotos} className="grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4" />
      </div>
    </section>
  )
}
