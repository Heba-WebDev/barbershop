import { Injectable } from '@nestjs/common'
import { type CreateAppointmentDto } from './dto/create-appointment.dto'
import { PrismaService } from '../prisma/prisma.service'
import { type UUID } from 'crypto'
import { ServiceService } from '../service/service.service'
import { handleErrorExceptions } from '../common/utils'
import { CompanyService } from '../company/company.service'
import { type User } from '../auth/interfaces'

@Injectable()
export class AppointmentService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly serviceService: ServiceService,
    private readonly companyService: CompanyService
  ) {}

  async create (createAppointmentDto: CreateAppointmentDto, user: User) {
    try {
      const { startDate, services, employeeID, ...data } = createAppointmentDto
      const dateTime = new Date(startDate)

      const date = dateTime.toISOString().split('T')[0]

      await this.companyService.findEmployeeByUserUUID(createAppointmentDto.employeeID)

      let total = 0
      const servicePromise = createAppointmentDto.services.map(async service => {
        const serviceFound = await this.serviceService.findServiceUUID(service)
        return serviceFound.price
      })

      const prices = await Promise.all(servicePromise)
      total = prices.reduce((acc, price) => acc + price, 0)

      const { employee, ...rest } = await this.prisma.appointment.create({
        data: {
          start_date: new Date(date),
          start_time: new Date(startDate),
          employee_id: employeeID,
          user_id: user.id,
          total,
          ...data
        },
        select: {
          id: true,
          start_date: true,
          start_time: true,
          state: true,
          total: true,
          employee: { select: { user: { select: { name: true } } } }
        }
      })

      await this.createserviceForAppointment(services, rest.id as UUID)

      return {
        ...rest,
        employee: employee.user.name
      }
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
}
