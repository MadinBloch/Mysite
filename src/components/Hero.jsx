import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PhotoDeck from './PhotoDeck'

const HERO_PHOTOS = [
  {
    id: 'portrait',
    src: '/profile-portrait.png',
    title: 'Madin Bloch',
    eyebrow: 'PHP · Laravel · Docker',
    caption: 'Building backend systems.',
    alt: 'Madin Bloch — formal portrait',
    objectPosition: 'object-[center_18%]',
  },
  {
    id: 'workshop-2',
    src: '/workshop/git-docker.jpg',
    title: 'Git & Docker session',
    eyebrow: 'University Workshop',
    caption: 'Teaching version control and containers',
    alt: 'Git and Docker workshop audience',
  },
  {
    id: 'workshop-4',
    src: '/workshop/certificate.jpg',
    title: 'Certificate moment',
    eyebrow: 'University Workshop',
    caption: 'Recognition after the workshop',
    alt: 'Workshop certificate moment',
  },
  {
    id: 'hackathon',
    src: '/imag1hackthone.jpg',
    title: 'Grand Finale Backdrop',
    eyebrow: 'Hackathon 2023',
    caption: 'New India Vibrant Hackathon · PDEU',
    alt: 'Madin at New India Vibrant Hackathon Grand Finale',
  },
]

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[12%] h-52 w-52 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pt-1 lg:pt-2"
        >
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[.08] px-4 py-2 shadow-[0_0_24px_rgba(110,231,183,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_#6ee7b7] animate-pulse-dot" />
            <span className="text-[11px] font-medium text-accent/90">Open to backend opportunities</span>
          </div>

          <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[1.05] tracking-[-.04em] text-white">
            Hi, I’m <span className="text-gradient">Madin Bloch</span>
          </h1>
          <h2 className="mt-4 font-display text-[clamp(1.25rem,2.4vw,1.85rem)] font-medium tracking-[-.02em] text-zinc-200">
            Laravel / Backend Developer
          </h2>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.85] text-zinc-400 sm:text-base">
            I build APIs, business applications, and reliable backend systems. From production fixes to
            Dockerized deployments, I enjoy turning complex requirements into software that actually ships.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/#projects" className="btn-primary">
              View Projects <span aria-hidden="true">↗</span>
            </Link>
            <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">
              Download Resume <span aria-hidden="true">↓</span>
            </a>
            <a href="mailto:madinkhan0633@gmail.com?subject=Hello%20Madin" className="btn-ghost">
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <span className="text-accent" aria-hidden="true">●</span>
              Ahmedabad, India
            </span>
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              LinkedIn ↗
            </a>
            <a href="mailto:madinkhan0633@gmail.com" className="transition-colors hover:text-white">
              Email ↗
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-[400px] overflow-hidden lg:-mt-2 lg:ml-auto"
        >
          <PhotoDeck photos={HERO_PHOTOS} />
        </motion.div>
      </div>
    </section>
  )
}
