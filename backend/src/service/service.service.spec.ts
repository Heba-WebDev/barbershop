import { Test, type TestingModule } from '@nestjs/testing'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaService } from '../prisma/prisma.service'
import { mockPrisma, serviceMock } from '../../test/mocks'
import { validate } from 'class-validator'
import { PassportModule } from '@nestjs/passport'

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

      const result = await service.create(serviceMock)
      expect(result).toEqual({
        ...serviceMock,
        id: 'randomUUID'
      })
    })
  })
})
