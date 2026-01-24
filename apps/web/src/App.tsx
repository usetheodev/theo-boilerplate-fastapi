import { useState, useEffect } from 'react'
import './App.css'

// Runtime config from Theo Build Pipeline
declare global {
  interface Window {
    ENV?: {
      API_URL?: string
      VITE_API_URL?: string
    }
  }
}

interface HealthResponse {
  status: string
  timestamp: string
  service: string
  version: string
  environment: string
  release_id: string | null
  build_id: string | null
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiUrl = window.ENV?.API_URL || window.ENV?.VITE_API_URL || ''

    fetch(`${apiUrl}/health`)
      .then((res) => res.json())
      .then((data) => {
        setHealth(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>🐍 Theo Boilerplate FastAPI</h1>
        <p>FastAPI + SQLModel + Alembic + UV</p>
      </header>

      <main className="main">
        <section className="card">
          <h2>API Health Status</h2>
          {loading && <p className="loading">Checking API health...</p>}
          {error && <p className="error">Error: {error}</p>}
          {health && (
            <div className="health-info">
              <div className="status">
                <span className={`badge ${health.status}`}>{health.status}</span>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>Service</td>
                    <td>{health.service}</td>
                  </tr>
                  <tr>
                    <td>Version</td>
                    <td>{health.version}</td>
                  </tr>
                  <tr>
                    <td>Environment</td>
                    <td>{health.environment}</td>
                  </tr>
                  {health.release_id && (
                    <tr>
                      <td>Release ID</td>
                      <td><code>{health.release_id}</code></td>
                    </tr>
                  )}
                  {health.build_id && (
                    <tr>
                      <td>Build ID</td>
                      <td><code>{health.build_id}</code></td>
                    </tr>
                  )}
                  <tr>
                    <td>Timestamp</td>
                    <td>{new Date(health.timestamp).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Stack</h2>
          <ul className="stack-list">
            <li>🐍 <strong>Python 3.12</strong> - Runtime</li>
            <li>⚡ <strong>FastAPI</strong> - Web Framework</li>
            <li>📦 <strong>UV</strong> - Package Manager</li>
            <li>🗄️ <strong>SQLModel</strong> - ORM</li>
            <li>🔄 <strong>Alembic</strong> - Migrations</li>
            <li>⚛️ <strong>React + Vite</strong> - Frontend</li>
          </ul>
        </section>

        <section className="card">
          <h2>API Docs</h2>
          <p>
            <a href="/docs" target="_blank" rel="noopener noreferrer">
              📚 Swagger UI (OpenAPI)
            </a>
          </p>
          <p>
            <a href="/redoc" target="_blank" rel="noopener noreferrer">
              📖 ReDoc
            </a>
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>Built with Theo Build Pipeline</p>
      </footer>
    </div>
  )
}

export default App
