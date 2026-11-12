import { motion, useReducedMotion } from 'framer-motion'
import { SectionReveal } from './motion/SectionReveal'

const actions = [
  { href: 'mailto:madinkhan0633@gmail.com?subject=Hello%20Madin%20-%20Let%27s%20connect&body=Hi%20Madin%2C%0A%0A', label: 'Say hello', primary: true },
  { href: '/Madin_Bloch_Resume.pdf', label: 'Resume', download: true },
  { href: 'https://www.linkedin.com/in/madin-bloch/', label: 'LinkedIn', external: true },
  { href: 'https://github.com/MadinBloch', label: 'GitHub', external: true },
]

export default function Contact() {
  const reduce = useReducedMotion()

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-zinc-900 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(110,231,183,.11),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-25" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal className="flex flex-col items-center text-center">
          <p className="section-label">Let’s connect</p>
          <h2 className="section-heading mt-3 max-w-2xl">
            Building something that needs a solid backend<span className="text-accent">?</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-8 text-zinc-400">
            I’m based in Ahmedabad and open to remote-friendly Laravel / backend roles.
            If you have a product, a messy workflow, or a production problem — say hello.
          </p>

          <motion.a
            href={actions[0].href}
            className="btn-primary mt-9 px-9 py-4 text-base"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            Say hello <span aria-hidden="true">↗</span>
          </motion.a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {actions.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.download ? { download: true } : { target: '_blank', rel: 'noreferrer' })}
                className="min-w-[7.5rem] rounded-full border border-zinc-700/90 bg-zinc-900/50 px-5 py-2.5 text-center text-[13px] font-medium text-zinc-300 transition-all hover:border-accent/40 hover:text-accent"
              >
                {link.label} {link.download ? '↓' : '↗'}
              </a>
            ))}
          </div>

          <p className="mt-8 font-mono text-[11px] tracking-[0.12em] text-zinc-600">
            madinkhan0633@gmail.com
          </p>
        </SectionReveal>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-zinc-800/90 pt-6 text-[11px] text-zinc-600">
          <span>© {new Date().getFullYear()} Madin Bloch</span>
          <span>Built with React, Vite & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
