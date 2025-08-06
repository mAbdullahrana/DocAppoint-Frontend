import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-bg text-text"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="bg-surface border border-border rounded shadow-lg p-10 flex flex-col items-center">
        <h1
          className="text-6xl font-extrabold mb-4 text-primary"
          style={{ color: 'var(--color-primary)' }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--color-primary-light)' }}
        >
          Page Not Found
        </h2>
        <p
          className="text-muted mb-6 text-center"
          style={{ color: 'var(--color-muted)' }}
        >
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <button
            className="px-6 py-3 font-semibold rounded shadow transition bg-primary text-surface hover:bg-primary-light"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-surface)',
            }}
          >
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
