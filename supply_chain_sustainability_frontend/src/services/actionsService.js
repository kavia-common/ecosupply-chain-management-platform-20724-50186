import { actions } from '../data/corrective';

// PUBLIC_INTERFACE
export async function listActions() {
  /** Returns corrective action plans. */
  return actions;
}

// PUBLIC_INTERFACE
export async function addAction(payload) {
  /** Adds a corrective action (in-memory). */
  const id = 'c' + (actions.length + 1);
  actions.push({ id, ...payload });
  return actions[actions.length - 1];
}
