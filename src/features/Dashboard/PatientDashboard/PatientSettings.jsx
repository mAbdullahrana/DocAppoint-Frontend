import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useUpdateMe } from './useUpdateMe'

function PatientSettings() {
  const user = useSelector((state) => state.auth.user)
  const { updateMe, isPending } = useUpdateMe()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
  })

  function onSubmit(data) {
    const formData = new FormData()
    if (data.name) formData.append('name', data.name)
    if (data.phone) formData.append('phone', data.phone)
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture[0])
    }
    updateMe(formData)
  }

  return (
    <form
      className="space-y-4 max-w-md mx-auto mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold mb-4">Patient Settings</h2>
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
