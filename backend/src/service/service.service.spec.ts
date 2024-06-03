import { Test, type TestingModule } from '@nestjs/testing'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaService } from '../prisma/prisma.service'
import { mockPrisma, mockUser, serviceMock } from '../../test/mocks'
import { validate } from 'class-validator'
import { PassportModule } from '@nestjs/passport'
import { type User } from 'src/auth/interfaces'

describe('ServiceService', () => {
  let service: ServiceService

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
})
