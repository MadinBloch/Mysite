import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { SectionReveal } from './motion/SectionReveal'

const jobs = [
  {
    id: 'shine',
    title: 'Laravel Developer',
    company: 'Shine Infosoft',
    period: 'May 2025 — Present',
    location: 'Ahmedabad, India',
    focus: ['Laravel APIs', 'Queues', 'Docker Deployments'],
    points: [
      'Own Laravel backend features, integrations, and production fixes for travel operations software.',
      'Improve reliability with validation, background jobs, and careful release checks.',
      'Deploy and troubleshoot with Docker, AWS EC2, Nginx, PHP-FPM, and SSL.',
      'Recorded an internal TAP training walkthrough for Kesari’s Sales and Operations teams.',
    ],
  },
  {
    id: 'mage',
    title: 'PHP Developer',
    company: 'Magecurious',
    period: 'Dec 2024 — May 2025',
    location: 'Ahmedabad, India',
    focus: ['PHP', 'Business workflows', 'Bug fixes'],
    points: [
      'Delivered PHP features and business workflow updates in a collaborative team.',
      'Fixed production bugs and learned how maintainable backend code looks day to day.',
    ],
  },
]

export default function Experience() {
  const [openId, setOpenId] = useState(jobs[0].id)
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="section-shell" aria-labelledby="experience-title">
      <div className="portfolio-shell grid gap-8 lg:grid-cols-[.52fr_1fr] lg:gap-12">
        <SectionReveal>
          <h2 id="experience-title" className="section-heading">Experience</h2>
        </SectionReveal>
        <SectionReveal className="grid gap-3">
          {jobs.map((job) => {
            const open = openId === job.id
            const detailId = job.id + '-experience'

            return (
              <article key={job.id} className="portfolio-panel min-w-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={detailId}
                    onClick={() => setOpenId(open ? null : job.id)}
                    className="group flex w-full items-center justify-between gap-3 rounded-[1.5rem] px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="min-w-0">
                      <span className="portfolio-meta block">{job.period} · {job.location}</span>
                      <span className="mt-1.5 block font-display text-[1.35rem] font-semibold leading-tight transition-colors group-hover:text-accent sm:text-2xl">
                        {job.title}
                      </span>
                      <span className="mt-1 block text-sm text-[#b9d9c5]">{job.company}</span>
                    </span>
                    <span className="icon-button" aria-hidden="true">
                      {open ? <FiMinus size={17} /> : <FiPlus size={17} />}
                    </span>
                  </button>
                </h3>

                <div id={detailId} aria-hidden={!open}>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mx-5 border-t border-[#33443a] py-4 sm:mx-6">
                          <ul className="portfolio-copy list-disc space-y-2 pl-5 text-sm marker:text-accent">
                            {job.points.map((point) => <li key={point}>{point}</li>)}
                          </ul>
                          <ul aria-label="Tools and responsibilities" className="mt-4 flex flex-wrap gap-1.5">
                            {job.focus.map((item) => <li key={item} className="tag">{item}</li>)}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </article>
            )
          })}
        </SectionReveal>
      </div>
    </section>
  )
}
