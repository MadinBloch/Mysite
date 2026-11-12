import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Workshop from './components/Workshop'
import DevOps from './components/DevOps'
import Hackathon from './components/Hackathon'
import Blogs from './components/Blogs'
import Media from './components/Media'
import Community from './components/Community'
import Contact from './components/Contact'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudyPage from './pages/CaseStudyPage'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Workshop />
      <DevOps />
      <Hackathon />
      <Media />
      <Blogs />
      <Community />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
    </div>
  )
}
