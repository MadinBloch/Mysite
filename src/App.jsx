import { useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import { Link, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PhotoStrip from './components/BoardingPhotos'
import WorkHighlights from './components/WorkHighlights'
import About, { StatBand } from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import PortfolioStory from './components/PortfolioStory'
import GalleryPage from './pages/GalleryPage'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudyPage from './pages/CaseStudyPage'

const legacySections = {
  '#projects': '/projects',
  '#production': '/projects/kesari-select-backend',
  '#about': '/about',
  '#skills': '/about#skills',
  '#experience': '/about#experience',
  '#certificates': '/gallery?album=certificates',
  '#community': '/gallery?album=meetups',
}

const pageTitles = {
  '/projects': 'Selected work',
  '/gallery': 'Photo archive',
  '/about': 'Profile and experience',
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
      const readingStart = target.querySelector('h1, h2, h3')
      if (readingStart) {
        readingStart.tabIndex = -1
        readingStart.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [key, pathname, search, hash])

  useEffect(() => {
    if (!pageTitles[pathname]) return
    const oldTitle = document.title
    const canonical = document.querySelector('link[rel="canonical"]')
    const oldCanonical = canonical?.href
    document.title = pageTitles[pathname] + ' | Madin Bloch'
    if (canonical) canonical.href = 'https://madin-bloch.vercel.app' + pathname
    return () => {
      document.title = oldTitle
      if (canonical) canonical.href = oldCanonical
    }
  }, [pathname])

  return null
}

function HomePage() {
  const { hash } = useLocation()
  if (legacySections[hash]) return <Navigate to={legacySections[hash]} replace />
  return (
    <>
      <Hero />
      <PhotoStrip />
      <WorkHighlights />
      <About home />
      <StatBand />
      <PortfolioStory />
      <Blogs />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:p-3 focus:text-ink">
        Skip to content
      </a>
      <PageLocation />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<><About /><Experience /><Skills /></>} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route
            path="*"
            element={
              <section className="portfolio-shell pb-28 pt-36">
                <h1 className="section-heading">Page not found</h1>
                <Link to="/" className="btn-primary mt-8">Back to portfolio</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Contact />
    </MotionConfig>
  )
}
