import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMotionPreference } from './MotionPreferences'

const targets = '.section-reveal, .bp-section-title, .case-figure, .spread-copy h3, .journey-stop, .journal-photo, .writing-list li'

export function SectionReveal({ children, className = '', delay = 0 }) {
  return <div className={'section-reveal ' + className} data-delay={delay || undefined}>{children}</div>
}

export function PageReveals() {
  const { pathname, search } = useLocation()
  const { ready, reduced } = useMotionPreference()
  useEffect(() => {
    if (!ready || reduced || !window.IntersectionObserver || !Element.prototype.animate) return
    const main = document.getElementById('main-content')
    const seen = new WeakSet()
    const playing = new Set()
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting)
      entering.forEach(({ target }, index) => {
        observer.unobserve(target)
        const heading = target.matches('h2,h3')
        const animation = target.animate([
          { opacity: .28, transform: heading ? 'translateY(.37em)' : 'translateY(22px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: heading ? 640 : 520, delay: Math.min(index, 3) * 48 + 1000 * Number(target.dataset.delay || 0),
          easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'backwards' })
        playing.add(animation)
        animation.onfinish = () => playing.delete(animation)
      })
    }, { threshold: 0.06 })

    function watch(element) {
      if (seen.has(element)) return
      seen.add(element)
      if (element.getBoundingClientRect().top > window.innerHeight * .9) observer.observe(element)
    }
    main.querySelectorAll(targets).forEach(watch)
    const added = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue
        if (node.matches(targets)) watch(node)
        node.querySelectorAll(targets).forEach(watch)
      }
    })
    added.observe(main, { childList: true, subtree: true })
    return () => {
      added.disconnect()
      observer.disconnect()
      for (const animation of playing) animation.cancel()
    }
  }, [ready, reduced, pathname, search])
  return null
}
