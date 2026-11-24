import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheck, FiCopy, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
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
    <footer id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="bp-shell">
        <p className="bp-kicker">Open to backend roles · Remote or relocation</p>
        <h2 id="contact-title">Let’s work <em>together.</em></h2>
        <div className="contact-email">
          <a href={'mailto:' + profile.email} ref={email}>{profile.email}</a>
          <button type="button" onClick={copyEmail} aria-label="Copy email address">
            {copyResult === 'Email address copied.' ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
          </button>
        </div>
        <p role="status" className="email-feedback">{copyResult}</p>
        <div className="bp-actions">
          <a href={'mailto:' + profile.email} className="bp-button bp-primary"><FiMail aria-hidden="true" />Email me</a>
          <a href={profile.resume} download className="bp-button"><FiDownload aria-hidden="true" />Download résumé</a>
        </div>
        <div className="contact-signoff">
          <Link to="/">© Madin Bloch</Link>
          <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" />GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" />LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
