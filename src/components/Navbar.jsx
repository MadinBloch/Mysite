import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiArrowUpRight, FiMenu, FiPause, FiPlay, FiX } from 'react-icons/fi'
import { useMotionPreference } from './motion/MotionPreferences'

const sections = [
  ['Work', 'selected-work'], ['About', 'profile'], ['Journey', 'story'],
  ['Photos', 'album'], ['Writing', 'blogs'],
]

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
      <header className="masthead" ref={header}>
        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/" className="wordmark" aria-label="Madin Bloch home"><img src="/favicon.svg" width="34" height="34" alt="" /><span>Madin <em>Bloch.</em></span></Link>
          <div id="main-menu" className={'main-menu' + (open ? ' is-open' : '')}>
            {sections.map(([title, id]) => <Link key={id} to={'/#' + id} onClick={() => setOpen(false)} aria-current={pathname === '/' && hash === '#' + id ? 'location' : undefined}><span className="nav-label"><span>{title}</span><span aria-hidden="true">{title}</span></span></Link>)}
          </div>
          <div className="nav-actions">
            <Link to="/#contact" className="nav-contact">Let’s talk <FiArrowUpRight aria-hidden="true" /></Link>
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
