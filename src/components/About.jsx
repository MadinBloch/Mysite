import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { SectionReveal } from './motion/SectionReveal'

export default function About() {
  return (
    <section id="about" className="section-shell bg-[#101814]" aria-labelledby="about-title">
      <div className="portfolio-shell grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
        <SectionReveal>
          <h2 id="about-title" className="section-heading">About me</h2>
          <p className="portfolio-copy mt-5 max-w-[34rem] text-base">
            I’ve worked on PHP and Laravel applications since December 2024. At Shine Infosoft, I build APIs and ERP integrations, fix production issues, and deploy updates for travel operations software and internal tools.
          </p>
          <p className="portfolio-copy mt-4 max-w-[34rem] text-base">
            I enjoy working through tricky workflows with the people who use them. Outside work, I teach Git and Docker and write about what I’m learning.
          </p>
          <Link to="/#experience" className="link-accent mt-6 min-h-10 text-sm">
            My experience <FiArrowRight size={16} aria-hidden="true" />
          </Link>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <dl className="overflow-hidden rounded-[1.5rem] border border-[#33443a] bg-[#18221c]">
            <div className="grid gap-1.5 px-5 py-4 sm:grid-cols-[.55fr_1fr] sm:items-baseline sm:px-6">
              <dt className="portfolio-meta">Education</dt>
              <dd className="font-display text-lg font-medium">MCA · Final year<br /><span className="portfolio-copy text-sm">BCA completed · 8.63 CGPA</span></dd>
            </div>
            <div className="grid gap-1.5 border-t border-[#33443a] px-5 py-4 sm:grid-cols-[.55fr_1fr] sm:items-baseline sm:px-6">
              <dt className="portfolio-meta">Based in</dt>
              <dd className="font-display text-lg font-medium">Ahmedabad, India</dd>
            </div>
            <div className="grid gap-1.5 border-t border-[#33443a] px-5 py-4 sm:grid-cols-[.55fr_1fr] sm:items-baseline sm:px-6">
              <dt className="portfolio-meta">Availability</dt>
              <dd className="font-display text-lg font-medium">Open to remote backend roles</dd>
            </div>
          </dl>
        </SectionReveal>
      </div>
    </section>
  )
}
