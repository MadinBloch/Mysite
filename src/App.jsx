import { applyPageMeta, getPageMeta } from './pageMeta'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { MotionProvider } from './components/motion/MotionPreferences'
import { Navigate, useLocation } from 'react-router-dom'
import { PageReveals } from './components/motion/SectionReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Impact from './components/Impact'
import WorkHighlights from './components/WorkHighlights'
import About from './components/About'
import Skills from './components/Skills'
import Journey from './components/Journey'
import HomeAlbum from './components/HomeAlbum'
import Blogs from './components/Blogs'
import Contact from './components/Contact'

const DeferredDestinations = lazy(() => import('./DestinationRoutes'))

const legacySections = {
  '#boarding-pass': '/#home',
  '#photo-strip': '/#album',
  '#projects': '/projects',
  '#production': '/projects/kesari-select-backend',
  '#about': '/about',
  '#skills': '/about#skills',
  '#experience': '/about#experience',
  '#certificates': '/gallery?album=certificates',
  '#community': '/gallery?album=meetups',
}

function PageLocation() {
  const { key, pathname, search, hash } = useLocation()
  const previous = useRef(null)

  useEffect(() => {
    const last = previous.current
    previous.current = { pathname, search, hash }
    if (last?.pathname === pathname && last.hash === hash && last.search !== search) return
    const frame = requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo(0, 0)
        return
      }

      const target = document.getElementById(hash.slice(1))
      if (!target) return
      target.scrollIntoView({ block: 'start' })
      const readingStart = target.querySelector('h1, h2, h3') || target.querySelector('button, a[href]')
      if (readingStart) {
        if (readingStart.matches('h1, h2, h3')) readingStart.tabIndex = -1
        readingStart.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [key, pathname, search, hash])

  useEffect(() => { applyPageMeta(getPageMeta(pathname)) }, [pathname])

  return null
}

function HomePage() {
  const { hash } = useLocation()
  if (legacySections[hash]) return <Navigate to={legacySections[hash]} replace />
  return (
    <>
      <Hero />
      <Impact home />
      <About home />
      <WorkHighlights />
      <Journey />
      <Skills home />
      <HomeAlbum />
      <Blogs />
    </>
  )
}

export default function App({ Destinations = DeferredDestinations }) {
  const { pathname } = useLocation()
  return (
    <MotionProvider>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-panel focus:p-3 focus:text-ink">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p role="status" className="portfolio-shell destination-page">Opening page…</p>}>
          <PageLocation />
          <PageReveals />
          {pathname === '/' ? <HomePage /> : <Destinations />}
        </Suspense>
      </main>
      <Contact />
    </MotionProvider>
  )
}
