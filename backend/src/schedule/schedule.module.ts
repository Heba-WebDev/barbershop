import { Module } from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'
import { PrismaService } from '../prisma/prisma.service'
import { AppointmentModule } from '../appointment/appointment.module'

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
  imports: [AppointmentModule],
  exports: [ScheduleService]
})
export class ScheduleModule {}
