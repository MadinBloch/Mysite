import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import { profile } from '../src/data/profile.js'
import react from '@vitejs/plugin-react'

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const dist = resolve('dist')
const templatePath = join(dist, 'index.html')
const serverDir = await mkdtemp(resolve('.prerender-'))

function head(meta, image) {
  const e = escape
  const tags = [
    '<title>' + e(meta.title) + '</title>',
    '<meta name="description" content="' + e(meta.description) + '">',
    '<meta name="robots" content="' + e(meta.robots) + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:title" content="' + e(meta.title) + '">',
    '<meta property="og:description" content="' + e(meta.ogDescription) + '">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="' + e(meta.twitterTitle) + '">',
    '<meta name="twitter:description" content="' + e(meta.twitterDescription) + '">',
    '<meta property="og:image" content="https://www.madinbloch.online/photos/madin-portrait.webp">',
    '<meta property="og:image:alt" content="Madin Bloch, Laravel backend developer in Ahmedabad">',
    '<meta name="twitter:image" content="https://www.madinbloch.online/photos/madin-portrait.webp">',
  ]
  if (meta.url) tags.push('<link rel="canonical" href="' + e(meta.url) + '">', '<meta property="og:url" content="' + e(meta.url) + '">')
  if (image) tags.unshift('<link rel="preload" as="image" type="image/webp" fetchpriority="high" href="' + e(image.src) + '" imagesrcset="' + e(image.srcSet) + '" imagesizes="' + e(image.sizes) + '">')
  for (const style of ['normal', 'italic']) tags.push('<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/instrument-serif-' + style + '.woff2">')
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': 'https://www.madinbloch.online/#person',
        name: 'Madin Bloch', url: 'https://www.madinbloch.online/',
        jobTitle: 'Laravel Backend Developer',
        image: 'https://www.madinbloch.online/photos/madin-portrait.webp',
        address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressCountry: 'IN' },
        sameAs: [profile.github, profile.linkedin],
      },
      { '@type': 'WebSite', '@id': 'https://www.madinbloch.online/#website',
        url: 'https://www.madinbloch.online/', name: 'Madin Bloch', inLanguage: 'en-IN' },
      ...(meta.url ? [{ '@type': 'WebPage', '@id': meta.url + '#webpage', url: meta.url,
        name: meta.title, description: meta.description,
        isPartOf: { '@id': 'https://www.madinbloch.online/#website' },
        about: { '@id': 'https://www.madinbloch.online/#person' },
        ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.madinbloch.online' + image.src, width: 720, height: 720 } } : {}) }] : []),
    ],
  }
  tags.push('<script id="page-structured-data" type="application/ld+json">' + JSON.stringify(graph).replace(/</g, '\\u003c') + '</script>')
  return tags.join('\n    ')
}

try {
  await build({
    configFile: false, plugins: [react()], publicDir: false, logLevel: 'warn',
    ssr: { noExternal: true, external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'] },
    build: {
      ssr: resolve('src/prerender.jsx'), outDir: serverDir, copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: 'render.mjs', inlineDynamicImports: true } },
    },
  })
  const { pagePaths, renderPage, portrait } = await import(pathToFileURL(join(serverDir, 'render.mjs')).href)
  let template = await readFile(templatePath, 'utf8')
  const styles = [...template.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*>/g)]
  if (!styles.length || !template.includes('<!-- page-head:start -->') || !template.includes('<div id="root"></div>')) {
    throw new Error('Cannot locate the Vite stylesheet, page head or React root in the built template.')
  }
  // These small styles are shared by every route. Inline once in the document so first paint
  // and font discovery do not wait for another network round trip.
  for (const [tag] of styles) {
    const href = tag.match(/\bhref="(\/assets\/[^"]+\.css)"/)?.[1]
    if (!href) throw new Error('Unexpected stylesheet: ' + tag)
    const css = await readFile(join(dist, href.slice(1)), 'utf8')
    template = template.replace(tag, () => '<style>' + css.replace(/<\/style/gi, '<\\/style') + '</style>')
  }

  for (const path of [...pagePaths, '/404']) {
    const { body, meta } = renderPage(path)
    const html = template
      .replace(/<!-- page-head:start -->[\s\S]*?<!-- page-head:end -->/, () => head(meta, path === '/' ? portrait : null))
      .replace('<div id="root"></div>', () => '<div id="root" data-page="' + escape(path) + '">' + body + '</div>')
    const destination = path === '/404' ? join(dist, '404.html') : join(dist, path.slice(1), 'index.html')
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, html)
  }

  // Keep search discovery in sync with every route generated above.
  const sitemapUrls = pagePaths.map((path) => '  <url><loc>https://www.madinbloch.online' + escape(path) + '</loc></url>')
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls,
    '</urlset>',
    '',
  ].join('\\n')
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
  console.log('Rendered ' + pagePaths.length + ' portfolio pages, sitemap and the 404 page.')
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
