import { Link } from 'react-router-dom'
import AnimatedNumber from './AnimatedNumber'
import { kesariStats } from '../data/siteStats'

export default function Impact() {
  return (
    <section id="impact" className="platform-impact" aria-labelledby="impact-title">
      <div className="impact-source">
        <h2 id="impact-title"><Link to="/projects/kesari-select-backend">Kesari Select</Link></h2>
        <p>Platform estimates</p>
      </div>
      <dl>
        {kesariStats.map(({ count, contextLabel }) => (
          <div key={contextLabel}>
            <dt>{contextLabel}</dt>
            <dd><AnimatedNumber target={count} /></dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
