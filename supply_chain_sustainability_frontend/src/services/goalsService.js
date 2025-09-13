import { goals as data } from '../data/goals';

// PUBLIC_INTERFACE
export async function listGoals() {
  /** Returns sustainability goals. */
  return data;
}

// PUBLIC_INTERFACE
export async function updateGoalProgress(id, progress) {
  /** Updates progress percent for a goal (in-memory). */
  const g = data.find(x => x.id === id);
  if (!g) return null;
  g.progress = Math.max(0, Math.min(100, Number(progress)));
  return g;
}
