import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    meta: 'Community · Ongoing',
    description:
      'Connecting with developers in the PHP ecosystem to exchange ideas around architecture, deployment, and real project workflows.',
    href: null,
    accent: false,
  },
]

export default function Community() {
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
    </section>
  )
}
