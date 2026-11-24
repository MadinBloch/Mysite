import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiMaximize2 } from 'react-icons/fi'
import { frames } from './EventPhotos'
import { journalSources } from '../photoRenditions'
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

function trackPhotoPointer(event) {
  if (event.pointerType !== 'mouse' || document.documentElement.dataset.motion !== 'on') return
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  event.currentTarget.style.setProperty('--photo-tilt-y', ((x - .5) * 3.2).toFixed(2) + 'deg')
  event.currentTarget.style.setProperty('--photo-tilt-x', ((.5 - y) * 2.4).toFixed(2) + 'deg')
  event.currentTarget.style.setProperty('--photo-glow-x', (x * 100).toFixed(1) + '%')
  event.currentTarget.style.setProperty('--photo-glow-y', (y * 100).toFixed(1) + '%')
}

function resetPhotoPointer(event) {
  for (const property of ['--photo-tilt-x', '--photo-tilt-y', '--photo-glow-x', '--photo-glow-y']) {
    event.currentTarget.style.removeProperty(property)
  }
}

export default function HomeAlbum() {
  const [filter, setFilter] = useState('All photos')
  const [preview, setPreview] = useState(null)
  const sheet = useRef(null)
  const [widths, setWidths] = useState({})
  const album = albums[filter] || allPhotos

  useEffect(() => {
    const tiles = sheet.current.querySelectorAll('.journal-image')
    function record(entries) {
      setWidths(previous => {
        let next = previous
        for (const entry of entries) {
          const width = Math.ceil((entry.contentRect || entry.boundingClientRect).width)
          const id = entry.target.dataset.frame
          if (!width || previous[id] === width) continue
          if (next === previous) next = { ...previous }
          next[id] = width
        }
        return next
      })
    }
    const resize = window.ResizeObserver ? new ResizeObserver(record) : null
    if (!window.IntersectionObserver) {
      record([...tiles].map(target => ({ target, contentRect: target.getBoundingClientRect() })))
      tiles.forEach(tile => resize?.observe(tile))
      return () => resize?.disconnect()
    }
    const near = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (!visible.length) return
      record(visible)
      for (const { target } of visible) {
        near.unobserve(target)
        resize?.observe(target)
      }
    }, { rootMargin: '420px 0px' })
    tiles.forEach(tile => near.observe(tile))
    return () => { near.disconnect(); resize?.disconnect() }
  }, [filter])
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
        <div ref={sheet} className="contact-sheet" data-filter={filter} id="landing-hackathon">
          {album.map((photo, index) => (
            <a href={photo.src} aria-haspopup="dialog" key={photo.id} className="journal-photo"
              style={{ '--frame-ratio': photo.width / photo.height }}
              aria-label={'Open full photo: ' + photo.title} onClick={event => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                event.preventDefault()
                setPreview(index)
              }}>
              <span className="journal-image" data-frame={photo.id}
                onPointerMove={trackPhotoPointer} onPointerLeave={resetPhotoPointer}>
                <img src={photo.thumb}
                  srcSet={widths[photo.id] ? journalSources(photo.id, photo.width, widths[photo.id]) : undefined}
                  sizes={widths[photo.id] ? widths[photo.id] + 'px' : undefined}
                  width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
              </span>
              <span className="journal-caption">{photo.title}<FiMaximize2 aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </div>
      {preview !== null && <Lightbox photos={album} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </section>
  )
}
