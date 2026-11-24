import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import AnimatedNumber from './AnimatedNumber'
import { formatCount, kesariStats } from '../data/siteStats'

export default function Impact({ home = false }) {
  const Wrapper = home ? 'section' : 'div'
  return (
    <Wrapper id="impact" className={home ? 'impact-band' : 'chapter-impact'} aria-label="Kesari Select platform activity">
      <div className={home ? 'bp-shell impact-inner' : undefined}>
        <dl>{kesariStats.map(({ count, contextLabel }) => (
          <div key={contextLabel}><dt>{contextLabel}</dt><dd>{home ? <AnimatedNumber target={count} /> : <>{formatCount(count)}<span className="stat-suffix">+</span></>}</dd></div>
        ))}</dl>
        {home && <Link className="impact-credit" to="/projects/kesari-select-backend">Kesari Select case study <FiArrowUpRight aria-hidden="true" /></Link>}
      </div>
    </Wrapper>
  )
}
