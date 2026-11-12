import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Media from './components/Media'
import Contact from './components/Contact'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudyPage from './pages/CaseStudyPage'

function ScrollToSection() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.substring(1))?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Media />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b101b] text-[#eef1fa]">
      <ScrollToSection />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={
            <div className="mx-auto max-w-4xl px-6 pb-36 pt-40">
              <p className="eyebrow">404 / Page not found</p>
              <h1 className="mt-4 font-display text-5xl font-semibold text-white">Nothing here, unfortunately.</h1>
              <a href="/" className="mt-8 inline-flex text-accent hover:text-white">Back to portfolio ↗</a>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}
