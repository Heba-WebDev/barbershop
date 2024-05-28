import { Test, type TestingModule } from '@nestjs/testing'
import { AppointmentService } from './appointment.service'
import { validate } from 'class-validator'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { plainToInstance } from 'class-transformer'
import { appointmentMock } from '../../test/mocks/appointment.mock'
import { AppointmentController } from './appointment.controller'
import { PrismaService } from '../prisma/prisma.service'
import { prismaMock } from '../../test/mocks/prisma.mock'
import { AuthService } from '../auth/auth.service'

const createAppointmentDto = plainToInstance(CreateAppointmentDto, appointmentMock)

describe('AppointmentService', () => {
  let appointmentService: AppointmentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ]
    }).compile()

    appointmentService = module.get<AppointmentService>(AppointmentService)
    prismaMock.appointment.create.mockClear()
  })

  describe('Create appointment', () => {
    beforeEach(async () => {
      const error = await validate(createAppointmentDto)
      expect(error.length).toBe(0)
    })
    it('should return a new appointment', async () => {
      prismaMock.employeeCompany.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      prismaMock.service.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      prismaMock.serviceAppointment.createMany.mockResolvedValue({
        id: 'randomUUID'
      })
      prismaMock.appointment.create.mockResolvedValue({
        ...appointmentMock,
        id: 'randomUUID'
      })

      await appointmentService.create(createAppointmentDto)

      expect(prismaMock.employeeCompany.findUnique).toHaveBeenCalledTimes(1)
    })
  })
})
