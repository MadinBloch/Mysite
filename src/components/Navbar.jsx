import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const sections = [
  ['Projects', 'selected-work'], ['About', 'profile'], ['Journey', 'story'],
  ['Album', 'album'], ['Writing', 'blogs'],
]

export default function Navbar() {
  const { key, hash, pathname } = useLocation()
  const [open, setOpen] = useState(false)
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
    <header className="bp-nav" ref={header}>
      <nav className="bp-shell bp-nav-bar" aria-label="Main navigation">
        <Link to="/" className="bp-brand" aria-label="Madin Bloch home">mb.</Link>
        <div id="boarding-menu" className={'bp-menu' + (open ? ' is-open' : '')}>
          {sections.map(([title, id]) => <Link key={id} to={'/#' + id} onClick={() => setOpen(false)} aria-current={pathname === '/' && hash === '#' + id ? 'location' : undefined}>{title}</Link>)}
        </div>
        <div className="nav-actions"><Link to="/#contact" className="bp-button bp-black">Book a chat</Link>
          <button ref={toggle} className="bp-menu-toggle" type="button" aria-controls="boarding-menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  )
}
