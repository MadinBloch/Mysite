import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import Lightbox from './Lightbox'
import { profile } from '../data/profile'

const fields = [
  ['Passenger', 'Madin Bloch'], ['Role', 'Laravel Dev'], ['From', 'Hackathon ’23'],
  ['To', 'Production'], ['Base', 'Ahmedabad'], ['Stack', 'Laravel · AWS'],
]
const portrait = {
  id: 'portrait', title: 'Madin Bloch', alt: 'Madin Bloch in a navy suit',
  src: '/photos/madin-portrait.webp', width: 720, height: 720,
}

export default function Hero() {
  const [preview, setPreview] = useState(false)
  return (
    <section id="home" className="bp-hero bp-shell" aria-labelledby="home-title">
      <p className="bp-kicker">Madin Bloch · Laravel backend developer · Ahmedabad</p>
      <h1 id="home-title">Backend that <mark className="hl">works</mark> when it matters.</h1>
      <p className="bp-intro">At Shine Infosoft, I build the Laravel APIs that take a Kesari Select inquiry from quote to booking. I connect them to the ERP and deploy releases on AWS.</p>
      <div className="bp-actions">
        <Link to="/#selected-work" className="bp-button bp-primary">See my projects <FiArrowDown aria-hidden="true" /></Link>
        <a href={profile.resume} download className="bp-button"><FiDownload aria-hidden="true" />Resume</a>
      </div>
      <div id="boarding-pass" className="boarding-pass">
        <div className="pass-body">
          <div className="pass-heading"><span className="bp-label">Boarding pass</span><span className="pass-status">Open to backend roles</span></div>
          <dl className="pass-fields">{fields.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
          <div className="pass-barcode" aria-hidden="true" />
        </div>
        <div className="pass-stub">
          <button type="button" className="pass-portrait" onClick={() => setPreview(true)} aria-label="Open Madin Bloch’s portrait">
            <img src={portrait.src} width="720" height="720" alt={portrait.alt} fetchPriority="high" />
          </button>
          <div><p className="bp-label">Seat</p><p className="seat-number">01A</p>
            <a className="bp-button bp-black" href={profile.resume} download>Resume <FiArrowDown aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      {preview && <Lightbox photos={[portrait]} index={0} onClose={() => setPreview(false)} />}
    </section>
  )
}
