import React, { useEffect, useState } from 'react';
import StatCard from '../../components/common/StatCard';
import ChartPlaceholder from '../../components/common/ChartPlaceholder';
import { listSuppliers } from '../../services/supplierService';
import { listGoals } from '../../services/goalsService';
import { listActions } from '../../services/actionsService';
import { num } from '../../utils/format';

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Overview dashboard with KPIs for suppliers, goals, actions, and emissions progress. */
  const [supplierCount, setSupplierCount] = useState(0);
  const [goalsCount, setGoalsCount] = useState(0);
  const [openActions, setOpenActions] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    async function load() {
      const s = await listSuppliers();
      setSupplierCount(s.length);
      setAvgScore(Math.round(s.reduce((acc, x) => acc + x.score, 0) / s.length));
      const g = await listGoals();
      setGoalsCount(g.length);
      const a = await listActions();
      setOpenActions(a.filter(x => x.status !== 'Closed').length);
    }
    load();
  }, []);

  return (
    <>
      <div className="grid grid-4">
        <StatCard title="Suppliers" value={num(supplierCount)} />
        <StatCard title="Avg Sustainability Score" value={avgScore} delta={4} tone="success" />
        <StatCard title="Active Goals" value={goalsCount} delta={-1} tone="warning" />
        <StatCard title="Open Corrective Actions" value={openActions} delta={2} tone="danger" />
      </div>

      <div className="grid grid-2 mt-4">
        <ChartPlaceholder title="Emissions Trend (tCO₂e)" height={220} />
        <ChartPlaceholder title="Supplier Risk Distribution" height={220} />
      </div>

      <div className="grid grid-3 mt-4">
        <ChartPlaceholder title="Compliance Status by Regulation" height={180} />
        <ChartPlaceholder title="Audit Outcomes by Tier" height={180} />
        <ChartPlaceholder title="Renewable Energy Adoption" height={180} />
      </div>
    </>
  );
}
