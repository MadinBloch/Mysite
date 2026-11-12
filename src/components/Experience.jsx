const EXPERIENCE = [
  {
    company: 'Shine Infosoft',
    role: 'Laravel Developer',
    type: 'Full-time',
    period: 'May 2025 – Present',
    location: 'Ahmedabad',
    current: true,
    points: [
      'Contribute to Kesari Select, a platform with reported scale of 10K+ daily inquiries and roughly 700–1,000 internal users.',
      'Built scheduled DBF exports and S3 staging/archives with logging and lookback checks to recover previously missed ERP records.',
      'Designed Cash Contra requisitions and extended Sales Manager-to-Finance approval and notification paths.',
      'Handled application deployments end-to-end using AWS EC2, Docker, Nginx/PHP-FPM, SSL and release troubleshooting.',
      'Built RFQ and low-stock alerts, extended air-ticketing and billing workflows, and reduced one observed page load from ~15s to ~3s.',
    ],
  },
  {
    company: 'Magecurious',
    role: 'PHP Developer',
    type: 'Full-time',
    period: 'Dec 2024 – May 2025',
    location: 'Ahmedabad',
    current: false,
    points: [
      'Worked on live PHP project assignments with mentoring from senior developers.',
      'Built practical backend fundamentals through real-world coding tasks and team collaboration.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(110,231,183,0.06),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Career</p>
        <h2 className="section-heading mb-2">Experience</h2>
        <p className="text-zinc-500 text-sm mb-10 max-w-2xl">
          Since December 2024 — from PHP project work to systems that support travel operations, finance and production deployments.
        </p>

        <div className="relative space-y-0">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/50 via-zinc-700 to-transparent hidden sm:block" />

          {EXPERIENCE.map((job) => (
            <article
              key={`${job.company}-${job.role}-${job.period}`}
              className="relative sm:pl-10 pb-10 last:pb-0 group"
            >
              <div
                className={`absolute left-0 top-2 hidden sm:flex w-[22px] h-[22px] rounded-full border-2 items-center justify-center ${
                  job.current
                    ? 'border-accent bg-accent/20'
                    : 'border-zinc-600 bg-zinc-900'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${job.current ? 'bg-accent' : 'bg-zinc-500'}`} />
              </div>

              <div className="card group-hover:border-accent/25 group-hover:shadow-[0_12px_40px_rgba(110,231,183,0.06)]">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-zinc-100">{job.role}</h3>
                    <p className="text-accent text-sm font-medium mt-0.5">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-zinc-400">{job.period}</p>
                    <p className="font-mono text-[11px] text-zinc-600 mt-1">
                      {job.location}
                    </p>
                  </div>
                </div>
                {job.current && (
                  <span className="inline-flex mb-3 font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
                <ul className="space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                      <span className="text-accent mt-1.5 text-[8px]">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
