import { useState } from 'react'
import { Link } from 'react-router-dom'
import { workshopPhotos } from '../data/photos'
import { archiveImage } from './archiveImages'
import PhotoPrint from './PhotoPrint'
import Lightbox from './Lightbox'

const workshopIndex = workshopPhotos.findIndex(photo => photo.id === 'git-docker')
const photos = workshopPhotos.map(archiveImage)
const workshop = photos[workshopIndex]

export default function Workshop() {
  const [preview, setPreview] = useState(null)

  return (
    <article id="workshop" aria-labelledby="workshop-title">
      <p className="chapter-label">Junagadh</p>
      <h3 id="workshop-title" className="chapter-heading">Git &amp; Docker <em>workshop.</em></h3>
      <p className="chapter-prose">At Dr. Subhash University, I led a hands-on workshop for BCA and MCA students. I walked through local setup, demonstrated the Git commands I use at work, and helped students try Docker on their own machines.</p>
      <PhotoPrint photo={workshop} className="chapter-workshop" caption={workshop.caption} onOpen={() => setPreview(workshopIndex)} />
      <PhotoPrint photo={photos[3]} className="chapter-workshop" caption="After the session at Dr. Subhash University." onOpen={() => setPreview(3)} />
      <Link to="/gallery?album=workshop" className="journal-link">View the workshop album</Link>
      {preview !== null && <Lightbox photos={photos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </article>
  )
}
