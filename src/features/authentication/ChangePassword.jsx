import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useChangePassword } from './useChangePassword'

function ChangePassword() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const newPassword = watch('newPassword')

  const { changePassword, isPending } = useChangePassword()

  async function handleChangePassword(data) {
    changePassword(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      },
      {
        onSuccess: () => {
          reset()
        },
      },
    )

    // TODO: Implement API call to change password
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/change-password`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({
    //     oldPassword: data.oldPassword,
    //     newPassword: data.newPassword,
    //   }),
    // })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md bg-surface border border-border">
        <h2 className="text-2xl font-bold text-center text-primary">
          Change Password
        </h2>
        <p className="text-sm text-center text-muted">
          Enter your current password and choose a new password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-text">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
              placeholder="Enter your current password"
              {...register('oldPassword', {
                required: 'Current password is required',
              })}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-text">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
              placeholder="Enter new password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-text">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
              placeholder="Confirm new password"
              {...register('confirmNewPassword', {
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              })}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded transition bg-primary text-surface cursor-pointer hover:bg-primary/90"
            disabled={isPending}
          >
            {isPending ? 'Changing...' : 'Change Password'}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-sm text-primary hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
