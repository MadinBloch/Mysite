import { useCallback, useState } from 'react'
import Lightbox from './Lightbox'

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
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  return (
    <section id="workshop" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Teaching</p>
        <h2 className="section-heading mb-2">University Workshop</h2>
        <p className="text-zinc-500 text-sm mb-8 max-w-2xl">
          Practical hands-on workshop for BCA &amp; MCA students at Dr. Subhash University —
          covering Git, containers, and Docker with live demos.
        </p>

        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3 card border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded">
                Facilitator
              </span>
              <span className="font-mono text-xs text-zinc-500 bg-zinc-800/80 px-2 py-1 rounded">
                Aug 2026 · Junagadh
              </span>
            </div>
            <h3 className="font-display font-bold text-zinc-100 text-xl mb-2">
              Dr. Subhash University
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
              Grateful to Dr. Subhash University for giving me the opportunity to conduct a
              Practical Hands-on Workshop for BCA &amp; MCA students — sharing real developer
              practices beyond classroom theory.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {TOPICS.map((topic) => (
                <div key={topic.title} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
                  <p className="text-zinc-200 text-sm font-medium">{topic.title}</p>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{topic.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// audience</p>
              <p className="text-zinc-100 text-lg font-display font-bold">BCA &amp; MCA</p>
              <p className="text-zinc-500 text-xs mt-1">University students · hands-on cohort</p>
            </div>
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// focus</p>
              <p className="text-zinc-100 text-lg font-display font-bold">Git + Docker</p>
              <p className="text-zinc-500 text-xs mt-1">Version control &amp; containers</p>
            </div>
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// format</p>
              <p className="text-zinc-100 text-lg font-display font-bold">Live demos</p>
              <p className="text-zinc-500 text-xs mt-1">Setup walkthroughs &amp; Q&amp;A</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PHOTOS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-left"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-36 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[11px] text-zinc-100 font-medium leading-snug">{item.title}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 hidden sm:block">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
