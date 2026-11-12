// Case studies distinguish user-reported measurements from verified code-level contributions.
export const CASE_STUDIES = {
  'kesari-select-backend': {
    number:'01',title:'When the business cannot wait for the backend.',
    subtitle:'The engineering decisions behind an ERP-connected travel operations platform.',
    period:'2025 — Present',category:'Client platform',tone:'green',
    stack:['PHP','Laravel','Frappe / ERP','AWS S3','Docker','MySQL','Nginx'],
    intro:'Kesari Select brings Sales, Land Ops, Air Ops, Cashier, Product, Finance and other teams into the same operational flow. I work on its Laravel application and handle application deployment and production issues. The platform is a team-built system, not a product built by me alone.',
    metrics:[
      {value:'10K+',label:'Total inquiries',detail:'Historical accumulated count'},
      {value:'80–100+',label:'New inquiries / day',detail:'Approximate daily volume'},
      {value:'700–1,000',label:'Internal users',detail:'Team-wide estimate'},
      {value:'15s → 3s',label:'Observed page-load change',detail:'Developer-reported'}
    ],
    challenge:'A live operations system is less about individual screens and more about keeping business data trustworthy. When finance exports run, approvals are pending or operational records arrive late, the system needs a predictable way to recover—not another manual patch.',
    approach:'I worked on the paths that connect ERP data to operations: repeatable scheduled exports, staging before publishing, traceable logs, lookback checks for missed records, guarded approval paths and the notifications that help teams act. I also handle deployment work from environment setup through release verification.',
    decisions:[
      {title:'Make failures recoverable',body:'A scheduled export should not silently forget a late record. Export logs and a lookback window help identify records still awaiting downstream delivery.'},
      {title:'Separate preparation from publication',body:'Staging output before publishing avoids treating a partly prepared file as a complete business export.'},
      {title:'Check approvals in the workflow',body:'Finance-sensitive changes should respect business rules beyond hiding or showing a button.'},
      {title:'Own the release, not only the code',body:'My responsibility extends to Docker environments, AWS EC2, Nginx/PHP-FPM, SSL, deployment checks and troubleshooting after release.'}
    ],
    takeaway:'The result is operational confidence: scheduled work can be inspected and recovered, approvals remain explicit and fixes reach production with ownership. On one slow page, my observed load time improved from roughly 15 seconds to 3 seconds.',
    note:'Platform figures and load-time measurements are user-reported operational estimates; Git authorship supports work categories but does not independently verify these KPIs.',
    ctaUrl:'https://www.kesariselect.com/',ctaLabel:'View public client website'
  },
  'email-campaign-engine': {
    number:'02',title:'10,000 rows in. The browser stays responsive.',
    subtitle:'A Laravel email platform built for large imports and controlled background delivery.',
    period:'2025 — 2026',category:'Internal platform',tone:'cream',
    stack:['Laravel','PHP','MySQL','Queues / Workers','Excel','Rich editor'],
    intro:'A campaign starts with an Excel file. The team needs to validate recipients, prepare content, send a test and track progress—without waiting for a browser request to finish thousands of tasks.',
    metrics:[
      {value:'10K+',label:'Recipient rows',detail:'Inserted during batch test'},
      {value:'<4 sec',label:'Database ingestion',detail:'Reported benchmark'},
      {value:'6,000 / 10,000',label:'Progress example',detail:'Illustrative dashboard state'}
    ],
    challenge:'Importing spreadsheet data and delivering actual emails are different workloads. I needed to make the import fast, make sending recoverable and let a user see progress or stop the campaign safely.',
    approach:'I used strict Excel validation and bulk-insert patterns to process 10K+ recipient records in under four seconds during a reported benchmark. Actual emails go through Laravel Queues and Workers asynchronously, with status-aware pause/resume, a rich editor, template placeholders, test sends and error handling.',
    decisions:[
      {title:'Batch the database work',body:'Parse and validate structure, columns and formats before writing. Bulk insertion avoids a slow per-recipient query loop during import.'},
      {title:'Queue sends; never promise instant delivery',body:'The under-four-second result describes MySQL insertion, not 10K messages arriving in recipients’ inboxes. Workers handle delivery separately.'},
      {title:'Make campaign state visible',body:'An operator can inspect progress (for example, 6,000 of 10,000 sent), pause or resume a campaign and check delivery errors.'},
      {title:'Keep personalization usable',body:'A rich-text editor, test-mail flow and dynamic {Name}/{Email} placeholders allow campaigns to be checked before a large send.'}
    ],
    takeaway:'A workable end-to-end campaign pipeline: fast recipient ingestion, asynchronous sending, operational controls and clear progress. The architecture is designed for real workloads; deliverability and emails-per-second were not independently benchmarked.',
    note:'10K+ rows / under-four-second ingestion is developer-reported. Progress numbers shown are illustrative, not live campaign data.',
    ctaUrl:null,ctaLabel:null
  },
  'smart-print-operations': {
    number:'03',title:'Reliability lives in the small decisions.',
    subtitle:'Improving a print-operations application without rewriting the whole thing.',
    period:'May — June 2025',category:'Operational software',tone:'dark',
    stack:['Laravel','MySQL','Eloquent','Blade','AJAX','RBAC'],
    intro:'Smart Print was already an established application. My part was to make customer intake, role decisions, task history and print job configuration behave consistently across existing flows.',
    metrics:[
      {value:'28',label:'Authored Git commits',detail:'Includes 22 non-merge commits'},
      {value:'2025',label:'Contribution period',detail:'May to June'}
    ],
    challenge:'An operational tool can feel broken when permissions differ between screens or a delete action permanently removes records people still need. I focused on the behavior users hit every day.',
    approach:'I built the prospect-inquiry flow end to end, improved role-permission storage, added safe delete behavior and fixed fields affecting print/Web/Other job sheets. I preserved compatibility with the existing blend of Eloquent and Query Builder code.',
    decisions:[
      {title:'Prefer recoverable deletion',body:'Soft deletes protect work history while keeping active lists clean.'},
      {title:'Keep role checks consistent',body:'Scoped joins, safer permission updates and null-safe checks help stop inconsistent actions between backend and UI.'},
      {title:'Treat job data as a shared contract',body:'Field validations and extra/VAT behavior should match across the different job-sheet paths.'}
    ],
    takeaway:'More reliable day-to-day print administration without claiming sole ownership of the application. The work is supported by the Smart Print Git contribution report.',
    note:'Code contributions are verified; no invented productivity or revenue statistics.',
    ctaUrl:null,ctaLabel:null
  }
}
