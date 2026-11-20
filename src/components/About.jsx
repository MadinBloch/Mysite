import { Link } from 'react-router-dom'
import { FiBookOpen, FiCamera } from 'react-icons/fi'
import { SectionReveal } from './motion/SectionReveal'
import { meetupPhotos } from '../data/photos'

export default function About() {
  const meetup = meetupPhotos[0]

  return (
    <section id="about" className="destination-section about-profile" aria-labelledby="about-title">
      <div className="portfolio-shell">
        <div className="bio-layout">
          <SectionReveal>
            <h1 id="about-title" className="destination-title">About <em>me.</em></h1>
            <div className="bio-copy">
              <p>I’m Madin, a Laravel developer in Ahmedabad. My first PHP role was at Magecurious in December 2024. I joined Shine Infosoft in May 2025, where I build and release software for Kesari Select’s travel teams.</p>
              <p>I like following a problem all the way through a system. For a missing finance export, that means tracing the record back to the ERP, changing the Laravel job and checking the next delivery after deployment.</p>
              <p>Outside work, I’ve taught Git and Docker to university students, presented a hackathon project to judges, and played cricket at national level.</p>
            </div>
            <div className="bio-links">
              <Link to="/about#experience" className="sample-link">My experience</Link>
              <Link to="/#story" className="quiet-link"><FiBookOpen aria-hidden="true" />Read my story</Link>
            </div>
          </SectionReveal>
          <SectionReveal className="bio-photo" delay={0.06}>
            <Link to="/gallery?album=meetups">
              <img src={meetup.src} alt={meetup.title} decoding="async" width="1200" height="800" style={{ objectPosition: meetup.position }} />
              <span><FiCamera aria-hidden="true" />Laravel meetup photos</span>
            </Link>
          </SectionReveal>
        </div>
        <dl className="profile-facts">
          <div><dt>Current role</dt><dd>Laravel Developer · Shine Infosoft</dd></div>
          <div><dt>Education</dt><dd>MCA final year · BCA, 8.63 CGPA</dd></div>
          <div><dt>Work preferences</dt><dd>Ahmedabad · Remote or relocation</dd></div>
        </dl>
      </div>
    </section>
  )
}
