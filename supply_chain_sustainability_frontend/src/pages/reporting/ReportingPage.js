import React from 'react';
import ChartPlaceholder from '../../components/common/ChartPlaceholder';

// PUBLIC_INTERFACE
export default function ReportingPage() {
  /** Performance metrics and export-ready reporting. */
  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Reporting & Metrics</div>
        <div className="flex gap-2">
          <button className="btn small">Export CSV</button>
          <button className="btn ghost small">Export PDF</button>
        </div>
      </div>
      <div className="grid grid-2 mt-2">
        <ChartPlaceholder title="Scope 1 + 2 Emissions" height={220} />
        <ChartPlaceholder title="Scope 3 Category Breakdown" height={220} />
      </div>
      <div className="grid grid-3 mt-2">
        <ChartPlaceholder title="Supplier Onboarding Rate" height={180} />
        <ChartPlaceholder title="Corrective Action Closure Rate" height={180} />
        <ChartPlaceholder title="Goal Progress Forecast" height={180} />
      </div>
    </>
  );
}
