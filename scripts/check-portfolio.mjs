import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { CASE_STUDIES } from '../src/data/caseStudies.js'

const read = path => readFileSync(path, 'utf8')
const projects = JSON.parse(read('src/data/projects.json'))

assert.ok(projects.length >= 7, 'The portfolio should restore the broader project selection')
assert.equal(new Set(projects.map(project => project.id)).size, projects.length, 'Project IDs must be unique')

for (const project of projects) {
  if (project.caseStudySlug) {
    assert.ok(CASE_STUDIES[project.caseStudySlug], 'Missing case study: ' + project.caseStudySlug)
  }
}

const requiredTitles = [
  'Kesari Select',
  'Email Campaign Platform',
  'Smart Print',
  'HRM System',
  'DevCommand AI',
  'Car Web Services',
  'Book Server',
]

for (const title of requiredTitles) {
  assert.ok(projects.find(item => item.title === title), title + ' project missing')
}

const homepage = read('src/App.jsx')
assert.ok(!homepage.includes('<Impact />'), 'KPI dashboard section must not be on homepage')
assert.ok(homepage.includes('<Hero />') && homepage.includes('<About />') && homepage.includes('<Projects />'), 'Personal portfolio sections missing')
assert.ok(homepage.includes('<Workshop />'), 'University Workshop section missing')
assert.ok(homepage.includes('<Hackathon />'), 'Hackathon section missing')
assert.ok(homepage.includes('<Media />'), 'Certificates section missing')
assert.ok(homepage.includes('<Blogs />'), 'Blog preview section missing')
assert.ok(homepage.includes('<Community />'), 'Events & Meetups section missing')

const hero = read('src/components/Hero.jsx')
assert.ok(hero.includes('Madin') && hero.includes('Bloch'), 'Hero must introduce the developer')
assert.ok(hero.includes('profile-portrait.png'), 'Hero should use the formal portrait')
assert.ok(!hero.includes('10000') && !hero.includes('pipeline'), 'No platform dashboard in the hero')

const src = [hero, read('src/components/Projects.jsx'), read('src/components/Experience.jsx'), read('src/data/projects.json')].join('\n')
assert.ok(!/10K\+\s+(daily|per day|\/day)\s+inquiries/i.test(src), 'Incorrect daily inquiry claim')

assert.ok(read('src/components/Projects.jsx').includes('id="projects"'), 'Projects anchor missing')
assert.ok(read('src/components/Workshop.jsx').includes('id="workshop"'), 'Workshop anchor missing')
assert.ok(read('src/components/Hackathon.jsx').includes('id="hackathon"'), 'Hackathon anchor missing')
assert.ok(read('src/components/Media.jsx').includes('id="certificates"'), 'Certificates anchor missing')
assert.ok(existsSync('public/profile-portrait.png'), 'Formal portrait missing from public/')

const resume = readFileSync('public/Madin_Bloch_Resume.pdf')
assert.equal(resume.subarray(0, 5).toString(), '%PDF-', 'Resume download must be an actual PDF')
assert.ok(existsSync('public/sitemap.xml'), 'Sitemap missing')

console.log('Portfolio content validation passed')
