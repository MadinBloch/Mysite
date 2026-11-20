import AnimatedNumber from './AnimatedNumber'
import { kesariStats, statsNote } from '../data/siteStats'

export default function Impact() {
  return (
    <div id="impact" className="border-t border-[#395345] bg-[#0b1610]/55 px-5 py-5 sm:px-8 sm:py-6">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
        {kesariStats.map(({ count, label }) => (
          <div key={label} className="space-y-1.5">
            <dt className="text-[0.78rem] font-medium leading-5 text-[#b6c9bc] sm:text-sm">{label}</dt>
            <dd className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.055em] text-[#a8f3cb]">
              <AnimatedNumber target={count} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="portfolio-meta mt-4">{statsNote}</p>
    </div>
  )
}
