import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhotoPrint from './PhotoPrint'
import Lightbox from './Lightbox'
import { hackathonPhotos } from '../data/photos'

const highlights = ['regional', 'presentation', 'finale-team', 'team-certificates'].map(
  id => hackathonPhotos.find(photo => photo.id === id),
)

export default function Hackathon() {
  const [preview, setPreview] = useState(null)

  return (
    <article id="hackathon" aria-labelledby="hackathon-title">
      <div id="landing-hackathon">
        <p className="chapter-label">Grand Finalist · PDEU</p>
        <h3 id="hackathon-title" className="chapter-heading">New India Vibrant <em>Hackathon.</em></h3>
        <p className="chapter-prose">Our team went from the regional round to the Grand Finale. I built the backend and walked the judges through how data moved across our application.</p>
      </div>
      <div className="chapter-photos">
        {highlights.map((photo, index) => (
          <PhotoPrint key={photo.id} photo={photo} caption={photo.title}
            height={photo.id === 'team-certificates' ? 1204 : photo.width * 3 / 4}
            sizes="(max-width: 639px) 41vw, (max-width: 1232px) 37vw, 27rem"
            onOpen={() => setPreview(index)} />
        ))}
      </div>
      <Link to="/gallery?album=hackathon" className="journal-link">Full hackathon album</Link>
      {preview !== null && <Lightbox photos={highlights} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </article>
  )
}
