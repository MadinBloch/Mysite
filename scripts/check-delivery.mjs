import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const read = path => readFileSync(join('dist', path), 'utf8')
const urls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]))
const robots = read('robots.txt')
assert.ok(robots.includes('Sitemap: https://www.madinbloch.online/sitemap.xml'), 'robots.txt must reference the generated sitemap')
assert.ok(urls.length >= 10, 'Expected the sitemap to include all portfolio content routes')
assert.equal(new Set(urls.map(url => url.href)).size, urls.length, 'Sitemap URLs must be unique')
const titles = new Set()
for (const url of urls) {
  const path = url.pathname
  const html = read(join(path.slice(1), 'index.html'))
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  assert.ok(title && !titles.has(title), 'Each indexable route needs a distinct title: ' + path)
  titles.add(title)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Expected one initial h1 on ' + path)
  assert.ok(html.includes('data-page="' + path + '"') && html.includes('<link rel="canonical" href="' + url.href + '"'), path)
  assert.doesNotMatch(html, /<link\b[^>]*rel="stylesheet"/, 'Unexpected render-blocking CSS request: ' + path)
  assert.match(html, /<style>[\s\S]+?<\/style>/)
  if (path !== '/') assert.doesNotMatch(html, /<link\b[^>]*as="image"/, 'Home portrait preloaded on ' + path)
}

const home = read('index.html')
const image = home.match(/<img\b[^>]*alt="Madin Bloch"[^>]*>/i)?.[0]
const preload = home.match(/<link\b[^>]*as="image"[^>]*>/i)?.[0]
assert.ok(image && preload, 'The portrait and its preload must appear in initial HTML')
function attr(tag, name) {
  return tag.match(new RegExp('\\s' + name + '="([^"]*)"', 'i'))?.[1]
}
assert.equal(attr(image, 'fetchpriority'), 'high')
assert.equal(attr(image, 'loading'), 'eager')
assert.equal(attr(image, 'src'), attr(preload, 'href'))
assert.ok(attr(image, 'srcset') && attr(image, 'sizes'))
assert.equal(attr(image, 'srcset'), attr(preload, 'imagesrcset'))
assert.equal(attr(image, 'sizes'), attr(preload, 'imagesizes'))
for (const match of home.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/gi)) {
  for (const part of match[1].split(', ')) {
    const asset = part.split(' ')[0]
    assert.ok(statSync(join('dist', asset)).size > 0, 'Missing image rendition: ' + asset)
  }
}
const webp = readFileSync('dist/photos/renditions/workshop-certificate-1280.webp')
assert.equal(webp.toString('ascii', 8, 12), 'WEBP')
assert.match(home, /<img\b[^>]*width="1280"[^>]*height="720"[^>]*alt="Madin with the university workshop hosts"/)
const script = home.match(/<script\b[^>]*src="(\/assets\/[^"]+\.js)"/)?.[1]
assert.ok(script)
const entry = readFileSync(join('dist', script))
console.log('Verified initial HTML, canonical tags, responsive portraits and full workshop frame on ' + urls.length + ' routes.')
console.log('Initial JS gzip: ' + gzipSync(entry).length + ' bytes; home HTML including styles, gzip: ' + gzipSync(home).length + ' bytes.')
