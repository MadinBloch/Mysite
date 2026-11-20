import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { CASE_STUDIES } from '../src/data/caseStudies.js'
import { kesariPageLoad, kesariStats } from '../src/data/siteStats.js'
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
const origin = 'https://madin-bloch.vercel.app'
const sitemap = read('public/sitemap.xml')
const sitemapIndex = read('public/sitemap_index.xml')
const sitemapLocations = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)
const sitemapUrls = sitemapLocations(sitemap)
const robots = read('public/robots.txt')
const llms = read('public/llms.txt')

assert.ok(robots.split(/\r?\n/).includes('Sitemap: ' + origin + '/sitemap_index.xml'), 'Robots must advertise the sitemap index')
assert.ok(sitemapIndex.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'))
assert.deepEqual(sitemapLocations(sitemapIndex), [origin + '/sitemap.xml'])
assert.match(llms, /^# Madin Bloch\r?\n\r?\n> /)
const profileLinks = [...llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url)
assert.deepEqual(new Set(profileLinks), new Set([...sitemapUrls, origin + '/Madin_Bloch_Resume.pdf']), 'llms.txt links must match portfolio pages and the public resume')
assert.equal(sitemapUrls.length, new Set(sitemapUrls).size, 'Sitemap URLs must be unique')
assert.ok(sitemapUrls.includes(origin + '/'), 'Homepage missing from sitemap')
for (const slug of Object.keys(CASE_STUDIES)) {
  assert.ok(sitemapUrls.includes(origin + '/projects/' + slug), 'Case study missing from sitemap: ' + slug)
}

assert.match(app, /<Hero \/>[\s\S]*<WorkHighlights \/>[\s\S]*<PortfolioStory \/>[\s\S]*<Blogs \/>/, 'Introduce Madin, show selected work, then open the personal chapters')
assert.ok(!app.includes('<Impact />'), 'Figures belong inside the project story')
assert.match(story, /<Hackathon \/>[\s\S]*<ProductionChapter \/>[\s\S]*<Workshop \/>/, 'Check the order of the chapters')
for (const [page, id] of [[hackathon, 'hackathon'], [story, 'production'], [workshop, 'workshop']]) {
  assert.ok(page.includes('id="' + id + '"') && story.includes("id: '" + id + "'"), 'Missing chapter anchor: ' + id)
}
for (const path of ['/projects', '/about', '/gallery', '/blogs']) {
  assert.ok(app.includes('path="' + path + '"'), 'Missing page: ' + path)
  assert.ok(sitemapUrls.includes(origin + path), 'Page missing from sitemap: ' + path)
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

const highlights = read('src/components/WorkHighlights.jsx')
for (const project of projects.filter(project => project.caseStudySlug)) {
  assert.ok(highlights.includes("slug: '" + project.caseStudySlug + "'"), 'Missing featured case study: ' + project.title)
}
assert.ok(kesariPageLoad.before > kesariPageLoad.after && kesariPageLoad.after > 0)
const resumeSource = read('scripts/resume.html')
for (const phrase of ['200+ daily inquiries', '30K+ customer records', '10K+ visitors']) {
  assert.ok(resumeSource.includes(phrase), 'Portfolio resume should match website: ' + phrase)
}

const resume = readFileSync('public/Madin_Bloch_Resume.pdf')
assert.equal(resume.subarray(0, 5).toString(), '%PDF-', 'Resume download must be an actual PDF')

console.log('Portfolio content validation passed')
