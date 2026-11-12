import { existsSync, readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const projects = JSON.parse(readFileSync('src/data/projects.json', 'utf8'))
const ids = new Set(projects.map(p => p.id))
assert.equal(ids.size, projects.length, 'Project IDs must be unique')
const { CASE_STUDIES } = await import('../src/data/caseStudies.js')
for (const project of projects) {
  if (project.caseStudySlug) assert.ok(CASE_STUDIES[project.caseStudySlug], 'Missing case study: ' + project.caseStudySlug)
}
const resume = readFileSync('public/Madin_Bloch_Resume.pdf')
assert.equal(resume.subarray(0, 5).toString(), '%PDF-', 'Resume download must contain PDF bytes')
assert.ok(existsSync('public/sitemap.xml'))
const html = readFileSync('index.html', 'utf8')
assert.ok(html.includes('Backend Developer'))
assert.ok(!html.includes('Senior Laravel Developer'))
console.log('Portfolio content checks passed')
