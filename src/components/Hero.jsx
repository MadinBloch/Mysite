import { Link } from 'react-router-dom'
import AnimatedNumber from './AnimatedNumber'

const pipeline = [
  ['01','New inquiry','Sales / Operations'],
  ['02','Business rules','Laravel + ERP'],
  ['03','Protected workflow','Approvals + automation'],
  ['04','Production','Monitoring + releases']
]

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#0b0d12] pt-28 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-12 h-[570px] w-[570px] rounded-full bg-[#a4db72]/[.075] blur-[120px]" />
      <div className="pointer-events-none absolute -left-44 bottom-0 h-[490px] w-[490px] rounded-full bg-[#5b8cb1]/[.09] blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-14 lg:px-12 lg:pb-32 lg:pt-16">
        <div className="max-w-[780px]">
          <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-[#b9f483]/30 bg-[#b9f483]/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_15px_#b9f483]" />
            <span className="font-mono text-[10px] uppercase tracking-[.14em] text-[#d5eac6]">Backend developer · Open to opportunities</span>
          </div>

          <p className="mb-5 font-mono text-xs uppercase tracking-[.35em] text-accent">Madin Bloch / Engineering portfolio</p>
          <h1 className="max-w-[780px] font-display text-[clamp(3.3rem,7.2vw,7.4rem)] font-semibold leading-[.93] tracking-[-.075em] text-[#f6f6f0]">
            Building the <span className="font-light italic text-accent">backend</span> that keeps business moving<span className="text-accent">.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-[1.9] text-[#abb1bc] sm:text-[17px]">
            I work with PHP and Laravel on production systems people rely on—from ERP-connected workflows and high-volume data imports to deployment, performance and the decisions in between.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/#work" className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-[#0e150b] transition-transform hover:-translate-y-0.5 hover:bg-white">Explore selected work <span aria-hidden="true">↗</span></Link>
            <a href="/Madin_Bloch_Resume.pdf" download className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white">Download resume <span aria-hidden="true">↓</span></a>
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6 font-mono text-[11px] text-[#7d8693]">
            <span><span className="text-accent">●</span> Ahmedabad, India</span>
            <span>Remote / relocation available</span>
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="text-[#c8d0d4] hover:text-accent">LinkedIn ↗</a>
          </div>
        </div>

        <div className="relative lg:pl-4">
          <div className="absolute -inset-5 rounded-[36px] border border-accent/10 opacity-40" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#12171d] p-5 shadow-[0_35px_100px_rgba(0,0,0,.55)] sm:p-7">
            <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
              <div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-accent">System perspective</p><p className="mt-1 font-display text-xl font-medium text-white">How I approach the work</p></div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-accent" aria-hidden="true">↗</span>
            </div>
            <div className="space-y-0">
              {pipeline.map(([index,title,detail],i) => (
                <div key={index} className="relative grid grid-cols-[35px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <span className={'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] '+(i===3?'border-accent bg-accent text-black':'border-white/20 text-[#b2bac8]')}>{index}</span>
                    {i!==pipeline.length-1 && <span className="h-[44px] w-px bg-gradient-to-b from-white/20 to-accent/25" />}
                  </div>
                  <div className="pb-5"><p className="font-display text-[15px] font-medium text-[#f0f1eb]">{title}</p><p className="mt-1 text-xs text-[#81909a]">{detail}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-accent/20 bg-accent/[.06] px-5 py-4">
              <div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#b8c4b6]">Total inquiries in platform</p><p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white"><AnimatedNumber a={10000} suffix="+" /></p></div>
              <span className="font-mono text-[11px] text-accent">All time</span>
            </div>
            <p className="mt-4 font-mono text-[10px] leading-5 text-[#6f7b85]">Illustrative workflow, not a screenshot of proprietary software. Volumes are developer-reported estimates.</p>
          </div>
        </div>
      </div>
      <div className="relative border-y border-white/10 bg-[#11151a]/75">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#707e88]">Working across</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-[#aeb8c2]">
            <span>Laravel</span><span>PHP</span><span>MySQL</span><span>ERP / APIs</span><span>AWS</span><span>Docker</span><span>Queues</span>
          </div>
        </div>
      </div>
    </section>
  )
}
