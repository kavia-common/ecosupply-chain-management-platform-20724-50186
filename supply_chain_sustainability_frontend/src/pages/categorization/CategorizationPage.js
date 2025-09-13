import React, { useEffect, useState } from 'react';
import { listSuppliers, categorizeSupplier } from '../../services/supplierService';

// PUBLIC_INTERFACE
export default function CategorizationPage() {
  /** Intelligent categorization: simulate analysis and update categories. */
  const [suppliers, setSuppliers] = useState([]);
  const [loadingId, setLoadingId] = useState('');

  useEffect(() => { listSuppliers().then(setSuppliers); }, []);

  const recategorizeAll = async () => {
    for (const s of suppliers) {
      // eslint-disable-next-line no-await-in-loop
      const res = await categorizeSupplier(s.id);
      setSuppliers(prev => prev.map(x => x.id === s.id ? { ...x, category: res.category } : x));
    }
  };

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Supplier Categorization</div>
        <button className="btn small" onClick={recategorizeAll}>Run Analysis</button>
      </div>
      <div className="grid grid-3 mt-2">
        {suppliers.map(s => (
          <div key={s.id} className="card">
            <div className="text-lg">{s.name}</div>
            <div className="text-sm text-muted">Region: {s.region}</div>
            <div className="mt-2"><span className="tag yellow">Category: {s.category}</span></div>
            <button className="btn small mt-2" onClick={async () => {
              setLoadingId(s.id);
              const res = await categorizeSupplier(s.id);
              setSuppliers(prev => prev.map(x => x.id === s.id ? { ...x, category: res.category } : x));
              setLoadingId('');
            }}>{loadingId === s.id ? 'Analyzing...' : 'Re-categorize'}</button>
          </div>
        ))}
      </div>
    </>
  );
}
