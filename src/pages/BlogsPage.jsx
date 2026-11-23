import { FiArrowUpRight } from 'react-icons/fi'
import { BlogList } from '../components/Blogs'
import blogs from '../data/blogs.json'

export default function BlogsPage() {
  return (
    <section className="portfolio-shell destination-page">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-11">
        <div>
          <h1 className="section-heading">Writing</h1>
          <p className="portfolio-copy mt-4 max-w-xl text-base">
            Notes on building Laravel backends, designing databases, and deploying applications to production.
          </p>
        </div>
        <a href="https://madinbloch.hashnode.dev/" target="_blank" rel="noreferrer" className="btn-outline">
          Hashnode <FiArrowUpRight size={17} aria-hidden="true" />
        </a>
      </header>
      <BlogList posts={blogs} heading="h2" />
    </section>
  )
}
