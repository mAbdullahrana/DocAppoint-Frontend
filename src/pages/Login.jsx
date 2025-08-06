import { Link } from 'react-router-dom'
import LoginForm from '../features/authentication/LoginForm'
import GoogleButton from '../ui/GoogleButton'

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md bg-surface border border-border">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        <LoginForm />

        <GoogleButton />

        <p className="text-sm text-center text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="hover:underline text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
