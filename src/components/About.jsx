import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { EventPhoto, frames } from './EventPhotos'

const perspectives = [
  { label: 'Production', photo: frames.meetup, title: 'From inquiry to booking.',
    text: 'At Shine Infosoft, I build the Laravel APIs that connect Kesari Select’s booking teams to the ERP. I deploy each release on AWS and verify the workflow in production.',
    to: '/projects/kesari-select-backend', action: 'Inside Kesari Select' },
  { label: 'Hackathon', photo: frames.presentation, title: 'Defending the backend.',
    text: 'At the 2023 New India Vibrant Hackathon Grand Finale at PDEU, I walked the judges through how data moved across our team’s application.',
    to: '/about#hackathon', action: 'The hackathon story' },
  { label: 'Workshop', photo: frames.workshop, title: 'Teaching Git and Docker.',
    text: 'At Dr. Subhash University in Junagadh, I led BCA and MCA students through version control and containers.',
    to: '/about#workshop', action: 'Inside the workshop' },
]

export default function About({ home = false }) {
  const [selected, setSelected] = useState(0)
  const current = perspectives[selected]
  const Heading = home ? 'h2' : 'h1'
  return (
    <section id={home ? 'profile' : 'about'} className="bp-section bp-shell profile-section" aria-labelledby="about-title">
      <p className="bp-kicker">{home ? '01 / About' : 'Profile / Ahmedabad'}</p>
      <div className="about-grid">
        <div>
          <Heading id="about-title" className="bp-section-title">{home ? <>Behind the <em>backend.</em></> : <>About <em>Madin.</em></>}</Heading>
          {home ? <p className="profile-bio">I’m a Laravel developer in Ahmedabad. I started in PHP at Magecurious and now build the software behind a travel booking, from the first inquiry to the finance export.</p> :
            <><p className="profile-bio">I’m Madin, a Laravel developer in Ahmedabad. My first PHP role was at Magecurious in December 2024. I joined Shine Infosoft in May 2025, where I build and release software for Kesari Select’s travel teams.</p>
              <p className="profile-bio">For a missing finance export, I trace the record back to the ERP, change the Laravel job and check the next delivery after deployment. Outside work, I’ve taught Git and Docker to university students, presented a hackathon project to judges and played cricket at national level.</p></>}
          {home && <>
            <div className="perspectives" role="group" aria-label="Explore my experience">
              {perspectives.map(({ label }, index) => <button type="button" key={label} aria-controls="perspective-detail" aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>)}
            </div>
            <div id="perspective-detail" className="perspective-detail" aria-live="polite">
              <h3>{current.title}</h3><p>{current.text}</p>
              <Link className="bp-text-link" to={current.to}>{current.action} <FiArrowUpRight aria-hidden="true" /></Link>
            </div>
          </>}
          <ul className="bp-chips profile-facts" aria-label="Education and interests"><li>MCA final year</li><li>BCA · 8.63 CGPA</li><li>National-level cricket</li></ul>
          <Link to={home ? '/about' : '/about#experience'} className="bp-text-link">{home ? 'Full profile' : 'My experience'} <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
        <figure className="profile-figure">
          <EventPhoto photo={current.photo} sizes="(min-width: 820px) 45vw, 92vw" />
          <figcaption>{current.photo.title}</figcaption>
        </figure>
      </div>
    </section>
  )
}
