import { formatCount, kesariStats } from '../data/siteStats'

export default function Impact() {
  return (
    <div id="impact" className="chapter-impact">
      <dl aria-label="Kesari Select platform estimates">
        {kesariStats.map(({ count, contextLabel }) => (
          <div key={contextLabel}>
            <dt>{contextLabel}</dt>
            <dd>{formatCount(count)}+</dd>
          </div>
        ))}
      </dl>
      <p>*developer-reported estimates</p>
    </div>
  )
}
