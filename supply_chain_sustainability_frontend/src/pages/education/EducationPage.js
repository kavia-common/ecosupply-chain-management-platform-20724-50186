import React, { useEffect, useState } from 'react';
import { listResources } from '../../services/educationService';

// PUBLIC_INTERFACE
export default function EducationPage() {
  /** Educational resources library for users and suppliers. */
  const [items, setItems] = useState([]);

  useEffect(() => { listResources().then(setItems); }, []);

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Educational Resources</div>
        <button className="btn ghost small">Add Resource</button>
      </div>
      <div className="grid grid-3 mt-2">
        {items.map(r => (
          <div key={r.id} className="card">
            <div className="text-lg">{r.title}</div>
            <div className="text-sm text-muted">{r.type} · {r.level}</div>
            <a className="btn small mt-2" href={r.url}>Open</a>
          </div>
        ))}
      </div>
    </>
  );
}
