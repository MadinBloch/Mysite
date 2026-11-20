import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhotoPrint, { spreadImageSize } from './PhotoPrint'
import Lightbox from './Lightbox'
import { hackathonPhotos } from '../data/photos'

const highlights = ['regional', 'presentation', 'finale-team', 'team-certificates'].map(
  id => hackathonPhotos.find(photo => photo.id === id),
)

export default function Hackathon() {
  const [preview, setPreview] = useState(null)

  return (
    <article id="hackathon" className="hackathon-spread" aria-labelledby="hackathon-title">
      <div id="landing-hackathon" className="hackathon-heading">
        <div>
          <p className="journal-date"><time dateTime="2023">2023</time><span>Grand Finalist · PDEU</span></p>
          <h3 id="hackathon-title" className="spread-title">New India Vibrant <em>Hackathon.</em></h3>
        </div>
        <div className="hackathon-note">
          <p>Our team went from the regional round to the Grand Finale. I built the backend and walked the judges through how data moved across our application.</p>
          <Link to="/gallery?album=hackathon" className="journal-link">Full hackathon album</Link>
        </div>
      </div>
      <div className="journal-photos">
        {highlights.map((photo, index) => (
          <PhotoPrint key={photo.id} photo={photo} caption={photo.title} sizes={spreadImageSize(index)} onOpen={() => setPreview(index)} />
        ))}
      </div>
      {preview !== null && <Lightbox photos={highlights} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </article>
  )
}
