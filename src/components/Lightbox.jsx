import { useEffect } from 'react'

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.title || 'Image preview'}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
        aria-label="Close image"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl pointer-events-none">
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto absolute -top-2 right-0 sm:-top-3 sm:-right-3 z-20 w-10 h-10 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img
          src={image.src}
          alt={image.title || ''}
          className="pointer-events-auto w-full max-h-[80vh] object-contain rounded-xl mx-auto shadow-2xl"
        />
        {(image.title || image.caption) && (
          <div className="pointer-events-none mt-4 text-center">
            {image.title && <p className="text-zinc-200 text-sm">{image.title}</p>}
            {image.caption && <p className="text-zinc-500 text-xs mt-1">{image.caption}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
