import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

const projectById = id => projects.find(p => p.id === id)

function Arrow() { return <span aria-hidden="true">↗</span> }
function Tags({ items, dark = false }) {
  return <div className="flex flex-wrap gap-2">{items.map(t => <span key={t} className={'rounded-full border px-3 py-1.5 font-mono text-[10px] ' + (dark ? 'border-[#b3bca8] text-[#49604d]' : 'border-white/15 bg-white/[.035] text-[#bdc5cb]')}>{t}</span>)}</div>
}

function WorkflowIllustration() {
  const steps = ['Inquiry received','ERP & workflow','Operational teams']
  return <div aria-label="Illustrative workflow: inquiry, ERP and operational teams" className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0d1219] p-5 sm:p-6">
    <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#8593a5]">Engineering view / illustrative</span>
      <span className="flex items-center gap-2 font-mono text-[10px] text-accent"><i className="h-1.5 w-1.5 rounded-full bg-accent" /> Production</span>
    </div>
    <div className="space-y-3">
      {steps.map((s,i)=><div key={s} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs text-accent">0{i+1}</span>
        <span className="text-sm font-medium text-[#f2f3ed]">{s}</span>
        <span className="ml-auto text-[#74818a]" aria-hidden="true">↗</span>
      </div>)}
    </div>
    <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono text-[#acb5a9]"><span className="rounded-full border border-accent/20 bg-accent/[.07] px-3 py-1.5">Approval checks</span><span className="rounded-full border border-white/10 px-3 py-1.5">Export recovery</span><span className="rounded-full border border-white/10 px-3 py-1.5">Deployments</span></div>
  </div>
}

