import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { formatCount, kesariStats } from '../data/siteStats'

export default function Impact({ home = false }) {
  const Wrapper = home ? 'section' : 'div'
  return (
    <Wrapper id="impact" className={home ? 'impact-band' : 'chapter-impact'} aria-label="Kesari Select platform estimates">
      <div className={home ? 'bp-shell impact-inner' : undefined}>
        {home && <Link className="impact-credit" to="/projects/kesari-select-backend">Kesari Select <FiArrowUpRight aria-hidden="true" /></Link>}
        <dl>{kesariStats.map(({ count, contextLabel }) => (
          <div key={contextLabel}><dt>{contextLabel}</dt><dd>{formatCount(count)}<span>+</span></dd></div>
        ))}</dl>
        <p className="estimate-note">*developer-reported estimates</p>
      </div>
    </Wrapper>
  )
}
