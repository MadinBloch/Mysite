import { useState } from 'react'
import { FiMaximize2 } from 'react-icons/fi'
import Lightbox from './Lightbox'
import { Stagger, StaggerItem } from './motion/SectionReveal'

export default function PhotoGrid({ photos, className }) {
  const [preview, setPreview] = useState(null)

  return (
    <>
      <Stagger className={className}>
        {photos.map((photo, index) => (
          <StaggerItem key={photo.id}>
            <button
              type="button"
              className="gallery-tile"
              onClick={() => setPreview(index)}
              aria-label={'Open full photo: ' + photo.title}
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-[#0d1511]">
                <img
                  src={photo.src}
                  alt={photo.alt || photo.title}
                  loading="lazy"
                  decoding="async"
                  style={{ objectFit: photo.fit || 'cover', objectPosition: photo.position }}
                />
                <span className="photo-expand" aria-hidden="true"><FiMaximize2 size={16} /></span>
              </span>
              <span className="block px-4 pb-4 pt-3.5 sm:px-5">
                <span className="block font-display text-lg font-semibold leading-tight">{photo.title}</span>
                {photo.caption && <span className="portfolio-meta mt-1.5 block">{photo.caption}</span>}
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
      {preview !== null && (
        <Lightbox photos={photos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />
      )}
    </>
  )
}
