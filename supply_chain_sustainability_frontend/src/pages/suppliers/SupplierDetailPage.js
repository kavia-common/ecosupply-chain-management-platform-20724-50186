import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSupplier } from '../../services/supplierService';
import ChartPlaceholder from '../../components/common/ChartPlaceholder';

// PUBLIC_INTERFACE
export default function SupplierDetailPage() {
  /** Displays supplier profile with key metrics and activity. */
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => { getSupplier(id).then(setSupplier); }, [id]);

  if (!supplier) return <div className="card">Supplier not found.</div>;

  return (
    <>
      <div className="card">
        <div className="text-xl">{supplier.name}</div>
        <div className="text-sm text-muted">Region: {supplier.region} · Category: {supplier.category}</div>
        <div className="mt-2">
          <span className="tag blue">Score: {supplier.score}</span>{' '}
          <span className={`tag ${supplier.risk === 'High' ? 'red' : supplier.risk === 'Low' ? 'green' : 'yellow'}`}>Risk: {supplier.risk}</span>
        </div>
      </div>
      <div className="grid grid-2 mt-4">
        <ChartPlaceholder title="Supplier Emissions" height={200} />
        <ChartPlaceholder title="Audit History" height={200} />
      </div>
    </>
  );
}
