import { formatCount, kesariPageLoad, kesariStats } from './siteStats.js'

// Case studies distinguish user-reported measurements from verified code-level contributions.
export const CASE_STUDIES = {
  'kesari-select-backend': {
    number: '01',
    title: 'Laravel APIs and reliable ERP exports',
    subtitle: 'Backend engineering and production releases for Kesari Select’s Travel Assist Platform.',
    period: '2025 — Present',
    category: 'Client platform',
    tone: 'green',
    stack: ['PHP', 'Laravel', 'Frappe / ERP', 'AWS S3', 'Docker', 'MySQL', 'Nginx'],
    intro:
      'Kesari Select’s Travel Assist Platform (TAP) connects Sales, Land and Air Operations, Cashier, Product, and Finance. I build Laravel features and ERP integrations and handle production deployments.',
    metrics: [
      ...kesariStats.map(({ count, label, detail }) => ({ value: formatCount(count) + '+', label, detail })),
      { value: '700–1,000', label: 'Internal users', detail: 'Team-wide estimate' },
      { value: kesariPageLoad.before + 's → ' + kesariPageLoad.after + 's', label: 'Observed page load', detail: 'Developer-reported' },
    ],
    challenge:
      'Late ERP records could miss a scheduled export, and an approval shown in the interface still needed to be enforced in the backend. Teams needed to see what had happened and recover a missed record.',
    approach:
      'I staged scheduled exports before delivery, added export logs and lookback checks for late records, and enforced approval rules in the backend. I handled releases from Docker and AWS setup through production verification. I also recorded an internal TAP walkthrough to help Kesari’s Sales and Operations teams learn the system.',
    decisions: [
      {
        title: 'Make failures recoverable',
        body: 'I added export logs and lookback windows so the team could find ERP records that arrived late and include them in a later delivery.',
      },
      {
        title: 'Separate prep from publish',
        body: 'Staging finishes file generation before publishing the export to Finance. That keeps partially generated files out of the delivery path.',
      },
      {
        title: 'Enforce approvals in the workflow',
        body: 'I check approvals in the workflow itself so finance-sensitive actions follow the same rule across entry points.',
      },
      {
        title: 'Verify each production release',
        body: 'I handle Docker, EC2, Nginx, PHP-FPM, and SSL for releases and check the affected workflows after deployment.',
      },
    ],
    takeaway:
      'Teams can inspect and recover scheduled exports and see where approvals are enforced. On one workflow I optimized, observed page load dropped from about 15 seconds to 3 seconds.',
    note: 'Platform volumes and page-load times are approximate figures reported by the developer.',
    ctaUrl: 'https://www.kesariselect.com/',
    ctaLabel: 'View public client website',
  },
  'email-campaign-engine': {
    number: '02',
    title: 'Excel imports and queued email campaigns',
    subtitle: 'Laravel workers send campaigns in the background and give operators control over delivery.',
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
    title: 'Consistent job sheets for print teams',
    subtitle: 'Improvements to inquiry intake, permissions and record recovery in an existing Laravel app.',
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
