import { useState } from 'react'
import { Link } from 'react-router-dom'
import { workshopPhotos } from '../data/photos'
import PhotoPrint from './PhotoPrint'
import Lightbox from './Lightbox'

const workshopIndex = workshopPhotos.findIndex(photo => photo.id === 'git-docker')
const workshop = workshopPhotos[workshopIndex]

export default function Workshop() {
  const [preview, setPreview] = useState(null)

  return (
    <article id="workshop" className="workshop-spread" aria-labelledby="workshop-title">
      <div className="workshop-heading">
        <p className="journal-date"><time dateTime="2026-08">Aug 2026</time><span>Junagadh</span></p>
        <h3 id="workshop-title" className="spread-title">Git &amp; Docker <em>workshop.</em></h3>
      </div>
      <PhotoPrint photo={workshop} className="workshop-lead" onOpen={() => setPreview(workshopIndex)} />
      <div className="workshop-note">
        <p className="workshop-deck">{workshop.caption}.</p>
        <p>I took my everyday Git workflow to Dr. Subhash University, then helped students run Docker on their own machines.</p>
        <Link to="/gallery?album=workshop" className="journal-link">View the workshop album</Link>
      </div>
      {preview !== null && <Lightbox photos={workshopPhotos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </article>
  )
}
