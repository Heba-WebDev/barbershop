import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { type UpdateScheduleDto } from './dto'
import { getTimeForDate } from '../../src/common/utils/getTimeFromDate'

@Injectable()
export class ScheduleService {
  constructor (private readonly prismaService: PrismaService) {}

  async update (id: number, userId: string, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.findOneById(id)
    const hasCompany = await this.findOneCompanyByUserId(userId)

    if (schedule.company_id !== hasCompany.id) throw new UnauthorizedException('error')

    const scheduleUpdated = await this.prismaService.schedule.update({
      data: updateScheduleDto,
      where: { id }
    })

    return scheduleUpdated
  }

  async findOneById (id: number) {
    const schedule = await this.prismaService.schedule.findUnique({ where: { id } })

    if (!schedule) throw new NotFoundException(`Schedule with id ${id} not found`)

    return schedule
  }

  async findAllByCompanyId (companyId: string) {
    const schedules = await this.prismaService.schedule.findMany({
      where: { company_id: companyId }
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
