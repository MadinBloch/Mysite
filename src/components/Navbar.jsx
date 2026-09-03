import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#workshop', label: 'Workshop' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur border-b border-zinc-800' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-zinc-100 tracking-tight text-xl">
          mb<span className="text-accent">.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="/Madin_Bloch_Resume.pdf"
            download
            className="font-mono text-xs text-zinc-950 bg-accent hover:bg-accent-dim rounded-lg px-3.5 py-2 font-semibold transition-colors shadow-[0_0_18px_rgba(110,231,183,0.2)]"
          >
            Resume
          </a>
          <Link
            to="/blogs"
            className={`font-mono text-xs border rounded-md px-3 py-1.5 transition-colors ${
              location.pathname === '/blogs'
                ? 'text-accent border-accent/40 bg-accent/10'
                : 'text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-accent'
            }`}
          >
            Blogs
          </Link>
        </div>

        <button
          className="lg:hidden text-zinc-400 hover:text-zinc-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 px-6 py-4">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Madin_Bloch_Resume.pdf"
                download
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm text-accent"
              >
                Download Resume
              </a>
            </li>
            <li>
              <Link
                to="/blogs"
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm text-accent"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
