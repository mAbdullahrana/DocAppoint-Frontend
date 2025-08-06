import { Link } from 'react-router-dom'

function AppLayout({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-bg">
        {/* Header */}
        <header className="bg-primary text-surface shadow-md">
          <div className="container mx-auto flex items-center justify-between py-4 px-4">
            <Link to="/" className="text-2xl font-bold tracking-tight ">
              MedAppoint
            </Link>
            <nav className="space-x-4 ">
              <Link to="/" className="hover:underline ">
                Home
              </Link>
              <Link to="/about" className="hover:underline ">
                About
              </Link>
              <Link to="/login" className="hover:underline ">
                Login
              </Link>
              <Link to="/signup" className="hover:underline ">
                Sign Up
              </Link>
            </nav>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 text-text">{children}</main>
        {/* Footer */}
      </div>
      <footer className="bg-primary text-surface text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} MedAppoint. All rights reserved.
      </footer>
    </>
  )
}

export default AppLayout
