import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { SectionReveal, Stagger, StaggerItem } from './motion/SectionReveal'

const PHOTOS = [
  {
    id: 1,
    src: '/workshop/presenting.jpg',
    title: 'On stage at Dr. Subhash University',
    caption: 'Live demo — installation & Git workflows',
  },
  {
    id: 2,
    src: '/workshop/git-docker.jpg',
    title: 'Git & Docker session',
    caption: 'Teaching version control and containers',
  },
  {
    id: 3,
    src: '/workshop/classroom.jpg',
    title: 'Hands-on classroom',
    caption: 'BCA & MCA students in practical session',
  },
  {
    id: 4,
    src: '/workshop/certificate.jpg',
    title: 'Certificate moment',
    caption: 'Recognition after the workshop',
  },
]

const TOPICS = [
  { title: 'Git Fundamentals', detail: 'Version control big picture, clone, and day-to-day workflows' },
  { title: 'Docker & Containers', detail: 'Core container concepts explained simply for students' },
  { title: 'Local Setup', detail: 'Localhost installation and real developer environment demos' },
  { title: 'Mentoring', detail: 'Hands-on guidance for BCA & MCA cohorts' },
]

export default function Workshop() {
  const [activeImage, setActiveImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    duration: 28,
  })
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="workshop" className="relative border-y border-zinc-900/80 bg-zinc-900/25 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal>
          <p className="section-label">Teaching</p>
          <h2 className="section-heading mt-2 mb-2">University Workshop</h2>
          <p className="mb-8 max-w-2xl text-sm text-zinc-500">
            Practical hands-on workshop for BCA &amp; MCA students at Dr. Subhash University —
            covering Git, containers, and Docker with live demos.
          </p>
        </SectionReveal>

        <div className="mb-10 grid gap-6 lg:grid-cols-5">
          <SectionReveal className="lg:col-span-3" delay={0.05}>
            <div className="card border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                  Facilitator
                </span>
                <span className="rounded-full bg-zinc-800/80 px-2.5 py-1 font-mono text-xs text-zinc-500">
                  Aug 2026 · Junagadh
                </span>
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-zinc-100">Dr. Subhash University</h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                Grateful to Dr. Subhash University for giving me the opportunity to conduct a
                Practical Hands-on Workshop for BCA &amp; MCA students — sharing real developer
                practices beyond classroom theory.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {TOPICS.map((topic) => (
                  <motion.div
                    key={topic.title}
                    whileHover={{ y: -3, borderColor: 'rgba(110,231,183,0.35)' }}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3"
                  >
                    <p className="text-sm font-medium text-zinc-200">{topic.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{topic.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <Stagger className="space-y-3 lg:col-span-2" delay={0.1}>
            {[
              ['// audience', 'BCA & MCA', 'University students · hands-on cohort'],
              ['// focus', 'Git + Docker', 'Version control & containers'],
              ['// format', 'Live demos', 'Setup walkthroughs & Q&A'],
            ].map(([label, title, detail]) => (
              <StaggerItem key={title}>
                <motion.div whileHover={{ x: 4 }} className="card">
                  <p className="mb-2 font-mono text-xs text-zinc-600">{label}</p>
                  <p className="font-display text-lg font-bold text-zinc-100">{title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{detail}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <SectionReveal delay={0.08}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-zinc-100">Workshop gallery</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                Smooth drag · click to expand
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                className="rounded-full border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
                aria-label="Previous workshop photo"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className="rounded-full border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
                aria-label="Next workshop photo"
              >
                →
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y gap-4">
              {PHOTOS.map((item, index) => (
                <div key={item.id} className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[48%] lg:basis-[32%]">
                  <button
                    type="button"
                    onClick={() => setActiveImage(item)}
                    className={
                      'group relative block w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 ' +
                      (index === selectedIndex
                        ? 'border-accent/45 shadow-[0_0_0_1px_rgba(110,231,183,0.18)]'
                        : 'border-zinc-800 hover:border-zinc-600')
                    }
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      draggable={false}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                      <p className="mt-1 text-[11px] text-zinc-400">{item.caption}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {PHOTOS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to ${item.title}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={
                  'h-1.5 rounded-full transition-all duration-300 ' +
                  (index === selectedIndex ? 'w-7 bg-accent' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500')
                }
              />
            ))}
          </div>
        </SectionReveal>
      </div>

      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
