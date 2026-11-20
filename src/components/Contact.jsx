import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SectionReveal } from './motion/SectionReveal'

const email = 'madinkhan0633@gmail.com'

export default function Contact() {
  return (
    <footer id="contact" className="section-shell" aria-labelledby="contact-title">
      <div className="portfolio-shell">
        <SectionReveal className="project-feature grid items-end gap-6 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:p-11">
          <div>
            <h2 id="contact-title" className="section-heading">Let’s talk Laravel.</h2>
            <p className="portfolio-copy mt-4 max-w-xl text-base">I’m based in Ahmedabad and open to backend roles, including remote opportunities.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a href={'mailto:' + email} className="btn-primary">
              <FiMail size={17} aria-hidden="true" /> Email me
            </a>
            <a href="/Madin_Bloch_Resume.pdf" download className="btn-outline">
              Resume <FiDownload size={17} aria-hidden="true" />
            </a>
          </div>
        </SectionReveal>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#314137] pt-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link to="/" className="font-display text-base font-semibold">Madin Bloch</Link>
            <a href={'mailto:' + email} className="portfolio-meta break-all hover:text-accent">{email}</a>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="link-accent">
              <FiGithub size={16} aria-hidden="true" /> GitHub <FiArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="link-accent">
              <FiLinkedin size={16} aria-hidden="true" /> LinkedIn <FiArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
