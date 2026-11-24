export const kesariStats = [
  { count: 200, label: 'Daily inquiries', contextLabel: 'TAP inquiries per day', detail: 'Inquiries handled in TAP each day' },
  { count: 100000, label: 'Customer records', contextLabel: 'TAP customer records', detail: 'Customer records managed through TAP' },
  { count: 10000, label: 'Website visitors', contextLabel: 'Daily public website visitors', detail: 'Public website visitors per day' },
]

export const kesariPageLoad = { before: 15, after: 3 }

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

export function formatCount(count) {
  return compactNumber.format(count)
}
