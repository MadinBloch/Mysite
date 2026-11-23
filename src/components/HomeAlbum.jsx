import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { EventPhoto, frames } from './EventPhotos'
import Lightbox from './Lightbox'

const album = [
  frames.team, frames.regional, frames.presentation, frames.workshop,
  frames.working, frames.developers, frames.certificates, frames.classroom,
  frames.meetup, frames.workshopGroup, frames.finalist,
]
const wide = new Set([frames.workshop, frames.certificates, frames.classroom, frames.meetup, frames.workshopGroup, frames.finalist])

export default function HomeAlbum() {
  const [preview, setPreview] = useState(null)
  return (
    <section id="album" className="home-album" aria-labelledby="album-heading">
      <div className="bp-shell bp-section">
        <p className="bp-kicker">05 · Album</p>
        <div className="bp-heading-row">
          <h2 className="bp-section-title" id="album-heading">Beyond the <mark className="hl">code.</mark></h2>
          <Link to="/gallery" className="bp-text-link">All albums <FiArrowRight aria-hidden="true" /></Link>
        </div>
        <div id="landing-hackathon" className="album-bento">
          {album.map((photo, index) => (
            <button type="button" key={photo.id} className={'album-tile' + (wide.has(photo) ? ' wide' : '')}
              aria-label={'Open full photo: ' + photo.title} onClick={() => setPreview(index)}>
              <EventPhoto photo={photo} sizes={index === 0 || wide.has(photo) ? '(max-width: 700px) 95vw, 46vw' : '(max-width: 700px) 45vw, 23vw'} />
              <span className="photo-cap">{photo.title}</span>
            </button>
          ))}
        </div>
      </div>
      {preview !== null && <Lightbox photos={album} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </section>
  )
}
