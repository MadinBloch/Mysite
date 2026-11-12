import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { SectionReveal } from './motion/SectionReveal'

const CERTIFICATES = [
  { id: 1, title: 'Grand Finale Hackathon Certificate', src: '/certificateHackthnone.jpg' },
  { id: 2, title: 'Grand Finale Moment', src: '/image3hackthone.jpg' },
  { id: 3, title: 'Team Achievement', src: '/image5.jpg' },
  { id: 4, title: 'Presentation Session', src: '/image2hackthone.jpg' },
  { id: 5, title: 'Regional Round Certificate', src: '/image9.jpg' },
  { id: 6, title: 'Regional Round Moment', src: '/image7.jpg' },
  { id: 7, title: 'Team Working Session', src: '/image6.jpg' },
  { id: 8, title: 'Grand Finale Backdrop', src: '/imag1hackthone.jpg' },
  { id: 9, title: 'Hackathon Moment', src: '/image8.jpg' },
]

export default function Media() {
  const [activeImage, setActiveImage] = useState(null)
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  return (
    <section id="certificates" className="relative border-y border-zinc-900/80 bg-zinc-900/25 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal>
          <p className="section-label">Media</p>
          <h2 className="section-heading mt-2 mb-2">Certificates & Achievements</h2>
          <p className="mb-8 max-w-2xl text-sm text-zinc-500">
            Highlights from hackathons, certificates, and team milestones. Click any photo to expand.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {CERTIFICATES.map((item, index) => (
            <motion.button
              type="button"
              key={item.id}
              onClick={() => setActiveImage(item)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(index * 0.04, 0.28) }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 text-left transition-colors hover:border-accent/35"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] sm:h-44"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-mono text-[11px] text-zinc-200">{item.title}</p>
                <p className="mt-1 text-[10px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View full size ↗
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
