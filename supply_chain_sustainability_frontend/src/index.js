import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

document.title = 'Supply Chain Sustainability Portal';

const container = document.getElementById('root');
if (!container) {
  // Fail fast with a visible message if root container is missing.
  const msg = document.createElement('div');
  msg.style.padding = '24px';
  msg.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
  msg.innerText = 'Error: Root element #root not found in HTML. Please ensure public/index.html contains <div id="root"></div>.';
  document.body.appendChild(msg);
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
