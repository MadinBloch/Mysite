import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const primaryLinks = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
]

const moreLinks = [
  ['workshop', 'University Workshop'],
  ['hackathon', 'Hackathon'],
  ['certificates', 'Certificates'],
  ['blogs', 'Blogs'],
  ['community', 'Events & Meetups'],
]

const allLinks = [...primaryLinks, ...moreLinks, ['contact', 'Contact']]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const moreRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setMoreOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const sectionIds = allLinks.map(([id]) => id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const syncActive = () => {
      const marker = window.scrollY + 120
      let current = 'home'
      for (const el of elements) {
        if (el.offsetTop <= marker) current = el.id
      }
      setActiveId(current)
    }

    syncActive()
    window.addEventListener('scroll', syncActive, { passive: true })
    return () => window.removeEventListener('scroll', syncActive)
  }, [location.pathname])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const linkClass = (id) =>
    'rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ' +
    (activeId === id
      ? 'bg-white/5 text-accent'
      : 'text-zinc-400 hover:bg-white/5 hover:text-white')

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={
          'mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl transition-colors duration-200 sm:px-4 ' +
          (isScrolled || menuOpen
            ? 'border-zinc-700/80 bg-zinc-950/90'
            : 'border-zinc-800/80 bg-zinc-950/70')
        }
        aria-label="Main navigation"
      >
        <Link to="/" className="group flex shrink-0 items-center gap-2.5 pl-1" aria-label="Madin Bloch home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/35 bg-accent/15 font-display text-[13px] font-bold tracking-[-.06em] text-accent transition-colors group-hover:bg-accent group-hover:text-zinc-950">
            MB
          </span>
          <span className="hidden font-display text-[14px] font-semibold tracking-tight text-white sm:inline">
            Madin Bloch
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {primaryLinks.map(([id, label]) => (
            <Link key={id} to={'/#' + id} className={linkClass(id)}>
              {label}
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={
                'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ' +
                (moreLinks.some(([id]) => id === activeId)
                  ? 'bg-white/5 text-accent'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white')
              }
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((value) => !value)}
            >
              More
              <span aria-hidden="true" className="text-[10px]">{moreOpen ? '▴' : '▾'}</span>
            </button>
            {moreOpen && (
              <div className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-56 -translate-x-1/2 rounded-2xl border border-zinc-700/80 bg-zinc-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                {moreLinks.map(([id, label]) => (
                  <Link
                    key={id}
                    to={'/#' + id}
                    className="block rounded-xl px-3 py-2.5 text-[12px] text-zinc-300 transition-colors hover:bg-white/5 hover:text-accent"
                    onClick={() => setMoreOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/#contact" className={linkClass('contact')}>
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/Madin_Bloch_Resume.pdf"
            download
            className="hidden rounded-full border border-zinc-700 px-3.5 py-2 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            Resume ↓
          </a>
          <a
            href="mailto:madinkhan0633@gmail.com"
            className="hidden rounded-full bg-accent px-3.5 py-2 text-[11px] font-semibold text-zinc-950 transition-colors hover:bg-accent-dim md:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-base text-white transition-colors hover:bg-white/10 xl:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl xl:hidden"
        >
          <div className="grid gap-1">
            {allLinks.map(([id, label]) => (
              <Link
                key={id}
                to={'/#' + id}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-accent"
              >
                {label}
              </Link>
            ))}
            <a
              href="/Madin_Bloch_Resume.pdf"
              download
              className="mt-2 rounded-2xl bg-accent px-4 py-3 text-center text-sm font-semibold text-zinc-950"
            >
              Download resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
