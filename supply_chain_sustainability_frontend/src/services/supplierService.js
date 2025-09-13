import { suppliers as seed } from '../data/suppliers';

// PUBLIC_INTERFACE
export async function listSuppliers() {
  /** Returns the list of suppliers with mock data. */
  return seed;
}

// PUBLIC_INTERFACE
export async function getSupplier(id) {
  /** Returns a single supplier by id or null. */
  return seed.find(s => s.id === id) || null;
}

// PUBLIC_INTERFACE
export async function categorizeSupplier(id) {
  /** Dummy intelligent categorization: toggles between categories for demo. */
  const s = seed.find(x => x.id === id);
  if (!s) return null;
  const categories = ['Low Impact', 'Medium Impact', 'High Impact'];
  s.category = categories[(categories.indexOf(s.category) + 1) % categories.length];
  return s;
}
