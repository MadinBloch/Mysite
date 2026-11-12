// These values come from developer-reported operational context, not analytics exports.
export const siteStats = [
  { id:'total-inquiries', a:10000, suffix:'+', label:'inquiries in the platform', note:'Total accumulated inquiries, not daily traffic' },
  { id:'daily-inquiries', a:80, b:100, suffix:'+', label:'new inquiries each day', note:'Approximate typical daily volume' },
  { id:'team-users', a:700, b:1000, label:'internal team users', note:'Sales, Land/Air Ops, Cashier, Product, Finance & more' },
  { id:'email-import', a:10000, suffix:'+', label:'email rows inserted', note:'Under 4 seconds in a reported batch-import test' },
]
export const statsDisclaimer = 'Volumes and benchmarks are developer-reported operational estimates; not independent analytics or email delivery-rate measurements.'
