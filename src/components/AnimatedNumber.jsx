import { useEffect, useRef, useState } from 'react'

function Count({ target, enabled }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let frame
    const duration = 1700
    const start = performance.now()
    const animate = (time) => {
      const progress = Math.min(1, (time - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [enabled, target])

  return <span>{value.toLocaleString('en-IN')}</span>
}

export default function AnimatedNumber({ a, b, prefix = '', suffix = '', className = '' }) {
  const el = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!el.current) return
    if (!('IntersectionObserver' in window)) {
      setActive(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        observer.disconnect()
      }
    }, { threshold: .3 })
    observer.observe(el.current)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={el} className={className} aria-label={prefix + a.toLocaleString('en-IN') + (b ? ' to ' + b.toLocaleString('en-IN') : '') + suffix}>
      {prefix}<Count target={a} enabled={active} />{b != null && <>–<Count target={b} enabled={active} /></>}{suffix}
    </span>
  )
}
