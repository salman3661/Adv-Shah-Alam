import React from 'react';

/**
 * Catches chunk-load failures (common after Vercel redeploy)
 * and automatically reloads the page once.
 */
class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, reloaded: false };
  }

  static getDerivedStateFromError(error) {
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      /Loading chunk/.test(error?.message || '') ||
      /Failed to fetch dynamically imported module/.test(error?.message || '') ||
      /dynamically imported module/.test(error?.message || '');
    return { hasError: true, isChunkError, errorMsg: error?.message || String(error) };
  }

  componentDidCatch(error, info) {
    console.error('[ChunkErrorBoundary] caught:', error, info);
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      /Loading chunk/.test(error?.message || '') ||
      /Failed to fetch dynamically imported module/.test(error?.message || '') ||
      /dynamically imported module/.test(error?.message || '');

    if (isChunkError && !sessionStorage.getItem('chunkReloaded')) {
      sessionStorage.setItem('chunkReloaded', '1');
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: '2rem',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.5rem', borderRadius: '0.5rem',
              background: 'var(--accent)', color: '#fff',
              border: 'none', cursor: 'pointer', fontWeight: 600,
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ChunkErrorBoundary;
