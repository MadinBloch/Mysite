import { Link, useParams } from 'react-router-dom'
import blogs from '../data/blogs.json'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogs.find((item) => item.slug === slug)

  if (!post) {
    return (
      <section className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card text-center py-12">
            <h1 className="text-zinc-100 font-semibold text-xl mb-2">Post not found</h1>
            <p className="text-zinc-400 text-sm mb-4">
              This blog post does not exist in the local portfolio dataset.
            </p>
            <Link to="/blogs" className="font-mono text-xs text-accent">
              Back to blogs →
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-28 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs text-zinc-600 mb-3">{formatDate(post.date)}</p>
        <h1 className="text-zinc-100 text-2xl sm:text-3xl font-bold leading-tight mb-5">
          {post.title}
        </h1>
        <p className="text-zinc-300 leading-relaxed mb-8">{post.preview}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={post.readUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-zinc-950 font-semibold text-sm px-4 py-2 rounded-md hover:bg-accent-dim transition-colors"
          >
            Read full article on Hashnode
          </a>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-md hover:border-zinc-500 transition-colors"
          >
            Back to blogs
          </Link>
        </div>
      </article>
    </section>
  )
}
