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
})
