export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Background</p>
        <h2 className="section-heading mb-8">About Me</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main text */}
          <div className="md:col-span-2 space-y-5 text-zinc-300 leading-7">
            <p>
              I started web development to understand how products work under the hood, not only
              how they look.
            </p>
            <p>
              In the last 1.5+ years, I have worked on production Laravel systems for print workflows,
              HR operations, and internal campaign tools.
            </p>
            <p>
              My core focus is backend architecture: database design, business logic, API structure,
              and making codebases maintainable for long-term teams.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">•</span>
                <span>Production experience with Laravel, MySQL, queue jobs, and admin workflows.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">•</span>
                <span>Deployed Laravel + React apps on AWS EC2 with Nginx, PHP-FPM, and SSL.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">•</span>
                <span>Currently deepening DevOps skills with Docker and CI/CD automation.</span>
              </li>
            </ul>
          </div>

          {/* Quick facts */}
          <div className="space-y-4">
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// experience</p>
              <p className="text-zinc-200 text-sm font-medium">1.5+ Years</p>
              <p className="text-zinc-500 text-xs mt-0.5">Real-world Laravel projects</p>
            </div>
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// focus</p>
              <p className="text-zinc-200 text-sm font-medium">Backend Systems</p>
              <p className="text-zinc-500 text-xs mt-0.5">APIs, logic, databases</p>
            </div>
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// currently</p>
              <p className="text-zinc-200 text-sm font-medium">Learning DevOps</p>
              <p className="text-zinc-500 text-xs mt-0.5">Docker, CI/CD, AWS</p>
            </div>
            <div className="card">
              <p className="font-mono text-xs text-zinc-600 mb-2">// community</p>
              <p className="text-zinc-200 text-sm font-medium">Laravel Meetups</p>
              <p className="text-zinc-500 text-xs mt-0.5">Hackathon Grand Finalist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
