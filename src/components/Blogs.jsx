import { Link } from 'react-router-dom'
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
    <ul className="writing-list">
      {posts.map(post => (
        <li key={post.slug}>
          <Link to={'/blog/' + post.slug}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <div>
              <Heading>{post.title}</Heading>
              {post.preview && <p>{post.preview}</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Blogs() {
  return (
    <section id="blogs" className="section-shell writing-section" aria-labelledby="writing-title">
      <div className="portfolio-shell">
        <SectionReveal className="spread-heading">
          <h2 id="writing-title" className="editorial-heading">Latest <em>writing.</em></h2>
          <Link to="/blogs" className="quiet-link">All posts</Link>
        </SectionReveal>
        <SectionReveal>
          <BlogList posts={blogs.slice(0, 3)} />
        </SectionReveal>
      </div>
    </section>
  )
}
