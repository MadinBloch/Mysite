import { Link, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import PortfolioStory from './components/PortfolioStory'
import GalleryPage from './pages/GalleryPage'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudyPage from './pages/CaseStudyPage'

export default function DestinationRoutes() {
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<><About /><Experience /><PortfolioStory /><Skills /></>} />
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
  )
}
