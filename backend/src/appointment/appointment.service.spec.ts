import { Test, type TestingModule } from '@nestjs/testing'
import { AppointmentService } from './appointment.service'
import { validate } from 'class-validator'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { plainToInstance } from 'class-transformer'
import { appointmentMock, mockPrisma } from '../../test/mocks/'
import { AppointmentController } from './appointment.controller'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from '../auth/auth.service'
import { ServiceService } from '../service/service.service'
import { PassportModule } from '@nestjs/passport'
import { CompanyService } from '../company/company.service'

const createAppointmentDto = plainToInstance(CreateAppointmentDto, appointmentMock)

describe('AppointmentService', () => {
  let appointmentService: AppointmentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        AuthService,
        ServiceService,
        CompanyService,
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
    }).compile()

    appointmentService = module.get<AppointmentService>(AppointmentService)
    mockPrisma.appointment.create.mockClear()
  })

  describe('Create appointment', () => {
    beforeEach(async () => {
      const error = await validate(createAppointmentDto)
      expect(error.length).toBe(0)
    })
    it('should return a new appointment', async () => {
      mockPrisma.employeeCompany.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      mockPrisma.service.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      mockPrisma.serviceAppointment.createMany.mockResolvedValue({
        id: 'randomUUID'
      })
      mockPrisma.appointment.create.mockResolvedValue({
        ...appointmentMock,
        id: 'randomUUID'
      })

      await appointmentService.create(createAppointmentDto)

      expect(mockPrisma.employeeCompany.findUnique).toHaveBeenCalledTimes(1)
    })
  })
})
