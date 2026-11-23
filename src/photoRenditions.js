// Card sizes are shared by the browser and the build-time encoder.
export function previewWidths(width) {
  return [200, 360, 560, 800].filter(size => size < width && (size < 800 || width > 1000))
}

export function renditionUrl(file, width) {
  return '/photos/renditions/' + file + '-' + width + '.webp'
}

export function photoSources(file, width) {
  const sizes = previewWidths(width)
  const src = file === 'workshop-certificate'
    ? renditionUrl(file, width)
    : '/photos/boarding/' + file + '.webp'
  const previews = sizes.map(size => renditionUrl(file, size) + ' ' + size + 'w')

  return {
    src,
    small: sizes.length ? renditionUrl(file, sizes.includes(360) ? 360 : sizes[0]) : src,
    thumb: sizes.length ? renditionUrl(file, sizes[0]) : src,
    srcSet: [...previews, src + ' ' + width + 'w'].join(', '),
  }
}
