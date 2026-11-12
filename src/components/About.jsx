export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Background</p>
        <h2 className="section-heading mb-8">About Me</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5 text-zinc-300 leading-7">
            <p>
              I started web development to understand how products work under the hood, not only
              how they look.
            </p>
            <p>
              Since <span className="text-accent font-medium">December 2024</span>, I've worked in PHP
              and Laravel on the sort of business software where mistakes have real consequences.
              At <span className="text-zinc-100 font-medium">Kesari Select</span>, that means
              getting ERP exports right, respecting finance approvals, handling notifications,
              and shipping fixes to production. I also built the first version of an internal
              Excel-driven email campaign system.
            </p>
            <p>
              Academically, I have completed my <span className="text-zinc-100 font-medium">BCA</span> and
              am in the <span className="text-zinc-100 font-medium">final year of MCA</span>. I focus on
              backend architecture, clean APIs, Dockerized environments, and maintainable codebases.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">•</span>
                <span>Production work with Laravel, Frappe ERP integrations, DBF/S3 exports, queues and approvals.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">•</span>
                <span>Handled application deployments and post-release issues with Docker, EC2, Nginx, PHP-FPM and SSL.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">•</span>
                <span>Conducted a hands-on Git &amp; Docker workshop for BCA/MCA students at Dr. Subhash University.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="card hover:border-accent/30">
              <p className="font-mono text-xs text-zinc-600 mb-2">// experience</p>
              <p className="text-zinc-200 text-sm font-medium">Since Dec 2024</p>
              <p className="text-zinc-500 text-xs mt-0.5">Real-world Laravel projects</p>
            </div>
            <div className="card hover:border-accent/30">
              <p className="font-mono text-xs text-zinc-600 mb-2">// education</p>
              <p className="text-zinc-200 text-sm font-medium">MCA · Final Year</p>
              <p className="text-zinc-500 text-xs mt-0.5">BCA Completed</p>
            </div>
            <div className="card hover:border-accent/30">
              <p className="font-mono text-xs text-zinc-600 mb-2">// focus</p>
              <p className="text-zinc-200 text-sm font-medium">Backend Systems</p>
              <p className="text-zinc-500 text-xs mt-0.5">APIs, logic, databases</p>
            </div>
            <div className="card hover:border-accent/30">
              <p className="font-mono text-xs text-zinc-600 mb-2">// community</p>
              <p className="text-zinc-200 text-sm font-medium">Workshop Facilitator</p>
              <p className="text-zinc-500 text-xs mt-0.5">Hackathon Grand Finalist</p>
            </div>
          </div>
        </div>

        <div id="education" className="mt-12 grid sm:grid-cols-2 gap-4">
          <div className="card border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-2">Education</p>
            <h3 className="font-display text-xl font-bold text-zinc-100">MCA</h3>
            <p className="text-zinc-400 text-sm mt-1">Master of Computer Applications</p>
            <p className="font-mono text-xs text-zinc-500 mt-3">Final Year · Pursuing</p>
          </div>
          <div className="card">
            <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider mb-2">Education</p>
            <h3 className="font-display text-xl font-bold text-zinc-100">BCA</h3>
            <p className="text-zinc-400 text-sm mt-1">Bachelor of Computer Applications</p>
            <p className="font-mono text-xs text-accent mt-3">Completed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
