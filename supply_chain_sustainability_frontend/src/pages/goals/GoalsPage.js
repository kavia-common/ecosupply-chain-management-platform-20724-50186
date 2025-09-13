import React, { useEffect, useState } from 'react';
import { listGoals, updateGoalProgress } from '../../services/goalsService';
import ProgressBar from '../../components/common/ProgressBar';

// PUBLIC_INTERFACE
export default function GoalsPage() {
  /** Define and track sustainability goals. */
  const [goals, setGoals] = useState([]);

  useEffect(() => { listGoals().then(setGoals); }, []);

  const update = async (id, value) => {
    const updated = await updateGoalProgress(id, value);
    setGoals(prev => prev.map(g => g.id === id ? updated : g));
  };

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Sustainability Goals</div>
        <button className="btn ghost small">Add Goal</button>
      </div>
      <div className="grid grid-3 mt-2">
        {goals.map(g => (
          <div key={g.id} className="card">
            <div className="text-lg">{g.title}</div>
            <div className="text-sm text-muted">Baseline: {g.baseline} · Target: {g.targetYear}</div>
            <div className="mt-2"><ProgressBar value={g.progress} /></div>
            <div className="text-sm mt-2">Progress: {g.progress}%</div>
            <input className="input mt-2" type="number" min="0" max="100" value={g.progress} onChange={e => update(g.id, e.target.value)} />
          </div>
        ))}
      </div>
    </>
  );
}
