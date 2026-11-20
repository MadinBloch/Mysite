export const kesariStats = [
  { count: 200, label: 'Daily inquiries', detail: 'Inquiries handled in TAP each day' },
  { count: 30000, label: 'Customer records', detail: 'Customer records managed through TAP' },
  { count: 10000, label: 'Website visitors', detail: 'Visitors to the public Kesari Select site' },
]

export const statsNote = 'Approximate figures reported by the developer.'

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

export function formatCount(count) {
  return compactNumber.format(count)
}
