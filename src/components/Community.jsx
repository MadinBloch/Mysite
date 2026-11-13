import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { SectionReveal } from './motion/SectionReveal'

const events = [
  {
    title: 'Dr. Subhash University Workshop',
    meta: 'Facilitator · Aug 2026 · Junagadh',
    description:
      'Conducted a practical hands-on workshop for BCA & MCA students on Git, containers, and Docker.',
    href: '/#workshop',
    accent: true,
  },
  {
    title: 'New India Vibrant Hackathon 2023',
    meta: 'Grand Finalist · PDEU',
    description:
      'Qualified from the regional round and presented a backend-focused solution at the Grand Finale.',
    href: '/#hackathon',
    accent: false,
  },
  {
    title: 'Laravel Developer Meetups',
    meta: 'Community · Laravel ecosystem',
    description:
      'Attended Laravel meetups to learn with other PHP developers — architecture, shipping habits, and real project workflows.',
    href: null,
    accent: false,
  },
]

const meetupPhotos = [
  {
    id: 'meetup-1',
    title: 'Laravel Meetup',
    src: '/community/laravel-meetup.jpg',
  },
  {
    id: 'meetup-2',
    title: 'Laravel Meetup — Group',
    src: '/community/laravel-meetup-group.jpg',
  },
]

export default function Community() {
  const [activeImage, setActiveImage] = useState(null)
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  return (
    <section id="community" className="relative border-y border-zinc-900/80 bg-zinc-900/20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal>
          <p className="section-label">Community</p>
          <h2 className="section-heading mt-2 mb-2">Events & Meetups</h2>
          <p className="mb-8 max-w-2xl text-sm text-zinc-500">
            Moments of teaching, competing, and learning alongside other developers.
          </p>
        </SectionReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className={
                'flex h-full flex-col rounded-2xl border bg-zinc-900/65 p-5 sm:p-6 ' +
                (event.accent
                  ? 'border-accent/25 bg-gradient-to-br from-accent/5 to-transparent'
                  : 'border-zinc-800/90')
              }
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{event.meta}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-zinc-100">{event.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{event.description}</p>
              {event.href ? (
                <Link to={event.href} className="mt-5 inline-flex text-xs font-semibold text-accent hover:text-white">
                  View section ↗
                </Link>
              ) : (
                <p className="mt-5 font-mono text-[10px] text-zinc-600">Community engagement</p>
              )}
            </motion.article>
          ))}
        </div>

        <SectionReveal delay={0.08} className="mt-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Laravel Meetup photos</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {meetupPhotos.map((photo, index) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setActiveImage(photo)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="media-tile group"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-mono text-[11px] text-zinc-100">{photo.title}</p>
                  <p className="mt-1 text-[10px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    View full size ↗
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-8 rounded-2xl border border-accent/20 bg-accent/[.04] p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">What I’m doing now</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-zinc-200">Docker & DevOps</p>
              <p className="mt-1 text-xs text-zinc-500">Containers, CI/CD, and production deployment workflows.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Backend Architecture</p>
              <p className="mt-1 text-xs text-zinc-500">Cleaner Laravel structure — services, boundaries, maintainability.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Writing & Sharing</p>
              <p className="mt-1 text-xs text-zinc-500">Documenting what I learn on Hashnode and YouTube.</p>
            </div>
          </div>
        </SectionReveal>
      </div>

      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
