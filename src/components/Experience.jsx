const jobs = [
  {
    title: 'Laravel Developer',
    company: 'Shine Infosoft',
    period: 'May 2025 — Present',
    location: 'Ahmedabad, India',
    current: true,
    points: [
      'Develop and maintain Laravel backends, APIs and integrations for production business applications.',
      'Improve system reliability and performance through background processing, validation and production debugging.',
      'Handle application deployment and release checks with Docker, AWS EC2, Nginx, PHP-FPM and SSL.'
    ]
  },
  {
    title: 'PHP Developer',
    company: 'Magecurious',
    period: 'Dec 2024 — May 2025',
    location: 'Ahmedabad, India',
    current: false,
    points: [
      'Worked on PHP features, business workflows and bug fixes in a collaborative development environment.'
    ]
  }
]
export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10">
          <p className="eyebrow">My journey so far</p>
          <h2 className="section-heading mt-3">Experience<span className="text-accent">.</span></h2>
        </div>
        <div className="space-y-5">
          {jobs.map(job => (
            <article key={job.company} className="grid gap-5 rounded-[22px] border border-white/10 bg-[#141c2b] p-6 sm:grid-cols-[210px_1fr] sm:p-8">
              <div>
                <p className="font-mono text-[11px] font-medium text-accent">{job.period}</p>
                <p className="mt-3 text-xs text-[#7f8ca8]">{job.location}</p>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-[23px] font-semibold tracking-tight text-white">{job.title}</h3>
                  {job.current && <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">Current</span>}
                </div>
                <p className="mt-1 text-sm font-semibold text-[#b1c1e7]">{job.company}</p>
                <ul className="mt-5 space-y-3">
                  {job.points.map(point => <li key={point} className="flex items-start gap-3 text-[13px] leading-7 text-[#acb8d0]"><span aria-hidden="true" className="mt-0.5 text-accent">↳</span><span>{point}</span></li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
