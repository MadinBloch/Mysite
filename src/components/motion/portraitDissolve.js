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

export function mountDissolve(stage, image, canvas) {
  const ctx = canvas.getContext('2d')
  if (!ctx || !image.naturalWidth) return null
  let width, height, top, left, imageTop, imageWidth, imageHeight, distance, columns, samples
  let frame = 0
  let lastProgress = -1
  let introStart = 0
  let replayScroll = 0
  const write = (key, value) => stage.style.setProperty(key, value)
  const palette = Array.from({ length: 12 }, (_, i) =>
    'rgb(' + [Math.round(148 + i * 7.6), Math.round(146 + i * 7.5), Math.round(142 + i * 7.3)].join(' ') + ')')
  const amber = Array.from({ length: 12 }, (_, i) =>
    'rgb(' + [Math.round(166 + i * 7.4), Math.round(91 + i * 7.1), Math.round(37 + i * 4.8)].join(' ') + ')')

  function draw(now) {
    frame = 0
    if (document.hidden) return
    const scrollProgress = clamp((window.scrollY - top) / distance)
    let p = scrollProgress
    if (introStart) {
      const elapsed = (now - introStart) / 1700
      if (elapsed >= 1 || Math.abs(window.scrollY - replayScroll) > 4) introStart = 0
      else {
        p += (1 - p) * .72 * Math.pow(Math.sin(Math.PI * clamp(elapsed)), 2)
        requestDraw()
      }
    }
    const nav = document.querySelector('.main-nav')
    const title = stage.querySelector('#home-title')
    const navBottom = nav?.getBoundingClientRect().bottom ?? 72
    const titleGap = title ? title.getBoundingClientRect().top - navBottom : height * .36
    const arrival = clamp(scrollProgress + Math.max(0, titleGap) / distance)
    if (Math.abs(p - lastProgress) < .0004) return
    lastProgress = p
    ctx.clearRect(0, 0, width, height)
    // Let the page carry the title toward the sticky nav, while the portrait
    // lags behind like a pinned backdrop. Keep the reveal tied to scroll so it
    // stays predictable on trackpads, touch screens, and keyboard scrolling.
    const portraitDrift = Math.min(distance * .46, height * .48) * scrollProgress
    write('--portrait-y', portraitDrift.toFixed(2) + 'px')
    if (!samples) samples = samplePortrait(image, columns)
    if (!samples) return
    write('--type-shift', (-Math.min(92, height * .13) * smooth(arrival - .4, arrival + .48, p)).toFixed(2) + 'px')
    write('--name-spacing', (12 * smooth(arrival - .12, arrival + .25, p)).toFixed(2) + 'px')
    write('--name-alpha', (1 - smooth(arrival + .02, arrival + .2, p)).toFixed(3))
    write('--portrait-opacity', (.26 * (1 - smooth(arrival + .06, arrival + .4, p) * .86)).toFixed(3))
    const spread = smooth(arrival - .02, arrival + .5, p)
    const envelope = 1 - smooth(arrival + .35, arrival + .62, p)
    const dot = Math.max(1.25, Math.min(2.55, imageWidth / columns * .44))
    const waveCenter = height * .28 + scrollProgress * distance * .65
    const strength = Math.min(width * .12, height * .13)
    ctx.globalAlpha = envelope * .9
    samples.forEach((bucket, level) => {
      for (const { u, v, noise } of bucket) {
        ctx.fillStyle = u > .57 && v < .54 && noise > .34 ? amber[level] : palette[level]
        const drift = smooth(arrival + .08 + .13 * (1 - v), arrival + .72, p)
        const targetX = (.5 + (u - .50) * 2.55 + (noise - .5) * .062) * width
        const wave = Math.sin(10.5 * u + 1.9 * v + 5 * p) + .38 * Math.sin(18 * u - 3.3 * v - 2.5 * p)
        const targetY = waveCenter + strength * wave + (v - .42) * height * .24 + (noise - .5) * height * .045
        const x = mix(left + u * imageWidth, targetX, drift)
        const y = mix(imageTop + portraitDrift + v * imageHeight, targetY, spread)
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
    const nextColumns = width < 650 ? 110 : 164
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
  function replay() {
    introStart = performance.now()
    replayScroll = window.scrollY
    requestDraw()
  }
  function dispose() {
    resize?.disconnect()
    window.removeEventListener('resize', measure)
    window.removeEventListener('scroll', requestDraw)
    document.removeEventListener('visibilitychange', requestDraw)
    cancelAnimationFrame(frame)
    canvas.width = canvas.height = 1
    for (const key of ['--portrait-opacity', '--portrait-y', '--type-shift', '--name-spacing', '--name-alpha']) stage.style.removeProperty(key)
  }
  return { replay, dispose }
}
