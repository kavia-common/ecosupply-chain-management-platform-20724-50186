import { audits } from '../data/compliance';

// PUBLIC_INTERFACE
export async function listAudits() {
  /** Returns historical audits with tier information. */
  return audits;
}

// PUBLIC_INTERFACE
export async function scheduleAudit({ supplierId, level, date }) {
  /** Adds a new audit (in-memory mock). */
  const id = 'a' + (audits.length + 1);
  audits.push({ id, supplierId, level, date, status: 'Scheduled', findings: 0 });
  return audits[audits.length - 1];
}
