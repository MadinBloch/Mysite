import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from 'react-icons/fi'

const links = [
  ['/', 'Story'],
  ['/projects', 'Work'],
  ['/about', 'Profile'],
  ['/gallery', 'Gallery'],
  ['/blogs', 'Writing'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const menuButton = useRef(null)
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    setOpen(false)
  }, [location.key])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event) => {
      if (!header.current.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButton.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const activePath = pathname.startsWith('/projects/') ? '/projects'
    : pathname.startsWith('/blog/') ? '/blogs' : pathname

  const navLinks = links.map(([path, label]) => (
    <Link
      key={path}
      to={path}
      className="nav-link"
      aria-current={activePath === path ? 'page' : undefined}
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  ))

  return (
    <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="portfolio-shell">
        <nav className="site-nav pointer-events-auto flex h-[3.9rem] items-center justify-between gap-3 rounded-full px-2.5 sm:px-3.5" aria-label="Main navigation">
          <Link to="/" className="inline-flex shrink-0 items-center gap-2.5 rounded-full font-display text-base font-semibold" aria-label="Madin Bloch home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold tracking-tight text-[#13251b]" aria-hidden="true">MB</span>
            <span>Madin Bloch</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">{navLinks}</div>

          <Link to="/#contact" className="nav-link hidden gap-2 border border-[#466756] bg-[#21372a] text-[#d6f6e3] lg:inline-flex">
            Let’s talk <FiArrowUpRight size={16} aria-hidden="true" />
          </Link>

          <button
            ref={menuButton}
            type="button"
            className="icon-button lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
          </button>
        </nav>

        <nav
          id="mobile-navigation"
          className={'site-nav pointer-events-auto mt-2 max-h-[calc(100dvh-6rem)] overflow-auto rounded-3xl p-3 lg:hidden ' + (open ? 'grid' : 'hidden')}
          aria-label="Mobile navigation"
        >
          {navLinks}
          <Link to="/#contact" className="nav-link" onClick={() => setOpen(false)}>Contact</Link>
          <a href="/Madin_Bloch_Resume.pdf" download className="btn-primary mt-2" onClick={() => setOpen(false)}>
            Download resume <FiDownload size={17} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  )
}
