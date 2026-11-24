import { Link } from 'react-router-dom'
import blogs from '../data/blogs.json'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

const postDate = new Intl.DateTimeFormat('en-IN', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export function formatPostDate(date) {
  return postDate.format(new Date(date))
}

export function BlogList({ posts, heading: Heading = 'h3', compact = false }) {
  return (
    <ul className={compact ? 'writing-list writing-rows' : 'writing-list'}>
      {posts.map(post => (
        <li key={post.slug}>
          <Link to={'/blog/' + post.slug}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <div>
              <Heading>{post.title}</Heading>
              {!compact && post.preview && <p>{post.preview}</p>}
            </div>
            <FiArrowUpRight className="post-arrow" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Blogs() {
  return (
    <section id="blogs" className="bp-shell bp-section" aria-labelledby="writing-title">
      <p className="bp-kicker">06 / Writing</p>
      <div className="bp-heading-row">
        <h2 id="writing-title" className="bp-section-title">Notes from <em>production.</em></h2>
        <Link to="/blogs" className="bp-text-link">All posts <FiArrowRight aria-hidden="true" /></Link>
      </div>
      <BlogList compact posts={blogs.slice(0, 3)} />
    </section>
  )
}
