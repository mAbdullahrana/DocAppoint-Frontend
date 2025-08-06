import { useForm } from 'react-hook-form'
import { useSignup } from './useSignup'

function SignupForm({ type }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm()
  const { signUp, isPending } = useSignup()


  function onSubmit(userData) {
    if (!userData.email || !userData.name || !userData.password) return
    userData.role = type === 'doctor' ? 'doctor' : 'patient'
    console.log(userData)
    signUp(userData)
    reset()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-1 text-sm font-medium text-text">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
          placeholder="Enter your name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
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
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-text">
          Phone
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
          placeholder="Enter your phone number"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      {type === 'doctor' && (
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Specialization
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
            placeholder="Enter your specialization"
            {...register('specialization', {
              required: 'Specialization is required',
            })}
          />
          {errors.specialization && (
            <span className="text-red-500 text-sm">
              {errors.specialization.message}
            </span>
          )}
        </div>
      )}
      <div>
        <label className="block mb-1 text-sm font-medium text-text">
          Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
          placeholder="Enter your password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-text">
          Password Confirm
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
          placeholder="Enter your password"
          {...register('passwordConfirm', {
            required: 'Password  is required',
            validate: (value) => {
              if (watch('password') !== value) {
                return 'Password do not match'
              }
              return true
            },
          })}
        />
        {errors.passwordConfirm && (
          <span className="text-red-500 text-sm">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 font-semibold rounded transition bg-primary cursor-pointer text-surface hover:bg-primary/90"
      >
        {isPending ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignupForm
