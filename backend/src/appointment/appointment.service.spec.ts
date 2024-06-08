import { Test, type TestingModule } from '@nestjs/testing'
import { AppointmentService } from './appointment.service'
import { validate } from 'class-validator'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { plainToInstance } from 'class-transformer'
import { appointmentMock, mockPrisma, mockUser, serviceMock } from '../../test/mocks/'
import { AppointmentController } from './appointment.controller'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from '../auth/auth.service'
import { ServiceService } from '../service/service.service'
import { PassportModule } from '@nestjs/passport'
import { CompanyService } from '../company/company.service'
import { type User } from '../auth/interfaces'
import { type UUID } from 'crypto'

const createAppointmentDto = plainToInstance(CreateAppointmentDto, appointmentMock)

describe('AppointmentService', () => {
  let appointmentService: AppointmentService
  let companyService: CompanyService
  let serviceService: ServiceService

  const newMockUser: User = {
    id: 'randomUUID',
    email: mockUser.email,
    name: mockUser.name,
    phoneNumber: mockUser.phoneNumber,
    role: ['CLIENT']
  }

  const newMockAppointment = {
    id: 'ac6ad522-b125-484c-9664-d7f2ac92d668',
    start_date: '2024-05-07T00:00:00.000Z',
    start_time: '1970-01-01T21:00:00.000Z',
    state: 'PENDING',
    total: 10050,
    employee: 'Annie Spinka'
  }

  const newMockService: UUID[] = ['79785aa3-16fb-4108-87a7-966d4ee6bd0f']

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        ServiceService,
        CompanyService,
        {
          provide: AuthService,
          useValue: jest.fn()
        },
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
    }).compile()

    appointmentService = module.get<AppointmentService>(AppointmentService)
    companyService = module.get<CompanyService>(CompanyService)
    serviceService = module.get<ServiceService>(ServiceService)
    mockPrisma.appointment.create.mockClear()
  })

  describe('Create appointment', () => {
    beforeEach(async () => {
      const error = await validate(createAppointmentDto)
      expect(error.length).toBe(0)
    })
    it('should return a new appointment', async () => {
      jest.spyOn(companyService, 'findEmployeeByUserUUID').mockResolvedValue({
        id: 'randomUUID',
        is_active: true,
        user_id: 'randomUUID',
        company_id: 'randomUUID'
      })

      jest.spyOn(serviceService, 'findServiceUUID').mockResolvedValue({
        ...serviceMock,
        is_active: true,
        id: 'randomUUID',
        price: 1,
        avatar: '',
        is_visible: true,
        company_id: ''
      })

      mockPrisma.appointment.create.mockResolvedValue({
        id: 'ac6ad522-b125-484c-9664-d7f2ac92d668',
        start_date: '2024-05-07T00:00:00.000Z',
        start_time: '1970-01-01T21:00:00.000Z',
        state: 'PENDING',
        total: 10050,
        employee: {
          user: {
            name: 'Annie Spinka'
          }
        }
      })

      const result = await appointmentService.create(appointmentMock, newMockUser)

      expect(result).toEqual({
        ...newMockAppointment
      })
    })
  })
  describe('Create Service relations to appointment', () => {
    it('Should return count create', async () => {
      mockPrisma.serviceAppointment.createMany.mockResolvedValue({
        count: '1'
      })

      const result = await appointmentService.createserviceForAppointment(newMockService, 'randomUUID' as UUID)

      expect(result).toEqual({
        count: '1'
      })
    })
  })
})
