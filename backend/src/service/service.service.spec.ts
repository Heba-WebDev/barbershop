import { Test, type TestingModule } from '@nestjs/testing'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaService } from '../prisma/prisma.service'
import { mockPrisma, mockUser, serviceMock } from '../../test/mocks'
import { validate } from 'class-validator'
import { PassportModule } from '@nestjs/passport'
import { type User } from 'src/auth/interfaces'
import { type UUID } from 'crypto'

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        ServiceService,
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ]
    }).compile()

    service = module.get<ServiceService>(ServiceService)
    mockPrisma.service.create.mockClear()
    mockPrisma.service.findUnique.mockClear()
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

      const newMockUser: User = {
        id: 'randomUUID',
        email: mockUser.email,
        name: mockUser.name,
        phoneNumber: mockUser.phoneNumber,
        role: 'CLIENT'
      }

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
      const result = await service.findUnique(newMockService.id as UUID)

      expect(result).toEqual({
        ...newMockService
      })
    })

    it('Should return a not found Error', async () => {
      mockPrisma.service.findUnique.mockResolvedValue(undefined)
      await expect(service.findUnique(newMockService.id as UUID)).rejects.toThrow('Service not exist')
    })
  })

  describe('Change Visibility(remove)', () => {
    it('should return a new state visible', async () => {
      jest.spyOn(service, 'findUnique').mockResolvedValue(newMockService)

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
})
