import { useEffect, useRef, useState } from 'react'
import { useMotionPreference } from './motion/MotionPreferences'
import { formatCount } from '../data/siteStats'

export default function AnimatedNumber({ target }) {
  const element = useRef(null)
  const { reduced: reduce } = useMotionPreference()
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (!('IntersectionObserver' in window)) {
      setCount(target)
      setStarted(true)
      return
    }

    let frame
    const observe = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observe.disconnect()

      setStarted(true)
      const start = performance.now()
      const tick = (time) => {
        const progress = Math.min(1, (time - start) / 950)
        const eased = 1 - (1 - progress) ** 3
        setCount(Math.round(target * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
    }, { threshold: 0.35 })

    observe.observe(element.current)
    return () => {
      observe.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, reduce])

  const animate = !reduce && started

  return (
    <span ref={element} className="inline-block tabular-nums">
      <span className="sr-only">{formatCount(target)}+</span>
      <span aria-hidden="true">{formatCount(animate ? count : target)}<span className="stat-suffix">+</span></span>
    </span>
  )
}
