const STEPS = [
  {
    label: 'AWS EC2',
    status: 'done',
    detail: 'Deployed Laravel + React apps on EC2 instances. Managed server setup from scratch.',
  },
  {
    label: 'Nginx',
    status: 'done',
    detail: 'Configured Nginx as reverse proxy, set up virtual hosts and server blocks.',
  },
  {
    label: 'PHP-FPM',
    status: 'done',
    detail: 'Setup PHP-FPM, tuned pool config for production performance.',
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
  {
    label: 'Docker',
    status: 'learning',
    detail: 'Learning to containerize Laravel apps for consistent environments.',
  },
]

export default function DevOps() {
  return (
    <section id="devops" className="py-20 sm:py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Infrastructure</p>
        <h2 className="section-heading mb-2">DevOps Work</h2>
        <p className="text-zinc-500 text-sm mb-10">
          Not just building apps — learning how to actually ship and run them.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Steps */}
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

          {/* Config snippet */}
          <div>
            <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
              Sample Nginx config
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-xs leading-relaxed text-zinc-500 overflow-x-auto">
              <p><span className="text-blue-400">server</span> {'{'}</p>
              <p className="pl-4"><span className="text-zinc-600">listen</span> <span className="text-amber-400">80</span>;</p>
              <p className="pl-4"><span className="text-zinc-600">server_name</span> <span className="text-accent">yourdomain.com</span>;</p>
              <p className="pl-4"><span className="text-zinc-600">root</span> <span className="text-zinc-400">/var/www/html/public</span>;</p>
              <p className="pl-4 mt-2"><span className="text-zinc-600">index</span> index.php;</p>
              <p className="pl-4 mt-2"><span className="text-blue-400">location</span> / {'{'}</p>
              <p className="pl-8"><span className="text-zinc-600">try_files</span> $uri $uri/ /index.php?$query_string;</p>
              <p className="pl-4">{'}'}</p>
              <p className="pl-4 mt-2"><span className="text-blue-400">location</span> ~ \.php$ {'{'}</p>
              <p className="pl-8"><span className="text-zinc-600">fastcgi_pass</span> unix:/run/php/php8.2-fpm.sock;</p>
              <p className="pl-8"><span className="text-zinc-600">include</span> fastcgi_params;</p>
              <p className="pl-4">{'}'}</p>
              <p>{'}'}</p>
            </div>
            <p className="font-mono text-xs text-zinc-600 mt-3">// This is a real config I've worked with</p>
          </div>
        </div>
      </div>
    </section>
  )
}
