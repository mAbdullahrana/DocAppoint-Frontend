import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useGetAppointment } from '../Appointments/useGetAppointment'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { useCreateReview } from './useCreateReview'
import { useGetReviewByAppointmentID } from './useGetReviewByAppointmentID'

function Review() {
  const { appointmentID } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const { appointment, isPending, error } = useGetAppointment(appointmentID)
  const { review, isPending: isGettingReview, error: getReviewError } = useGetReviewByAppointmentID(appointmentID)
  const { createReview, isPending: isCreatingReview, error: createReviewError } = useCreateReview()   
  const {
    register,       
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm()

  console.log("review",  review?.review[0]?.rating)
  useEffect(() => {
    if (review) {
          setRating( review?.review[0]?.rating)
          setValue('comment', review?.review[0]?.comment)
    }
  }, [review, setValue])

  const comment = watch('comment', '')

  const handleFormSubmit = async (data) => {
    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    try {
      const review = {
        doctor: appointment.appointment.doctor._id,
        appointment: appointmentID,
        patient: appointment.appointment.patient._id,
        rating,
        comment: data.comment
      }

      createReview(review)
      
    } catch (error) {
      toast.error(error.message || 'Failed to submit review')
    } 
  }

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(0)}
        className="text-2xl transition-colors focus:outline-none"
      >
        <svg
          className={`w-8 h-8 ${
            star <= (hoveredRating || rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    ))
  }

  if (isPending || isGettingReview) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center text-lg text-primary">
            Loading appointment details...
          </div>
        </div>
      </div>
    )
  }

  if (error || getReviewError) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center text-danger">
            Error: {error?.message || getReviewError?.message}
          </div>
          <button
            onClick={() => navigate('/dashboard/appointments')}
            className="mt-4 px-4 py-2 bg-primary text-surface rounded"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    )
  }

  if (!appointment?.appointment) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center text-danger">
            Appointment not found
          </div>
          <button
            onClick={() => navigate('/dashboard/appointments')}
            className="mt-4 px-4 py-2 bg-primary text-surface rounded"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    )
  }

  const appointmentData = appointment.appointment

  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Review Your Appointment
          </h1>
          <p className="text-muted">
            Share your experience with Dr. {appointmentData.doctor?.name}
          </p>
        </div>

        {/* Appointment Details */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Appointment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted">Doctor</p>
              <p className="font-medium text-text">
                Dr. {appointmentData.doctor?.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Patient</p>
              <p className="font-medium text-text">
                {appointmentData.patient?.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Date</p>
              <p className="font-medium text-text">
                {format(new Date(appointmentData.date), 'dd/MM/yyyy')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Time</p>
              <p className="font-medium text-text">
                {appointmentData.slotStart} - {appointmentData.slotEnd}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                appointmentData.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : appointmentData.status === 'confirmed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {appointmentData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Rate Your Experience
          </h2>

          {/* Rating Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text mb-3">
              Overall Rating *
            </label>
            <div className="flex items-center gap-1">
              {renderStars()}
            </div>
            <div className="mt-2 text-sm text-muted">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </div>
          </div>

          {/* Comment Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text mb-2">
              Share your experience *
            </label>
            <textarea
              {...register('comment', {
                required: 'Please share your experience',
                minLength: {
                  value: 10,
                  message: 'Review must be at least 10 characters'
                },
                maxLength: {
                  value: 500,
                  message: 'Review must be less than 500 characters'
                }
              })}
              rows={4}
              placeholder="Tell us about your appointment experience..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.comment ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>
            )}
            <div className="mt-1 text-xs text-muted text-right">
              {comment.length}/500 characters
            </div>
          </div>

         
          {review?.review[0]?.rating && (
            <div className="mt-6 text-center text-sm text-muted">
              You have already reviewed this appointment.
            </div>
          )}  
          {!review?.review[0]?.rating && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard/appointments')}
              className="flex-1 px-4 py-2 border border-border text-text rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
                disabled={isCreatingReview}
              className="flex-1 px-4 py-2 bg-primary text-surface rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Review
