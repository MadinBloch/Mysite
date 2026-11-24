import { useEffect, useRef } from 'react'
import { useMotionPreference } from './motion/MotionPreferences'
import { portrait } from '../portrait'
import { Link } from 'react-router-dom'
import { FiAperture, FiArrowDown, FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { profile } from '../data/profile'

export default function Hero() {
  const stageRef = useRef(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)
  const replayRef = useRef(null)
  const { reduced, ready } = useMotionPreference()
  useEffect(() => {
    if (!ready || reduced) return
    const stage = stageRef.current
    const image = imageRef.current
    const canvas = canvasRef.current
    let disposed = false
    let controller
    let pending
    function prepare() {
      if (!pending) {
        pending = Promise.all([image.decode(), import('./motion/portraitDissolve')])
          .then(([, module]) => {
            if (!disposed) controller = module.mountDissolve(stage, image, canvas)
            return controller
          }).catch(() => { /* The unmodified photograph stays visible. */ })
      }
      return pending
    }
    replayRef.current = async () => { (await prepare())?.replay() }
    // Draw the halftone portrait on first paint; scroll only changes its motion.
    prepare()
    return () => {
      disposed = true
      replayRef.current = null
      controller?.dispose()
    }
  }, [reduced, ready])

  return (
    <section id="home" className="portrait-cover" aria-labelledby="home-title">
      <div className="cover-inner" ref={stageRef}>
        <div className="cover-top meta-line">
          <span className="availability">Open to backend roles</span>
          <span>Ahmedabad, India</span>
        </div>
        <div className="portrait-light" aria-hidden="true" />
        <div className="cover-photo">
          <img ref={imageRef} src={portrait.src} srcSet={portrait.srcSet} sizes={portrait.sizes}
            width="720" height="720" alt="Madin Bloch" loading="eager" fetchpriority="high" />
        </div>
        <canvas ref={canvasRef} className="portrait-particles" width="1" height="1" aria-hidden="true" />
        <div className="cover-margin" aria-hidden="true">
          <span className="margin-tick" />
          <span>Laravel<br />ERP integrations<br />AWS deployments</span>
        </div>
        <button type="button" className="portrait-replay" aria-label="Animate portrait"
          disabled={!ready || reduced} onClick={() => replayRef.current?.()}>
          <FiAperture aria-hidden="true" /><span>Animate portrait</span>
        </button>
        <div className="cover-title">
          <p className="cover-role">Laravel backend developer</p>
          <h1 id="home-title"><span className="cover-heading-mask"><span className="cover-heading-word">Madin</span></span>{' '}<span className="cover-heading-mask"><em className="cover-heading-word">Bloch.</em></span></h1>
          <p className="cover-intro">I build the Laravel APIs behind Kesari Select’s travel bookings and take them from development to production on AWS.</p>
          <div className="cover-actions">
            <Link to="/#selected-work" className="action-pill">Explore my work <FiArrowDown aria-hidden="true" /></Link>
            <a href={profile.resume} download className="action-line"><FiDownload aria-hidden="true" /> Download résumé</a>
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
