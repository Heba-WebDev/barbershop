import { Injectable, NotFoundException } from '@nestjs/common'
import { type CreateAppointmentDto } from './dto/create-appointment.dto'
import { PrismaService } from '../prisma/prisma.service'
import { type UUID } from 'crypto'
import { AuthService } from '../auth/auth.service'
import { ServiceService } from '../service/service.service'
import { handleErrorExceptions } from '../common/utils'

@Injectable()
export class AppointmentService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly serviceService: ServiceService
  ) {}

  async create (createAppointmentDto: CreateAppointmentDto) {
    const { startDate, services, ...data } = createAppointmentDto
    const dateTime = new Date(startDate)

    const date = dateTime.toISOString().split('T')[0]

    //! llamar desde sus respectivos modulos
    const existEmployee = await this.findEmployeeByUUID(createAppointmentDto.employee_id)
    const existUser = await this.authService.findUserByUUID(createAppointmentDto.user_id)

    await Promise.all(createAppointmentDto.services.map(async service => {
      const serviceFound = await this.serviceService.findServiceUUID(service)
      if (!serviceFound) throw new NotFoundException(`${service} Service not found`)
    }))

    if (!existEmployee) throw new NotFoundException('Employee not exist')
    if (!existUser) throw new NotFoundException('User not exist')

    try {
      const appointment = await this.prisma.appointment.create({
        data: {
          start_date: new Date(date),
          start_time: new Date(startDate),
          ...data
        }
      })

      return await this.createserviceForAppointment(services, appointment.id as UUID)
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async createserviceForAppointment (services: UUID[], appointmentID: UUID) {
    const serviceFormated = services.map(service => ({
      appointment_id: appointmentID,
      service_id: service
    }))

    try {
      return await this.prisma.serviceAppointment.createMany({
        data: serviceFormated
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  //! move to module Employee
  async findEmployeeByUUID (id: UUID) {
    try {
      return await this.prisma.employeeCompany.findUnique({
        where: { id }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }
}
