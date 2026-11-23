// Smoke-test the public preview serving this pull request, including the HTTP response on deep links.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'

const base = 'https://beta.madinbloch.online'
const get = path => fetch(base + path, { signal: AbortSignal.timeout(12000), headers: { 'cache-control': 'no-cache' } })
const built = await readFile('dist/index.html', 'utf8')
const entry = built.match(/<script\b[^>]*src="(\/assets\/[^"]+\.js)"/)[1]
let lastError
for (let attempt = 0; attempt < 45; attempt++) {
  try {
    const home = await get('/?build=' + encodeURIComponent(entry))
    assert.equal(home.status, 200)
    const html = await home.text()
    assert.ok(html.includes(entry), 'The beta alias still serves a different build.')
    assert.match(html, /<img\b[^>]*alt="Madin Bloch"[^>]*fetchpriority="high"/i)
    lastError = undefined
    break
  } catch (error) {
    lastError = error
    if (attempt < 44) await delay(6000)
  }
}
if (lastError) throw lastError

for (const path of ['/ai-catalog.json', '/.well-known/ai-catalog.json', '/.well-known/ard.json']) {
  const response = await get(path)
  assert.equal(response.status, 200, path)
  assert.match(response.headers.get('content-type') || '', /application\/(?:[\w.+-]+\+)?json/i, path)
  assert.ok((await response.json()).entries.length, path)
}
for (const path of ['/projects/kesari-select-backend', '/gallery', '/blog/shipping-laravel-apps-on-ec2']) {
  const response = await get(path)
  const html = await response.text()
  assert.equal(response.status, 200, path)
  assert.ok(html.includes('<link rel="canonical" href="https://www.madinbloch.online' + path + '"'), path)
  assert.ok(html.includes('data-page="' + path + '"'), path)
}
for (const path of ['/this-page-does-not-exist', '/.well-known/this-file-does-not-exist.json']) {
  assert.equal((await get(path)).status, 404, path)
}
const photo = await get('/photos/renditions/workshop-certificate-1280.webp')
assert.equal(photo.status, 200)
assert.match(photo.headers.get('content-type') || '', /image\/webp/)
assert.equal(Buffer.from(await photo.arrayBuffer()).toString('ascii', 8, 12), 'WEBP')
console.log('Public beta verified: this build, responsive cover, full workshop photo, three JSON manifests, three deep links and genuine 404 responses.')
