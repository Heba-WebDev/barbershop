import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { getTimeForDate, getHoursWithInterval, getFormatedHours, getNameDay } from './utils'
import { PrismaService } from '../prisma/prisma.service'
import { type QueryParamsScheduleDto, type UpdateScheduleDto } from './dto'
import { AppointmentService } from '../appointment/appointment.service'
import { type $Enums } from '@prisma/client'

@Injectable()
export class ScheduleService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly appointmentService: AppointmentService
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

    const allAvailableHours = await this.appointmentService.findAllAvailableHours(date, allPossibleHours)

    return getFormatedHours(allAvailableHours)
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
}
