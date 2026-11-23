// The portrait and the moving points share one image, one silhouette and one scroll position.
const clamp = value => Math.min(1, Math.max(0, value))
const mix = (from, to, t) => from + (to - from) * t

function smooth(start, end, value) {
  const t = clamp((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}

function samplePortrait(image, columns) {
  const points = [...getComputedStyle(image).clipPath.matchAll(/([\d.]+)%\s+([\d.]+)%/g)]
  if (points.length < 3) return null
  const sampler = document.createElement('canvas')
  const rows = Math.round(columns * image.naturalHeight / image.naturalWidth)
  sampler.width = columns
  sampler.height = rows
  const ctx = sampler.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  ctx.beginPath()
  points.forEach(([, x, y], index) => {
    const px = Number(x) * columns / 100
    const py = Number(y) * rows / 100
    if (index) ctx.lineTo(px, py)
    else ctx.moveTo(px, py)
  })
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(image, 0, 0, columns, rows)
  const pixels = ctx.getImageData(0, 0, columns, rows).data
  const buckets = Array.from({ length: 12 }, () => [])
  for (let row = 0; row < rows; row++) {
    const v = (row + .5) / rows
    for (let col = 0; col < columns; col++) {
      const i = 4 * (row * columns + col)
      if (pixels[i + 3] < 155 || v > .9) continue
      const u = (col + .5) / columns
      const luma = (.213 * pixels[i] + .715 * pixels[i + 1] + .072 * pixels[i + 2]) / 255
      const light = (.14 + .86 * luma) * (1 - smooth(.42, .92, v))
      if (light < .04) continue
      const noise = Math.sin(col * 23.41 + row * 17.71) * 1834.64
      buckets[Math.min(11, Math.floor(light * 12))].push({ u, v, noise: noise - Math.floor(noise) })
    }
  }
  return buckets
}

let introduced = false

export function mountDissolve(stage, image, canvas) {
  const ctx = canvas.getContext('2d')
  if (!ctx || !image.naturalWidth) return () => {}
  let width, height, top, left, imageTop, imageWidth, imageHeight, distance, columns, samples
  let frame = 0
  let lastProgress = -1
  let introStart = 0
  let introTimer = 0
  const write = (key, value) => stage.style.setProperty(key, value)
  const palette = Array.from({ length: 12 }, (_, i) =>
    'rgb(' + [Math.round(67 + i * 16.6), Math.round(46 + i * 14), Math.round(34 + i * 11)].join(' ') + ')')

  function draw(now) {
    frame = 0
    if (document.hidden) return
    const scrollProgress = clamp((window.scrollY - top) / distance)
    let p = scrollProgress
    if (introStart) {
      const elapsed = (now - introStart) / 1700
      if (elapsed >= 1 || window.scrollY > 6) introStart = 0
      else {
        // One silent opening pass. Scroll immediately takes over, including on touch screens.
        p = .62 * Math.pow(Math.sin(Math.PI * clamp(elapsed)), 2)
        requestDraw()
      }
    }
    if (Math.abs(p - lastProgress) < .0004) return
    lastProgress = p
    ctx.clearRect(0, 0, width, height)
    write('--type-shift', (-38 * smooth(.04, .86, p)).toFixed(2) + 'px')
    write('--name-spacing', (16 * smooth(.04, .82, p)).toFixed(2) + 'px')
    write('--name-alpha', (1 - .75 * smooth(.28, .94, p)).toFixed(3))
    if (p < .008) {
      write('--portrait-opacity', 1)
      return
    }
    if (!samples) samples = samplePortrait(image, columns)
    if (!samples) return
    write('--portrait-opacity', (1 - smooth(.015, .39, p)).toFixed(3))
    if (p >= .998) return
    const spread = smooth(.12, .91, p)
    const envelope = smooth(.012, .19, p) * (1 - smooth(.63, 1, p))
    const dot = Math.max(1.1, Math.min(3.4, imageWidth / columns * .64))
    const waveCenter = height * .24 + scrollProgress * distance * .65
    const strength = Math.min(width * .13, height * .14)
    ctx.globalAlpha = envelope
    samples.forEach((bucket, level) => {
      ctx.fillStyle = palette[level]
      for (const { u, v, noise } of bucket) {
        const drift = smooth(.09 + .13 * (1 - v), .9, p)
        const targetX = (.5 + (u - .50) * 2.55 + (noise - .5) * .062) * width
        const wave = Math.sin(10.5 * u + 1.9 * v + 5 * p) + .38 * Math.sin(18 * u - 3.3 * v - 2.5 * p)
        const targetY = waveCenter + strength * wave + (v - .42) * height * .24 + (noise - .5) * height * .045
        const x = mix(left + u * imageWidth, targetX, drift)
        const y = mix(imageTop + v * imageHeight, targetY, spread)
        const size = dot * (.63 + .034 * level)
        ctx.fillRect(x, y, size * (1 + .47 * spread), size)
      }
    })
    ctx.globalAlpha = 1
  }

  function requestDraw() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw)
  }

  function measure() {
    const bounds = stage.getBoundingClientRect()
    const photo = image.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    top = bounds.top + window.scrollY
    left = photo.left - bounds.left
    imageTop = photo.top - bounds.top
    imageWidth = photo.width
    imageHeight = photo.height
    distance = Math.max(250, Math.min(window.innerHeight, height) * .78)
    const nextColumns = width < 650 ? 92 : 144
    if (columns !== nextColumns) samples = undefined
    columns = nextColumns
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.max(1, Math.round(width * ratio))
    canvas.height = Math.max(1, Math.round(height * ratio))
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    lastProgress = -1
    requestDraw()
  }

  const resize = window.ResizeObserver ? new ResizeObserver(measure) : null
  resize?.observe(stage)
  resize?.observe(image)
  window.addEventListener('resize', measure)
  window.addEventListener('scroll', requestDraw, { passive: true })
  document.addEventListener('visibilitychange', requestDraw)
  measure()
  if (!introduced && window.scrollY < 6) {
    introTimer = window.setTimeout(() => {
      if (document.hidden || window.scrollY > 6) return
      introduced = true
      introStart = performance.now()
      requestDraw()
    }, 1050)
  }
  return () => {
    clearTimeout(introTimer)
    resize?.disconnect()
    window.removeEventListener('resize', measure)
    window.removeEventListener('scroll', requestDraw)
    document.removeEventListener('visibilitychange', requestDraw)
    cancelAnimationFrame(frame)
    canvas.width = canvas.height = 1
    for (const key of ['--portrait-opacity', '--type-shift', '--name-spacing', '--name-alpha']) stage.style.removeProperty(key)
  }
}
