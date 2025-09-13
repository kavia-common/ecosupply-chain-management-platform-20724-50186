import React, { useEffect, useState } from 'react';
import { addAction, listActions } from '../../services/actionsService';
import { listSuppliers } from '../../services/supplierService';

// PUBLIC_INTERFACE
export default function CorrectiveActionsPage() {
  /** Manage corrective action plans (CAPs) across suppliers. */
  const [actions, setActions] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ supplierId: '', issue: '', dueDate: '', owner: '', status: 'Open' });

  useEffect(() => {
    listActions().then(setActions);
    listSuppliers().then(setSuppliers);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.supplierId || !form.issue) return;
    const created = await addAction(form);
    setActions(prev => [created, ...prev]);
    setForm({ supplierId: '', issue: '', dueDate: '', owner: '', status: 'Open' });
  };

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Corrective Actions</div>
      </div>
      <div className="card mt-2">
        <div className="text-sm text-muted mb-2">Create corrective action plan</div>
        <form onSubmit={submit} className="grid grid-4">
          <div>
            <label className="label">Supplier</label>
            <select className="select" value={form.supplierId} onChange={e => setForm(f => ({ ...f, supplierId: e.target.value }))}>
              <option value="">Select supplier</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Issue</label>
            <input className="input" value={form.issue} onChange={e => setForm(f => ({ ...f, issue: e.target.value }))} placeholder="Describe issue" />
          </div>
          <div>
            <label className="label">Due Date</label>
            <input className="input" type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          </div>
          <div>
            <label className="label">Owner</label>
            <input className="input" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="Person responsible" />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="flex items-center" style={{ gridColumn: 'span 3 / span 3' }}>
            <button className="btn" type="submit" style={{ marginTop: 22 }}>Add</button>
          </div>
        </form>
      </div>
      <div className="card mt-2">
        <table className="table">
          <thead><tr><th>Supplier</th><th>Issue</th><th>Due</th><th>Owner</th><th>Status</th></tr></thead>
          <tbody>
            {actions.map(a => (
              <tr key={a.id}>
                <td>{suppliers.find(s => s.id === a.supplierId)?.name || a.supplierId}</td>
                <td>{a.issue}</td>
                <td>{a.dueDate || '-'}</td>
                <td>{a.owner || '-'}</td>
                <td><span className={`tag ${a.status === 'Closed' ? 'green' : a.status === 'Open' ? 'red' : 'yellow'}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
