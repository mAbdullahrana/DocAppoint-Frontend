import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Hero Section */}
      <section
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-16 px-4 md:px-12"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))' }}
      >
        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm text-text leading-16"
            
          >
            Book Medical Appointments Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-300">
            MedAppoint connects patients and doctors for fast, secure, and convenient appointment scheduling. Your health, just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/login">
              <button
                className="px-6 py-3 font-semibold rounded shadow transition w-full sm:w-auto cursor-pointer"
                style={{ background: 'var(--color-primary)', color: 'var(--color-surface)' }}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                className="px-6 py-3 font-semibold rounded shadow transition w-full sm:w-auto cursor-pointer"
                style={{ background: 'var(--color-secondary)', color: 'var(--color-surface)' }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Doctor and patient illustration"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-12 px-4 md:px-12 border-t"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>
          Why Choose MedAppoint?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div
            className="flex flex-col items-center text-center p-6 rounded-lg shadow hover:shadow-lg transition"
            style={{ background: 'var(--color-bg)' }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Easy Scheduling"
              className="w-16 h-16 mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
              Easy Scheduling
            </h3>
            <p style={{ color: 'var(--color-muted)' }}>Book appointments in seconds with our intuitive interface.</p>
          </div>
          <div
            className="flex flex-col items-center text-center p-6 rounded-lg shadow hover:shadow-lg transition"
            style={{ background: 'var(--color-bg)' }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
              alt="Secure & Private"
              className="w-16 h-16 mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
              Secure & Private
            </h3>
            <p style={{ color: 'var(--color-muted)' }}>Your data is protected with top-tier security and privacy standards.</p>
          </div>
          <div
            className="flex flex-col items-center text-center p-6 rounded-lg shadow hover:shadow-lg transition"
            style={{ background: 'var(--color-bg)' }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="Reminders"
              className="w-16 h-16 mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
              Reminders
            </h3>
            <p style={{ color: 'var(--color-muted)' }}>Get timely reminders so you never miss an appointment.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-12 px-4 md:px-12 text-center"
        style={{ background: 'linear-gradient(90deg, var(--color-primary-light), var(--color-secondary))', color: 'var(--color-surface)' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control of your health?</h2>
        <p className="text-lg mb-8">Sign up now and experience hassle-free medical appointment booking!</p>
        <Link to="/signup">
          <button
            className="px-8 py-4 font-bold rounded shadow-lg transition text-lg"
            style={{ background: 'var(--color-accent)', color: 'var(--color-surface)' }}
          >
            Get Started
          </button>
        </Link>
      </section>
    </div>
  )
}

export default Home
