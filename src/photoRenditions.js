// Card sizes are shared by the browser and the build-time encoder.
export function previewWidths(width) {
  return [200, 280, 360, 440, 560, 640, 800].filter(size => size < width && (size < 800 || width > 1000))
}

export function renditionUrl(file, width) {
  return '/photos/renditions/' + file + '-' + width + '.webp'
}

export function journalSources(file, width, displayWidth) {
  const options = previewWidths(width).filter(size => size <= 640)
  const limit = options.find(size => size >= displayWidth * 2) || options[options.length - 1]
  return options.filter(size => size <= limit).map(size => renditionUrl(file, size) + ' ' + size + 'w').join(', ')
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
    cardSrcSet: width <= 640 ? [...previews, src + ' ' + width + 'w'].join(', ')
      : sizes.filter(size => size <= 640).map(size => renditionUrl(file, size) + ' ' + size + 'w').join(', '),
    srcSet: [...previews, src + ' ' + width + 'w'].join(', '),
  }
}
