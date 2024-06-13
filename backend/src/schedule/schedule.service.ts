import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { type $Enums } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { type QueryParamsScheduleDto, type UpdateScheduleDto } from './dto'
import { getFormatedHours, getHoursWithInterval, getNameDay, getTimeForDate } from './utils'

@Injectable()
export class ScheduleService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async update (id: number, userId: string, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.findOneById(id)
    const hasCompany = await this.findOneCompanyByUserId(userId)

    if (schedule.company_id !== hasCompany.id) throw new UnauthorizedException('The company is not the user\'s')

    const scheduleUpdated = await this.prismaService.schedule.update({
      data: updateScheduleDto,
      where: { id }
    })

    return scheduleUpdated
  }

  async findOneById (id: number) {
    const schedule = await this.prismaService.schedule.findUnique({ where: { id } })

    if (!schedule) throw new NotFoundException(`Schedule with id ${id} not found`)

    return {
      ...schedule,
      initial_start_date: getTimeForDate(schedule.initial_start_date),
      initial_end_date: getTimeForDate(schedule.initial_end_date),
      final_start_date: getTimeForDate(schedule.final_start_date),
      final_end_date: getTimeForDate(schedule.final_end_date)
    }
  }

  async findAllByCompanyId (querys: QueryParamsScheduleDto, companyId: string) {
    const { day, state } = querys

    const schedules = await this.prismaService.schedule.findMany({
      where: { company_id: companyId, day, state }
    })

    const schedulesFormated = schedules.map(schedule => ({
      ...schedule,
      initial_start_date: getTimeForDate(schedule.initial_start_date),
      initial_end_date: getTimeForDate(schedule.initial_end_date),
      final_start_date: getTimeForDate(schedule.final_start_date),
      final_end_date: getTimeForDate(schedule.final_end_date)
    }))

    return schedulesFormated
  }

  async findOneByCompanyIdAndDay (companyId: string, day: $Enums.Day) {
    const schedule = await this.prismaService.schedule.findFirst({ where: { company_id: companyId, day } })

    if (!schedule) throw new NotFoundException(`Schedule with company id ${companyId} and day ${day} not found`)

    return schedule
  }

  private async findHoursWithIntervalById (idSchedule: number) {
    const {
      initial_start_date: initialStartDate,
      initial_end_date: initialEndDate,
      final_start_date: finalStartDate,
      final_end_date: finalEndDate,
      interval
    } = await this.findOneById(idSchedule)

    const firstHours = getHoursWithInterval({ initialHour: initialStartDate, finalHour: initialEndDate, interval })
    const lastHours = getHoursWithInterval({ initialHour: finalStartDate, finalHour: finalEndDate, interval })

    if (!firstHours || !lastHours) throw new InternalServerErrorException()

    return [...firstHours, ...lastHours]
  }

  async findAvailableHours (companyId: string, date: Date) {
    const day = getNameDay(date.getDay())
    const { id } = await this.findOneByCompanyIdAndDay(companyId, day)
    const allPossibleHours = await this.findHoursWithIntervalById(id)

    const allAvailableHours = await this.findAllAvailableHours(date, allPossibleHours)

    return getFormatedHours(allAvailableHours)
  }

  async create (companyId: string, day: $Enums.Day) {
    const scheduleFound = await this.prismaService.schedule.findFirst({
      where: { company_id: companyId, day }
    })

    if (scheduleFound) throw new ConflictException('The company already has a schedule for this day')

    const schedule = await this.prismaService.schedule.create({
      data: {
        day,
        company_id: companyId
      }
    })

    return schedule
  }

  async createSchedulesCampany (companyId: string) {
    await this.findOneCompanyById(companyId)

    const companyHasSchedules = await this.prismaService.schedule.findFirst({ where: { company_id: companyId } })

    if (companyHasSchedules) return null

    const dayNames: $Enums.Day[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

    return await this.prismaService.$transaction(
      // eslint-disable-next-line
      Array(7).fill(null).map((_, index) => this.prismaService.schedule.create({ data: { company_id: companyId, day: dayNames[index]} }))
    )
  }

  // todo: move to company module
  async findOneCompanyById (id: string) {
    const company = await this.prismaService.company.findUnique({ where: { id } })
    if (!company) throw new NotFoundException(`Company with id ${id} not found`)
    return company
  }

  async findOneCompanyByUserId (id: string) {
    const company = await this.prismaService.company.findFirst({ where: { user_id: id } })
    if (!company) throw new NotFoundException(`User with ${id} dont't have a company`)
    return company
  }

  private async findAllTimesWithDate (date: Date) {
    const allReservedTimes = await this.prismaService.appointment.findMany({
      where: { start_date: date },
      select: { start_time: true }
    })

    const allReservedTimesFormated = allReservedTimes.map(time => getTimeForDate(time.start_time))
    return allReservedTimesFormated
  }

  async findAllAvailableHours (date: Date, hours: string[]) {
    const allReservedHours = await this.findAllTimesWithDate(date)

    const availableHours: string[] = []

    hours.forEach(hour => {
      if (allReservedHours.includes(hour)) return

      availableHours.push(hour)
    })

    return availableHours
  }
}
