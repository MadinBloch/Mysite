const SKILLS = [
  {
    category: 'Backend',
    items: [
      { name: 'Laravel', level: 'Primary', note: '1.5+ years, production projects' },
      { name: 'PHP', level: 'Primary', note: 'Core language' },
      { name: 'MySQL', level: 'Primary', note: 'Schema design, queries, optimization' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'Livewire', level: 'Comfortable', note: 'Dynamic UI within Laravel' },
      { name: 'React', level: 'Basic', note: 'Building understanding' },
      { name: 'Blade', level: 'Comfortable', note: 'Laravel templating' },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Nginx', level: 'Basic', note: 'Config, reverse proxy, SSL' },
      { name: 'AWS EC2', level: 'Basic', note: 'Deployed real apps' },
      { name: 'Linux', level: 'Basic', note: 'Server management' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Docker', level: 'Learning', note: 'Containerizing apps' },
      { name: 'CI/CD', level: 'Learning', note: 'GitHub Actions, pipelines' },
      { name: 'DevOps', level: 'Learning', note: 'Deployment workflows' },
    ],
  },
]

const levelColor = {
  Primary: 'text-accent',
  Comfortable: 'text-blue-400',
  Basic: 'text-zinc-400',
  Learning: 'text-amber-400',
}

const levelDot = {
  Primary: 'bg-accent',
  Comfortable: 'bg-blue-400',
  Basic: 'bg-zinc-500',
  Learning: 'bg-amber-400',
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="section-label">Technical Skills</p>
        <h2 className="section-heading mb-2">What I Work With</h2>
    
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category} className="h-full">
              <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">
                {group.category}
              </p>
              <div className="space-y-3 h-full">
                {group.items.map((skill) => (
                  <div key={skill.name} className="card min-h-[96px] hover:border-zinc-600 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-zinc-200 text-sm font-medium">{skill.name}</span>
                      <span className={`font-mono text-xs flex items-center gap-1 ${levelColor[skill.level]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${levelDot[skill.level]}`} />
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-zinc-600 text-xs">{skill.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-5">
          {Object.entries(levelColor).map(([level, cls]) => (
            <div key={level} className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${levelDot[level]}`} />
              <span className={`font-mono text-xs ${cls}`}>{level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
