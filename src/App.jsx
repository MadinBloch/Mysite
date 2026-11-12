import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Impact from './components/Impact'
import Projects from './components/Projects'
import Experience from './components/Experience'
import About from './components/About'
import Media from './components/Media'
import Contact from './components/Contact'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudyPage from './pages/CaseStudyPage'

function ScrollToAnchor() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' }))
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function HomePage() {
  return <><Hero /><Impact /><Projects /><Experience /><About /><Media /><Contact /></>
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#f1f3ed]">
      <ScrollToAnchor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<div className="mx-auto max-w-5xl px-6 pb-36 pt-40"><h1 className="font-display text-5xl text-white">Page not found.</h1><a href="/" className="mt-6 inline-block text-accent">Back home ↗</a></div>} />
        </Routes>
      </main>
    </div>
  )
}
