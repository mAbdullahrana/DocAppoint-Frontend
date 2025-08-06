export async function createAppointmentApi(newAppointment, token) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAppointment),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Create appointment failed')
    }

    return data
  } catch (err) {
    console.error('Create appointment API error:', err)
    throw err
  }
}

export async function getAppointmentsByUserIDApi(userID, token) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/appointments/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Get doctor appointments failed')
    }
    console.log('data', data)
    return data
  } catch (err) {
    console.error('Get doctor appointments API error:', err)
    throw err
  }
}

export async function updateAppointmentApi(appointmentID, appointment, token) {

  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/appointments/${appointmentID}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointment),
      },
    )
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Update appointment failed')
    }
    console.log('data', data)
    return data
  } catch (err) {
    console.error('Update appointment API error:', err)
    throw err
  }
}

export async function getAvailableSlotsApi(doctorID, date) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/appointments/available-slots/${doctorID}/${date}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Get available slots failed')
    }

    return data
  } catch (err) {
    console.error('Get available slots API error:', err)
    throw err
  }
}

export async function getAppointmentApi(appointmentID, token) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/appointments/${appointmentID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()   
    if (!res.ok) {
      throw new Error(data.message || 'Get appointment failed')
    }
    return data 
  } catch (err) {
    console.error('Get appointment API error:', err)
    throw err
  }
}