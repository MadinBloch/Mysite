import { useCallback, useState } from 'react'
import Lightbox from './Lightbox'

const stories = [
  {
    title: 'University workshop',
    eyebrow: 'Sharing knowledge · 2026',
    description: 'Led a hands-on Git & Docker workshop for BCA and MCA students at Dr. Subhash University.',
    image: '/workshop/git-docker.jpg',
    alt: 'Practical university workshop about Git and Docker',
    video: null
  },
  {
    title: 'Hackathon grand finalist',
    eyebrow: 'Building with a team · 2023',
    description: 'Reached the New India Vibrant Hackathon Grand Finale at PDEU after qualifying through the regional round.',
    image: '/image3hackthone.jpg',
    alt: 'New India Vibrant Hackathon event',
    video: 'https://www.youtube.com/watch?v=yLy_fBdOT7M'
  }
]

export default function Media() {
  const [activeImage, setActiveImage] = useState(null)
  const closeLightbox = useCallback(() => setActiveImage(null), [])

  return (
    <section id="moments" className="border-t border-white/[.07] bg-[#101726] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10">
          <p className="eyebrow">Outside the editor</p>
          <h2 className="section-heading mt-3">A few moments<span className="text-accent">.</span></h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#9eacc7]">Learning, teaching and building alongside other developers matters to me too.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map(story => (
            <article key={story.title} className="overflow-hidden rounded-[23px] border border-white/10 bg-[#151e2d]">
              <button type="button" className="group relative block h-[240px] w-full overflow-hidden text-left sm:h-[290px]" onClick={() => setActiveImage({ src: story.image, title: story.title })} aria-label={'View photo: ' + story.title}>
                <img src={story.image} alt={story.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1524]/70 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-4 right-4 rounded-full border border-white/30 bg-[#0c1222]/65 px-3 py-1.5 text-xs text-white backdrop-blur-md">View photo ↗</span>
              </button>
              <div className="p-6">
                <p className="font-mono text-[11px] text-accent">{story.eyebrow}</p>
                <h3 className="mt-2 font-display text-[22px] font-semibold text-white">{story.title}</h3>
                <p className="mt-3 min-h-[57px] text-[13px] leading-7 text-[#acb8d1]">{story.description}</p>
                {story.video ? <a href={story.video} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-xs font-semibold text-accent hover:text-white">Watch project video ↗</a> : <a href="https://www.youtube.com/@madinbloch0633" target="_blank" rel="noreferrer" className="mt-4 inline-flex text-xs font-semibold text-accent hover:text-white">Visit my YouTube ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
      <Lightbox image={activeImage} onClose={closeLightbox} />
    </section>
  )
}
