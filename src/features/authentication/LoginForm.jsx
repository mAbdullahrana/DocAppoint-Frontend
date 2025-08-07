import { useForm } from 'react-hook-form'
import { useLogin } from './useLogin'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { login, isPending } = useLogin()
  const navigate = useNavigate()
  function onSubmit(data) {
    login(data, {
      onSuccess: () => {
        reset()
        navigate('/verify-otp')
      },
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-text">
          Email
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
          placeholder="Enter your email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-text">
          Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 font-semibold rounded transition bg-primary text-surface cursor-pointer hover:bg-primary/90"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginForm
