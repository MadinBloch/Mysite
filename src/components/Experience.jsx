import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionReveal } from './motion/SectionReveal'

const jobs = [
  {
    id: 'shine',
    title: 'Laravel Developer',
    company: 'Shine Infosoft',
    period: 'May 2025 — Present',
    location: 'Ahmedabad, India',
    current: true,
    focus: ['Laravel APIs', 'Queues', 'Docker Deployments'],
    summary: 'Building and shipping production backend systems for live business platforms.',
    points: [
      'Own Laravel backend features, integrations, and production fixes for travel operations software.',
      'Improve reliability with validation, background jobs, and careful release checks.',
      'Deploy and troubleshoot with Docker, AWS EC2, Nginx, PHP-FPM, and SSL.',
    ],
  },
  {
    id: 'mage',
    title: 'PHP Developer',
    company: 'Magecurious',
    period: 'Dec 2024 — May 2025',
    location: 'Ahmedabad, India',
    current: false,
    focus: ['PHP', 'Business workflows', 'Bug fixes'],
    summary: 'Grew into professional PHP development through real product workflows.',
    points: [
      'Delivered PHP features and business workflow updates in a collaborative team.',
      'Fixed production bugs and learned how maintainable backend code looks day to day.',
    ],
  },
]

export default function Experience() {
  const [openId, setOpenId] = useState(jobs[0].id)

  return (
    <section id="experience" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-label">My journey so far</p>
            <h2 className="section-heading mt-2">Experience</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-zinc-500">
            Click a role to expand the story — short, clear, and focused on impact.
          </p>
        </SectionReveal>

        <div className="relative grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="relative hidden lg:block">
            <div className="absolute bottom-6 left-[11px] top-6 w-px bg-gradient-to-b from-accent via-zinc-700 to-transparent" />
            <div className="space-y-8 pt-2">
              {jobs.map((job) => (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setOpenId(job.id)}
                  className="relative flex w-full items-start gap-4 text-left"
                >
                  <span
                    className={
                      'mt-1 h-3 w-3 shrink-0 rounded-full border-2 transition-all ' +
                      (openId === job.id
                        ? 'border-accent bg-accent shadow-[0_0_16px_rgba(110,231,183,.6)]'
                        : 'border-zinc-600 bg-zinc-950')
                    }
                  />
                  <span>
                    <span className={'block font-mono text-[11px] ' + (openId === job.id ? 'text-accent' : 'text-zinc-500')}>
                      {job.period}
                    </span>
                    <span className={'mt-1 block text-sm font-semibold ' + (openId === job.id ? 'text-white' : 'text-zinc-400')}>
                      {job.company}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => {
              const open = openId === job.id
              return (
                <motion.article
                  key={job.id}
                  layout
                  className={
                    'overflow-hidden rounded-2xl border transition-colors ' +
                    (open ? 'border-accent/35 bg-zinc-900/80 shadow-[0_0_40px_rgba(110,231,183,0.06)]' : 'border-zinc-800 bg-zinc-900/50')
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(job.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-semibold text-white">{job.title}</h3>
                        {job.current && (
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-zinc-300">
                        {job.company} · <span className="text-zinc-500">{job.location}</span>
                      </p>
                      <p className="mt-3 text-sm leading-6 text-zinc-400">{job.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.focus.map((item) => (
                          <span key={item} className="rounded-full border border-zinc-700 bg-zinc-950/60 px-2.5 py-1 font-mono text-[10px] text-zinc-400">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={'mt-1 font-mono text-xs text-accent transition-transform ' + (open ? 'rotate-45' : '')}>+</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-zinc-800 px-5 pb-6 pt-2 sm:px-6">
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">What I did</p>
                          <ul className="space-y-3">
                            {job.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 text-[13px] leading-7 text-zinc-300">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
