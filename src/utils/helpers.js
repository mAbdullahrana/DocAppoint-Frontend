export function timeToISO(timeStr) {
  if (!timeStr) return ''
  const [hours, minutes] = timeStr.split(':')
  const now = new Date()
  now.setHours(Number(hours), Number(minutes), 0, 0)
  return now.toISOString()
}

export function isoToTime(isoStr) {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export function formatTime(isoStr) {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  console.log(date)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

