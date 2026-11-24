import blogs from './data/blogs.json'
import projects from './data/projects.json'
import { CASE_STUDIES } from './data/caseStudies'

export const origin = 'https://www.madinbloch.online'
const homeDescription = 'Meet Madin Bloch, a Laravel backend developer in Ahmedabad. Explore his work on Kesari Select, ERP integrations and AWS deployments, and download his resume.'
const pages = {
  '/': ['Madin Bloch | Laravel Backend Developer', homeDescription],
  '/projects': ['Selected work | Madin Bloch', 'Explore Madin Bloch’s engineering work, including Kesari Select, the Email Campaign Platform and Smart Print.'],
  '/about': ['Profile and experience | Madin Bloch', 'Madin’s work at Magecurious and Shine Infosoft, his hackathon experience and his Git and Docker workshop.'],
  '/gallery': ['Photo archive | Madin Bloch', 'Photographs from the PDEU hackathon, university workshops and Laravel meetups.'],
  '/blogs': ['Writing | Madin Bloch', 'Madin’s notes on Laravel, databases, queues and releasing software on AWS.'],
}

for (const project of projects) {
  const study = CASE_STUDIES[project.caseStudySlug]
  if (study) pages['/projects/' + project.caseStudySlug] = [project.title + ' | Madin Bloch', study.subtitle]
}
for (const post of blogs) pages['/blog/' + post.slug] = [post.title + ' | Madin Bloch', post.preview]
export const pagePaths = Object.keys(pages)

export function getPageMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const record = Object.hasOwn(pages, path) ? pages[path] : undefined
  const [title, description] = record || ['Page not found | Madin Bloch', 'This page could not be found. Browse Madin Bloch’s portfolio.']
  return {
    title, description, url: record ? origin + path : null, robots: record ? 'index, follow' : 'noindex, follow',
    ogDescription: path === '/' ? 'Explore Madin’s Laravel and ERP work for Kesari Select, production releases on AWS, and the stories behind his projects.' : description,
    twitterTitle: path === '/' ? 'Madin Bloch | Backend Developer' : title,
    twitterDescription: path === '/' ? 'Laravel projects, engineering experience and more.' : description,
    image: origin + '/photos/madin-portrait.webp',
    imageAlt: 'Madin Bloch, Laravel backend developer in Ahmedabad',
  }
}

function structuredData(meta) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': origin + '/#person', name: 'Madin Bloch', url: origin + '/',
        jobTitle: 'Laravel Backend Developer', image: origin + '/photos/madin-portrait.webp',
        address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressCountry: 'IN' },
        sameAs: ['https://github.com/MadinBloch', 'https://www.linkedin.com/in/madin-bloch/'] },
      { '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: 'Madin Bloch', inLanguage: 'en-IN' },
      ...(meta.url ? [{ '@type': 'WebPage', '@id': meta.url + '#webpage', url: meta.url,
        name: meta.title, description: meta.description, isPartOf: { '@id': origin + '/#website' },
        about: { '@id': origin + '/#person' } }] : []),
    ],
  }
}

export function applyPageMeta(meta) {
  document.title = meta.title
  const tags = [
    ['name', 'robots', meta.robots], ['name', 'description', meta.description],
    ['property', 'og:title', meta.title], ['property', 'og:description', meta.ogDescription], ['property', 'og:url', meta.url],
    ['name', 'twitter:title', meta.twitterTitle], ['name', 'twitter:description', meta.twitterDescription],
    ['property', 'og:image', meta.image], ['property', 'og:image:alt', meta.imageAlt],
    ['name', 'twitter:image', meta.image],
  ]
  for (const [key, name, content] of tags) {
    let tag = document.head.querySelector('meta[' + key + '="' + name + '"]')
    if (content === null) { tag?.remove(); continue }
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute(key, name); document.head.append(tag) }
    tag.content = content
  }
  let jsonLd = document.head.querySelector('#page-structured-data')
  if (!jsonLd) {
    jsonLd = document.createElement('script')
    jsonLd.id = 'page-structured-data'
    jsonLd.type = 'application/ld+json'
    document.head.append(jsonLd)
  }
  jsonLd.textContent = JSON.stringify(structuredData(meta))

  let link = document.head.querySelector('link[rel="canonical"]')
  if (!meta.url) { link?.remove(); return }
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.append(link) }
  link.href = meta.url
}
