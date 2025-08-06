import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { formatTime, timeToISO } from '../../../utils/helpers'
import { useUpdateMe } from '../PatientDashboard/useUpdateMe'

function DoctorSettings() {
  const user = useSelector((state) => state.auth.user)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: formatTime(user?.startTime) || '',
      endTime: formatTime(user?.endTime) || '',
      duration: user?.duration || 30,
      days: user?.days || [],
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user?.days && Array.isArray(user.days)) {
      reset({
        startTime: formatTime(user?.startTime) || '',
        endTime: formatTime(user?.endTime) || '',
        duration: user?.duration || 30,
        days: user.days,
      })
    }
  }, [user, reset])

  const { updateMe, isPending } = useUpdateMe()

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  function onSubmit(data) {
    const formData = new FormData()
    if (data.startTime) formData.append('startTime', timeToISO(data.startTime))
    if (data.endTime) formData.append('endTime', timeToISO(data.endTime))
    if (data.duration) formData.append('duration', data.duration)
    if (data.days && Array.isArray(data.days)) {
      data.days.forEach((day) => formData.append('days', day))
    }
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture[0])
    }

    updateMe(formData)
  }

  const endTime = watch('endTime')
  const startTime = watch('startTime')
  const selectedDays = watch('days') || []

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg py-8">
      <div
        key={user?.id}
        className="w-full max-w-xl bg-surface border border-border rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Doctor Availability Settings
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-text">
                Start Time
              </label>
              <input
                type="time"
                {...register('startTime', {
                  validate: (value) => {
                    if (!value) return 'Start time is required'
                    if (startTime > endTime)
                      return 'Start time must be after end time'
                    return true
                  },
                })}
                className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-text"
              />
              {errors.startTime && (
                <p className="text-xs text-danger mt-1">
                  {errors.startTime.message}
                </p>
              )}
              <p className="text-xs text-muted mt-1">
                Doctor's first appointment time
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-text">
                End Time
              </label>
              <input
                type="time"
                {...register('endTime', {
                  required: 'End time is required',
                  validate: (value) => {
                    if (value < startTime)
                      return 'End time must be after start time'
                    return true
                  },
                })}
                className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-text"
              />
              {errors.endTime && (
                <p className="text-xs text-danger mt-1">
                  {errors.endTime.message}
                </p>
              )}
              <p className="text-xs text-muted mt-1">
                Doctor's last appointment time
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text">
              Appointment Duration (minutes)
            </label>
            <input
              type="number"
              min={5}
              max={120}
              step={5}
              {...register('duration', {
                required: 'Duration is required',
                min: 5,
                max: 120,
              })}
              className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-text"
            />
            {errors.duration && (
              <p className="text-xs text-danger mt-1">
                {errors.duration.message}
              </p>
            )}
            <p className="text-xs text-muted mt-1">
              How long is each appointment slot?
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text">
              Available Days
            </label>
            <div className="flex flex-wrap gap-3">
              {weekDays.map((day) => (
                <label
                  key={day}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border border-border cursor-pointer transition ${selectedDays.includes(day) ? 'bg-primary text-surface' : 'bg-bg text-text hover:bg-primary-light/10'}`}
                >
                  <input
                    type="checkbox"
                    value={day}
                    {...register('days')}
                    className="accent-primary"
                  />
                  {day}
                </label>
              ))}
            </div>
            {errors.days && (
              <p className="text-xs text-danger mt-1">{errors.days.message}</p>
            )}
            <p className="text-xs text-muted mt-1">
              Select all days you are available for appointments.
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-text">
              Upload Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('profilePicture')}
              className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-text"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold rounded transition cursor-pointer bg-primary text-surface hover:bg-primary-light text-lg shadow mt-4"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-surface)',
            }}
          >
            {isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default DoctorSettings
