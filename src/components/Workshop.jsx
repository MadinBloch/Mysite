import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { workshopPhotos } from '../data/photos'
import PhotoPrint from './PhotoPrint'
import Lightbox from './Lightbox'

export default function Workshop() {
  const [preview, setPreview] = useState(null)
  return (
    <section id="workshop" className="story-chapter" aria-labelledby="workshop-title">
      <p className="chapter-date">August 2026 <span>/</span> Junagadh</p>
      <h2 id="workshop-title" className="chapter-title">Taking Git and Docker<br /><em>into the classroom.</em></h2>
      <div className="chapter-prose">
        <p>At Dr. Subhash University, I led a hands-on workshop for BCA and MCA students. I walked through local setup, demonstrated the Git commands I use at work, and helped students try Docker on their own machines.</p>
      </div>
      <div className="workshop-prints">
        <PhotoPrint photo={workshopPhotos[0]} caption="Walking through Git with the class." className="chapter-photo" onOpen={() => setPreview(0)} />
        <PhotoPrint photo={workshopPhotos[3]} caption="After the session at Dr. Subhash University." className="chapter-photo" onOpen={() => setPreview(3)} />
      </div>
      <Link to="/gallery?album=workshop" className="story-link">View the workshop album <FiArrowRight aria-hidden="true" /></Link>
      {preview !== null && <Lightbox photos={workshopPhotos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </section>
  )
}
