import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUpdateMe } from './useUpdateMe'

function PatientSettings() {
  const user = useSelector((state) => state.auth.user)
  const { updateMe, isPending } = useUpdateMe()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      twoFactorEnabled: user?.twoFactorEnabled || false,
    },
  })

  function onSubmit(data) {
    const formData = new FormData()
    if (data.name) formData.append('name', data.name)
    if (data.phone) formData.append('phone', data.phone)
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture[0])
    }
    formData.append('twoFactorEnabled', data.twoFactorEnabled)
    updateMe(formData)
  }

  const twoFactorEnabled = watch('twoFactorEnabled')

  const handleTwoFactorToggle = () => {
    setValue('twoFactorEnabled', !twoFactorEnabled)
  }

  return (
    <form
      className="space-y-4 max-w-md mx-auto mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold mb-4">Patient Settings</h2>

      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={() => navigate('/dashboard/change-password')}
          className="px-6 py-2 bg-secondary text-white border cursor-pointer border-border rounded-lg hover:bg-secondary-light transition-colors duration-200 font-medium"
        >
          Reset Password
        </button>
      </div>

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
          value={user?.email}
          className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border bg-gray-500 border-border"
          placeholder="Enter your email"
          disabled
        />
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

      <div>
        <label className="block mb-2 text-sm font-medium text-text">
          Two-Factor Authentication
        </label>
        <div className="flex items-center justify-between p-4 bg-bg border border-border rounded-lg">
          <div>
            <p className="text-sm font-medium text-text">Enable 2FA</p>
            <p className="text-xs text-muted mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleTwoFactorToggle}
              className="sr-only"
              {...register('twoFactorEnabled')}
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                twoFactorEnabled ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>
        </div>
        <p className="text-xs text-muted mt-1">
          {twoFactorEnabled
            ? 'Two-factor authentication is enabled. You will receive a code via email/SMS for login.'
            : 'Two-factor authentication is disabled. Enable for enhanced security.'}
        </p>
      </div>

      <label className="block mb-1 text-sm font-medium text-text">
        Upload Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 border border-border"
        {...register('profilePicture')}
      />

      <button
        type="submit"
        className="w-full py-2 font-semibold rounded transition bg-primary cursor-pointer text-surface hover:bg-primary/90"
        disabled={isPending}
      >
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  )
}

export default PatientSettings
