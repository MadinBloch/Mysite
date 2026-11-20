import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useReducedMotion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiMaximize2 } from 'react-icons/fi'
import Lightbox from './Lightbox'

export default function PhotoDeck({ photos, label, priority = false, className = '' }) {
  const reduce = useReducedMotion()
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true, duration: 24 })
  const [selected, setSelected] = useState(0)
  const [preview, setPreview] = useState(null)
  const current = photos[selected]

  useEffect(() => {
    if (!carousel) return
    const syncSelected = () => setSelected(carousel.selectedScrollSnap())
    syncSelected()
    carousel.on('select', syncSelected)
    carousel.on('reInit', syncSelected)
    return () => {
      carousel.off('select', syncSelected)
      carousel.off('reInit', syncSelected)
    }
  }, [carousel])

  function move(direction) {
    if (direction === -1) carousel?.scrollPrev(Boolean(reduce))
    else carousel?.scrollNext(Boolean(reduce))
  }

  function handleKeyDown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }

  return (
    <div className={className}>
      <section className="photo-deck" aria-label={label} aria-roledescription="carousel" onKeyDown={handleKeyDown}>
        <div className="photo-viewport" ref={viewportRef}>
          <div className="flex touch-pan-y">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                className="photo-slide"
                tabIndex={selected === index ? 0 : -1}
                aria-hidden={selected !== index}
                aria-label={'Open full photo: ' + photo.title}
                onClick={() => setPreview(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.title}
                  loading={priority && index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={priority && index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  draggable={false}
                  style={{ objectFit: photo.fit || 'cover', objectPosition: photo.position }}
                />
                <span className="photo-expand" aria-hidden="true"><FiMaximize2 size={17} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-[4.5rem] items-center justify-between gap-3 px-1 py-2">
          <div className="min-w-0" aria-live="polite">
            <p className="font-display text-[1.05rem] font-semibold leading-snug sm:text-lg">{current.title}</p>
            {current.caption && <p className="portfolio-meta mt-0.5">{current.caption}</p>}
          </div>
          <div className="flex shrink-0 gap-1.5 sm:gap-2">
            <button type="button" className="icon-button" aria-label="Previous photo" onClick={() => move(-1)}>
              <FiArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" className="icon-button" aria-label="Next photo" onClick={() => move(1)}>
              <FiArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid auto-cols-fr grid-flow-col gap-1.5 sm:gap-2" role="group" aria-label="Choose a photo">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="photo-thumb"
              aria-label={'Show ' + photo.title}
              aria-pressed={selected === index}
              onClick={() => carousel?.scrollTo(index, Boolean(reduce))}
            >
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: photo.position }}
              />
            </button>
          ))}
        </div>
      </section>

      {preview !== null && (
        <Lightbox photos={photos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />
      )}
    </div>
  )
}
