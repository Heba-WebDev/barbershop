import { Controller, Post, Body } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { Auth } from 'src/auth/decorators'

@Controller('appointment')
export class AppointmentController {
  constructor (private readonly appointmentService: AppointmentService) {}

  @Post()
  @Auth()
  async create (@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentService.create(createAppointmentDto)
  }
}
