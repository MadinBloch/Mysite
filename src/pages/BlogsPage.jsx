import { Link } from 'react-router-dom'
import blogs from '../data/blogs.json'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogsPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Writing</p>
            <h1 className="section-heading mb-2">Blog Posts</h1>
            <p className="text-zinc-400 text-sm max-w-2xl">
              Practical notes on Laravel backend systems, deployment, and lessons from real project work.
            </p>
          </div>
          <a
            href="https://madinbloch.hashnode.dev/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs border border-zinc-700 rounded-md px-3 py-2 text-zinc-300 hover:text-accent hover:border-zinc-500 transition-colors"
          >
            Open Hashnode
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="card h-full flex flex-col hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)] transition-all"
            >
              <p className="font-mono text-xs text-zinc-600 mb-2">{formatDate(post.date)}</p>
              <h2 className="text-zinc-100 text-base font-semibold leading-snug mb-2">
                {post.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 flex-1">
                {post.preview}
              </p>
              <Link to={`/blog/${post.slug}`} className="font-mono text-xs text-accent mt-4">
                Read details →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
