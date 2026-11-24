import { FiMaximize2 } from 'react-icons/fi'

export function spreadImageSize(index) {
  const wide = index % 4 === 0 || index % 4 === 3
  return wide
    ? '(max-width: 520px) calc(100vw - 2.25rem), (max-width: 1232px) 55vw, 42rem'
    : '(max-width: 520px) calc(100vw - 2.25rem), (max-width: 1232px) 39vw, 30rem'
}

export default function PhotoPrint({ photo, caption, className = '', priority = false, sizes, width = photo.width, height = photo.height, onOpen }) {
  return (
    <figure className={'photo-print ' + className} style={{ '--frame-ratio': width / height }}>
      <button type="button" onClick={onOpen} aria-label={'Open full photo: ' + photo.title}>
        <img
          src={photo.printSrc || photo.src}
          srcSet={photo.cardSrcSet || photo.srcSet}
          sizes={priority ? sizes : 'auto, ' + (sizes || '100vw')}
          width={width}
          height={height}
          alt={photo.alt || photo.title}
          style={{ objectPosition: photo.position, objectFit: photo.fit }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <span className="print-zoom" aria-hidden="true"><FiMaximize2 size={15} /></span>
      </button>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
