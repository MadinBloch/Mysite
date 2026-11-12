import { existsSync, readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const projects = JSON.parse(readFileSync('src/data/projects.json', 'utf8'))
const ids = new Set(projects.map(p => p.id))
assert.equal(ids.size, projects.length, 'Project IDs must be unique')
const { CASE_STUDIES } = await import('../src/data/caseStudies.js')
for (const project of projects) {
  if (project.caseStudySlug) assert.ok(CASE_STUDIES[project.caseStudySlug], 'Missing case study: ' + project.caseStudySlug)
}
assert.ok(CASE_STUDIES['smart-print-operations'], 'Smart Print case study must exist')
const kesari = projects.find(p => p.id === 4)
assert.ok(kesari?.metrics?.length >= 3, 'Kesari platform scale and performance cards missing')
assert.ok(kesari.metricNote?.includes('estimates'), 'Reported metrics need attribution')
const resume = readFileSync('public/Madin_Bloch_Resume.pdf')
assert.equal(resume.subarray(0, 5).toString(), '%PDF-', 'Resume download must contain PDF bytes')
assert.ok(resume.toString('latin1').includes('Grand Finalist'), 'Resume must include Hackathon finalist achievement')
assert.ok(existsSync('public/sitemap.xml'))
assert.ok(readFileSync('public/sitemap.xml', 'utf8').includes('smart-print-operations'), 'Sitemap missing Smart Print')
const html = readFileSync('index.html', 'utf8')
assert.ok(html.includes('Backend Developer'))
assert.ok(!html.includes('Senior Laravel Developer'))
console.log('Portfolio content checks passed')
