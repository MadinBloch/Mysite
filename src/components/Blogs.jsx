import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import blogs from '../data/blogs.json'
import { SectionReveal } from './motion/SectionReveal'

const postDate = new Intl.DateTimeFormat('en-IN', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export function formatPostDate(date) {
  return postDate.format(new Date(date))
}

export function BlogList({ posts, heading: Heading = 'h3' }) {
  return (
    <ul className="portfolio-panel divide-y divide-[#34443a]">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={'/blog/' + post.slug}
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-2xl p-4 transition-colors hover:bg-[#22272a] sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-5 sm:px-6 sm:py-5"
          >
            <time dateTime={post.date} className="portfolio-meta col-start-1 sm:col-auto">{formatPostDate(post.date)}</time>
            <div className="col-start-1 row-start-2 sm:col-auto sm:row-auto">
              <Heading className="font-display text-[1.25rem] font-semibold leading-tight transition-colors group-hover:text-accent sm:text-[1.4rem]">
                {post.title}
              </Heading>
              {post.preview && <p className="portfolio-copy mt-1 text-sm">{post.preview}</p>}
            </div>
            <span className="icon-button col-start-2 row-span-2 row-start-1 self-center group-hover:border-accent/60 group-hover:text-accent sm:col-auto sm:row-auto">
              <FiArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Blogs() {
  return (
    <section id="blogs" className="section-shell bg-[#101114]" aria-labelledby="writing-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
          <h2 id="writing-title" className="section-heading">Latest writing</h2>
          <Link to="/blogs" className="btn-outline">All posts <FiArrowUpRight size={17} aria-hidden="true" /></Link>
        </SectionReveal>
        <SectionReveal>
          <BlogList posts={blogs.slice(0, 3)} />
        </SectionReveal>
      </div>
    </section>
  )
}
