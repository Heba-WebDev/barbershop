import { Test, type TestingModule } from '@nestjs/testing'
import { PassportModule } from '@nestjs/passport'

import { randomUUID } from 'crypto'

import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'

import { PrismaService } from '../../src/prisma/prisma.service'
import { mockPrisma, mockSchedule } from '../../test/mocks'

jest.mock('../common/utils/getTimeFromDate.ts', () => ({
  getTimeForDate: jest.fn(date => '22:00')
}))

describe('ScheduleService', () => {
  let scheduleService: ScheduleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
    }).compile()

    scheduleService = module.get<ScheduleService>(ScheduleService)
    jest.clearAllMocks()
  })

  describe('findOneById', () => {
    it('should return one schedule', async () => {
      mockPrisma.schedule.findUnique.mockResolvedValue(mockSchedule)

      const schedule = await scheduleService.findOneById(mockSchedule.id)

      expect(schedule).toEqual(mockSchedule)
    })

    it('should return not found exception', async () => {
      mockPrisma.schedule.findUnique.mockResolvedValue(undefined)

      await expect(scheduleService.findOneById(mockSchedule.id)).rejects.toThrow(`Schedule with id ${mockSchedule.id} not found`)
    })
  })

  describe('findAllByCompanyId', () => {
    it('should return a schedules company ', async () => {
      const schedules = Array(5).fill(null).map(() => ({
        ...mockSchedule,
        id: randomUUID()
      }))

      mockPrisma.schedule.findMany.mockResolvedValue(schedules)

      const schedulesFound = await scheduleService.findAllByCompanyId('randomCompanyId')

      schedules.forEach((_, index) => {
        expect(schedules[index].id).toBe(schedulesFound[index].id)
        expect(schedules[index].state).toBe(schedulesFound[index].state)
        expect(schedules[index].interval).toBe(schedulesFound[index].interval)
      })
    })
  })

  describe('update schedules', () => {
    it('should return a schedules company ', async () => {

    })
  })
})
