import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CASE_STUDIES } from '../data/caseStudies'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = CASE_STUDIES[slug]

  useEffect(() => {
    const before = document.title
    const description = document.querySelector('meta[name="description"]')
    const original = description?.getAttribute('content')
    const canonical = document.querySelector('link[rel="canonical"]')
    const beforeCanonical = canonical?.getAttribute('href')
    if (study) {
      document.title = study.title + ' | Madin Bloch'
      description?.setAttribute('content', study.subtitle)
      canonical?.setAttribute('href', 'https://madin-bloch.vercel.app/projects/'+slug)
    }
    return () => {
      document.title=before
      if (original) description?.setAttribute('content',original)
      if (beforeCanonical) canonical?.setAttribute('href', beforeCanonical)
    }
  }, [slug,study])

  if (!study) return <div className="mx-auto max-w-5xl px-5 pb-40 pt-36"><h1 className="font-display text-4xl text-white">That story isn't here.</h1><Link to="/#work" className="mt-5 inline-block text-accent">Explore projects ↗</Link></div>

  return <article className="bg-[#0b0d12]">
    <header className="relative overflow-hidden border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute -right-16 top-24 h-[440px] w-[440px] rounded-full bg-accent/[.08] blur-[100px]" />
      <div className="relative mx-auto max-w-6xl">
        <Link to="/#work" className="inline-flex items-center gap-2 font-mono text-[11px] text-[#9aa8b4] hover:text-accent">← All selected work</Link>
        <div className="mt-14 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[.2em] text-accent"><span>{study.number} / Case study</span><span className="text-[#5a6775]">—</span><span>{study.category}</span><span className="text-[#5a6775]">/ {study.period}</span></div>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[.99] tracking-[-.075em] text-white">{study.title}</h1>
        <p className="mt-7 max-w-[780px] text-[18px] leading-[1.65] text-[#b4c1c7] sm:text-[21px]">{study.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-2">{study.stack.map(s=><span className="tag" key={s}>{s}</span>)}</div>
      </div>
    </header>

    <section className="border-b border-white/10 bg-[#131820] py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className={'grid gap-4 '+(study.metrics.length===4?'sm:grid-cols-2 lg:grid-cols-4':'sm:grid-cols-3')}>
          {study.metrics.map(m=><div key={m.label} className="rounded-2xl border border-white/10 bg-[#1c222a] p-6">
            <p className="font-display text-[clamp(1.8rem,3vw,2.7rem)] font-semibold tracking-[-.06em] text-white">{m.value}</p>
            <p className="mt-2 text-sm font-medium text-[#d7e1d6]">{m.label}</p>
            <p className="mt-2 text-[11px] leading-5 text-[#84939d]">{m.detail}</p>
          </div>)}
        </div>
        {study.note && <p className="mt-6 max-w-4xl font-mono text-[10px] leading-6 text-[#7f8e96]">{study.note}</p>}
      </div>
    </section>

    <section className="bg-[#eef1e9] py-20 text-[#18251c] sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#638459]">Context</p><h2 className="mt-5 font-display text-[clamp(2.35rem,4vw,4.1rem)] font-semibold leading-[1.05] tracking-[-.065em]">What's behind the screen?</h2></div>
        <div>
          <p className="text-[17px] leading-[1.95] text-[#4b5d50]">{study.intro}</p>
          <div className="mt-9 border-t border-[#c8d5c9] pt-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#6c8e65]">The challenge</p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#314636]">{study.challenge}</p>
          </div>
          <div className="mt-9 border-t border-[#c8d5c9] pt-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#6c8e65]">My approach</p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#314636]">{study.approach}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#0c0f14] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow">The engineering part</p>
        <div className="mb-12 mt-5 flex flex-wrap items-end justify-between gap-6"><h2 className="section-heading max-w-3xl">Decisions, <span className="font-light italic text-accent">not a feature dump.</span></h2><p className="max-w-[300px] text-sm leading-7 text-[#9aa8b1]">The trade-offs that shaped the implementation.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {study.decisions.map((d,i)=><div key={d.title} className="rounded-[24px] border border-white/10 bg-[#171c23] p-7 sm:p-9">
            <p className="font-mono text-xs text-accent">0{i+1} / DESIGN DECISION</p>
            <h3 className="mt-7 font-display text-2xl font-medium tracking-tight text-[#f0f3eb]">{d.title}</h3>
            <p className="mt-4 text-sm leading-8 text-[#a2afb9]">{d.body}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="bg-accent py-20 text-[#132116] sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#4d6c44]">What changed</p>
        <h2 className="mt-5 max-w-5xl font-display text-[clamp(1.65rem,3.5vw,3.5rem)] font-medium leading-[1.35] tracking-[-.045em]">{study.takeaway}</h2>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/#work" className="rounded-full bg-[#122016] px-6 py-3 text-sm font-semibold text-white hover:bg-[#263b2a]">More project stories ↗</Link>
          {study.ctaUrl && <a href={study.ctaUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[#608d57] px-6 py-3 text-sm font-semibold text-[#243924] hover:bg-white/30">{study.ctaLabel} ↗</a>}
        </div>
      </div>
    </section>
  </article>
}
