import React, { useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function FileUploader({ onUpload }) {
  /** Basic file uploader that reads file content as text and returns metadata. */
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    onUpload && onUpload({ name: file.name, size: file.size, type: file.type, content: text });
  };

  return (
    <div className="card">
      <div className="label">Upload CSV/JSON</div>
      <div className="flex items-center gap-3">
        <button className="btn" onClick={() => inputRef.current?.click()}>Select File</button>
        <span className="text-sm text-muted">{fileName || 'No file chosen'}</span>
        <input ref={inputRef} type="file" accept=".csv,application/json,.json" style={{ display: 'none' }} onChange={handleChange} />
      </div>
    </div>
  );
}
