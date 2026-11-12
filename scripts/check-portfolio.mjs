import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { CASE_STUDIES } from '../src/data/caseStudies.js'

const read = path => readFileSync(path, 'utf8')
const projects = JSON.parse(read('src/data/projects.json'))
assert.equal(projects.length, 4, 'The portfolio should show a concise project selection')
assert.equal(new Set(projects.map(project => project.id)).size, projects.length, 'Project IDs must be unique')
for (const project of projects) {
  if (project.caseStudySlug) assert.ok(CASE_STUDIES[project.caseStudySlug], 'Missing case study: ' + project.caseStudySlug)
}
assert.ok(projects.find(item => item.title === 'Kesari Select'), 'Kesari Select belongs in the project section')
assert.ok(projects.find(item => item.title === 'Email Campaign Platform'), 'Email campaign project missing')
assert.ok(projects.find(item => item.title === 'Smart Print'), 'Smart Print project missing')
const homepage = read('src/App.jsx')
assert.ok(!homepage.includes('<Impact />'), 'KPI dashboard section must not be on homepage')
assert.ok(homepage.includes('<Hero />') && homepage.includes('<About />') && homepage.includes('<Projects />'), 'Personal portfolio sections missing')
const hero = read('src/components/Hero.jsx')
assert.ok(hero.includes('Madin') && hero.includes('Bloch'), 'Hero must introduce the developer')
assert.ok(!hero.includes('10000') && !hero.includes('pipeline'), 'No platform dashboard in the hero')
const src = [hero, read('src/components/Projects.jsx'), read('src/components/Experience.jsx'), read('src/data/projects.json')].join('\n')
assert.ok(!/10K\+\s+(daily|per day|\/day)\s+inquiries/i.test(src), 'Incorrect daily inquiry claim')
assert.ok(read('src/components/Projects.jsx').includes('id="projects"'), 'Projects anchor missing')
assert.ok(read('src/components/Media.jsx').includes('id="moments"'), 'Moments anchor missing')
const resume = readFileSync('public/Madin_Bloch_Resume.pdf')
assert.equal(resume.subarray(0, 5).toString(), '%PDF-', 'Resume download must be an actual PDF')
assert.ok(existsSync('public/sitemap.xml'), 'Sitemap missing')
console.log('Portfolio content validation passed')
