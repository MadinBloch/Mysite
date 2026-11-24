import { readFileSync, writeFileSync } from 'node:fs'
const report = JSON.parse(readFileSync(process.argv[2], 'utf8'))
if (report.runtimeError) throw new Error(report.runtimeError.message)
console.log('Lighthouse ' + report.lighthouseVersion + ', ' + report.fetchTime + ', ' + report.finalDisplayedUrl)
for (const [name, category] of Object.entries(report.categories)) console.log(name + ': ' + Math.round(category.score * 100))
for (const key of ['first-contentful-paint','speed-index','total-blocking-time','largest-contentful-paint','cumulative-layout-shift','lcp-discovery-insight','image-delivery-insight','render-blocking-insight','network-dependency-tree-insight','agentic-browsing-ai-catalog']) {
  const audit = report.audits[key]
  if (!audit) continue
  console.log(key + ': ' + (audit.displayValue || audit.scoreDisplayMode) + ' (score ' + audit.score + ')')
}

const items = report.audits['network-dependency-tree-insight']?.details?.items || []
for (const item of items) {
  const tree = item.value || item
  if (tree.longestChain) {
    console.log('Longest critical request chain: ' + tree.longestChain.duration + ' ms')
    function printLongest(nodes) {
      for (const node of Object.values(nodes || {})) {
        if (node.isLongest) console.log('  ' + node.url + ' at ' + node.navStartToEndTime + ' ms')
        printLongest(node.children)
      }
    }
    printLongest(tree.chains)
  }
}
const imageItems = report.audits['image-delivery-insight']?.details?.items || []
for (const item of imageItems) if (item.url) console.log('Image opportunity: ' + item.url + ' (' + item.wastedBytes + ' bytes)')
for (const { id } of report.categories.accessibility?.auditRefs || []) {
  const audit = report.audits[id]
  if (audit?.score !== 0) continue
  console.log('Accessibility check: ' + audit.title)
  for (const item of (audit.details?.items || []).slice(0, 6)) console.log('  ' + (item.node?.selector || item.node?.snippet || ''))
}
const finalImage = report.audits['final-screenshot']?.details?.data
if (finalImage?.startsWith('data:image/jpeg;base64,')) {
  writeFileSync(process.argv[2].replace(/\.json$/, '.jpg'), Buffer.from(finalImage.split(',')[1], 'base64'))
}
