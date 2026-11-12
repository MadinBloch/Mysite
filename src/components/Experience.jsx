const highlights = [
  {index:'01',title:'Own the release',body:'I work beyond the commit: Docker environments, EC2, Nginx / PHP-FPM, SSL, rollout checks and debugging when something goes wrong in production.'},
  {index:'02',title:'Design for the messy cases',body:'Late records, skipped exports, role boundaries and interrupted operations need a recovery path. I think about those cases before a workflow is considered done.'},
  {index:'03',title:'Make the system observable',body:'Progress tracking, error handling, notifications and logs matter because real teams need to know what happened—not just that a request returned 200.'}
]
const teams=['Sales','Land Ops','Air Ops','Cashier','Product','Finance','Other operational teams']

export default function Experience() {
  return <section id="experience" className="relative overflow-hidden border-t border-white/10 bg-[#10151b] py-24 sm:py-32">
    <div className="pointer-events-none absolute -right-40 top-16 h-[450px] w-[450px] rounded-full bg-accent/[.045] blur-[110px]" />
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">03 / Experience</p>
          <h2 className="section-heading">I ship the code. <span className="font-light italic text-accent">Then I own what happens next.</span></h2>
          <p className="mt-6 max-w-lg text-sm leading-8 text-[#9ba8b2]">The job is bigger than a list of completed screens. It means making changes safe, keeping data reliable and being accountable when the release is live.</p>

          <div className="mt-9 space-y-0 border-l border-white/15 pl-6">
            <div className="relative pb-9 before:absolute before:-left-[30px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-accent">
              <p className="font-mono text-[10px] uppercase tracking-[.17em] text-accent">May 2025 — Present</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-white">Laravel Developer</h3>
              <p className="mt-1 text-sm text-[#a5b1b9]">Shine Infosoft · Ahmedabad</p>
              <p className="mt-3 text-xs leading-6 text-[#788894]">ERP-connected Laravel systems, performance work, business operations and end-to-end application releases.</p>
            </div>
            <div className="relative before:absolute before:-left-[30px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:border before:border-[#8995a0] before:bg-[#10151b]">
              <p className="font-mono text-[10px] uppercase tracking-[.17em] text-[#8c9aa5]">Dec 2024 — May 2025</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-white">PHP Developer</h3>
              <p className="mt-1 text-sm text-[#a5b1b9]">Magecurious · Ahmedabad</p>
              <p className="mt-3 text-xs leading-6 text-[#788894]">Backend development, issue resolution and delivery with an engineering team.</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {['Production systems','Backend architecture','Release ownership'].map(s=><span key={s} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-[#9eacb4]">{s}</span>)}
          </div>
          <div className="grid gap-3">
            {highlights.map(h=><article key={h.index} className="group grid gap-3 rounded-2xl border border-white/10 bg-[#171c23] p-6 transition-colors hover:border-accent/40 sm:grid-cols-[55px_1fr] sm:p-8">
              <span className="font-mono text-sm text-accent">{h.index}</span>
              <div><h3 className="font-display text-[24px] font-medium tracking-tight text-white">{h.title}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-[#9aa8b1]">{h.body}</p></div>
            </article>)}
          </div>
          <div className="mt-5 rounded-2xl border border-accent/15 bg-accent/[.045] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-accent">Working with teams across the business</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {teams.map(t=><span key={t} className="rounded-full border border-[#b9f483]/20 px-3 py-1.5 text-xs text-[#d5ddcd]">{t}</span>)}
            </div>
            <p className="mt-4 text-xs leading-6 text-[#7f9286]">Platform reach: approximately 700–1,000 team users, based on developer-reported figures.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
}
