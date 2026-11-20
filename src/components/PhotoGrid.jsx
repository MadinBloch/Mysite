import { useState } from 'react'
import Lightbox from './Lightbox'
import PhotoPrint, { spreadImageSize } from './PhotoPrint'

export default function PhotoGrid({ photos }) {
  const [preview, setPreview] = useState(null)

  return (
    <>
      <div className="album-prints">
        {photos.map((photo, index) => (
          <PhotoPrint
            key={photo.id}
            photo={photo}
            priority={index === 0}
            sizes={spreadImageSize(index)}
            caption={<><strong>{photo.title}</strong>{photo.caption && <span>{photo.caption}</span>}</>}
            onOpen={() => setPreview(index)}
          />
        ))}
      </div>
      {preview !== null && <Lightbox photos={photos} index={preview} onChange={setPreview} onClose={() => setPreview(null)} />}
    </>
  )
}
