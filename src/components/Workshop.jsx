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
    <article id="workshop" aria-labelledby="workshop-title">
      <p className="chapter-label">Junagadh</p>
      <h3 id="workshop-title" className="chapter-heading">Git &amp; Docker <em>workshop.</em></h3>
      <p className="chapter-prose">I took my everyday Git workflow to Dr. Subhash University, then helped students run Docker on their own machines.</p>
      <PhotoPrint photo={workshop} width={800} height={600} className="chapter-workshop" caption={workshop.caption} onOpen={() => setPreview(workshopIndex)} />
      <Link to="/gallery?album=workshop" className="journal-link">View the workshop album</Link>
      {preview !== null && <Lightbox photos={workshopPhotos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </article>
  )
}
