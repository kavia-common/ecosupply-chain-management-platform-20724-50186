import React, { useState } from 'react';
import FileUploader from '../../components/common/FileUploader';
import { ingestFromAPI, ingestFromFile } from '../../services/ingestionService';

// PUBLIC_INTERFACE
export default function IngestionPage() {
  /** Automated data ingestion from files or APIs (simulated). */
  const [apiUrl, setApiUrl] = useState('https://example.com/mock');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (file) => {
    setBusy(true); setResult(null);
    try {
      const res = await ingestFromFile(file);
      setResult(res);
    } finally { setBusy(false); }
  };

  const onAPI = async () => {
    setBusy(true); setResult(null);
    try {
      const res = await ingestFromAPI(apiUrl);
      setResult(res);
    } finally { setBusy(false); }
  };

  return (
    <>
      <div className="card card-header">
        <div className="text-lg">Data Ingestion</div>
        <span className="text-sm text-muted">Upload files or fetch from APIs</span>
      </div>
      <div className="grid grid-2 mt-2">
        <FileUploader onUpload={onFile} />
        <div className="card">
          <div className="label">External API URL</div>
          <div className="flex items-center gap-3">
            <input className="input" value={apiUrl} onChange={e => setApiUrl(e.target.value)} />
            <button className="btn" onClick={onAPI} disabled={busy}>{busy ? 'Fetching...' : 'Fetch'}</button>
          </div>
        </div>
      </div>
      {result && (
        <div className="card mt-2">
          <div className="text-lg">Ingestion Result</div>
          <div className="text-sm text-muted">Records: {result.count}</div>
          <pre style={{ whiteSpace: 'pre-wrap' }} className="mt-2">{JSON.stringify(result.preview, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
