export default function Community() {
  return (
    <section id="community" className="py-20 sm:py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Community</p>
        <h2 className="section-heading mb-2">Events & Meetups</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="card mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-zinc-200 text-sm font-medium">Laravel Community Meetup</h3>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                    Attended local Laravel meetups to connect with other developers working in the PHP ecosystem.
                    Hearing how others structure their applications and handle real problems taught me more than
                    any tutorial.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xs mt-0.5">→</span>
                <p className="text-zinc-400 text-sm">Networking with developers working in production Laravel environments.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xs mt-0.5">→</span>
                <p className="text-zinc-400 text-sm">Exposure to how companies structure larger Laravel codebases.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xs mt-0.5">→</span>
                <p className="text-zinc-400 text-sm">Real conversations about deployment, scaling, and team workflows.</p>
              </div>
            </div>
          </div>

          {/* "Now" section */}
          <div className="card border-accent/20 border bg-accent/5">
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
              What I'm doing now
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-200 text-sm font-medium">Learning DevOps</p>
                <p className="text-zinc-500 text-xs mt-1">Docker, CI/CD pipelines, and proper deployment workflows.</p>
              </div>
              <div className="h-px bg-zinc-800" />
              <div>
                <p className="text-zinc-200 text-sm font-medium">Backend Architecture</p>
                <p className="text-zinc-500 text-xs mt-1">Improving how I structure Laravel apps — services, repositories, and clean separation.</p>
              </div>
              <div className="h-px bg-zinc-800" />
              <div>
                <p className="text-zinc-200 text-sm font-medium">Writing & Sharing</p>
                <p className="text-zinc-500 text-xs mt-1">Documenting what I learn on Hashnode and YouTube.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