function EmailIllustration() {
  return <div className="relative mt-7 overflow-hidden rounded-2xl border border-[#d1dcc3] bg-[#f4f7ec] p-5 text-[#1c3125]">
    <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-semibold tracking-widest text-[#6b7b65]">CAMPAIGN MONITOR / CONCEPT</span><span className="rounded-full bg-[#dcf1c5] px-2.5 py-1 font-mono text-[10px] text-[#34653a]">● Running</span></div>
    <div className="mt-6 flex items-end justify-between gap-2"><div><p className="text-xs text-[#7a8b76]">Example progress</p><p className="font-display text-3xl font-semibold tracking-[-.06em]">6,000 <span className="text-lg font-normal text-[#9ba99c]">/ 10,000</span></p></div><span className="font-mono text-xs text-[#497452]">60%</span></div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#d4dfc9]"><div className="h-full w-[60%] rounded-full bg-[#76ad6d]" /></div>
    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#d7e0d2] pt-4 text-center"><span className="rounded-lg bg-white/60 p-2 font-mono text-[10px]">Excel import</span><span className="rounded-lg bg-white/60 p-2 font-mono text-[10px]">Queue workers</span><span className="rounded-lg bg-white/60 p-2 font-mono text-[10px]">Pause / resume</span></div>
    <p className="mt-3 text-[10px] text-[#8a9988]">Illustrative screen, not a captured dashboard or delivery-speed benchmark.</p>
  </div>
}

export default function Projects() {
  const kesari=projectById(4),email=projectById(3),print=projectById(1),other=projects.filter(p=>![4,3,1].includes(p.id))
  return <section id="work" className="relative bg-[#0b0d12] py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div><p className="eyebrow mb-5">02 / Selected work</p><h2 className="section-heading max-w-[690px]">The work, the <span className="font-light italic text-accent">why,</span> and the result.</h2></div>
        <p className="max-w-[320px] text-sm leading-7 text-[#97a1ab]">A few engineering problems worth explaining. Some systems are private business software, so the diagrams show the approach—not internal screens.</p>
      </div>

      <article className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#161b22]">
        <div className="grid lg:grid-cols-[1.03fr_.97fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3"><span className="eyebrow">{kesari.eyebrow}</span><span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-[#929ea7]">{kesari.year}</span></div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-16 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0c10] p-3"><img src={kesari.logo} alt="Kesari Select logo" className="max-h-12 w-full object-contain" /></div>
              <div><h3 className="font-display text-4xl font-semibold tracking-[-.06em] text-white sm:text-5xl">{kesari.title}</h3><p className="mt-1 text-xs text-[#97a0a9]">{kesari.type}</p></div>
            </div>
            <h4 className="mt-9 max-w-md font-display text-[25px] font-medium leading-tight tracking-[-.04em] text-[#f4f5eb]">{kesari.tagline}</h4>
            <p className="mt-4 max-w-lg text-sm leading-8 text-[#aeb6bd]">{kesari.description}</p>
            <div className="mt-7"><Tags items={kesari.tech} /></div>
            <Link to={'/projects/'+kesari.caseStudySlug} className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#13180f] hover:bg-white">Read the engineering story <Arrow /></Link>
            <p className="mt-5 max-w-lg text-[11px] leading-5 text-[#7c8994]">{kesari.note}</p>
          </div>
          <div className="flex flex-col justify-between gap-5 bg-[#11161c] p-5 sm:p-8 lg:p-10">
            <WorkflowIllustration />
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-white/10 p-3"><p className="font-display text-xl font-semibold text-white">10K+</p><p className="mt-1 text-[10px] text-[#8996a0]">Total inquiries</p></div>
              <div className="rounded-xl border border-white/10 p-3"><p className="font-display text-xl font-semibold text-white">80–100+</p><p className="mt-1 text-[10px] text-[#8996a0]">New / day</p></div>
              <div className="rounded-xl border border-white/10 p-3"><p className="font-display text-xl font-semibold text-white">700–1K</p><p className="mt-1 text-[10px] text-[#8996a0]">Team users</p></div>
            </div>
            <p className="font-mono text-[10px] text-[#737f89]">Developer-reported platform figures</p>
          </div>
        </div>
      </article>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="overflow-hidden rounded-[30px] border border-[#d8e4c9] bg-[#eaf1df] p-6 text-[#1b3024] sm:p-9">
          <span className="font-mono text-[10px] uppercase tracking-[.24em] text-[#578052]">{email.eyebrow}</span>
          <h3 className="mt-6 max-w-[470px] font-display text-4xl font-semibold leading-[1.03] tracking-[-.055em]">{email.title}</h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#4d6653]">{email.description}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono"><span className="rounded-full border border-[#bdcdb4] px-3 py-1.5">10K+ rows / &lt;4 seconds</span><span className="rounded-full border border-[#bdcdb4] px-3 py-1.5">Queue-powered sends</span></div>
          <EmailIllustration />
          <Link to={'/projects/'+email.caseStudySlug} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#22472b] hover:underline">View engineering story <Arrow /></Link>
        </article>

        <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#1a2027] p-6 sm:p-9">
          <span className="eyebrow">{print.eyebrow}</span>
          <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-.06em] text-white">{print.title}</h3>
          <p className="mt-4 max-w-lg text-sm leading-8 text-[#adb9c1]">{print.description}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ['Prospect intake','Validated data & safer lifecycle'],
              ['Role-based work','Permission decisions'],
              ['Job consistency','Extras & configurable options'],
              ['Record retention','Soft-delete behavior']
            ].map(([t,d],i)=><div key={t} className="min-h-[120px] rounded-2xl border border-white/10 bg-[#11161b] p-4"><span className="font-mono text-[10px] text-accent">0{i+1}</span><p className="mt-3 text-sm font-semibold text-white">{t}</p><p className="mt-1 text-xs leading-5 text-[#8697a2]">{d}</p></div>)}
          </div>
          <div className="mt-7"><Tags items={print.tech} /></div>
          <Link to={'/projects/'+print.caseStudySlug} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-white">Read the case study <Arrow /></Link>
        </article>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-5 rounded-[26px] border border-white/10 bg-[#13181e] px-6 py-7 sm:flex-row sm:items-center sm:px-9">
        <div><p className="eyebrow">Outside client work</p><h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">Still building, still experimenting.</h3><p className="mt-2 text-sm text-[#9aa9b1]">Independent projects are labeled as experiments, not dressed up as production systems.</p></div>
        <a href="https://github.com/MadinBloch/DevCommand-AI" target="_blank" rel="noreferrer" className="shrink-0 rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:border-accent hover:text-accent">Explore DevCommand AI ↗</a>
      </div>
    </div>
  </section>
}
