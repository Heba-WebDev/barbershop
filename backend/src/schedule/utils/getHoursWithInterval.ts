import { getDateWithTime } from './getDateWithTime'
import { getTimeForDate } from './getTimeFromDate'

interface Props {
  initialHour: string
  finalHour: string
  interval: number
}

export const getHoursWithInterval = ({ initialHour, finalHour, interval }: Props): string[] | null => {
  const initialDate = getDateWithTime(initialHour)
  const finalDate = getDateWithTime(finalHour)

  if (isNaN(initialDate.getTime())) return null
  if (isNaN(finalDate.getTime())) return null
  if (initialDate.getTime() >= finalDate.getTime()) return null

  const hours = []

  while (initialDate.getTime() <= finalDate.getTime()) {
    const time = getTimeForDate(initialDate)

    hours.push(time)

    initialDate.setMinutes(initialDate.getMinutes() + interval)
  }

  return hours
}
