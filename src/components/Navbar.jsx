import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiArrowUpRight, FiMenu, FiPause, FiPlay, FiX } from 'react-icons/fi'
import { useMotionPreference } from './motion/MotionPreferences'
import RollingLabel from './RollingLabel'

const sections = [
  ['Work', 'selected-work'], ['About', 'profile'], ['Journey', 'story'],
  ['Photos', 'album'], ['Writing', 'blogs'],
]

function ReadingProgress() {
  const bar = useRef(null)
  const { key } = useLocation()

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const page = document.documentElement
      const distance = page.scrollHeight - page.clientHeight
      const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      bar.current.style.transform = `scaleX(${fraction})`
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    window.addEventListener('resize', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    schedule()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frame)
    }
  }, [key])

  return <div ref={bar} className="reading-progress" aria-hidden="true" />
}

export default function Navbar() {
  const { key, hash, pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { reduced, systemReduced, toggleMotion } = useMotionPreference()
  const header = useRef(null)
  const toggle = useRef(null)
  useEffect(() => { setOpen(false) }, [key])
  useEffect(() => {
    if (!open) return
    function dismiss(event) {
      if (event.type === 'keydown') {
        if (event.key !== 'Escape') return
        toggle.current?.focus()
      } else if (header.current?.contains(event.target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', dismiss)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', dismiss)
    }
  }, [open])

  return (
    <>
      <ReadingProgress />
      <header className="masthead" ref={header}>
        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/" className="wordmark" aria-label="Madin Bloch home"><span>Madin <em>Bloch.</em></span></Link>
          <div id="main-menu" className={'main-menu' + (open ? ' is-open' : '')}>
            {sections.map(([title, id]) => <Link key={id} to={'/#' + id} onClick={() => setOpen(false)} aria-current={pathname === '/' && hash === '#' + id ? 'location' : undefined}><RollingLabel>{title}</RollingLabel></Link>)}
          </div>
          <div className="nav-actions">
            <Link to="/#contact" className="nav-contact"><RollingLabel>Let’s talk</RollingLabel> <FiArrowUpRight aria-hidden="true" /></Link>
            <button ref={toggle} className="menu-toggle" type="button" aria-controls="main-menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>
      <button type="button" className="motion-toggle" aria-pressed={!reduced} disabled={systemReduced}
        title={systemReduced ? 'Reduced motion is enabled on your device' : 'Toggle animations'} onClick={toggleMotion}>
        {reduced ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
        Motion {reduced ? 'off' : 'on'}
      </button>
    </>
  )
}
