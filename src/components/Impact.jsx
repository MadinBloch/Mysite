import AnimatedNumber from './AnimatedNumber'
import { siteStats, statsDisclaimer } from '../data/siteStats'

export default function Impact() {
  return (
    <section id="impact" className="relative bg-[#f1f1e8] py-20 text-[#141a16] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 grid gap-5 md:grid-cols-[.55fr_1fr] md:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[.22em] text-[#486d43]">01 / Real-world scale</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.9rem)] font-semibold leading-[1.02] tracking-[-.07em]">Beyond the <span className="italic font-light">feature list.</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-8 text-[#536058] md:justify-self-end sm:text-base">Numbers matter when they describe the real workload. These are platform operating figures and measured development tasks—not a claim that I personally processed every inquiry.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[26px] border border-[#d6dccf] bg-[#d6dccf] sm:grid-cols-2 lg:grid-cols-4">
          {siteStats.map((s,i) => (
            <div key={s.id} className="group min-h-[226px] bg-[#f7f8f1] px-6 py-7 transition-colors hover:bg-[#e9efde] sm:px-7">
              <p className="mb-7 font-mono text-[10px] tracking-[.15em] text-[#83917d]">0{i+1} / IMPACT</p>
              <AnimatedNumber a={s.a} b={s.b} suffix={s.suffix} className="block whitespace-nowrap font-display text-[clamp(2.2rem,3.2vw,3.55rem)] font-semibold tracking-[-.075em] text-[#18231b]" />
              <p className="mt-2 text-[14px] font-semibold text-[#28362c]">{s.label}</p>
              <p className="mt-4 text-[12px] leading-6 text-[#758174]">{s.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl font-mono text-[10px] leading-6 text-[#687769]">{statsDisclaimer}</p>
      </div>
    </section>
  )
}
