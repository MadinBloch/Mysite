import { formatCount, kesariStats } from '../data/siteStats'

export default function Impact() {
  return (
    <div id="impact" className="border-t border-[#395345] bg-[#0b1610]/55 px-5 py-5 sm:px-8 sm:py-6">
      <dl className="grid gap-3 min-[365px]:grid-cols-3 sm:gap-5">
        {kesariStats.map(({ count, contextLabel }) => (
          <div key={contextLabel} className="flex items-baseline justify-between gap-1.5 min-[365px]:flex-col">
            <dt className="min-[365px]:order-2 text-[0.78rem] font-medium leading-5 text-[#b6c9bc] sm:text-sm">{contextLabel}</dt>
            <dd className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.055em] text-[#a8f3cb]">
              {formatCount(count)}+
            </dd>
          </div>
        ))}
      </dl>
      <p className="portfolio-meta mt-4">*developer-reported estimates</p>
    </div>
  )
}
