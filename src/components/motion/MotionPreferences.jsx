import { createContext, useContext, useLayoutEffect, useState, useSyncExternalStore } from 'react'
import { MotionConfig } from 'framer-motion'

const MotionPreference = createContext(null)
const preferenceKey = 'portfolio-motion'
const query = '(prefers-reduced-motion: reduce)'

function subscribe(listener) {
  const media = window.matchMedia(query)
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}

function readPaused() {
  try { return window.localStorage.getItem(preferenceKey) === 'off' } catch { return false }
}

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(readPaused)
  const systemReduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
  const reduced = systemReduced || paused

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'off' : 'on'
    return () => { delete document.documentElement.dataset.motion }
  }, [reduced])

  function toggleMotion() {
    const next = !paused
    setPaused(next)
    try {
      if (next) window.localStorage.setItem(preferenceKey, 'off')
      else window.localStorage.removeItem(preferenceKey)
    } catch { /* The setting still applies for this session. */ }
  }

  return (
    <MotionPreference.Provider value={{ reduced, systemReduced, toggleMotion }}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'user'}>{children}</MotionConfig>
    </MotionPreference.Provider>
  )
}

export function useMotionPreference() {
  return useContext(MotionPreference)
}
