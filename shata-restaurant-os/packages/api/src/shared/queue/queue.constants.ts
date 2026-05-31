export const QUEUES = {
  PAYMENT_RECONCILIATION: "payment-reconciliation",
  NOTIFICATION_SEND: "notification-send",
  ANALYTICS_COMPUTE: "analytics-compute",
  SESSION_CLEANUP: "session-cleanup",
  Z_REPORT_GENERATE: "z-report-generate",
  REFUND_PROCESS: "refund-process",
  INSTAPAY_EXPIRY: "instapay-expiry",
} as const;

export const JOBS = {
  RECONCILE_PAYMENTS: "reconcile-payments",
  SEND_PUSH: "send-push",
  COMPUTE_DAILY_STATS: "compute-daily-stats",
  CLEANUP_SESSIONS: "cleanup-sessions",
  GENERATE_Z_REPORT: "generate-z-report",
  PROCESS_REFUND: "process-refund",
  EXPIRE_INSTAPAY: "expire-instapay",
} as const;
