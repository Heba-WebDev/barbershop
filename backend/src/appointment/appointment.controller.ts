import { Controller, Post, Body } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { Auth, GetUser } from '../auth/decorators'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '../auth/interfaces'

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor (private readonly appointmentService: AppointmentService) {}

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
