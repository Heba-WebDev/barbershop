import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { Auth, GetUser } from '../auth/decorators'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '../auth/interfaces'
import { FindAppointmentDto } from './dto/find-appointment.dto'

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor (private readonly appointmentService: AppointmentService) {}
  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Get('company')
  @Auth('OWNER')
  async getAppointment (@GetUser() user: User) {
    return await this.appointmentService.getAppointmetForCompany(user)
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Get()
  @Auth('CLIENT', 'EMPLOYEE', 'OWNER')
  async get (@GetUser() user: User, @Query() findAppointmentDto: FindAppointmentDto) {
    return await this.appointmentService.get(user, findAppointmentDto)
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Post()
  @Auth('CLIENT', 'OWNER', 'EMPLOYEE')
  async create (@Body() createAppointmentDto: CreateAppointmentDto, @GetUser() user: User) {
    return await this.appointmentService.create(createAppointmentDto, user)
  }
}
