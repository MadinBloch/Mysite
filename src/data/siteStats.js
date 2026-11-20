export const kesariStats = [
  { count: 200, label: 'Daily inquiries', contextLabel: 'TAP inquiries per day', detail: 'Inquiries handled in TAP each day' },
  { count: 30000, label: 'Customer records', contextLabel: 'TAP customer records', detail: 'Customer records managed through TAP' },
  { count: 10000, label: 'Website visitors', contextLabel: 'Public website visitors', detail: 'Visitors to the public Kesari Select site' },
]

export const kesariPageLoad = { before: 15, after: 3 }

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

export function formatCount(count) {
  return compactNumber.format(count)
}
