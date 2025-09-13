import React from 'react';

// PUBLIC_INTERFACE
export default class ErrorBoundary extends React.Component {
  /** Catches render/runtime errors in children components and displays a fallback UI. */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('UI error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
          <h2>Something went wrong.</h2>
          <p style={{ color: '#6b7280' }}>
            An error occurred while rendering the application. Please refresh the page. If the issue persists, contact support.
          </p>
          <pre style={{ background: '#f6f8fb', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
