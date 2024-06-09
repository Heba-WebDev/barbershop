import { PassportModule } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'

import { validate } from 'class-validator'
import { randomUUID } from 'crypto'

import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'

import { PrismaService } from '../../src/prisma/prisma.service'
import { mockPrisma, mockSchedule } from '../../test/mocks'
import { type QueryParamsScheduleDto } from './dto'
import { AppointmentService } from '../appointment/appointment.service'
import { ServiceService } from '../service/service.service'
import { CompanyService } from '../company/company.service'

jest.mock('../schedule/utils/getTimeFromDate.ts', () => ({
  getTimeForDate: jest.fn(() => '22:00')
}))

const mockQuerySchedules: QueryParamsScheduleDto = { state: true, day: 'MONDAY' }

describe('ScheduleService', () => {
  let scheduleService: ScheduleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        { provide: AppointmentService, useValue: jest.fn() },
        { provide: ServiceService, useValue: jest.fn() },
        { provide: CompanyService, useValue: jest.fn() },
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

      expect(schedule).toMatchObject({
        day: 'MONDAY',
        id: 2,
        state: true,
        interval: 30
      })
    })

    it('should return not found exception', async () => {
      mockPrisma.schedule.findUnique.mockResolvedValue(undefined)

      await expect(scheduleService.findOneById(mockSchedule.id)).rejects.toThrow(`Schedule with id ${mockSchedule.id} not found`)
    })
  })

  describe('findAllByCompanyId', () => {
    beforeEach(async () => {
      const errors = await validate(mockQuerySchedules)
      expect(errors.length).toBe(0)
    })

    it('should return a schedules company ', async () => {
      const schedules = Array(5).fill(null).map(() => ({
        ...mockSchedule,
        id: randomUUID()
      }))

      mockPrisma.schedule.findMany.mockResolvedValue(schedules)

      const schedulesFound = await scheduleService.findAllByCompanyId(mockQuerySchedules, 'randomCompanyId')

      schedules.forEach((_, index) => {
        expect(schedules[index].id).toBe(schedulesFound[index].id)
        expect(schedules[index].state).toBe(schedulesFound[index].state)
        expect(schedules[index].interval).toBe(schedulesFound[index].interval)
      })
    })
  })

  describe('update', () => {
    it('should return a updated schedule', async () => {
      const mockCompany = {
        id: 'randomCompanyId',
        address: 'addreess',
        avatar: 'avatar',
        is_active: true,
        name: 'name',
        phone_number: 'phoneNumber',
        user_id: 'randomUserID'
      }

      jest.spyOn(scheduleService, 'findOneById').mockResolvedValue({
        ...mockSchedule,
        company_id: 'randomCompanyId'
      })

      jest.spyOn(scheduleService, 'findOneCompanyByUserId').mockResolvedValue(mockCompany)

      mockPrisma.schedule.update.mockResolvedValue({ ...mockSchedule, state: !mockSchedule.state, initial_start_date: '15:00' })

      const updatedSchedule = await scheduleService.update(mockSchedule.id, 'randomUserID', mockQuerySchedules)

      expect(updatedSchedule).not.toEqual(mockSchedule)
      expect(updatedSchedule.id).toBe(mockSchedule.id)
      expect(updatedSchedule.state).toBe(!mockSchedule.state)
      expect(updatedSchedule.initial_start_date).not.toBe(mockSchedule.initial_start_date)
    })

    it('should return UnauthorizedException', async () => {
      const mockCompany = {
        id: 'companyIdTwo',
        address: 'addreess',
        avatar: 'avatar',
        is_active: true,
        name: 'name',
        phone_number: 'phoneNumber',
        user_id: 'randomUserID'
      }

      jest.spyOn(scheduleService, 'findOneById').mockResolvedValue({
        ...mockSchedule,
        company_id: 'companyIdOne'
      })

      jest.spyOn(scheduleService, 'findOneCompanyByUserId').mockResolvedValue(mockCompany)

      try {
        await scheduleService.update(mockSchedule.id, 'randomUserID', mockQuerySchedules)
      } catch (error) {
        expect(error.response.message).toBe('The company is not the user\'s')
        expect(error.response.error).toBe('Unauthorized')
        expect(error.response.statusCode).toBe(401)
      }
    })
  })
})
