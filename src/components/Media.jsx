import { useCallback, useState } from 'react'
import Lightbox from './Lightbox'

const photoStories = [
  {id:'workshop',category:'Workshop / 2026',title:'Teaching Git & Docker',caption:'A hands-on session for BCA and MCA students at Dr. Subhash University.',img:'/workshop/presenting.jpg',alt:'Presenter at the university workshop'},
  {id:'classroom',category:'In the classroom',title:'Beyond the slides',caption:'Explaining version control and containers through real setup demonstrations.',img:'/workshop/classroom.jpg',alt:'University classroom during the Git and Docker workshop'},
  {id:'finale',category:'Hackathon / 2023',title:'Grand Finale at PDEU',caption:'Selected from the regional round for the New India Vibrant Hackathon final.',img:'/image3hackthone.jpg',alt:'New India Vibrant Hackathon Grand Finale moment'},
  {id:'certificate',category:'Recognition',title:'Finalist certificate',caption:'A reminder that building and presenting under pressure is its own skill.',img:'/certificateHackthnone.jpg',alt:'New India Vibrant Hackathon certificate'}
]
const demos=[
  {id:'hackathon',title:'Hackathon project walkthrough',caption:'An early PHP/MySQL project demonstration — not a Kesari Select product demo.',youtube:'yLy_fBdOT7M',poster:'/image2hackthone.jpg'},
  {id:'regional',title:'From regional round to final',caption:'Hackathon journey and team presentation.',youtube:'N-U6c92QPeA',poster:'/image7.jpg'}
]

function VideoCard({ video }) {
  const [play,setPlay] = useState(false)
  return <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[#181d23]">
    <div className="relative aspect-video overflow-hidden">
      {play ? <iframe title={video.title} className="absolute inset-0 h-full w-full" loading="lazy" src={'https://www.youtube-nocookie.com/embed/'+video.youtube+'?autoplay=1'} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
      <button type="button" onClick={()=>setPlay(true)} aria-label={'Play '+video.title} className="group absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
        <img src={video.poster} loading="lazy" alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 bg-black/30" />
        <span className="relative z-10 flex h-[66px] w-[66px] items-center justify-center rounded-full border border-white/45 bg-white/15 text-2xl text-white backdrop-blur transition-transform group-hover:scale-110" aria-hidden="true">▶</span>
      </button>}
    </div>
    <div className="p-6"><p className="font-mono text-[10px] uppercase tracking-widest text-accent">Video / Real project archive</p><h3 className="mt-3 font-display text-xl font-medium text-white">{video.title}</h3><p className="mt-2 text-sm leading-6 text-[#929da8]">{video.caption}</p></div>
  </article>
}

export default function Media() {
  const [active,setActive] = useState(null)
  const close = useCallback(()=>setActive(null),[])
  return <section id="stories" className="bg-[#0c0f14] py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="mb-11 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow mb-5">05 / Beyond the code</p><h2 className="section-heading max-w-[720px]">The work is real. <span className="font-light italic text-accent">So are the moments.</span></h2></div><p className="max-w-[320px] text-sm leading-7 text-[#91a0ac]">Actual photos and video links from university workshops and hackathon presentations. No generated client-system screenshots.</p></div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photoStories.map((photo,i)=><button key={photo.id} type="button" onClick={()=>setActive({src:photo.img,title:photo.title})} className={'group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#192027] text-left '+(i===0?'sm:col-span-2 lg:col-span-2':'')}>
          <div className={'relative overflow-hidden '+(i===0?'h-[330px] sm:h-[420px]':'h-[330px] sm:h-[420px]')}>
            <img src={photo.img} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">{photo.category}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">{photo.title}</h3>
              <p className="mt-2 max-w-sm text-xs leading-6 text-[#ccd3cf]">{photo.caption}</p>
            </div>
          </div>
        </button>)}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#8798a5]">Recorded moments</p><h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">Watch the project stories.</h3></div><a href="https://www.youtube.com/@madinbloch0633" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:border-accent hover:text-accent">More on YouTube ↗</a></div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">{demos.map(video=><VideoCard key={video.id} video={video} />)}</div>
      <Lightbox image={active} onClose={close} />
    </div>
  </section>
}
