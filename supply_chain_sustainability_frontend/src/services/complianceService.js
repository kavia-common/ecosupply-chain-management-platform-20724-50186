import { regulations } from '../data/compliance';

// PUBLIC_INTERFACE
export async function listRegulations() {
  /** Returns a list of regulatory frameworks and compliance status. */
  return regulations;
}
