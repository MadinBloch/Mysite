import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheck, FiCopy, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SectionReveal } from './motion/SectionReveal'
import { profile } from '../data/profile'

export default function Contact() {
  const email = useRef(null)
  const [copyResult, setCopyResult] = useState('')

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyResult('Email address copied.')
    } catch {
      const selection = window.getSelection()
      if (selection && email.current) {
        const range = document.createRange()
        range.selectNodeContents(email.current)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      setCopyResult('Copy the email address shown here.')
    }
  }

  return (
    <footer id="contact" className="contact-footer" aria-labelledby="contact-title">
      <div className="portfolio-shell">
        <SectionReveal className="contact-layout">
          <div>
            <p className="availability"><span aria-hidden="true" />Open to backend roles</p>
            <h2 id="contact-title" className="editorial-heading">Get in <em>touch.</em></h2>
            <p className="portfolio-copy contact-invite">Hiring for a Laravel role? I’m based in Ahmedabad and open to remote work or relocation.</p>
          </div>
          <div className="contact-actions">
            <div className="contact-address">
              <a href={'mailto:' + profile.email} ref={email}>{profile.email}</a>
              <button type="button" className="icon-button" onClick={copyEmail} aria-label="Copy email address">
                {copyResult === 'Email address copied.' ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={'mailto:' + profile.email} className="btn-primary"><FiMail aria-hidden="true" />Email me</a>
              <a href={profile.resume} download className="btn-outline"><FiDownload aria-hidden="true" />Download resume</a>
            </div>
            <p role="status" className="copy-result">{copyResult}</p>
          </div>
        </SectionReveal>
        <div className="footer-signoff">
          <Link to="/" className="font-display text-lg font-semibold">Madin Bloch</Link>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" />LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
