import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { EventPhoto, frames } from './BoardingPhotos'

export default function About({ home = false }) {
  const Heading = home ? 'h2' : 'h1'
  return (
    <section id={home ? 'profile' : 'about'} className="bp-section bp-shell bp-about" aria-labelledby="about-title">
      <div className="about-grid">
        <div>
          {home && <p className="bp-kicker">02 · About</p>}
          <Heading id="about-title" className="bp-section-title">{home ? <>A developer who <mark className="hl">traces</mark> things end to end.</> : <>About <mark className="hl">me.</mark></>}</Heading>
          <p>I’m Madin, a Laravel developer in Ahmedabad. My first PHP role was at Magecurious in December 2024. I joined Shine Infosoft in May 2025, where I build and release software for Kesari Select’s travel teams.</p>
          {!home && <p>I like following a problem all the way through a system. For a missing finance export, that means tracing the record back to the ERP, changing the Laravel job and checking the next delivery after deployment.</p>}
          <p>Outside work, I’ve taught Git and Docker to university students, presented a hackathon project to judges, and played cricket at national level.</p>
          <ul className="bp-chips" aria-label="Education and work preferences"><li>MCA final year</li><li>BCA · 8.63 CGPA</li><li>Remote or relocation</li></ul>
          <Link to={home ? '/about' : '/about#experience'} className="bp-text-link">{home ? 'Full profile' : 'My experience'} <FiArrowRight aria-hidden="true" /></Link>
        </div>
        <Link className="about-print" to="/gallery?album=meetups">
          <EventPhoto photo={frames.meetup} sizes="(min-width: 820px) 46vw, 90vw" />
          <span className="photo-cap">Laravel meetup</span>
        </Link>
      </div>
    </section>
  )
}

export function StatBand() {
  return (
    <section className="achievement-band" aria-label="Education and achievements">
      <dl className="bp-shell">
        <div><dt>Hackathon · 2023</dt><dd>Grand Finale</dd></div>
        <div><dt>BCA CGPA</dt><dd>8.63</dd></div>
        <div><dt>Level cricket</dt><dd>National</dd></div>
      </dl>
    </section>
  )
}
