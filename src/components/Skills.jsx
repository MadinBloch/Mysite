const groups = [
  {
    num: '01',
    title: 'Backend development',
    intro: 'Where I spend most of my time.',
    skills: ['PHP', 'Laravel', 'REST APIs', 'Laravel Queues', 'Scheduler', 'Blade', 'Livewire']
  },
  {
    num: '02',
    title: 'Data & integrations',
    intro: 'Getting systems to work together.',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Frappe ERP APIs', 'Excel / DBF', 'AWS S3']
  },
  {
    num: '03',
    title: 'Tools & deployment',
    intro: 'Getting the work into production.',
    skills: ['Docker', 'AWS EC2', 'Nginx', 'PHP-FPM', 'Linux', 'Git', 'SSL']
  }
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow">What I work with</p><h2 className="section-heading mt-3">My tech stack<span className="text-accent">.</span></h2></div>
          <p className="max-w-xs text-sm leading-7 text-[#8d99b3]">Practical tools I've used to build, integrate and ship backend applications.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {groups.map(group => (
            <article key={group.num} className="rounded-[22px] border border-white/10 bg-[#141c2b] p-6 transition-all hover:-translate-y-1 hover:border-accent/30 sm:p-7">
              <div className="mb-9 flex items-center justify-between">
                <span className="font-mono text-xs text-accent">{group.num} /</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              </div>
              <h3 className="font-display text-[22px] font-semibold tracking-tight text-white">{group.title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#9aa7c2]">{group.intro}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map(skill => <span key={skill} className="rounded-lg border border-white/10 bg-[#0c1321] px-3 py-2 text-xs font-medium text-[#cbd3e7]">{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
