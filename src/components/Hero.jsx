export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24 w-full">
        <div className="max-w-2xl animate-fadeInUp">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for work
          </div>

          {/* Name */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 leading-tight mb-4">
            Madin Bloch
          </h1>

          {/* Role */}
          <p className="font-mono text-accent text-sm sm:text-base mb-5">
            Laravel Developer · Backend Engineer
          </p>

          {/* Intro */}
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            I build maintainable backend systems and ship production-ready Laravel applications.
            Focused on API design, business logic, and reliable deployment workflows.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent text-zinc-950 font-sans font-semibold text-sm px-5 py-3 rounded-md hover:bg-accent-dim transition-colors"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-sans text-sm px-5 py-3 rounded-md hover:border-zinc-500 transition-colors"
            >
              Get in touch
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-10 flex items-center gap-5">
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@madinbloch0633" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://madinbloch.hashnode.dev/" target="_blank" rel="noreferrer" className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Blog →
            </a>
          </div>
        </div>

        {/* Terminal-style decoration */}
        <div className="mt-14 max-w-md font-mono text-xs text-zinc-600 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hidden md:block">
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <p><span className="text-zinc-500">$</span> <span className="text-accent">php artisan</span> serve --host=0.0.0.0</p>
          <p className="mt-1 text-zinc-600">INFO Server running on <span className="text-zinc-400">[http://0.0.0.0:8000]</span></p>
          <p className="mt-1"><span className="text-zinc-500">$</span> <span className="text-accent">nginx</span> -t && systemctl reload nginx</p>
          <p className="mt-1 text-zinc-600">nginx: configuration file <span className="text-zinc-400">/etc/nginx/nginx.conf</span> test is successful</p>
        </div>
      </div>
    </section>
  )
}
