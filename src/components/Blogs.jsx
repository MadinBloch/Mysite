import { Link } from 'react-router-dom'
import blogs from '../data/blogs.json'

function BlogCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <article className="card block group hover:border-zinc-600 transition-all">
      <p className="font-mono text-xs text-zinc-600 mb-1">{date}</p>
      <h3 className="text-zinc-200 text-sm font-medium leading-snug mb-2 group-hover:text-accent transition-colors">
        {post.title}
      </h3>
      {post.preview && (
        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{post.preview}</p>
      )}
      <Link to={`/blog/${post.slug}`} className="font-mono text-xs text-zinc-600 mt-3 group-hover:text-accent transition-colors inline-block">
        Read →
      </Link>
    </article>
  )
}

export default function Blogs() {
  const featuredPosts = blogs.slice(0, 3)

  return (
    <section id="blogs" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Writing</p>
        <div className="flex items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="section-heading mb-2">Latest Blog Posts</h2>
            <p className="text-zinc-500 text-sm">
              Notes on backend architecture, Laravel workflows, and DevOps learning.
            </p>
          </div>
          <Link
            to="/blogs"
            className="font-mono text-xs border border-zinc-700 rounded-md px-3 py-2 text-zinc-300 hover:text-accent hover:border-zinc-500 transition-colors"
          >
            View all blogs
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <p className="text-zinc-600 text-xs font-mono mt-6">
          Want full writeups? Visit{' '}
          <a href="https://madinbloch.hashnode.dev/" target="_blank" rel="noreferrer" className="link-accent">
            Hashnode
          </a>
          .
        </p>
      </div>
    </section>
  )
}
