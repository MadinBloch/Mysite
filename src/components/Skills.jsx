import { FiCloud, FiCode, FiGitBranch, FiLayers, FiPlus, FiServer, FiTable } from 'react-icons/fi'
import { SiDocker, SiGit, SiLaravel, SiLinux, SiLivewire, SiMongodb, SiMysql, SiNginx, SiPhp, SiPostgresql } from 'react-icons/si'

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

const skillIcons = {
  Laravel: SiLaravel,
  PHP: SiPhp,
  'REST APIs': FiServer,
  Queues: FiLayers,
  Livewire: SiLivewire,
  Blade: FiCode,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  'ERP APIs': FiGitBranch,
  'Excel / DBF': FiTable,
  'AWS S3': FiCloud,
  Docker: SiDocker,
  'AWS EC2': FiCloud,
  Nginx: SiNginx,
  'PHP-FPM': SiPhp,
  Linux: SiLinux,
  Git: SiGit,
}

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
              <ul className="bp-chips">{skills.map(skill => {
                const Icon = skillIcons[skill]
                return <li key={skill} className="tool-chip" data-brand={skill}>
                  <Icon aria-hidden="true" focusable="false" /><span>{skill}</span>
                </li>
              })}</ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
