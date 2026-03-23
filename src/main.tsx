import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100vh', gap: '12px',
          fontFamily: 'Inter, sans-serif', color: '#5a5f6a', background: '#f9f9ff'
        }}>
          <span style={{ fontSize: 48 }}>⚠️</span>
          <h2 style={{ margin: 0, color: '#2d333d', fontSize: 20 }}>Algo salió mal</h2>
          <p style={{ margin: 0, fontSize: 14 }}>{this.state.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8, padding: '10px 24px', background: '#0262a5',
              color: '#fff', border: 'none', borderRadius: 10,
              cursor: 'pointer', fontWeight: 700, fontSize: 14
            }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('No se encontró el elemento #root en el HTML.');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
