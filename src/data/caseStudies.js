// Case studies distinguish user-reported measurements from verified code-level contributions.
export const CASE_STUDIES = {
  'kesari-select-backend': {
    number: '01',
    title: 'Keep operations moving when the backend cannot pause.',
    subtitle: 'Laravel work on an ERP-connected travel platform — APIs, reliability, and releases.',
    period: '2025 — Present',
    category: 'Client platform',
    tone: 'green',
    stack: ['PHP', 'Laravel', 'Frappe / ERP', 'AWS S3', 'Docker', 'MySQL', 'Nginx'],
    intro:
      'Kesari Select connects Sales, Land Ops, Air Ops, Cashier, Product, Finance and more into one operational flow. I own Laravel application work and production deployment. It is a team-built product — not sole authorship.',
    metrics: [
      { value: '10K+', label: 'Total inquiries', detail: 'Historical accumulated count' },
      { value: '80–100+', label: 'New inquiries / day', detail: 'Approximate daily volume' },
      { value: '700–1,000', label: 'Internal users', detail: 'Team-wide estimate' },
      { value: '15s → 3s', label: 'Observed page load', detail: 'Developer-reported' },
    ],
    challenge:
      'Live ops systems fail quietly: late ERP records, fragile finance exports, and approvals that look fine in the UI but break business rules. The need was predictable recovery — not another one-off patch.',
    approach:
      'I focused on the paths that connect ERP data to day-to-day ops: scheduled exports with staging, export logs, lookback checks for missed records, guarded approval flows, and the release path from Docker/AWS setup through verification.',
    decisions: [
      {
        title: 'Make failures recoverable',
        body: 'Problem: a scheduled export can miss late records with no signal. Choice: export logs + lookback windows. Result: missed records can be found and re-delivered instead of vanishing.',
      },
      {
        title: 'Separate prep from publish',
        body: 'Problem: a half-ready file can look “done” to finance. Choice: stage output before publishing. Result: incomplete exports never become trusted business files.',
      },
      {
        title: 'Enforce approvals in the workflow',
        body: 'Problem: hiding a button is not a business rule. Choice: check approvals inside the workflow path. Result: finance-sensitive changes stay explicit under load.',
      },
      {
        title: 'Own the release, not only the PR',
        body: 'Problem: features that never reach production carefully still fail users. Choice: own Docker, EC2, Nginx/PHP-FPM, SSL, and post-release checks. Result: fixes land with accountability.',
      },
    ],
    takeaway:
      'Operational confidence: scheduled work can be inspected and recovered, approvals stay explicit, and production changes ship with ownership. On one slow path, observed load improved from ~15s to ~3s.',
    note: 'Platform figures and load-time measurements are developer-reported operational estimates; Git authorship supports work categories but does not independently verify these KPIs.',
    ctaUrl: 'https://www.kesariselect.com/',
    ctaLabel: 'View public client website',
  },
  'email-campaign-engine': {
    number: '02',
    title: '10,000 rows in. The browser stays responsive.',
    subtitle: 'Laravel campaign tooling for fast imports and controlled background delivery.',
    period: '2025 — 2026',
    category: 'Internal platform',
    tone: 'cream',
    stack: ['Laravel', 'PHP', 'MySQL', 'Queues / Workers', 'Excel', 'Rich editor'],
    intro:
      'A campaign starts with an Excel file. Operators need validation, content prep, test sends, and progress — without blocking the browser on thousands of tasks.',
    metrics: [
      { value: '10K+', label: 'Recipient rows', detail: 'Inserted during batch test' },
      { value: '<4 sec', label: 'Database ingestion', detail: 'Reported benchmark' },
      { value: 'Pause / resume', label: 'Campaign control', detail: 'Status-aware workers' },
    ],
    challenge:
      'Importing spreadsheet data and delivering email are different workloads. Import had to be fast; sending had to be recoverable; operators needed progress and a safe stop.',
    approach:
      'Strict Excel validation and bulk inserts for 10K+ recipients (reported under four seconds). Actual sends run on Laravel Queues/Workers with pause/resume, rich editor, placeholders, test mail, and error handling.',
    decisions: [
      {
        title: 'Batch the database work',
        body: 'Problem: per-row inserts stall large imports. Choice: validate structure first, then bulk write. Result: 10K+ rows land quickly without locking the UI on query loops.',
      },
      {
        title: 'Queue sends; never fake instant delivery',
        body: 'Problem: import speed is easy to confuse with inbox delivery. Choice: workers own sending asynchronously. Result: operators get honest progress — import ≠ send.',
      },
      {
        title: 'Make campaign state visible',
        body: 'Problem: a silent bulk job is unusable in production. Choice: progress, pause/resume, and error visibility. Result: campaigns can be steered mid-flight.',
      },
      {
        title: 'Keep personalization checkable',
        body: 'Problem: bad templates waste a whole send. Choice: rich editor, {Name}/{Email} placeholders, and test mail. Result: content is verified before scale.',
      },
    ],
    takeaway:
      'A full campaign pipeline: fast recipient ingestion, asynchronous sending, operator controls, and clear progress. Deliverability and emails-per-second were not independently benchmarked.',
    note: '10K+ rows / under-four-second ingestion is developer-reported. Progress examples are illustrative, not live campaign analytics.',
    ctaUrl: null,
    ctaLabel: null,
  },
  'smart-print-operations': {
    number: '03',
    title: 'Reliability lives in the small decisions.',
    subtitle: 'Hardening a print-operations app without a full rewrite.',
    period: 'May — June 2025',
    category: 'Operational software',
    tone: 'dark',
    stack: ['Laravel', 'MySQL', 'Eloquent', 'Blade', 'AJAX', 'RBAC'],
    intro:
      'Smart Print already existed. My job was day-to-day reliability: inquiry intake, role checks, recoverable deletes, and consistent job-sheet fields across existing flows.',
    metrics: [
      { value: '28', label: 'Authored Git commits', detail: 'Includes 22 non-merge commits' },
      { value: '2025', label: 'Contribution window', detail: 'May to June' },
    ],
    challenge:
      'Ops tools feel broken when permissions disagree across screens or a delete wipes history people still need. The work was in the paths users hit every day.',
    approach:
      'End-to-end prospect inquiry flow, safer role-permission storage, soft deletes, and job-sheet field fixes — while staying compatible with the existing Eloquent / Query Builder mix.',
    decisions: [
      {
        title: 'Prefer recoverable deletion',
        body: 'Problem: hard deletes erase operational history. Choice: soft deletes. Result: active lists stay clean without losing work people still reference.',
      },
      {
        title: 'Keep role checks consistent',
        body: 'Problem: UI and backend disagreed on who could act. Choice: scoped joins, safer permission updates, null-safe checks. Result: fewer inconsistent actions between screens.',
      },
      {
        title: 'Treat job data as a shared contract',
        body: 'Problem: Web/Other/print sheets drifted on the same fields. Choice: shared validation and VAT/extra behavior. Result: job sheets behave as one system.',
      },
    ],
    takeaway:
      'More reliable day-to-day print administration without claiming sole ownership of the product. Supported by the Smart Print Git contribution record.',
    note: 'Code contributions are verified; no invented productivity or revenue statistics.',
    ctaUrl: null,
    ctaLabel: null,
  },
}
