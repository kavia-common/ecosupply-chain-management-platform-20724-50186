import React, { useEffect, useMemo, useState } from 'react';
import Table from '../../components/common/Table';
import { listSuppliers, categorizeSupplier } from '../../services/supplierService';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function SuppliersPage() {
  /** Supplier directory with actions and categorization. */
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const columns = useMemo(() => ([
    { key: 'name', label: 'Supplier' },
    { key: 'region', label: 'Region' },
    { key: 'category', label: 'Category' },
    { key: 'score', label: 'Score' },
    { key: 'risk', label: 'Risk' },
    { key: 'actions', label: '' }
  ]), []);

  useEffect(() => { listSuppliers().then(setItems); }, []);

  const filtered = items.filter(x => x.name.toLowerCase().includes(q.toLowerCase()) || x.region.toLowerCase().includes(q.toLowerCase()));

  const renderCell = (col, value, row) => {
    if (col.key === 'name') return <Link to={`/suppliers/${row.id}`}>{value}</Link>;
    if (col.key === 'category') {
      const tone = value.includes('High') ? 'red' : value.includes('Low') ? 'green' : 'yellow';
      return <span className={`tag ${tone}`}>{value}</span>;
    }
    if (col.key === 'risk') {
      const tone = value === 'High' ? 'red' : value === 'Low' ? 'green' : 'yellow';
      return <span className={`tag ${tone}`}>{value}</span>;
    }
    if (col.key === 'actions') {
      return (
        <div className="flex gap-2">
          <button className="btn small" onClick={async () => {
            const updated = await categorizeSupplier(row.id);
            setItems(prev => prev.map(i => i.id === row.id ? { ...i, category: updated.category } : i));
          }}>Re-categorize</button>
          <Link className="btn ghost small" to={`/suppliers/${row.id}`}>Details</Link>
        </div>
      );
    }
    return value;
  };

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Suppliers</div>
        <input className="input" style={{ maxWidth: 320 }} placeholder="Search suppliers..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <Table columns={columns} data={filtered} renderCell={renderCell} />
    </>
  );
}
