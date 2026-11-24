import { useEffect, useRef } from 'react'
import { useMotionPreference } from './motion/MotionPreferences'
import { portrait } from '../portrait'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { profile } from '../data/profile'
import RollingLabel from './RollingLabel'

export default function Hero() {
  const stage = useRef(null)
  const img = useRef(null)
  const field = useRef(null)
  const { reduced } = useMotionPreference()

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    let dispose
    Promise.all([img.current.decode(), import('./motion/portraitDissolve')])
      .then(([, module]) => {
        if (!cancelled) dispose = module.mountDissolve(stage.current, img.current, field.current)
      }).catch(() => { /* The photograph remains visible if sampling fails. */ })
    return () => { cancelled = true; dispose?.() }
  }, [reduced])

  return (
    <section id="home" className="portrait-cover" aria-labelledby="home-title">
      <div className="cover-inner" ref={stage}>
        <div className="cover-top meta-line">
          <span className="availability">Open to backend roles</span>
          <span>Ahmedabad, India</span>
        </div>
        <div className="portrait-light" aria-hidden="true" />
        <div className="portrait-track">
          <div className="portrait-pin">
            <div className="cover-photo">
              <img ref={img} src={portrait.src} srcSet={portrait.srcSet} sizes={portrait.sizes}
                width="720" height="720" alt="Madin Bloch" loading="eager" fetchpriority="high" />
              <canvas ref={field} aria-hidden="true" style={{ position: 'absolute', insetBlockStart: 0, left: '-50%', width: '200%', height: '100%', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
        <div className="cover-margin" aria-hidden="true">
          <span className="margin-tick" />
          <span>Laravel<br />ERP integrations<br />AWS deployments</span>
        </div>
        <div className="cover-title">
          <p className="cover-role">Laravel backend developer</p>
          <h1 id="home-title"><span className="cover-heading-mask"><span className="cover-heading-word">Madin</span></span>{' '}<span className="cover-heading-mask"><em className="cover-heading-word">Bloch.</em></span></h1>
          <p className="cover-intro">I build the Laravel APIs behind Kesari Select’s travel bookings and take them from development to production on AWS.</p>
          <div className="cover-actions">
            <Link to="/#selected-work" className="action-pill"><RollingLabel>Explore my work</RollingLabel> <FiArrowDown aria-hidden="true" /></Link>
            <a href={profile.resume} download className="action-line"><FiDownload aria-hidden="true" /><RollingLabel>Download Resume</RollingLabel></a>
          </div>
        </div>
        <div className="cover-foot meta-line">
          <Link to="/#profile">Meet the developer <FiArrowDown aria-hidden="true" /></Link>
          <Link to="/projects/kesari-select-backend">Kesari Select case study <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
