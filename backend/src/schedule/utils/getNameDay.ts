import { type $Enums } from '@prisma/client'

export const getNameDay = (day: number) => {
  const dayNames: $Enums.Day[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  return dayNames[day]
}
