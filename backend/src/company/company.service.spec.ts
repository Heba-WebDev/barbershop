import { Test, type TestingModule } from '@nestjs/testing'
import { CompanyService } from './company.service'
import { CompanyController } from './company.controller'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
import { mockPrisma, mockUser } from '../../test/mocks'
import { mockCompany } from '../../test/mocks/company.mock'
import { type User } from '../auth/interfaces'
import { validate } from 'class-validator'
import { AuthService } from '../auth/auth.service'
import { type UUID } from 'crypto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { EmailService } from '../email/email.service'

describe('CompanyService', () => {
  let companyService: CompanyService

  const newMockUser: User = {
    id: '68398fc4-a8de-406c-94c5-ec3f3b1d3d3f',
    email: mockUser.email,
    name: mockUser.name,
    phoneNumber: mockUser.phoneNumber,
    role: ['CLIENT']
  }

  const newMockEmployee = {
    id: 'random',
    is_active: true,
    user_id: 'random',
    company_id: 'random'
  }

  const newMockAllEmployee = [
    {
      id: '2b045863-73a0-454f-8b9a-3b22edaf5812',
      user: {
        name: 'Josephine Yost'
      }
    },
    {
      id: 'effddf71-e239-427f-b14a-e0a7f98b0f2b',
      user: {
        name: 'Carroll Wilderman'
      }
    }
  ]

  const newMockAllCompany = [
    {
      id: '780a56ee-cb14-4515-a793-50aa954c7490',
      name: 'Abbott - Batz',
      phone_number: '435924622',
      address: '13619 Boyer Valley',
      is_active: true,
      avatar: 'null',
      user_id: 'ca429bae-0e98-40e8-87e2-4c7497f287ed'
    },
    {
      id: '40685179-7e5d-473c-acd2-f72b3a87e643',
      name: 'Dare Inc',
      phone_number: '540824085',
      address: '25290 Bluebell Close',
      is_active: true,
      avatar: 'null',
      user_id: 'a09f10f7-ba22-4748-bc15-c266a34d6947'
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        CompanyService,
        AuthService,
        {
          provide: CloudinaryService,
          useValue: { uploadImageFile: jest.fn(), deleteFile: jest.fn() }
        },
        {
          provide: EmailService,
          useValue: jest.fn()
        },
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ]
    }).compile()

    companyService = module.get<CompanyService>(CompanyService)

    mockPrisma.company.create.mockClear()
    mockPrisma.company.findFirst.mockClear()
  })

  describe('Create Company', () => {
    beforeEach(async () => {
      const error = await validate(mockCompany)
      expect(error.length).toBe(0)
    })

    it('should return a new company', async () => {
      jest.spyOn(companyService, 'companyExist').mockResolvedValue(null)
      mockPrisma.company.create.mockResolvedValue({
        ...mockCompany
      })

      const result = await companyService.create(mockCompany, newMockUser)
      expect(result).toEqual({
        ...mockCompany
      })
    })
  })

  describe('New employee', () => {
    beforeEach(async () => {
      const error = await validate(mockCompany)
      expect(error.length).toBe(0)
    })

    it('Should return a new employee', async () => {
      jest.spyOn(companyService, 'getEmployee').mockResolvedValue(undefined)
      mockPrisma.employeeCompany.create.mockResolvedValue({
        ...newMockEmployee
      })

      const result = await companyService.newEmployee(newMockUser.id as UUID, newMockEmployee.company_id as UUID)

      expect(result).toEqual(newMockEmployee)
    })
  })

  describe('Get Employee', () => {
    it('Should return employee', async () => {
      mockPrisma.employeeCompany.findFirst.mockResolvedValue({
        ...newMockEmployee
      })

      const result = await companyService.getEmployee(newMockUser.id as UUID, newMockEmployee.company_id as UUID)

      expect(result).toEqual(newMockEmployee)
    })
  })

  describe('Find company exist', () => {
    beforeEach(async () => {
      const error = await validate(mockCompany)
      expect(error.length).toBe(0)
    })

    it('Should return false', async () => {
      mockPrisma.company.findFirst.mockResolvedValue(null)

      const result = await companyService.companyExist(newMockUser.id as UUID)

      expect(result).toEqual(false)
    })

    it('Should return error Conflict', async () => {
      mockPrisma.company.findFirst.mockResolvedValue(mockCompany)

      await expect(companyService.companyExist(newMockUser.id as UUID)).rejects.toThrow('Company Exist')
    })
  })

  describe('Find employee for UUID', () => {
    it('Should return employee', async () => {
      mockPrisma.employeeCompany.findFirst.mockResolvedValue({ ...newMockEmployee })

      const result = await companyService.findEmployeeByUserUUID(newMockEmployee.id as UUID)

      expect(result).toEqual({ ...newMockEmployee })
    })
  })

  describe('Find All employee', () => {
    it('Should return all employees company', async () => {
      mockPrisma.employeeCompany.findMany.mockResolvedValue({
        ...newMockAllEmployee
      })

      const result = await companyService.getAllEmployee('40685179-7e5d-473c-acd2-f72b3a87e643')

      expect(result).toEqual({ ...newMockAllEmployee })
    })
  })

  describe('Find ALl Companys', () => {
    it('Should return all companys', async () => {
      mockPrisma.company.findMany.mockResolvedValue({ ...newMockAllCompany })

      const result = await companyService.getAllCompanys()

      expect(result).toEqual({ ...newMockAllCompany })
    })
  })
})
