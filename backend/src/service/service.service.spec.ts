import { Test, type TestingModule } from '@nestjs/testing'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaService } from '../prisma/prisma.service'
import { mockPrisma, mockUser, serviceMock } from '../../test/mocks'
import { validate } from 'class-validator'
import { PassportModule } from '@nestjs/passport'
import { type User } from '../auth/interfaces'
import { type UUID } from 'crypto'
import { type UpdateServiceDto } from './dto/update-service.dto'
import { AuthService } from '../auth/auth.service'
import { CompanyService } from '../company/company.service'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { EmailService } from '../email/email.service'

describe('ServiceService', () => {
  let service: ServiceService

  const newMockService = {
    id: '7649e8ad-4d57-43ae-8b20-fe57015279ba',
    name: 'wiwi',
    is_active: true,
    price: 1000,
    avatar: '',
    is_visible: true,
    company_id: 'e3d23197-19a8-4878-8c33-cf834c6b9e81'
  }
  const newMockServiceUpdate: UpdateServiceDto = {
    id: '7649e8ad-4d57-43ae-8b20-fe57015279ba',
    name: 'wiwi',
    price: 2000,
    avatar: 'newAvatar.com'
  }

  const newMockUser: User = {
    id: 'e3d23197-19a8-4878-8c33-cf834c6b9e88',
    email: mockUser.email,
    name: mockUser.name,
    phoneNumber: mockUser.phoneNumber,
    role: ['CLIENT']
  }

  const expectedServices = [
    {
      avatar: '',
      name: 'wiwi',
      price: 1000
    },
    {
      avatar: 'avatar2.png',
      name: 'wiwi2',
      price: 2000
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        ServiceService,
        AuthService,
        CompanyService,
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

    service = module.get<ServiceService>(ServiceService)
    mockPrisma.service.create.mockClear()
    mockPrisma.service.findUnique.mockClear()
    mockPrisma.service.findMany.mockClear()
    mockPrisma.service.update.mockClear()
  })

  describe('Create Service', () => {
    beforeEach(async () => {
      const error = await validate(serviceMock)
      expect(error.length).toBe(0)
    })

    it('should return a new Service', async () => {
      mockPrisma.company.findFirst.mockResolvedValue({
        id: 'randomUUID',
        is_active: true,
        is_verified: true
      })
      mockPrisma.service.create.mockResolvedValue({
        ...serviceMock,
        id: 'randomUUID'
      })

      const result = await service.create(serviceMock, newMockUser)
      expect(result).toEqual({
        ...serviceMock,
        id: 'randomUUID'
      })
    })
  })

  describe('Find Unique Service', () => {
    it('Should return unique Service', async () => {
      mockPrisma.service.findUnique.mockResolvedValue(newMockService)
      const result = await service.findServiceUUID(newMockService.id as UUID)

      expect(result).toEqual({
        ...newMockService
      })
    })

    it('Should return a not found Error', async () => {
      mockPrisma.service.findUnique.mockResolvedValue(undefined)
      await expect(service.findServiceUUID(newMockService.id as UUID)).rejects.toThrow('Service not Found')
    })
  })

  describe('Change Visibility(remove)', () => {
    it('should return a new state visible', async () => {
      jest.spyOn(service, 'findServiceUUID').mockResolvedValue(newMockService)

      mockPrisma.service.update.mockResolvedValue({
        ...newMockService,
        is_visible: !newMockService.is_visible,
        is_active: !newMockService.is_active
      })

      const result = await service.updateVisibility(newMockService.id as UUID)

      expect(result).toEqual({
        ...newMockService,
        is_visible: !newMockService.is_visible,
        is_active: !newMockService.is_active
      })
    })
  })

  describe('Update Details Service', () => {
    it('Should return new data', async () => {
      jest.spyOn(service, 'findServiceUUID').mockResolvedValueOnce(newMockService)

      mockPrisma.service.update.mockResolvedValue({
        ...newMockService
      })

      const result = await service.update(newMockServiceUpdate)

      const expectedData = {
        ...newMockServiceUpdate,
        ...newMockService
      }

      expect(result).toEqual(expectedData)
    })
  })

  describe('Update Active Service', () => {
    it('Should return new state active', async () => {
      jest.spyOn(service, 'findServiceUUID').mockResolvedValueOnce(newMockService)

      mockPrisma.service.update.mockResolvedValue({
        ...newMockService,
        is_active: !newMockService.is_active
      })

      const result = await service.updateActive(newMockService.id as UUID)

      expect(result).toEqual({
        ...newMockService,
        is_active: !newMockService.is_active
      })
    })
  })

  describe('Find all service', () => {
    it('Should return all service', async () => {
      mockPrisma.company.findFirst.mockResolvedValue({ id: newMockUser.id, is_active: true })
      mockPrisma.service.findMany.mockResolvedValue(expectedServices)

      const result = await service.findAll(newMockUser)

      expect(result).toEqual(expectedServices)
    })
  })
})
