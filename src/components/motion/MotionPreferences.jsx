import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

const MotionPreference = createContext(null)
const preferenceKey = 'portfolio-motion'
const query = '(prefers-reduced-motion: reduce)'
let fallbackPaused

function snapshot() {
  let paused = fallbackPaused
  if (paused === undefined) {
    try { paused = window.localStorage.getItem(preferenceKey) === 'off' } catch { paused = false }
  }
  return (window.matchMedia(query).matches ? 2 : 0) | (paused ? 1 : 0)
}

function subscribe(notify) {
  const media = window.matchMedia(query)
  media.addEventListener('change', notify)
  window.addEventListener('portfolio-motion-change', notify)
  window.addEventListener('storage', notify)
  return () => {
    media.removeEventListener('change', notify)
    window.removeEventListener('portfolio-motion-change', notify)
    window.removeEventListener('storage', notify)
  }
}

function toggleMotion() {
  const next = !(snapshot() & 1)
  try {
    if (next) window.localStorage.setItem(preferenceKey, 'off')
    else window.localStorage.removeItem(preferenceKey)
    fallbackPaused = undefined
  } catch { fallbackPaused = next }
  window.dispatchEvent(new Event('portfolio-motion-change'))
}

export function MotionProvider({ children }) {
  const flags = useSyncExternalStore(subscribe, snapshot, () => -1)
  const ready = flags >= 0
  const reduced = ready && flags !== 0
  const systemReduced = ready && Boolean(flags & 2)
  useEffect(() => {
    document.documentElement.dataset.motion = ready && !reduced ? 'on' : 'off'
    return () => { delete document.documentElement.dataset.motion }
  }, [ready, reduced])
  return <MotionPreference.Provider value={{ ready, reduced, systemReduced, toggleMotion }}>{children}</MotionPreference.Provider>
}

export function useMotionPreference() {
  return useContext(MotionPreference)
}
