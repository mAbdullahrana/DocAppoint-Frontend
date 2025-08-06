import { MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

function PatientViewDoctors({doctors, handleChatClick, isPending}) {
  return (
    (
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-surface text-xl font-bold">
                {doc.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary">{doc.name}</h2>
                <p className="text-muted text-sm">{doc.email}</p>
              </div>
            </div>
  
            <div className="flex gap-2 mt-auto">
              <Link
                to={`/dashboard/appointments/new/${doc._id}`}
                className="flex-1 px-4 py-2 rounded bg-primary text-surface font-bold shadow hover:bg-primary-light transition text-center"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-surface)',
                }}
              >
                Book Appointment
              </Link>
              <button
                onClick={() => handleChatClick(doc._id)}
                disabled={isPending}
                className="px-4 py-2 rounded bg-secondary text-surface font-bold shadow hover:bg-secondary-light transition flex items-center gap-2"
                style={{
                  background: 'var(--color-secondary)',
                  color: 'var(--color-surface)',
                }}
              >
                <MessageCircle size={16} />
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  )
}

export default PatientViewDoctors
