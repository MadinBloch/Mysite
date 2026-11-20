const technologies = ['Laravel', 'PHP', 'MySQL', 'Queues', 'ERP APIs', 'AWS EC2', 'Nginx', 'Docker']

export default function TechTicker() {
  return (
    <div id="tech-stack" className="tech-strip">
      <ul className="portfolio-shell" aria-label="Technology stack">
        {technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
    </div>
  )
}
