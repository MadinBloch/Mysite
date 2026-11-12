import {
  SiPhp,
  SiLaravel,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiNginx,
  SiLinux,
  SiGit,
  SiLivewire,
} from 'react-icons/si'
import { FaDatabase, FaServer, FaCloud, FaCode, FaAws } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionReveal, Stagger, StaggerItem } from './motion/SectionReveal'

const spotlight = [
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Nginx', icon: SiNginx, color: '#009639' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
]

const groups = [
  {
    num: '01',
    title: 'Backend craft',
    intro: 'APIs, queues, and domain logic that stay maintainable.',
    icon: FaCode,
    skills: [
      { name: 'PHP', icon: SiPhp },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'REST APIs', icon: FaServer },
      { name: 'Queues', icon: FaDatabase },
      { name: 'Livewire', icon: SiLivewire },
      { name: 'Blade', icon: SiLaravel },
    ],
  },
  {
    num: '02',
    title: 'Data systems',
    intro: 'Schemas, storage, and integrations between products.',
    icon: FaDatabase,
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'ERP APIs', icon: FaServer },
      { name: 'Excel / DBF', icon: FaDatabase },
      { name: 'AWS S3', icon: FaAws },
    ],
  },
  {
    num: '03',
    title: 'Ship & operate',
    intro: 'Containers, servers, and release confidence.',
    icon: FaCloud,
    skills: [
      { name: 'Docker', icon: SiDocker },
      { name: 'AWS EC2', icon: FaAws },
      { name: 'Nginx', icon: SiNginx },
      { name: 'PHP-FPM', icon: SiPhp },
      { name: 'Linux', icon: SiLinux },
      { name: 'Git', icon: SiGit },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-label">Toolkit</p>
            <h2 className="section-heading mt-2">What I ship with</h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-zinc-500">
            Tools from production Laravel work — not a generic logo wall.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mb-8 overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-5 sm:p-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Daily drivers</p>
          <div className="flex flex-wrap gap-3">
            {spotlight.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="group flex items-center gap-2.5 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-2.5"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg transition-transform group-hover:scale-110"
                    style={{ color: item.color }}
                  >
                    <Icon />
                  </span>
                  <span className="text-sm font-medium text-zinc-200">{item.name}</span>
                </motion.div>
              )
            })}
          </div>
        </SectionReveal>

        <Stagger className="grid gap-4 md:grid-cols-3">
          {groups.map((group) => {
            const GroupIcon = group.icon
            return (
              <StaggerItem key={group.num}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-6 sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mb-6 flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">{group.num} /</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                      <GroupIcon />
                    </span>
                  </div>
                  <h3 className="relative font-display text-[22px] font-semibold tracking-tight text-white">{group.title}</h3>
                  <p className="relative mt-2 text-xs leading-6 text-zinc-500">{group.intro}</p>
                  <div className="relative mt-6 grid grid-cols-2 gap-2">
                    {group.skills.map((skill) => {
                      const Icon = skill.icon
                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{ borderColor: 'rgba(110,231,183,0.45)' }}
                          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 px-2.5 py-2"
                        >
                          <Icon className="text-sm text-accent" />
                          <span className="truncate text-[11px] font-medium text-zinc-300">{skill.name}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
