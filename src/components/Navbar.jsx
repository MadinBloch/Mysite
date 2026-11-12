import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  ['#work','Work'],['#experience','Experience'],['#about','About'],['#stories','Beyond code'],['#contact','Contact']
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={'site-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ' + (scrolled || open ? 'border-b border-white/10 bg-[#0b0d12]/95 shadow-xl shadow-black/20 backdrop-blur-xl' : 'bg-[#0b0d12]/65 backdrop-blur-lg')}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <Link to="/" aria-label="Madin Bloch home" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-display text-base font-extrabold tracking-[-.08em] text-[#09100c] transition-transform group-hover:-rotate-6">mb.</span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">Madin Bloch<span className="text-accent">/</span></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map(([id,label]) => (
            <Link key={id} to={'/'+id} className="font-mono text-[11px] tracking-wide text-[#a7acb7] transition-colors hover:text-white">{label}</Link>
          ))}
          <Link to="/blogs" className="font-mono text-[11px] text-[#a7acb7] hover:text-white">Writing</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="/Madin_Bloch_Resume.pdf" download className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 font-mono text-[11px] text-white transition-colors hover:border-accent hover:text-accent">Resume <span aria-hidden="true">↗</span></a>
          <a href="mailto:madinkhan0633@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 font-mono text-[11px] font-semibold text-[#10130e] transition-colors hover:bg-white">Get in touch <span aria-hidden="true">↗</span></a>
        </div>

        <button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(v=>!v)} className="rounded-xl border border-white/15 px-3 py-2 text-xl leading-none text-white md:hidden">
          {open ? '×' : '☰'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-white/10 px-5 pb-5 pt-3 md:hidden">
          <div className="grid gap-1">
            {links.map(([id,label]) => <Link key={id} to={'/'+id} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-[#d0d3dc] hover:bg-white/10">{label}</Link>)}
            <Link to="/blogs" onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-[#d0d3dc] hover:bg-white/10">Writing</Link>
            <a href="/Madin_Bloch_Resume.pdf" download className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-black">Download resume</a>
          </div>
        </nav>
      )}
    </header>
  )
}
