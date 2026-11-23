import { useEffect, useRef } from 'react'
import { useMotionPreference } from './motion/MotionPreferences'
import { portrait } from '../portrait'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { profile } from '../data/profile'

export default function Hero() {
  const stageRef = useRef(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)
  const { reduced, ready } = useMotionPreference()
  useEffect(() => {
    if (!ready || reduced) return
    const image = imageRef.current
    let disposed = false
    let teardown
    async function start() {
      try {
        await image.decode()
        if (disposed) return
        const { mountDissolve } = await import('./motion/portraitDissolve')
        if (!disposed) teardown = mountDissolve(stageRef.current, image, canvasRef.current)
      } catch { /* Keep the photograph visible if canvas or decoding is unavailable. */ }
    }
    start()
    return () => { disposed = true; teardown?.() }
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
        <div className="cover-title">
          <p className="cover-role">Laravel backend developer</p>
          <h1 id="home-title"><span>Madin</span>{' '}<em>Bloch.</em></h1>
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
