import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { SectionReveal } from './motion/SectionReveal'

const FEATURED = [
  {
    id: 10,
    title: 'PW Skills — Node.js Backend',
    caption: 'Physics Wallah · Jul 2023',
    src: '/certs/pw-skills-nodejs.png',
    objectFit: 'object-contain bg-zinc-100',
  },
  {
    id: 11,
    title: 'National-level Cricket',
    caption: 'Achievement beyond academics',
    src: '/certs/cricket-national.jpg',
  },
  {
    id: 12,
    title: 'Laravel Meetup',
    caption: 'Community learning',
    src: '/community/laravel-meetup.jpg',
  },
  {
    id: 13,
    title: 'Laravel Meetup — Group',
    caption: 'Developer community',
    src: '/community/laravel-meetup-group.jpg',
  },
]

const CERTIFICATES = [
  { id: 1, title: 'Grand Finale Hackathon Certificate', src: '/certificateHackthnone.jpg' },
  { id: 2, title: 'Grand Finale Moment', src: '/image3hackthone.jpg' },
  { id: 3, title: 'Team Achievement', src: '/image5.jpg' },
  { id: 4, title: 'Presentation Session', src: '/image2hackthone.jpg' },
  { id: 5, title: 'Regional Round Certificate', src: '/image9.jpg' },
  { id: 6, title: 'Regional Round Moment', src: '/image7.jpg' },
  { id: 7, title: 'Team Working Session', src: '/image6.jpg' },
  { id: 8, title: 'Grand Finale Backdrop', src: '/imag1hackthone.jpg' },
]

function MediaTile({ item, index, tall, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: Math.min(index * 0.04, 0.28) }}
      whileHover={{ y: -6 }}
      className="media-tile group"
    >
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        className={
          (tall ? 'h-44 sm:h-52 ' : 'h-36 sm:h-44 ') +
          'w-full transition-transform duration-500 group-hover:scale-[1.05] ' +
          (item.objectFit || 'object-cover')
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <p className="font-mono text-[11px] font-medium leading-snug text-zinc-100">{item.title}</p>
        {item.caption && <p className="mt-1 text-[10px] text-zinc-400">{item.caption}</p>}
        <p className="mt-1.5 text-[10px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
          View full size ↗
        </p>
      </div>
    </motion.button>
  )
}

export default function Media() {
  const [activeImage, setActiveImage] = useState(null)
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  return (
    <section id="certificates" className="relative border-y border-zinc-900/80 bg-zinc-900/25 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal>
          <p className="section-label">Proof points</p>
          <h2 className="section-heading mt-2 mb-2">Certificates & moments</h2>
          <p className="mb-8 max-w-2xl text-sm leading-7 text-zinc-500">
            Courses, meetups, cricket, and hackathon milestones — click any photo to expand.
          </p>
        </SectionReveal>

        <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FEATURED.map((item, index) => (
            <MediaTile key={item.id} item={item} index={index} tall onOpen={setActiveImage} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {CERTIFICATES.map((item, index) => (
            <MediaTile key={item.id} item={item} index={index} onOpen={setActiveImage} />
          ))}
        </div>
      </div>

      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
