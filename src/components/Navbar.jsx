import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'
import { FiMail, FiDownload, FiGithub, FiLinkedin, FiMenu, FiX } from 'react-icons/fi'

const links = [
  ['/', 'Home'],
  ['/projects', 'Work'],
  ['/about', 'Profile'],
  ['/gallery', 'Gallery'],
  ['/blogs', 'Writing'],
]

const profileLinks = [
  [profile.github, 'GitHub', FiGithub],
  [profile.linkedin, 'LinkedIn', FiLinkedin],
].map(([href, label, Icon]) => (
  <a key={href} href={href} target="_blank" rel="noreferrer" className="masthead-profile" aria-label={label + ' profile'} title={label}>
    <Icon size={17} aria-hidden="true" /><span className="lg:hidden">{label}</span>
  </a>
))

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
    <header ref={header} className="masthead fixed inset-x-0 top-0 z-50">
      <div className="portfolio-shell">
        <nav className="masthead-bar" aria-label="Main navigation">
          <Link to="/" className="masthead-brand" aria-label="Madin Bloch home">
            <span className="brand-monogram" aria-hidden="true">mb.</span>
            <span>Madin Bloch</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">{navLinks}</div>

          <div className="hidden items-center gap-1 lg:flex">
            {profileLinks}
            <Link to="/#contact" className="masthead-contact ml-3 inline-flex">
              Let’s talk <FiMail size={16} aria-hidden="true" />
            </Link>
          </div>

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
          className={'mobile-menu max-h-[calc(100dvh-5rem)] overflow-auto lg:hidden ' + (open ? 'menu-enter grid' : 'hidden')}
          aria-label="Mobile navigation"
        >
          {navLinks}
          <Link to="/#contact" className="nav-link" onClick={() => setOpen(false)}>Contact</Link>
          <div className="mobile-profiles">{profileLinks}</div>
          <a href={profile.resume} download className="btn-primary mt-2" onClick={() => setOpen(false)}>
            Download resume <FiDownload size={17} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  )
}
