export default function Hackathon() {
  const milestones = [
    {
      title: 'Regional Round',
      text: 'Qualified from regional evaluation by presenting the initial backend solution and product direction.',
    },
    {
      title: 'Grand Finale',
      text: 'Reached the final round and defended architecture decisions before judges and mentors.',
    },
    {
      title: 'Team Collaboration',
      text: 'Split tasks, iterated quickly, and delivered under strict time pressure with clear ownership.',
    },
  ]

  return (
    <section id="hackathon" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Competition</p>
        <h2 className="section-heading mb-2">Hackathon Achievement</h2>
        <p className="text-zinc-500 text-sm mb-8 max-w-2xl">
          Selected from the regional round for the Grand Finale at New India Vibrant Hackathon 2023,
          hosted at Pandit Deendayal Energy University (PDEU). We built and presented a backend-focused
          solution under time pressure, defended architecture choices before judges and mentors,
          and worked as a team through delivery and the final presentation.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="card">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-display font-bold text-zinc-100 text-lg">
                  New India Vibrant Hackathon
                </h3>
                <p className="font-mono text-xs text-zinc-500 mt-1">Pandit Deendayal Energy University · 2023</p>
              </div>
              <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded">
                Grand Finalist
              </span>
            </div>

            <div className="space-y-4">
              {milestones.map((item) => (
                <div key={item.title} className="border-l-2 border-zinc-800 pl-4">
                  <p className="text-zinc-200 text-sm font-medium">{item.title}</p>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="card">
              <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">Regional Round Video</p>
              <div className="relative w-full overflow-hidden rounded-lg border border-zinc-800 aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/N-U6c92QPeA?si=T0NfJpPscw2ViOkQ"
                  title="Regional Round Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </article>

            <article className="card">
              <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">Project Video</p>
              <div className="relative w-full overflow-hidden rounded-lg border border-zinc-800 aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/yLy_fBdOT7M?si=OAb9r3sV5_17JxMX"
                  title="Hackathon Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
