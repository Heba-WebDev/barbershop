import { $Enums } from '@prisma/client'

export const mockSchedule = {
  id: 2,
  day: $Enums.Day.MONDAY,
  initial_start_date: '1970-01-01T09:00:00Z',
  initial_end_date: '1970-01-01T13:00:00Z',
  final_start_date: '1970-01-01T14:00:00Z',
  final_end_date: '1970-01-01T19:00:00Z',
  state: true,
  interval: 30
}
