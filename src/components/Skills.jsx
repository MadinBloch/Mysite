import { FiCloud, FiCode, FiDatabase } from 'react-icons/fi'
import { SectionReveal, Stagger, StaggerItem } from './motion/SectionReveal'

const groups = [
  {
    title: 'Application backend',
    description: 'REST APIs, background jobs, and workflow logic.',
    icon: FiCode,
    skills: ['Laravel', 'PHP', 'REST APIs', 'Queues', 'Livewire', 'Blade'],
  },
  {
    title: 'Data & integrations',
    description: 'Database design, imports and exports, and ERP integrations.',
    icon: FiDatabase,
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'ERP APIs', 'Excel / DBF', 'AWS S3'],
  },
  {
    title: 'Deployment',
    description: 'Application releases and production troubleshooting.',
    icon: FiCloud,
    skills: ['Docker', 'AWS EC2', 'Nginx', 'PHP-FPM', 'Linux', 'Git'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-shell" aria-labelledby="skills-title">
      <div className="portfolio-shell">
        <SectionReveal className="mb-7 sm:mb-9">
          <h2 id="skills-title" className="section-heading">Technical toolkit</h2>
        </SectionReveal>

        <Stagger className="grid gap-4 md:grid-cols-3">
          {groups.map(({ title, description, icon: Icon, skills }) => (
            <StaggerItem key={title}>
              <article className="portfolio-panel h-full p-5 sm:p-6">
                <Icon size={25} className="text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[1.45rem] font-semibold leading-tight">{title}</h3>
                <p className="portfolio-copy mb-5 mt-2 text-sm">{description}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => <li key={skill} className="tag">{skill}</li>)}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
