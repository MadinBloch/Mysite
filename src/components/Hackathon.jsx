import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import PhotoPrint from './PhotoPrint'
import Lightbox from './Lightbox'
import { hackathonPhotos } from '../data/photos'

const chapterPhotos = ['regional', 'presentation', 'finale-team', 'team-certificates'].map(
  id => hackathonPhotos.find(photo => photo.id === id),
)

export default function Hackathon() {
  const [preview, setPreview] = useState(null)
  return (
    <section id="hackathon" className="story-chapter" aria-labelledby="hackathon-title">
      <p className="chapter-date">2023 <span>/</span> PDEU</p>
      <h2 id="hackathon-title" className="chapter-title">Explaining the backend<br /><em>to the judges.</em></h2>
      <div className="chapter-prose">
        <p>At the New India Vibrant Hackathon, our team made it from the regional round to the Grand Finale at PDEU. I worked on the backend. When we presented, my part was to trace the data through our application and explain why we’d designed it that way.</p>
      </div>
      <div id="landing-hackathon" className="hackathon-prints">
        {chapterPhotos.map((photo, index) => (
          <PhotoPrint
            key={photo.id}
            photo={photo}
            caption={photo.title}
            height={photo.id === 'team-certificates' ? 1204 : photo.width * 3 / 4}
            sizes="(max-width: 520px) 43vw, (max-width: 850px) 44vw, 26rem"
            className="chapter-photo"
            onOpen={() => setPreview(index)}
          />
        ))}
      </div>
      <div className="chapter-prose">
        <p>In December 2024, I started working with PHP at Magecurious. The following May, I joined Shine Infosoft and began building software for Kesari Select.</p>
      </div>
      <Link to="/gallery?album=hackathon" className="story-link">Hackathon photos and recordings <FiArrowRight aria-hidden="true" /></Link>
      {preview !== null && <Lightbox photos={chapterPhotos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </section>
  )
}
