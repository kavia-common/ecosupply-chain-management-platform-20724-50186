import React, { useEffect, useState } from 'react';
import { listAudits, scheduleAudit } from '../../services/auditService';
import { listSuppliers } from '../../services/supplierService';
import { date } from '../../utils/format';

// PUBLIC_INTERFACE
export default function AuditingPage() {
  /** Tiered auditing with history and scheduling. */
  const [audits, setAudits] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ supplierId: '', level: 'Tier 1', date: '' });

  useEffect(() => {
    listAudits().then(setAudits);
    listSuppliers().then(setSuppliers);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.supplierId || !form.date) return;
    const created = await scheduleAudit(form);
    setAudits(prev => [created, ...prev]);
    setForm({ supplierId: '', level: 'Tier 1', date: '' });
  };

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Auditing</div>
      </div>
      <div className="card mt-2">
        <div className="text-sm text-muted mb-2">Schedule new audit</div>
        <form onSubmit={submit} className="grid grid-4">
          <div>
            <label className="label">Supplier</label>
            <select className="select" value={form.supplierId} onChange={e => setForm(f => ({ ...f, supplierId: e.target.value }))}>
              <option value="">Select supplier</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Tier</label>
            <select className="select" value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}>
              <option>Tier 1</option>
              <option>Tier 2</option>
              <option>Tier 3</option>
            </select>
          </div>
          <div>
            <label className="label">Date</label>
            <input className="input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="flex items-center">
            <button className="btn" type="submit" style={{ marginTop: 22 }}>Schedule</button>
          </div>
        </form>
      </div>
      <div className="card mt-2">
        <table className="table">
          <thead><tr><th>Supplier</th><th>Tier</th><th>Date</th><th>Status</th><th>Findings</th></tr></thead>
          <tbody>
            {audits.map(a => (
              <tr key={a.id}>
                <td>{suppliers.find(s => s.id === a.supplierId)?.name || a.supplierId}</td>
                <td><span className="tag blue">{a.level}</span></td>
                <td>{date(a.date)}</td>
                <td><span className={`tag ${a.status === 'Passed' ? 'green' : a.status === 'Conditional' ? 'yellow' : 'blue'}`}>{a.status}</span></td>
                <td>{a.findings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
