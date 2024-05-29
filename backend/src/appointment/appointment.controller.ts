import { Controller, Post, Body } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'

@Controller('appointment')
export class AppointmentController {
  constructor (private readonly appointmentService: AppointmentService) {}

  @Post()
  async create (@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentService.create(createAppointmentDto)
  }
}
