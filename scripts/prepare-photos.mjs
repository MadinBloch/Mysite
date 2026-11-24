import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { ImageMagick, initializeImageMagick, MagickFormat } from '@imagemagick/magick-wasm'
import { previewWidths } from '../src/photoRenditions.js'

const require = createRequire(import.meta.url)
await initializeImageMagick(readFileSync(require.resolve('@imagemagick/magick-wasm/magick.wasm')))

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const reviewed = join(publicDir, 'photos/boarding')
const output = join(publicDir, 'photos/renditions')
mkdirSync(output, { recursive: true })

function writeSizes(source, name, widths, quality = 68) {
  const sourceBytes = readFileSync(source)
  ImageMagick.read(sourceBytes, image => {
    for (const width of widths(image.width)) {
      if (width > image.width) throw new Error('Refusing to upscale ' + name)
      image.clone(copy => {
        if (width !== image.width) copy.resize(width, 0)
        copy.strip()
        copy.quality = width === 640 ? 52 : quality
        copy.write(MagickFormat.WebP, bytes => {
          writeFileSync(join(output, name + '-' + width + '.webp'), bytes)
        })
      })
    }
  })
}

// Start with the reviewed compositions, including the classroom crops that omit location overlays.
for (const filename of readdirSync(reviewed)) {
  if (!filename.endsWith('.webp') || filename.endsWith('-sm.webp') || filename === 'workshop-certificate.webp') continue
  writeSizes(join(reviewed, filename), filename.slice(0, -5), previewWidths)
}

// The group portrait is a 16:9 photograph. Preserve everyone in the frame at every size.
writeSizes(join(publicDir, 'workshop/certificate.jpg'), 'workshop-certificate', width => {
  if (width !== 1280) throw new Error('Review the workshop group source and its declared dimensions')
  return [...previewWidths(width), width]
}, 76)
writeSizes(join(publicDir, 'photos/madin-portrait.webp'), 'madin-portrait', () => [384, 520], 76)

for (const [label, source, rendition] of [
  ['Workshop group, full frame', 'workshop/certificate.jpg', 'workshop-certificate-1280.webp'],
  ['Laravel meetup, 360px card', 'photos/boarding/laravel-group-sm.webp', 'laravel-group-360.webp'],
  ['Laravel meetup, 560px card', 'photos/boarding/laravel-group.webp', 'laravel-group-560.webp'],
  ['Laravel meetup, 640px card', 'photos/boarding/laravel-group.webp', 'laravel-group-640.webp'],
  ['Portrait, 384px', 'photos/madin-portrait.webp', 'madin-portrait-384.webp'],
  ['Portrait, 520px', 'photos/madin-portrait.webp', 'madin-portrait-520.webp'],
]) {
  const previous = statSync(join(publicDir, source)).size
  const current = statSync(join(output, rendition)).size
  console.log(label + ': ' + previous + ' -> ' + current + ' bytes')
}
