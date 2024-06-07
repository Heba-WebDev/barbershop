import { type CreateAppointmentDto } from 'src/appointment/dto/create-appointment.dto'

type Appointment = CreateAppointmentDto & { total: number }

export const appointmentMock: Appointment = {
  startDate: '2024-05-07T17:00:00',
  total: 1000,
  employeeID: '53aa4769-829b-4a02-9a60-3011aee05403',
  services: [
    '8cf59fd9-a442-492c-bef3-a3af8ae7c12f',
    '90c6c522-f7fb-437d-bcb3-f5b58d7ea267'
  ]
}
