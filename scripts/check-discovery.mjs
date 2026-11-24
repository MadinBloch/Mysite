import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const paths = ['.well-known/ard.json', '.well-known/ai-catalog.json', 'ai-catalog.json']
const read = (path) => readFile(new URL(path, dist), 'utf8')
const manifests = await Promise.all(paths.map(async (path) => JSON.parse(await read(path))))
const [manifest] = manifests
for (const alias of manifests.slice(1)) assert.deepEqual(alias, manifest, 'Discovery aliases disagree')

const documents = new Set()
function checkCatalog(catalog) {
  assert.equal(catalog.specVersion, '1.0')
  assert.ok(Array.isArray(catalog.entries) && catalog.entries.length > 0, 'Catalog is empty')
  for (const entry of catalog.entries) {
    assert.match(entry.identifier, /^urn:air:madinbloch\.online:(?:[\w.-]+:)+[\w.-]+$/)
    assert.ok(entry.displayName && Array.isArray(entry.representativeQueries))
    assert.ok(entry.representativeQueries.length >= 2 && entry.representativeQueries.length <= 5)
    assert.ok(entry.representativeQueries.every((query) => typeof query === 'string' && query.trim()))
    assert.notEqual('url' in entry, 'data' in entry, 'Expected one resource URL or embedded document')
    if ('data' in entry) {
      assert.equal(entry.type, 'application/ai-catalog+json')
      checkCatalog(entry.data)
    } else {
      const url = new URL(entry.url)
      assert.equal(url.origin, 'https://www.madinbloch.online')
      documents.add(url.pathname)
    }
  }
}
checkCatalog(manifest)
assert.ok(documents.has('/Madin_Bloch_Resume.pdf') && documents.has('/sitemap.xml'))
for (const path of documents) {
  const data = await readFile(new URL(path.slice(1), dist))
  assert.ok(data.length > 0, path + ' is empty')
  assert.doesNotMatch(data.subarray(0, 256).toString(), /<!doctype html|<html[\s>]/i, path + ' contains HTML')
}
assert.match(await read('index.html'), /<link\b(?=[^>]*\brel=["']ard["'])(?=[^>]*\bhref=["']\/\.well-known\/ard\.json["'])[^>]*>/i)
assert.match(await read('404.html'), /noindex/i)
console.log('Discovery manifests, public document targets and the static 404 page verified.')
