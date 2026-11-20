import { useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Workshop from './components/Workshop'
import Hackathon from './components/Hackathon'
import Media from './components/Media'
import Blogs from './components/Blogs'
import Community from './components/Community'
import Contact from './components/Contact'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudyPage from './pages/CaseStudyPage'

function ScrollToSection() {
  const { key, hash } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [key, hash])

  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Workshop />
      <Hackathon />
      <Media />
      <Community />
      <Blogs />
    </>
  )
}

export default function App() {
  const reduce = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:p-3 focus:text-[#10251b]">
        Skip to content
      </a>
      {!reduce && <ScrollProgress />}
      <ScrollToSection />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
