import { motion } from 'framer-motion'
import { SectionReveal } from './motion/SectionReveal'

const highlights = [
  { label: 'Education', title: 'MCA · Pursuing', detail: 'BCA completed' },
  { label: 'What I enjoy', title: 'Building & teaching', detail: 'Backend work, Git and Docker workshops' },
  { label: 'Focus', title: 'Laravel backends', detail: 'APIs, queues, deployments' },
  { label: 'Base', title: 'Ahmedabad, India', detail: 'Open to remote-friendly roles' },
]

export default function About() {
  return (
    <section id="about" className="relative border-t border-zinc-900/80 bg-zinc-900/20 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <SectionReveal>
          <p className="section-label">A little about me</p>
          <h2 className="section-heading mt-3">
            More than <span className="text-accent">just code.</span>
          </h2>
          <p className="mt-5 text-sm leading-8 text-zinc-400">
            I’m a developer who likes understanding the problem before writing the solution.
            I care about clear code, solid APIs, and software that stays easy to work on as it grows.
          </p>
          <div className="mt-6 divider-glow" />
          <p className="mt-6 text-sm leading-8 text-zinc-400">
            Outside work, I teach, share notes, and keep learning through real projects — not just tutorials.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="space-y-5 text-sm leading-8 text-zinc-300">
            <p>
              Since December 2024, I’ve been working on PHP and Laravel applications — writing backend logic,
              integrating APIs, handling production fixes, and deploying real projects.
            </p>
            <p>
              At Shine Infosoft, I’ve contributed to travel operations software and internal business tools.
              Outside work, I explore new engineering tools and enjoy sharing what I learn through workshops and writing.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4, borderColor: 'rgba(110,231,183,0.35)' }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/50 px-5 py-5"
                >
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
