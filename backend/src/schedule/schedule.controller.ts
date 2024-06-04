import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateScheduleDto } from './dto/create-schedule.dto'
// import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/interfaces'

@Controller('schedule')
export class ScheduleController {
  constructor (private readonly scheduleService: ScheduleService) {}

  @Post()
  @Auth()
  async create (
  @GetUser() user: User,
    @Body() createScheduleDto: CreateScheduleDto
  ) {
    // return await this.scheduleService.create(user, createScheduleDto)
  }

  // @Get()
  // findAll () {
  //   return this.scheduleService.findAll()
  // }

  // @Get(':id')
  // findOne (@Param('id') id: string) {
  //   return this.scheduleService.findOne(+id)
  // }

  // @Patch(':id')
  // update (@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
  //   return this.scheduleService.update(+id, updateScheduleDto)
  // }

  // @Delete(':id')
  // remove (@Param('id') id: string) {
  //   return this.scheduleService.remove(+id)
  // }
}
