import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../ui/Button'
import SignupForm from '../features/authentication/SignupForm'

function Signup() {
  const [type, setType] = useState('patient')

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md bg-surface border border-border">
        <div className="flex justify-center mb-4">
          <div
            className={`${type === 'patient' ? 'bg-primary text-surface' : 'bg-surface text-primary'}`}
          >
            <Button onClick={setType} type={'patient'}>
              Patient
            </Button>
          </div>
          <div
            className={`${type === 'doctor' ? 'bg-primary text-surface' : 'bg-surface text-primary'}`}
          >
            <Button onClick={setType} type={'doctor'}>
              Doctor
            </Button>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-primary">
          Sign Up as {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        <SignupForm type={type} />

        <p className="text-sm text-center text-muted">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
