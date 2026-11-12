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

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
})

export default function Hero() {
  const reduce = useReducedMotion()
  const motionProps = (delay = 0) => (reduce ? {} : fadeUp(delay))

  return (
    <section id="home" className="relative overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-28">
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden="true">
        <div className="absolute left-[6%] top-[22%] h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[12%] right-[10%] h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
        <div className="pt-1 lg:pt-0">
          <motion.div {...motionProps(0)} className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[.07] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#6ee7b7] animate-pulse-dot" />
            <span className="text-[11px] font-medium text-accent/90">Open to backend opportunities</span>
          </motion.div>

          <motion.h1
            {...motionProps(0.06)}
            className="font-display text-[clamp(2.75rem,6.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-.045em] text-white"
          >
            Hi, I’m <span className="text-gradient">Madin Bloch</span>
          </motion.h1>

          <motion.h2
            {...motionProps(0.12)}
            className="mt-3 font-display text-[clamp(1.2rem,2.3vw,1.7rem)] font-medium tracking-[-.02em] text-zinc-200"
          >
            Laravel / Backend Developer
          </motion.h2>

          <motion.p
            {...motionProps(0.18)}
            className="mt-4 max-w-[34rem] text-[15px] leading-[1.8] text-zinc-400 sm:text-[15.5px]"
          >
            I build APIs, business workflows, and production backends — from Laravel features to Docker and AWS releases that actually ship.
          </motion.p>

          <motion.div {...motionProps(0.24)} className="mt-7 flex flex-wrap gap-3">
            <Link to="/#projects" className="btn-primary">
              View Projects <span aria-hidden="true">↗</span>
            </Link>
            <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">
              Resume <span aria-hidden="true">↓</span>
            </a>
            <a href="mailto:madinkhan0633@gmail.com?subject=Hello%20Madin" className="btn-ghost">
              Say Hello
            </a>
          </motion.div>

          <motion.div
            {...motionProps(0.3)}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-zinc-500"
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-accent" aria-hidden="true">●</span>
              Ahmedabad · Open to remote
            </span>
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              LinkedIn ↗
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: reduce ? 0 : 0.14, ease }}
          className="relative z-10 mx-auto w-full max-w-[380px] overflow-hidden lg:ml-auto"
        >
          <PhotoDeck photos={HERO_PHOTOS} />
        </motion.div>
      </div>
    </section>
  )
}
