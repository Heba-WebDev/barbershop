import { PassportStrategy, AuthGuard } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaService } from '../prisma/prisma.service'
import { mockPrisma, serviceMock } from '../../test/mocks'
import { validate } from 'class-validator'
import { type ExecutionContext } from '@nestjs/common'
import { Strategy } from 'passport-jwt'

// Mock Passport Strategy class
class MockPassportStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super()
  }

  async validate (payload: any) {
    return { userId: payload.sub, username: 'user_mock' }
  }

  authenticate (req: any, options?: any) {
    // Mock authenticate method to fulfill the Strategy interface
  }
}

// Mock @nestjs/passport module
jest.mock('@nestjs/passport', () => ({
  PassportStrategy: jest.fn().mockImplementation(() => MockPassportStrategy),
  AuthGuard: jest.fn(() => ({
    canActivate: jest.fn((context: ExecutionContext) => true)
  }))
}))

describe('ServiceService', () => {
  let service: ServiceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
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
      mockPrisma.company.findUnique.mockResolvedValue({
        id: 'randomUUID'
      })
      mockPrisma.service.create.mockResolvedValue({
        ...serviceMock,
        id: 'randomUUID'
      })

      const result = await service.create(serviceMock)
      expect(result).toEqual({
        ...serviceMock,
        id: 'randomUUID'
      })
      // Optionally, you can add more assertions here to verify other aspects of the creation
    })
  })
})
