import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserByID } from './useGetUserByID'
import { useSelector } from 'react-redux'
import { useCreateAppointment } from './useCreateAppointment'
import { useGetAvailableSlots } from './useGetAvailableSlots'

function NewAppointMent() {
  const { doctorID } = useParams()
  const user = useSelector((state) => state.auth.user)
  const { createAppointment, isPending } = useCreateAppointment()

  const [dateError, setDateError] = useState('')
  const { data: doctor, isLoading, error } = useGetUserByID(doctorID)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm()

  const watchedDate = watch('date', '')
  const {
    slots,
    isPending: slotsLoading,
    error: slotsError,
  } = useGetAvailableSlots(doctorID, watchedDate)

  function getWeekdayName(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  useEffect(() => {
    if (doctor && watchedDate) {
      const date = new Date(watchedDate)
      const weekday = getWeekdayName(date)

      if (
        doctor.days &&
        doctor.days.length > 0 &&
        !doctor.days.includes(weekday)
      ) {
        setDateError(
          `Doctor is not available on ${weekday}. Please select another day.`,
        )
        setValue('slot', '')
        return
      } else {
        setDateError('')
      }
    } else {
      setDateError('')
    }
    setValue('slot', '')
  }, [doctor, watchedDate, setValue])

  const onSubmit = async (formData) => {
    const { slot, date, note } = formData
    const slotStart = slot.split('-')[0]
    const slotEnd = slot.split('-')[1]
    const appointmentData = {
      slotStart,
      slotEnd,
      date,
      note,
      patient: user._id,
      doctor: doctorID,
      status: 'pending',
    }

    createAppointment(appointmentData, {
      onSuccess: (data) => {
        // Navigate to payment page with the created appointment data
        console.log('data', data)
        navigate(`/dashboard/payment?appointmentID=${data.appointment._id}&doctorID=${doctorID}`)
        reset()
        setValue('date', '')
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg py-10 px-4">
      {isLoading ? (
        <div className="text-center text-lg">Loading doctor...</div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : doctor ? (
        <form
          className="bg-surface border border-border rounded-lg shadow p-8 w-full max-w-md space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">
            Book an Appointment with Dr. {doctor.name}
          </h2>

          {doctor.days && doctor.days.length > 0 && (
            <div className="mb-2 text-center">
              <span className="font-medium text-text">Sitting Days: </span>
              <span className="text-primary font-semibold">
                {doctor.days.join(', ')}
              </span>
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-text">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2"
              min={format(new Date(), 'yyyy-MM-dd')}
              {...register('date', { required: 'Please select a date' })}
              onChange={(e) => {
                setValue('date', e.target.value)
              }}
            />
            {dateError && (
              <span className="text-danger text-sm">{dateError}</span>
            )}
            {errors.date && (
              <span className="text-danger text-sm">{errors.date.message}</span>
            )}
          </div>

          {watchedDate && !dateError && (
            <div>
              <label className="block mb-1 text-sm font-medium text-text">
                Available Slots
              </label>
              {slotsLoading ? (
                <div className="text-muted text-sm">
                  Loading available slots...
                </div>
              ) : slotsError ? (
                <div className="text-danger text-sm">{slotsError}</div>
              ) : slots.length === 0 ? (
                <div className="text-muted text-sm">
                  No slots available for this day.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {slots.map((slot, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={`${slot.start}-${slot.end}`}
                        {...register('slot', {
                          required: 'Please select a slot',
                        })}
                      />
                      <span>
                        {format(
                          new Date(`2000-01-01T${slot.start}`),
                          'hh:mm a',
                        )}{' '}
                        -{' '}
                        {format(new Date(`2000-01-01T${slot.end}`), 'hh:mm a')}
                      </span>
                    </label>
                  ))}
                  {errors.slot && (
                    <span className="text-danger text-sm">
                      {errors.slot.message}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-text">
              Reason / Notes (optional)
            </label>
            <textarea
              className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2"
              rows={3}
              placeholder="Describe your reason or any notes..."
              {...register('note')}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-primary  text-surface cursor-pointer font-bold shadow hover:bg-primary-light transition"
            disabled={!watchedDate || slots.length === 0 || slotsLoading}
          >
            {isPending ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      ) : null}
    </div>
  )
}

export default NewAppointMent
