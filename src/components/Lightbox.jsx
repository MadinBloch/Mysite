import { useEffect, useId, useRef, useState } from 'react'
import './photo-viewer.css'
import { FiArrowLeft, FiArrowRight, FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi'

export default function Lightbox({ photos, index, onChange, onClose }) {
  const [zoomed, setZoomed] = useState(false)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const stageRef = useRef(null)
  const swipeStart = useRef(null)
  const titleId = useId()
  const photo = photos[index]
  const hasMultiple = photos.length > 1

  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement
    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = 'hidden'
    closeRef.current.focus({ preventScroll: true })

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true })
      }
    }
  }, [])

  useEffect(() => {
    if (zoomed) stageRef.current?.focus({ preventScroll: true })
  }, [zoomed])

  function move(direction) {
    setZoomed(false)
    onChange((index + direction + photos.length) % photos.length)
  }

  function startSwipe(event) {
    swipeStart.current = null
    if (!hasMultiple || zoomed || !event.isPrimary || event.button !== 0) return
    swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function endSwipe(event) {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1)
  }

  function handleKeyDown(event) {
    if (!hasMultiple || zoomed) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="gallery-dialog"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="viewer-layout">
        <div className="viewer-toolbar flex min-h-16 items-center justify-between gap-3 px-4 py-2 sm:px-5">
          <div className="min-w-0" aria-live="polite">
            <p id={titleId} className="font-display text-base font-semibold sm:text-lg">{photo.title}</p>
            {photo.caption && <p className="portfolio-meta mt-0.5">{photo.caption}</p>}
          </div>
          <div className="flex shrink-0 gap-1.5 sm:gap-2">
            <button
              type="button"
              className="icon-button"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
              aria-pressed={zoomed}
            >
              {zoomed ? <FiZoomOut size={19} aria-hidden="true" /> : <FiZoomIn size={19} aria-hidden="true" />}
            </button>
            <button ref={closeRef} type="button" className="icon-button" onClick={onClose} aria-label="Close photo">
              <FiX size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          key={photo.id + (zoomed ? '-zoomed' : '')}
          ref={stageRef}
          className="gallery-dialog-stage"
          data-zoomed={zoomed}
          onPointerDown={startSwipe}
          onPointerUp={endSwipe}
          onPointerCancel={() => { swipeStart.current = null }}
          tabIndex={zoomed ? 0 : undefined}
          role={zoomed ? 'region' : undefined}
          aria-label={zoomed ? 'Zoomed photo' : undefined}
        >
          <img
            src={photo.src}
            srcSet={zoomed ? undefined : photo.srcSet}
            sizes={zoomed ? undefined : 'min(100vw, ' + Math.round(100 * photo.width / photo.height) + 'dvh)'}
            alt={photo.alt || photo.title + (photo.caption ? ': ' + photo.caption : '')}
            width={photo.width}
            height={photo.height}
            draggable={false}
            className="gallery-dialog-image"
          />
        </div>
        {hasMultiple && (
          <div className="viewer-footer flex items-center justify-center gap-4 px-4 py-3">
            <button type="button" className="icon-button" aria-label="Previous full photo" onClick={() => move(-1)}>
              <FiArrowLeft size={18} aria-hidden="true" />
            </button>
            <p className="portfolio-meta tabular-nums">{index + 1} / {photos.length}</p>
            <button type="button" className="icon-button" aria-label="Next full photo" onClick={() => move(1)}>
              <FiArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
