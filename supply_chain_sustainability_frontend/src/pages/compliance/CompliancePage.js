import React, { useEffect, useState } from 'react';
import { listRegulations } from '../../services/complianceService';
import { date } from '../../utils/format';

// PUBLIC_INTERFACE
export default function CompliancePage() {
  /** Manage regulatory frameworks and compliance progress. */
  const [regs, setRegs] = useState([]);

  useEffect(() => { listRegulations().then(setRegs); }, []);

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Compliance Manager</div>
        <button className="btn ghost small">Add Regulation</button>
      </div>
      <div className="card mt-2">
        <table className="table">
          <thead><tr><th>Regulation</th><th>Status</th><th>Due</th><th></th></tr></thead>
          <tbody>
            {regs.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td><span className={`tag ${r.status === 'Compliant' ? 'green' : r.status === 'Pending' ? 'yellow' : 'blue'}`}>{r.status}</span></td>
                <td>{date(r.dueDate)}</td>
                <td><button className="btn small">Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
