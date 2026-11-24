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
  const rim = []
  for (let row = 0; row < rows; row++) {
    const v = (row + .5) / rows
    let right = columns - 1
    while (right > 0 && pixels[4 * (row * columns + right) + 3] < 155) right--
    for (let col = 0; col < columns; col++) {
      const i = 4 * (row * columns + col)
      if (pixels[i + 3] < 155 || v > .9) continue
      const u = (col + .5) / columns
      const luma = (.213 * pixels[i] + .715 * pixels[i + 1] + .072 * pixels[i + 2]) / 255
      const light = (.14 + .86 * luma) * (1 - smooth(.42, .92, v))
      if (light < .04) continue
      const noise = Math.sin(col * 23.41 + row * 17.71) * 1834.64
      // Sample a narrow strip inside the lit edge of the hair and shoulder.
      const edge = 1 - smooth(0, columns * .034, right - col)
      if (edge > 0 && v < .66) rim.push({ u, v, strength: edge * (1 - smooth(.33, .66, v)) })
      buckets[Math.min(11, Math.floor(light * 12))].push({ u, v, noise: noise - Math.floor(noise) })
    }
  }
  return { buckets, rim }
}

export function mountDissolve(stage, image, canvas) {
  const ctx = canvas.getContext('2d')
  const columns = image.clientWidth < 650 ? 134 : 204
  const samples = ctx && samplePortrait(image, columns)
  if (!samples) return
  const { buckets, rim } = samples
  let frame = 0
  let target = 0
  let progress = 0
  let last = 0
  let width, height

  function draw(now) {
    frame = 0
    const dt = last ? Math.min(64, now - last) : 16
    last = now
    progress = mix(progress, target, 1 - Math.exp(-dt / 58))
    if (Math.abs(progress - target) < .001) progress = target
    const dissolve = smooth(.01, .68, progress)
    image.style.opacity = String(1 - dissolve)
    ctx.clearRect(0, 0, width * 2, height)
    const spread = smooth(.08, .92, progress)
    const cell = width / columns
    if (dissolve > 0 && progress < 1) {
      buckets.forEach((points, level) => {
        ctx.fillStyle = level > 4 ? '#f5e3cc' : '#c68751'
        ctx.globalAlpha = dissolve * (1 - smooth(.62, 1, progress)) * (level + 1) / 12
        for (const { u, v, noise } of points) {
          const wave = Math.sin(u * 12 + v * 2 + progress * 3)
          const x = (.5 + u + spread * ((u - .5) * 1.45 + (noise - .5) * .12)) * width
          const y = mix(v, .37 + wave * .07 + (noise - .5) * .08, spread) * height
          ctx.fillRect(x, y, cell * .57, cell * .46)
        }
      })
    }
    // The same lit pixels follow the wave as the silhouette breaks apart.
    const rimAlpha = 1 - smooth(.58, .96, progress)
    if (rimAlpha > 0) {
      ctx.fillStyle = '#ffb675'
      for (const { u, v, strength } of rim) {
        const wave = Math.sin(u * 12 + v * 2 + progress * 3)
        const x = (.5 + u + spread * (u - .5) * 1.45) * width
        const y = mix(v, .37 + wave * .07, spread) * height
        const gleam = 1 - smooth(0, .1, Math.abs(v - progress * .85 - .06))
        ctx.globalAlpha = rimAlpha * strength * (.42 + .5 * gleam)
        ctx.fillRect(x, y, cell * .82, cell * .75)
      }
    }
    ctx.globalAlpha = 1
    if (progress !== target) frame = requestAnimationFrame(draw)
    else last = 0
  }
  function scroll() {
    const bounds = stage.getBoundingClientRect()
    target = clamp((window.scrollY) / Math.max(1, bounds.height * .78))
    if (!frame && (last || progress !== target)) frame = requestAnimationFrame(draw)
  }
  function resize() {
    width = image.clientWidth
    height = image.clientHeight
    canvas.width = width * 2
    canvas.height = height
    scroll()
    if (!frame) frame = requestAnimationFrame(draw)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(image)
  window.addEventListener('scroll', scroll, { passive: true })
  resize()
  return () => {
    observer.disconnect()
    window.removeEventListener('scroll', scroll)
    cancelAnimationFrame(frame)
    image.style.removeProperty('opacity')
    canvas.width = 1
  }
}
