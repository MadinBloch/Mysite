export const CASE_STUDIES = {
  'kesari-select-backend': {
    title: 'Kesari Select — Backend & ERP Integration',
    subtitle: 'Laravel orchestration for travel, finance and operations workflows',
    period: '2025–2026',
    stack: ['Laravel 6', 'PHP', 'Frappe ERP APIs', 'AWS S3', 'DBF', 'MongoDB', 'Artisan Scheduler'],
    summary: 'Contributions to a live travel-operations platform where Laravel coordinates business workflows with an ERP-backed system of record. This is team-built software; the examples below describe my specific contributions, not sole authorship of the product.',
    role: 'Major Laravel contributor — ERP export pipeline, cash-contra workflows, JV approval enhancements, ticketing and notifications.',
    problem: 'Finance and operations data needed consistent export formats, reliable scheduled delivery and controlled approval paths across separate Laravel and ERP systems.',
    architecture: [
      { title: 'ERP reads and reconciliation', description: 'Shared Frappe/ERP API integration, record selection and lookback logic for documents not yet exported.' },
      { title: 'DBF transformation', description: 'Config-driven field mapping for receipts, bookings, passengers, suppliers, billings, forex and cash contra.' },
      { title: 'S3 publication', description: 'Stage and promote daily DBF exports into S3, with export logs, preview screens, archives and zipped history.' },
      { title: 'Scheduled operations', description: 'Artisan tasks for publishing, archiving, RFQ notifications and air-ticket stock alerts.' }
    ],
    contributions: [
      'Designed and expanded the scheduled DBF export pipeline, staging/live S3 paths, archival and unexported-document reconciliation.',
      'Built the Cash Contra requisition flow and a dedicated scheduled publishing path.',
      'Enhanced Sales → Sales Manager → Finance approval/rejection stages on Journal Vouchers, with notifications and finance exports.',
      'Contributed Air quotation/ticketing, insurance, forex receipts, operational log viewer and follow-up notification features.',
      'Investigated production performance; one page improved from roughly 15s to 3s observed load time according to my operational measurement.'
    ],
    decisions: [
      'Keep operational/finance document generation traceable through export logs and preview tools.',
      'Use scheduled automation for repeatable data movement and business alerts.',
      'Apply feature flags and role-gated actions where workflows cross Sales, Operations and Finance.'
    ],
    outcome: 'Delivered working modules and operational automation on a live system. No repository-backed throughput, failure-rate or latency benchmark is available; the page-load figure is self-reported.',
    evidence: 'Summarized from authored Git contribution history for the private TAP project; source and internal endpoints are intentionally not published.',
    external: 'https://www.kesariselect.com/',
    externalLabel: 'Public client website'
  },
  'email-campaign-engine': {
    title: 'Bulk Email Campaign Engine',
    subtitle: 'Excel-to-email automation with queues, pause/resume and open tracking',
    period: '2025',
    stack: ['Laravel 11', 'PHP', 'MySQL', 'Laravel Queues', 'Artisan Scheduler', 'Maatwebsite Excel', 'Laravel Mail'],
    summary: 'Introduced the foundation of an internal direct-email subsystem that processes Excel recipient lists and manages asynchronous HTML campaigns. Later teammates refactored and extended some of its behavior.',
    role: 'Original module developer — migrations, controllers, sender pipeline, tracking and operational exports.',
    problem: 'Business operators needed a controlled workflow to send templated messages to imported contact lists, test campaigns before sending and inspect engagement without manual sending.',
    architecture: [
      { title: 'Excel upload', description: 'Recipient validation and campaign creation with source-file storage and HTML editor assets.' },
      { title: 'Scheduled dispatch', description: 'Artisan campaign command queues per-recipient send jobs with staggered processing.' },
      { title: 'Campaign controls', description: 'Pending, processing, paused and completed statuses; pause/resume API and test sends.' },
      { title: 'Open tracking', description: 'Tracking-pixel endpoint records open events to hourly append-only logs, then a scheduled job batches database updates.' }
    ],
    contributions: [
      'Introduced campaign models and migrations, recipient-level logs, composer and list screens.',
      'Built queue-based send processing, schedule hooks and status-aware pause/resume controls.',
      'Added tracking-pixel events and moved persistence off the synchronous hot path to hourly file processing.',
      'Implemented exports of opened recipients, campaign archiving and download of uploaded source Excel files.',
      'Added configurable From and Reply-To identities with campaign ownership metadata.'
    ],
    decisions: [
      'Queue delivery rather than sending the entire upload in a single HTTP request.',
      'Separate tracking response latency from database persistence by using append-only event logs and a batch processor.',
      'Expose test, pause, archive and export controls to make campaigns operable by business users.'
    ],
    outcome: 'Delivered an internal system with scheduled bulk sending and engagement reporting. Delivery throughput, open-rate improvement and provider-throttling metrics were not measured in the repository.',
    evidence: 'Verified in authored Git commits, including fbb9c7b (initial module) and 7f2716e (hourly tracking-log processor).',
    external: null,
    externalLabel: null
  }
}
