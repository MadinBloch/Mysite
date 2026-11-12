const STEPS = [
  {
    label: 'Docker',
    status: 'done',
    detail: 'Containerizing Laravel apps, Compose setups, and teaching Docker fundamentals at university workshops.',
  },
  {
    label: 'AWS EC2',
    status: 'done',
    detail: 'Deployed Laravel apps on EC2 instances. Managed server setup from scratch.',
  },
  {
    label: 'Nginx',
    status: 'done',
    detail: 'Configured Nginx as reverse proxy, set up virtual hosts and server blocks.',
  },
  {
    label: 'PHP-FPM',
    status: 'done',
    detail: 'Configured PHP-FPM and helped troubleshoot PHP application deployments.',
  },
  {
    label: 'SSL + Domain',
    status: 'done',
    detail: "Connected custom domains, configured Let's Encrypt SSL certificates.",
  },
  {
    label: 'CI/CD Pipelines',
    status: 'learning',
    detail: 'Currently learning GitHub Actions for automated deployments.',
  },
]

export default function DevOps() {
  return (
    <section id="devops" className="py-20 sm:py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Infrastructure</p>
        <h2 className="section-heading mb-2">DevOps &amp; Docker</h2>
        <p className="text-zinc-500 text-sm mb-10">
          Not just building apps — shipping them with Docker, Nginx, and cloud deployments.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
              What I've done
            </p>
            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'done' ? 'bg-accent/20' : 'bg-amber-400/10'
                  }`}>
                    {step.status === 'done' ? (
                      <svg className="w-2.5 h-2.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-200 text-sm font-medium">{step.label}</span>
                      {step.status === 'learning' && (
                        <span className="font-mono text-xs text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">learning</span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
              Sample Docker Compose
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-xs leading-relaxed text-zinc-500 overflow-x-auto shadow-[inset_0_1px_0_rgba(110,231,183,0.08)]">
              <p><span className="text-blue-400">services</span>:</p>
              <p className="pl-3"><span className="text-accent">app</span>:</p>
              <p className="pl-6"><span className="text-zinc-600">image</span>: <span className="text-amber-400">php:8.2-fpm</span></p>
              <p className="pl-6"><span className="text-zinc-600">volumes</span>: [<span className="text-zinc-400">.:/var/www</span>]</p>
              <p className="pl-3 mt-2"><span className="text-accent">nginx</span>:</p>
              <p className="pl-6"><span className="text-zinc-600">image</span>: <span className="text-amber-400">nginx:alpine</span></p>
              <p className="pl-6"><span className="text-zinc-600">ports</span>: [<span className="text-zinc-400">"80:80"</span>]</p>
              <p className="pl-3 mt-2"><span className="text-accent">mysql</span>:</p>
              <p className="pl-6"><span className="text-zinc-600">image</span>: <span className="text-amber-400">mysql:8</span></p>
              <p className="pl-6"><span className="text-zinc-600">environment</span>:</p>
              <p className="pl-9">MYSQL_DATABASE: <span className="text-zinc-400">laravel</span></p>
            </div>
            <p className="font-mono text-xs text-zinc-600 mt-3">// Real stack I use and teach</p>
          </div>
        </div>
      </div>
    </section>
  )
}
