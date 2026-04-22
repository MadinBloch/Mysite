import { useEffect, useState } from 'react'

const CERTIFICATES = [
  {
    id: 1,
    title: 'Grand Finale Hackathon Certificate',
    src: 'public/certificateHackthnone.jpg',
  },
  {
    id: 2,
    title: 'Grand Finale Moment',
    src: 'public/image3hackthone.jpg',
  },
  {
    id: 3,
    title: 'Team Achievement',
    src: 'public/image5.jpg',
  },
  {
    id: 4,
    title: 'Presentation Session',
    src: 'public/image2hackthone.jpg',
  },
  {
    id: 5,
    title: 'Regional Round Certificate',
    src: 'public/image9.jpg',
  },
  {
    id: 6,
    title: 'Regional Round Moment',
    src: 'public/image7.jpg',
  },
  {
    id: 7,
    title: 'Team Achievement',
    src: 'public/image6.jpg',
  },
  {
    id: 8,
    title: 'Regional Round Moment',
    src: 'public/imag1hackthone.jpg',
  },
]

const VIDEOS = [
  {
    id: 'regional-round',
    title: 'Regional Round Video',
    description: 'Journey update from the regional round and team progress.',
    embedUrl: 'https://www.youtube.com/embed/js4E43gyazU?si=XVfxuvA8J90cLmYi',
  },
  {
    id: 'project-demo',
    title: 'Hackathon Project Video',
    description: 'Feature walkthrough and implementation summary of the project.',
    embedUrl: 'https://www.youtube.com/embed/yLy_fBdOT7M?si=OAb9r3sV5_17JxMX',
  },
]

export default function Media() {
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === 'Escape') setActiveImage(null)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <section id="media" className="py-20 sm:py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Media</p>
        <h2 className="section-heading mb-2">Certificates & Achievements</h2>
        <p className="text-zinc-500 text-sm mb-8">
          Highlights from hackathons, certificates, and team milestones.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATES.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-36 sm:h-44 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-left text-[11px] text-zinc-200 font-mono">
                {item.title}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-zinc-100 text-lg font-semibold mb-1">Videos</h3>
          <p className="text-zinc-500 text-sm mb-5">
            Hackathon updates and demo recordings embedded in responsive format.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            {VIDEOS.map((video) => (
              <article key={video.id} className="card">
                <div className="relative w-full overflow-hidden rounded-lg border border-zinc-800 aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <h4 className="text-zinc-100 text-sm font-medium mt-4">{video.title}</h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{video.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <div className="max-w-5xl w-full">
            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(event) => event.stopPropagation()}
            />
            <p className="text-center text-zinc-300 text-sm mt-3">{activeImage.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}
