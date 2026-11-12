import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <div>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[.065] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_#9eb3ff]" />
            <span className="text-[11px] font-medium text-[#c2cdff]">Open to backend opportunities</span>
          </div>

          <p className="mb-5 font-mono text-xs font-medium tracking-[.16em] text-[#929cbd]">HI THERE, I'M</p>
          <h1 className="font-display text-[clamp(3.35rem,7vw,6.5rem)] font-semibold leading-[.99] tracking-[-.066em] text-white">
            Madin <span className="text-gradient">Bloch.</span>
          </h1>
          <h2 className="mt-6 font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium tracking-[-.035em] text-[#dbe1f4]">
            PHP & Laravel Backend Developer
          </h2>
          <p className="mt-5 max-w-[580px] text-[15px] leading-[1.9] text-[#a5aec7] sm:text-base">
            I build APIs, business applications and reliable backend systems. From solving tricky production issues to deploying the final release, I enjoy turning complex requirements into software that works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#projects" className="btn-primary">
              View my projects <span aria-hidden="true">↗</span>
            </Link>
            <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">
              Download resume <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-[#8f9ab5]">
            <span className="inline-flex items-center gap-2"><span className="text-accent" aria-hidden="true">●</span> Ahmedabad, India</span>
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn ↗</a>
            <a href="mailto:madinkhan0633@gmail.com" className="transition-colors hover:text-white">Email ↗</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:ml-auto">
          <div className="absolute -inset-4 rotate-3 rounded-[35px] border border-accent/20" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#151d2d] shadow-[0_30px_80px_rgba(0,0,0,.35)]">
            <div className="relative h-[350px] overflow-hidden bg-[#222f42] sm:h-[410px]">
              <img
                src="/workshop/presenting.jpg"
                alt="Presenting a Git and Docker workshop at Dr. Subhash University"
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1423] via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[.17em] text-[#b7c8ff]">Beyond the keyboard</p>
                <p className="mt-1 font-display text-2xl font-medium text-white">Sharing what I learn.</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-6 py-4">
              <div><p className="text-sm font-semibold text-white">Git & Docker Workshop</p><p className="mt-1 text-xs text-[#9ca7bf]">Dr. Subhash University · 2026</p></div>
              <Link to="/#moments" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-accent transition-colors hover:bg-white/10" aria-label="View workshop and hackathon moments">↗</Link>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/15 bg-[#202a3d] px-5 py-3.5 shadow-xl shadow-black/25 sm:block">
            <p className="font-mono text-[11px] text-[#a8b5ce]">Currently building with</p>
            <p className="mt-1 font-display text-lg font-semibold text-white">Laravel <span className="text-accent">+</span> PHP</p>
          </div>
        </div>
      </div>
    </section>
  )
}
