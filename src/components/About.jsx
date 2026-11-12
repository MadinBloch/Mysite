export default function About() {
  return (
    <section id="about" className="border-t border-white/[.07] bg-[#101726] py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow">A little about me</p>
          <h2 className="section-heading mt-4">More than <span className="text-accent">just code.</span></h2>
          <p className="mt-5 text-sm leading-8 text-[#a6b1c9]">
            I'm a developer who likes understanding the problem before writing the solution.
            I care about clear code, solid APIs and software that stays easy to work on as it grows.
          </p>
        </div>
        <div className="space-y-5 pt-1 text-sm leading-8 text-[#b9c3da]">
          <p>Since December 2024, I've been working on PHP and Laravel applications—writing backend logic, integrating APIs, handling production fixes and deploying real projects.</p>
          <p>At Shine Infosoft, I've worked on travel operations software and internal business tools. I also built the original version of an Excel-based email campaign system. Outside work, I explore new engineering tools and enjoy sharing what I learn.</p>
          <div className="grid gap-3 pt-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] px-5 py-5">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">Education</p>
              <p className="text-sm font-semibold text-white">MCA · Pursuing</p>
              <p className="mt-1 text-xs text-[#8c99b6]">BCA completed</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] px-5 py-5">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">What I enjoy</p>
              <p className="text-sm font-semibold text-white">Building & teaching</p>
              <p className="mt-1 text-xs text-[#8c99b6]">Backend work, Git and Docker workshops</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
