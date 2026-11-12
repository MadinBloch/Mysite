import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['moments', 'Moments'],
  ['contact', 'Contact'],
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname, location.hash])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ' +
      (isScrolled || menuOpen ? 'border-white/10 bg-[#0b101b]/95 shadow-lg shadow-black/15 backdrop-blur-xl' : 'border-transparent bg-[#0b101b]/75 backdrop-blur-xl')}>
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-5 px-5 sm:px-8" aria-label="Main navigation">
        <Link to="/" className="group flex items-center gap-3" aria-label="Madin Bloch home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/35 bg-accent/15 font-display text-[15px] font-bold tracking-[-.06em] text-accent transition-colors group-hover:bg-accent group-hover:text-[#0b101b]">MB.</span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">Madin Bloch</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([id, label]) => (
            <Link key={id} to={'/#' + id} className="text-[12px] font-medium text-[#a2abc1] transition-colors hover:text-white">{label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a href="/Madin_Bloch_Resume.pdf" download className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-[#e7eafd] transition-colors hover:border-accent/60 hover:text-accent">
            Resume <span aria-hidden="true">↓</span>
          </a>
          <a href="mailto:madinkhan0633@gmail.com" className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-[#101526] transition-colors hover:bg-white">
            Hire me <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-lg text-white hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(value => !value)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </nav>
      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#101624] px-5 pb-5 pt-3 lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 sm:px-3">
            {links.map(([id, label]) => (
              <Link key={id} to={'/#' + id} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-[#cbd2e4] hover:bg-white/10">{label}</Link>
            ))}
            <a href="/Madin_Bloch_Resume.pdf" download className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-[#11172b]">Download resume</a>
          </div>
        </div>
      )}
    </header>
  )
}
