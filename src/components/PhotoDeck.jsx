import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion, animate } from 'framer-motion'

const SWIPE = 90

export default function PhotoDeck({ photos, className = '' }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-8, 8])

  useEffect(() => {
    setIndex(0)
    x.set(0)
    busyRef.current = false
    setBusy(false)
  }, [photos, x])

  const count = photos.length
  const current = photos[index]
  const next = photos[(index + 1) % count]
  const third = photos[(index + 2) % count]

  const goNext = useCallback(async () => {
    if (busyRef.current || count < 2) return
    busyRef.current = true
    setBusy(true)

    const dir = x.get() >= 0 ? 1 : -1
    if (!reduce) {
      await animate(x, dir * 340, { type: 'spring', stiffness: 280, damping: 28, mass: 0.7 })
    }

    setIndex((value) => (value + 1) % count)
    x.set(0)
    busyRef.current = false
    setBusy(false)
  }, [count, reduce, x])

  const goTo = useCallback((target) => {
    if (busyRef.current || target === index) return
    busyRef.current = true
    setBusy(true)
    setIndex(((target % count) + count) % count)
    x.set(0)
    busyRef.current = false
    setBusy(false)
  }, [count, index, x])

  const onDragEnd = (_event, info) => {
    if (busyRef.current) return
    if (Math.abs(info.offset.x) > SWIPE || Math.abs(info.velocity.x) > 600) {
      goNext()
      return
    }
    animate(x, 0, { type: 'spring', stiffness: 420, damping: 30 })
  }

  if (!current) return null

  return (
    <div className={'relative ' + className}>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-[28px]">
        <div className="pointer-events-none absolute inset-0 z-0 rounded-[28px] border border-accent/20" aria-hidden="true" />

        {/* Back card */}
        {count > 2 && (
          <div className="pointer-events-none absolute inset-[10px] z-[1] scale-[0.92] translate-y-4 overflow-hidden rounded-[24px] border border-zinc-700/50 bg-zinc-900 opacity-50">
            <img
              src={third.src}
              alt=""
              className={'h-full w-full object-cover ' + (third.objectPosition || 'object-center')}
              draggable={false}
            />
          </div>
        )}

        {/* Middle / next card — rises from behind */}
        {count > 1 && (
          <motion.div
            key={`next-${next.id}-${index}`}
            className="pointer-events-none absolute inset-[6px] z-[2] overflow-hidden rounded-[26px] border border-zinc-700/70 bg-zinc-900"
            initial={false}
            animate={{ scale: 0.96, y: 10, opacity: 0.85 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <img
              src={next.src}
              alt=""
              className={'h-full w-full object-cover ' + (next.objectPosition || 'object-center')}
              draggable={false}
            />
            <div className="absolute inset-0 bg-zinc-950/25" />
          </motion.div>
        )}

        {/* Front card */}
        <motion.div
          key={`front-${current.id}-${index}`}
          className="absolute inset-0 z-[3] cursor-grab touch-none overflow-hidden rounded-[28px] border border-zinc-700/80 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,.4)] active:cursor-grabbing"
          style={reduce ? undefined : { x, rotate }}
          initial={reduce ? false : { scale: 0.96, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          drag={reduce || busy ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.75}
          onDragEnd={onDragEnd}
        >
          <img
            src={current.src}
            alt={current.alt || current.title}
            className={'h-full w-full select-none object-cover ' + (current.objectPosition || 'object-center')}
            draggable={false}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
          <div className="pointer-events-none absolute bottom-5 left-5 right-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[.16em] text-accent">
              {current.eyebrow || 'Moments'}
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-white">{current.title}</p>
            {current.caption && <p className="mt-1 text-xs text-zinc-300">{current.caption}</p>}
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            disabled={busy}
            aria-label={`Show ${photo.title}`}
            onClick={() => goTo(i)}
            className={
              'h-2 rounded-full transition-all ' +
              (i === index ? 'w-7 bg-accent' : 'w-2 bg-zinc-700 hover:bg-zinc-500')
            }
          />
        ))}
      </div>

      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
        {(index + 1).toString().padStart(2, '0')} / {count.toString().padStart(2, '0')} · Drag to change
      </p>
    </div>
  )
}
