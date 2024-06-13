import { Injectable } from '@nestjs/common'
import { type CreateAppointmentDto } from './dto/create-appointment.dto'
import { PrismaService } from '../prisma/prisma.service'
import { type UUID } from 'crypto'
import { ServiceService } from '../service/service.service'
import { handleErrorExceptions } from '../common/utils'
import { CompanyService } from '../company/company.service'
import { type User } from '../auth/interfaces'
import { type FindAppointmentDto } from './dto/find-appointment.dto'

@Injectable()
export class AppointmentService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly serviceService: ServiceService,
    private readonly companyService: CompanyService
  ) {}

  async get (user: User, findAppointmentDto: FindAppointmentDto) {
    const { state } = findAppointmentDto
    try {
      return await this.prisma.appointment.findMany({
        where: { user_id: user.id, state },
        select: {
          employee: {
            select: {
              company: {
                select: {
                  id: true,
                  name: true
                }
              },
              user: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          id: true,
          start_date: true,
          start_time: true,
          state: true,
          ServiceAppointment: { select: { service: { select: { name: true, id: true } } } }
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async getAppointmetForCompany (user: User) {
    try {
      const company = await this.companyService.findCompanyForOwner(user.id as UUID)

      return await this.prisma.appointment.findMany({
        where: {
          employee: { company }
        },
        select: {
          employee: { select: { user: { select: { name: true } } } },
          start_date: true,
          start_time: true,
          state: true,
          total: true,
          ServiceAppointment: { select: { service: { select: { name: true, id: true } } } }
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

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

      const { ...rest } = await this.prisma.appointment.create({
        data: {
          start_date: new Date(date),
          start_time: new Date(startDate),
          employee_id: employeeID,
          user_id: user.id,
          total,
          ...data
        },
        select: {
          employee: {
            select: {
              company: {
                select: {
                  id: true,
                  name: true
                }
              },
              user: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          id: true,
          start_date: true,
          start_time: true,
          state: true
        }
      })

      await this.createServiceForAppointment(services, rest.id as UUID)

      const serviceAppointment = await this.findAllServiceForAppointment(rest.id as UUID)

      return {
        ...rest,
        serviceAppointment
      }
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async createServiceForAppointment (services: UUID[], appointmentID: UUID) {
    const serviceFormated = services.map(service => (
      {
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

  async findAllServiceForAppointment (appointmentID: UUID) {
    try {
      return await this.prisma.serviceAppointment.findMany({
        where: {
          appointment_id: appointmentID
        },
        select: {
          service: {
            select: {
              name: true,
              id: true
            }
          }
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }
}
