import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { CASE_STUDIES } from '../src/data/caseStudies.js'
import { kesariStats } from '../src/data/siteStats.js'
import { certificatePhotos, hackathonPhotos, meetupPhotos, workshopPhotos } from '../src/data/photos.js'

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

const app = read('src/App.jsx')
const story = read('src/components/PortfolioStory.jsx')
const hackathon = read('src/components/Hackathon.jsx')
const workshop = read('src/components/Workshop.jsx')
const hero = read('src/components/Hero.jsx')
const gallery = read('src/pages/GalleryPage.jsx')
const sitemap = read('public/sitemap.xml')

assert.match(app, /<Hero \/>[\s\S]*<PortfolioStory \/>[\s\S]*<Blogs \/>/, 'Home should open with the story and end with writing')
assert.ok(!app.includes('<Impact />'), 'Figures belong inside the project story')
assert.match(story, /<Hackathon \/>[\s\S]*<ProductionChapter \/>[\s\S]*<Workshop \/>/, 'Check the order of the chapters')
for (const [page, id] of [[hackathon, 'hackathon'], [story, 'production'], [workshop, 'workshop']]) {
  assert.ok(page.includes('id="' + id + '"') && story.includes("id: '" + id + "'"), 'Missing chapter anchor: ' + id)
}
for (const path of ['/projects', '/about', '/gallery', '/blogs']) {
  assert.ok(app.includes('path="' + path + '"'), 'Missing page: ' + path)
  assert.ok(sitemap.includes('madin-bloch.vercel.app' + path + '</loc>'), 'Page missing from sitemap: ' + path)
}
for (const section of ['About', 'Experience', 'Skills', 'Projects']) {
  assert.ok(app.includes('<' + section + ' />'), 'Portfolio section missing: ' + section)
}
assert.ok(hero.includes('Madin Bloch') && hero.includes('/profile-portrait.png'), 'The cover should introduce Madin with his portrait')
assert.ok(existsSync('public/profile-portrait.png') && existsSync('public/photos/madin-portrait.webp'), 'Formal portrait missing')
assert.ok(!hero.includes('10000') && !hero.includes('pipeline'), 'No platform dashboard in the hero')
assert.deepEqual(kesariStats.map(({ count, label }) => [count, label]), [
  [200, 'Daily inquiries'], [30000, 'Customer records'], [10000, 'Website visitors'],
], 'Keep the three Kesari measures distinct')
assert.ok(!/10K\+\s+(daily|per day|\/day)\s+inquiries/i.test([hero, story, read('src/data/projects.json')].join('\n')), 'Incorrect daily inquiry claim')
assert.ok(read('src/components/Projects.jsx').includes('id="projects"'), 'Projects anchor missing')
for (const [id, photos] of Object.entries({ hackathon: hackathonPhotos, workshop: workshopPhotos, certificates: certificatePhotos, meetups: meetupPhotos })) {
  assert.ok(gallery.includes("id: '" + id + "'"), 'Album missing: ' + id)
  for (const { src, printSrc } of photos) {
    assert.ok(existsSync('public' + src), 'Photo missing: ' + src)
    if (printSrc) assert.ok(existsSync('public' + printSrc), 'Reading preview missing: ' + printSrc)
  }
}
assert.ok(story.includes('internal TAP walkthrough'), 'Credit the internal training in the TAP chapter')

const resume = readFileSync('public/Madin_Bloch_Resume.pdf')
assert.equal(resume.subarray(0, 5).toString(), '%PDF-', 'Resume download must be an actual PDF')
assert.ok(existsSync('public/sitemap.xml'), 'Sitemap missing')

console.log('Portfolio content validation passed')
