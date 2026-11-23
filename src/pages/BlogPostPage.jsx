import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi'
import { formatPostDate } from '../components/Blogs'
import blogs from '../data/blogs.json'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogs.find((item) => item.slug === slug)

  return (
    <div className="portfolio-shell destination-page">
      <div className="max-w-4xl">
        <Link to="/blogs" className="link-accent mb-6 min-h-10 text-sm">
          <FiArrowLeft size={17} aria-hidden="true" /> All posts
        </Link>
        {post ? (
          <article className="project-feature p-5 sm:p-10">
            <time dateTime={post.date} className="portfolio-meta">{formatPostDate(post.date)}</time>
            <h1 className="section-heading mt-4">{post.title}</h1>
            <p className="portfolio-copy mt-5 max-w-2xl text-base sm:text-lg">{post.preview}</p>
            <a href={post.readUrl} target="_blank" rel="noreferrer" className="btn-primary mt-7">
              Visit my Hashnode blog <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>
        ) : (
          <h1 className="section-heading">Post not found</h1>
        )}
      </div>
    </div>
  )
}
