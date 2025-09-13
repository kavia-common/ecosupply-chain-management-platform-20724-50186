import React from 'react';

// PUBLIC_INTERFACE
export default function Table({ columns, data, keyField = 'id', renderCell }) {
  /** Generic table component with customizable cell rendering. */
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row[keyField]}>
              {columns.map(col => (
                <td key={col.key}>
                  {renderCell ? renderCell(col, row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
