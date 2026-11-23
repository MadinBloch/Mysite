import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiMaximize2 } from 'react-icons/fi'
import { EventPhoto, frames } from './EventPhotos'
import Lightbox from './Lightbox'

const albums = {
  Hackathon: [frames.team, frames.regional, frames.presentation, frames.certificates, frames.working, frames.finalist],
  Workshop: [frames.workshop, frames.classroom, frames.workshopGroup],
  Community: [frames.meetup, frames.developers],
}
const allPhotos = [
  frames.workshop, frames.team, frames.regional, frames.presentation, frames.working,
  frames.certificates, frames.developers, frames.classroom, frames.meetup, frames.workshopGroup, frames.finalist,
]

export default function HomeAlbum() {
  const [filter, setFilter] = useState('All photos')
  const [preview, setPreview] = useState(null)
  const album = albums[filter] || allPhotos
  return (
    <section id="album" className="home-album" aria-labelledby="album-heading">
      <div className="bp-shell bp-section">
        <p className="bp-kicker">05 / Photo journal</p>
        <div className="bp-heading-row">
          <h2 className="bp-section-title" id="album-heading">Beyond the <em>code.</em></h2>
          <Link to="/gallery" className="bp-text-link">Full photo archive <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="album-filters" role="group" aria-label="Filter journal photos">
          {['All photos', ...Object.keys(albums)].map(name => <button type="button" className="filter-button"
            key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}
        </div>
        <div className="contact-sheet" data-filter={filter} id="landing-hackathon">
          {album.map((photo, index) => {
            const wide = photo.width / photo.height > 1.8
            return (
              <button type="button" key={photo.id} className={'journal-photo' + (wide ? ' wide' : '')}
                aria-label={'Open full photo: ' + photo.title} onClick={() => setPreview(index)}>
                <span className="journal-image">
                  <EventPhoto photo={photo} sizes={wide ? '(max-width: 640px) 92vw, 55vw' : '(max-width: 640px) 44vw, 29vw'} />
                </span>
                <span className="journal-caption">{photo.title}<FiMaximize2 aria-hidden="true" /></span>
              </button>
            )
          })}
        </div>
      </div>
      {preview !== null && <Lightbox photos={album} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </section>
  )
}
