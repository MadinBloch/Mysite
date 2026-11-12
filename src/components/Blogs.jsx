import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import blogs from '../data/blogs.json'
import { SectionReveal } from './motion/SectionReveal'

function BlogCard({ post, index }) {
  const date = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="card group relative h-full overflow-hidden hover:border-accent/30"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
      <p className="relative mb-2 font-mono text-xs text-zinc-600">{date}</p>
      <h3 className="relative mb-2 text-sm font-medium leading-snug text-zinc-200 transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      {post.preview && (
        <p className="relative line-clamp-2 text-xs leading-relaxed text-zinc-500">{post.preview}</p>
      )}
      <Link
        to={`/blog/${post.slug}`}
        className="relative mt-4 inline-flex items-center gap-1 font-mono text-xs text-zinc-500 transition-colors group-hover:text-accent"
      >
        Read article <span aria-hidden="true">→</span>
      </Link>
    </motion.article>
  )
}

export default function Blogs() {
  const featuredPosts = blogs.slice(0, 3)

  return (
    <section id="blogs" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Writing</p>
            <h2 className="section-heading mt-2 mb-2">Latest Blog Posts</h2>
            <p className="text-sm text-zinc-500">
              Notes on backend architecture, Laravel workflows, and DevOps learning.
            </p>
          </div>
          <Link
            to="/blogs"
            className="rounded-full border border-zinc-700 px-3.5 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
          >
            View all blogs
          </Link>
        </SectionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-zinc-600">
          Also publishing on{' '}
          <a href="https://madinbloch.hashnode.dev/" target="_blank" rel="noreferrer" className="link-accent">
            Hashnode
          </a>
          .
        </p>
      </div>
    </section>
  )
}
