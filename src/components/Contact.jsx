import { motion } from 'framer-motion'
import { SectionReveal } from './motion/SectionReveal'

const links = [
  { href: 'https://www.linkedin.com/in/madin-bloch/', label: 'LinkedIn' },
  { href: 'https://github.com/MadinBloch', label: 'GitHub' },
  { href: '/Madin_Bloch_Resume.pdf', label: 'Resume', download: true },
  { href: 'https://madinbloch.hashnode.dev/', label: 'Blog' },
]

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-zinc-900 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(110,231,183,.12),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal className="flex flex-col items-center text-center">
          <p className="section-label">Let’s connect</p>
          <h2 className="section-heading mt-3 max-w-xl">
            Have something in mind<span className="text-accent">?</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-zinc-400">
            I’m open to backend developer opportunities and interesting projects. Feel free to reach out.
          </p>

          <motion.a
            href="mailto:madinkhan0633@gmail.com?subject=Hello%20Madin%20-%20Let%27s%20connect&body=Hi%20Madin%2C%0A%0A"
            className="btn-primary mt-8 px-8 py-4 text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Say hello <span aria-hidden="true">↗</span>
          </motion.a>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.download ? { download: true } : { target: '_blank', rel: 'noreferrer' })}
                className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-[13px] font-medium text-zinc-300 transition-all hover:border-accent/40 hover:text-accent"
              >
                {link.label} {link.download ? '↓' : '↗'}
              </a>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-zinc-800 pt-6 text-[11px] text-zinc-600">
          <span>© {new Date().getFullYear()} Madin Bloch</span>
          <span>Built with React, Vite & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
