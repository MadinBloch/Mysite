import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import PhotoDeck from './PhotoDeck'
import { SectionReveal, Stagger, StaggerItem } from './motion/SectionReveal'

const milestones = [
  {
    step: '01',
    title: 'Regional Round',
    text: 'Qualified by presenting the initial backend solution and product direction.',
  },
  {
    step: '02',
    title: 'Architecture Defense',
    text: 'Explained tradeoffs, data flow, and delivery plan under mentor pressure.',
  },
  {
    step: '03',
    title: 'Grand Finale',
    text: 'Reached the PDEU finale and shipped a backend-focused demo with the team.',
  },
]

const videos = [
  {
    id: 'regional',
    label: 'Regional Round Video',
    youtubeId: 'N-U6c92QPeA',
    title: 'The Code Crushers — regional journey',
  },
  {
    id: 'project',
    label: 'Project Video',
    youtubeId: 'yLy_fBdOT7M',
    title: 'Hackathon project walkthrough',
  },
]

const moments = [
  {
    id: 'finale-backdrop',
    src: '/imag1hackthone.jpg',
    title: 'Grand Finale Backdrop',
    eyebrow: 'Hackathon 2023',
    caption: 'New India Vibrant Hackathon · PDEU',
  },
  {
    id: 'finale-moment',
    src: '/image3hackthone.jpg',
    title: 'Grand Finale moment',
    eyebrow: 'Team',
    caption: 'Selfie after reaching the finale',
  },
  {
    id: 'certificates',
    src: '/image5.jpg',
    title: 'Team with certificates',
    eyebrow: 'Achievement',
    caption: 'Celebrating the result together',
  },
  {
    id: 'presentation',
    src: '/image2hackthone.jpg',
    title: 'Presentation session',
    eyebrow: 'Mentors',
    caption: 'Discussing the solution live',
  },
  {
    id: 'regional-lab',
    src: '/image7.jpg',
    title: 'Regional workspace',
    eyebrow: 'Build mode',
    caption: 'Shipping under time pressure',
  },
]

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  const poster = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`

  return (
    <motion.article whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
      <div className="relative aspect-video overflow-hidden bg-zinc-950">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={'Play ' + video.label}>
            <img src={poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-zinc-950/40" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-950/70 text-white backdrop-blur-md">
              ▶
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{video.label}</p>
        <p className="mt-1 text-sm font-medium text-zinc-200">{video.title}</p>
      </div>
    </motion.article>
  )
}

export default function Hackathon() {
  const [activeImage, setActiveImage] = useState(null)
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  return (
    <section id="hackathon" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal>
          <p className="section-label">Competition</p>
          <h2 className="section-heading mt-2 mb-2">Hackathon Achievement</h2>
          <p className="mb-8 max-w-3xl text-sm leading-7 text-zinc-500">
            Grand Finalist at New India Vibrant Hackathon 2023 — from regional qualification to the
            finale at Pandit Deendayal Energy University (PDEU).
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mb-8 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/[.08] via-zinc-900/80 to-zinc-950 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 font-mono text-xs text-accent">
                  Grand Finalist
                </span>
                <span className="rounded-full border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-400">
                  PDEU · 2023
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                New India Vibrant Hackathon
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                Built and presented a backend-focused solution under time pressure, defended architecture
                choices before judges, and delivered as a team from regional round to grand finale.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Stage', 'Grand Finale'],
                  ['Focus', 'Backend system'],
                  ['Mode', 'Team delivery'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-zinc-800 bg-zinc-950/50 px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-accent/10 blur-2xl" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setActiveImage(moments[0])}
                className="group relative block overflow-hidden rounded-[24px] border border-zinc-700"
              >
                <img
                  src="/imag1hackthone.jpg"
                  alt="Grand Finale backdrop"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-zinc-950/60 px-3 py-1.5 text-xs text-white backdrop-blur">
                  Open photo ↗
                </span>
              </button>
            </div>
          </div>
        </SectionReveal>

        <Stagger className="mb-10 grid gap-4 md:grid-cols-3">
          {milestones.map((item) => (
            <StaggerItem key={item.step}>
              <motion.div whileHover={{ y: -5 }} className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
                <p className="font-mono text-xs text-accent">{item.step}</p>
                <h4 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionReveal delay={0.08}>
            <h3 className="mb-4 font-display text-xl font-semibold text-zinc-100">Moment deck</h3>
            <p className="mb-5 text-sm text-zinc-500">Drag through finale and team photos — same smooth deck as the hero.</p>
            <PhotoDeck photos={moments} />
          </SectionReveal>

          <Stagger className="space-y-4" delay={0.1}>
            <StaggerItem>
              <h3 className="font-display text-xl font-semibold text-zinc-100">Watch the journey</h3>
              <p className="mt-1 mb-4 text-sm text-zinc-500">Regional update and project walkthrough.</p>
            </StaggerItem>
            {videos.map((video) => (
              <StaggerItem key={video.id}>
                <VideoCard video={video} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
