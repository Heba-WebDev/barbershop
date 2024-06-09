export const getDateWithTime = (time: string): Date | null => {
  const date = new Date(`1970-01-01T${time}:00.000Z`)

  if (isNaN(date.getTime())) return null

  return date
}
