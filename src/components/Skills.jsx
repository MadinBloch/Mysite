import { SectionReveal } from './motion/SectionReveal'

const groups = [
  {
    title: 'Application backend',
    description: 'REST APIs, background jobs, and workflow logic.',
    skills: ['Laravel', 'PHP', 'REST APIs', 'Queues', 'Livewire', 'Blade'],
  },
  {
    title: 'Data & integrations',
    description: 'Database design, imports and exports, and ERP integrations.',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'ERP APIs', 'Excel / DBF', 'AWS S3'],
  },
  {
    title: 'Deployment',
    description: 'Application releases and production troubleshooting.',
    skills: ['Docker', 'AWS EC2', 'Nginx', 'PHP-FPM', 'Linux', 'Git'],
  },
]

export default function Skills({ home = false }) {
  return (
    <section id={home ? 'tech-stack' : 'skills'} className="bp-shell bp-section tool-section" aria-labelledby="skills-title">
      {home && <p className="bp-kicker">04 · Tools</p>}
      <h2 className="bp-section-title" id="skills-title">
        {home ? <>Tools I <mark className="hl">reach for.</mark></> : <>Technical <mark className="hl">toolkit.</mark></>}
      </h2>
      <div className="tool-grid">
        {groups.map(({ title, description, skills }) => (
          <SectionReveal className="tool-card" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
            <ul className="bp-chips">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
