import { Injectable, NotFoundException } from '@nestjs/common'
import { type $Enums } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { type UpdateScheduleDto, type CreateScheduleDto } from './dto'

@Injectable()
export class ScheduleService {
  constructor (private readonly prismaService: PrismaService) {}

  async create (createScheduleDto: CreateScheduleDto) {
    const schedule = await this.prismaService.schedule.create({ data: createScheduleDto })
    return schedule
  }

  // findAll () {
  //   return 'This action returns all schedule'
  // }

  async findOneById (id: number) {
    const schedule = await this.prismaService.schedule.findUnique({ where: { id } })

    if (!schedule) throw new NotFoundException(`Schedule with id ${id} not found`)

    return schedule
  }

  async findByDayAndCompany (day: $Enums.Day, companyId: string) {
    const schedules = await this.prismaService.schedule.findMany({ where: { day, company_id: companyId } })
    return schedules
  }

  async update (id: number, updateScheduleDto: UpdateScheduleDto) {
    await this.findOneById(id)

    const scheduleUpdated = await this.prismaService.schedule.update({
      data: updateScheduleDto,
      where: { id }
    })

    return scheduleUpdated
  }

  // todo: move to company module
  async findOneCompanyById (id: string) {
    const company = await this.prismaService.company.findUnique({ where: { id } })
    if (!company) throw new NotFoundException(`Company with id ${id} not found`)
    return company
  }
}
