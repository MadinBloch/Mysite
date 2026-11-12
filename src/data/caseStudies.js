export const CASE_STUDIES = {
  "kesari-select-backend": {
    "title": "Kesari Select — Backend Engineering at Travel-Operations Scale",
    "subtitle": "What I built and maintained: ERP exports, finance approvals, notifications and production releases.",
    "period": "2025–2026",
    "stack": [
      "Laravel 6",
      "PHP",
      "Frappe ERP",
      "AWS S3",
      "MySQL",
      "MongoDB",
      "Docker",
      "Nginx",
      "Artisan Scheduler"
    ],
    "summary": "Kesari Select is used by Sales, Operations and Finance teams day in and day out. I contribute to its Laravel application and handle defined backend and deployment responsibilities. The platform itself is team-built.",
    "role": "Laravel developer responsible for ERP export/reconciliation work, Cash Contra, approval enhancements, reminders, troubleshooting and deployments.",
    "metrics": [
      {
        "value": "10K+",
        "label": "Inquiries / day",
        "note": "Estimated platform throughput"
      },
      {
        "value": "700–1K",
        "label": "Internal team users",
        "note": "Estimated business adoption"
      },
      {
        "value": "15s → 3s",
        "label": "Page-load improvement",
        "note": "Observed on one page"
      }
    ],
    "metricNote": "Scale numbers and timing are developer-reported operating estimates, not independently audited analytics.",
    "problem": "The work behind bookings and finance did not stop at an API response. Different ERP documents needed different export shapes, a failed run could leave records behind, and finance actions required explicit approval before downstream processing.",
    "architecture": [
      {
        "title": "Read",
        "description": "Pull ERP data through shared Frappe/HTTP integration and apply document-specific mapping for bookings, receipts, passengers, suppliers and billing."
      },
      {
        "title": "Reconcile",
        "description": "Look back across previously unexported records and use export logs to avoid sending the same document again."
      },
      {
        "title": "Publish",
        "description": "Generate DBF outputs, place files in S3 staging, then publish and archive them with preview and operational logs."
      },
      {
        "title": "Run & deploy",
        "description": "Schedule recurring commands, monitor business alerts and maintain Laravel releases across Docker, EC2, Nginx, PHP-FPM and SSL."
      }
    ],
    "contributions": [
      "Built and expanded daily DBF publication, S3 staging/live paths and automated archiving across finance and booking documents.",
      "Created a reusable ERP API helper and mapping patterns so multiple workflows could rely on consistent request/response handling.",
      "Delivered Cash Contra requisitions and expanded Sales Manager/Finance approval steps for journal vouchers.",
      "Added RFQ follow-ups, low-ticket-stock notifications and tools for reading operational logs.",
      "Handled application deployments end-to-end, from environment and reverse-proxy configuration to release verification and production troubleshooting.",
      "Optimized one slow page: developer-observed load time improved from approximately 15 seconds to 3 seconds."
    ],
    "decisions": [
      "Staging and live S3 folders stay separate because a partially written export should not look ready for finance.",
      "Export logs plus a lookback window give a later scheduled run a way to find records missed on an earlier day.",
      "Finance approval needs to be checked in workflow logic, not only reflected by which UI actions are visible.",
      "Automated reminders and ticket-stock checks turn repeated manual monitoring into predictable scheduled work."
    ],
    "outcome": "A more repeatable path for ERP/finance data, role-aware approvals and operational follow-up on a heavily used internal platform. I can explain the export failure and recovery paths, release flow and trade-offs from first-hand work.",
    "evidence": "Code-level choices are grounded in the authored TAP contribution report. User counts, inquiry volume, end-to-end deployment scope and page-load observations come from the developer's account; the Git report does not independently measure them.",
    "external": "https://www.kesariselect.com/",
    "externalLabel": "Public client website"
  },
  "email-campaign-engine": {
    "title": "Bulk Email That Doesn't Depend on One Browser Request",
    "subtitle": "Excel contacts, background sending, campaign controls and open tracking.",
    "period": "2025",
    "stack": [
      "Laravel 11",
      "PHP",
      "MySQL",
      "Laravel Queues",
      "Scheduler",
      "Maatwebsite Excel",
      "Mailables"
    ],
    "summary": "The business request was straightforward: upload contacts from Excel, design the email, send a test, start delivery and retain a pause button. I built the first complete version and teammates later improved some parts.",
    "role": "Introduced models, migrations, queues, controller workflows, campaign status handling, tracking and reporting.",
    "metrics": [
      {
        "value": "1 upload",
        "label": "Recipient import",
        "note": "Excel validation"
      },
      {
        "value": "Pause / Resume",
        "label": "Send controls",
        "note": "Status-aware jobs"
      },
      {
        "value": "Hourly",
        "label": "Tracking writes",
        "note": "Batch persistence"
      }
    ],
    "problem": "A single browser request is the wrong place to send hundreds of individual emails. It is difficult to retry, inspect or pause, and operators should not need to keep a tab open.",
    "architecture": [
      {
        "title": "Import",
        "description": "Validate Excel addresses, store the source list, save campaign details and build recipient-level logs."
      },
      {
        "title": "Dispatch",
        "description": "A scheduled Artisan command queues delayed per-recipient email jobs."
      },
      {
        "title": "Control",
        "description": "Status gates support tests, pause/resume, configurable sender details and archiving."
      },
      {
        "title": "Track",
        "description": "An open-tracking pixel appends events to hourly files; a scheduled processor batches the database updates."
      }
    ],
    "contributions": [
      "Created the original Direct Email feature across Blade, Laravel controllers, Eloquent models, migrations and recipient logs.",
      "Implemented Excel intake, template assets, test mail, scheduled queued delivery and status-aware pause/resume.",
      "Added a tracking pixel and later replaced synchronous per-open database writes with hourly file-based processing.",
      "Built open-recipient exports, campaign archive/source file download and dynamic From/Reply-To settings."
    ],
    "decisions": [
      "Queue individual recipient jobs so campaign work survives beyond the HTTP request.",
      "Check paused status inside the job pipeline, not just in the interface.",
      "Keep email-open HTTP hits cheap and move durable updates to a scheduled batch processor."
    ],
    "outcome": "Operators can prepare and run campaigns from one screen while still observing delivery and engagement status. No verified email-volume or deliverability percentage exists in the repository.",
    "evidence": "Initial feature in commit fbb9c7b; hourly open-log processor in 7f2716e. Later refactors also belong to teammates.",
    "external": null,
    "externalLabel": null
  },
  "smart-print-operations": {
    "title": "Smart Print — Fixing the Work Behind Each Print Job",
    "subtitle": "Prospect capture, role permissions, task retention and configurable job sheets.",
    "period": "May–June 2025",
    "stack": [
      "Laravel",
      "PHP",
      "MySQL",
      "Eloquent",
      "Blade",
      "jQuery / AJAX",
      "RBAC"
    ],
    "summary": "Smart Print already had job and task modules when I joined. My work focused on making inquiry capture consistent, making permissions safer and removing recurring job-sheet problems.",
    "role": "Built the prospect module end to end; improved existing roles, task, Web/Print/Other job-sheet and supplier flows.",
    "metrics": [
      {
        "value": "28",
        "label": "Authored Git commits",
        "note": "Including 22 non-merge"
      },
      {
        "value": "5",
        "label": "Work areas",
        "note": "Prospects, roles, tasks, job sheets, data"
      },
      {
        "value": "2025",
        "label": "Contribution window",
        "note": "May–June"
      }
    ],
    "problem": "The system had a mix of Eloquent and legacy Query Builder flows. Changes to a form or permission needed to stay consistent across server code, database records and multiple admin screens.",
    "architecture": [
      {
        "title": "Prospects",
        "description": "New inquiry table and Eloquent model with soft deletes, JSON validation endpoints and AJAX create/edit/list screens."
      },
      {
        "title": "Permissions",
        "description": "Role-scoped joins and firstOrNew permission updates; permission-aware Edit/Delete controls throughout existing modules."
      },
      {
        "title": "Task lifecycle",
        "description": "Completion status, start/end date validation and soft deletes instead of permanent removal."
      },
      {
        "title": "Print job options",
        "description": "Corrected extra/VAT values and added manageable size, lamination, proof and prepress option catalogs."
      }
    ],
    "contributions": [
      "Built the Prospect/Inquiry module across database DDL, model, controller, Blade views, AJAX and the module permissions registry.",
      "Refactored role-permission update handling and hardened missing-permission checks.",
      "Added task soft delete and scheduling fields while preserving the existing Query Builder behavior.",
      "Repaired supplier/customer validation and job-sheet creation/update issues across Print, Web and Other flows."
    ],
    "decisions": [
      "Use soft deletes for operational records where a mistaken click should not erase history.",
      "Let permission checks fail safely when an expected role/module row is missing.",
      "Keep extra/VAT behavior consistent across different kinds of job sheets."
    ],
    "outcome": "Better structured inquiry intake, safer operational changes and consistent form behavior. The repository proves delivery of these features, but has no measured business or performance KPI.",
    "evidence": "Supported by 28 authored commits in the Smart Print contribution report, including 02de338, 5689a11, d0cb6cd and e156c9b.",
    "external": null,
    "externalLabel": null
  }
}
