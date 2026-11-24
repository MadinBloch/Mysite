import { FiPlus } from 'react-icons/fi'

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
      {home && <p className="bp-kicker">04 / Toolkit</p>}
      <div className="tools-layout">
        <h2 className="bp-section-title" id="skills-title">Tools of the <em>trade.</em></h2>
        <div className="tool-list">
          {groups.map(({ title, description, skills }, index) => (
            <details className="tool-entry" name="toolkit" key={title} open={index === 0}>
              <summary>{title} <FiPlus aria-hidden="true" /></summary>
              <p>{description}</p>
              <ul className="bp-chips">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
