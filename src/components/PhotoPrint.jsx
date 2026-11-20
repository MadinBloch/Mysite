import { FiMaximize2 } from 'react-icons/fi'

export default function PhotoPrint({ photo, caption, className = '', priority = false, onOpen }) {
  return (
    <figure className={'photo-print ' + className}>
      <button type="button" onClick={onOpen} aria-label={'Open full photo: ' + photo.title}>
        <img
          src={photo.printSrc || photo.src}
          alt={photo.alt || photo.title}
          style={{ objectPosition: photo.position }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <span className="print-zoom" aria-hidden="true"><FiMaximize2 size={15} /></span>
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
