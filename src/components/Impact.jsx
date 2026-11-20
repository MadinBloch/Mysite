import AnimatedNumber from './AnimatedNumber'
import { siteStats, statsDisclaimer } from '../data/siteStats'

export default function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden border-y border-zinc-800/80 bg-zinc-900/35 py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/[.08] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 grid gap-5 md:grid-cols-[.8fr_1fr] md:items-end">
          <div>
            <p className="section-label">Platform impact</p>
            <h2 className="section-heading mt-3">Built for <span className="text-accent">real operations.</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400 md:justify-self-end sm:text-base">I build and support the Laravel workflows behind Kesari Select, while helping teams learn the TAP system through internal training videos.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siteStats.map((s) => (
            <div key={s.id} className="group min-h-[190px] rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 transition-colors hover:border-accent/35 hover:bg-zinc-900/80 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-zinc-500">{s.label}</p>
              <AnimatedNumber a={s.a} b={s.b} suffix={s.suffix} className="mt-6 block whitespace-nowrap font-display text-[clamp(2.25rem,3.2vw,3.25rem)] font-semibold tracking-[-.07em] text-white transition-colors group-hover:text-accent" />
              <p className="mt-3 text-[12px] leading-6 text-zinc-500">{s.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-[11px] leading-6 text-zinc-600">{statsDisclaimer}</p>
      </div>
    </section>
  )
}
