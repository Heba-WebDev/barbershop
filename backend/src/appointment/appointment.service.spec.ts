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

  const newMockGetAppointment = {
    0: {
      employee_id: '56937c33-a147-408e-8626-1c8a8b255abe',
      id: '0f192369-8e5d-493e-9727-6c818b67eee7',
      start_date: '2024-05-07T00:00:00.000Z',
      start_time: '1970-01-01T21:00:00.000Z',
      state: 'PENDING'
    }
  }

  const newMockGetAppointmentCompany = {
    0: {
      employee: {
        user: {
          name: 'Dr. Darlene Trantow III'
        }
      },
      start_date: '2024-05-07T00:00:00.000Z',
      start_time: '1970-01-01T21:00:00.000Z',
      state: 'PENDING',
      total: 20,
      ServiceAppointment: [
        {
          service: {
            name: 'Afeitado clásico'
          }
        },
        {
          service: {
            name: 'Afeitado clásico'
          }
        }
      ]
    }
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

      const result = await appointmentService.createServiceForAppointment(newMockService, 'randomUUID' as UUID)

      expect(result).toEqual({
        count: '1'
      })
    })
  })
  describe('Find Appointments for clients', () => {
    it('Should return Appointments', async () => {
      mockPrisma.appointment.findMany.mockResolvedValue({ ...newMockGetAppointment })

      const result = await appointmentService.get(newMockUser, { state: undefined })
      expect(result).toEqual(newMockGetAppointment)
    })
  })

  describe('Find appinrments for companys', () => {
    it('Should return Appointments', async () => {
      jest.spyOn(companyService, 'findCompanyForOwner').mockResolvedValue({
        id: 'string',
        name: 'string',
        phone_number: 'string',
        address: 'string',
        is_active: true,
        avatar: 'string',
        user_id: 'string'
      })
      mockPrisma.appointment.findMany.mockResolvedValue({ ...newMockGetAppointmentCompany })

      const result = await appointmentService.getAppointmetForCompany(newMockUser)

      expect(result).toEqual(newMockGetAppointmentCompany)
    })
  })
})
