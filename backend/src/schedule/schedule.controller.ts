import { Body, Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ScheduleService } from './schedule.service'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/interfaces'
import { UpdateScheduleDto } from './dto'

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor (private readonly scheduleService: ScheduleService) { }

  @Get(':companyId')
  async findAllByCompanyId (
  @Param('companyId', ParseUUIDPipe) companyId: string) {
    return await this.scheduleService.findAllByCompanyId(companyId)
  }

  @Patch(':id')
  @Auth('OWNER')
  async update (
  @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateScheduleDto: UpdateScheduleDto) {
    return await this.scheduleService.update(+id, user.id, updateScheduleDto)
  }
}
