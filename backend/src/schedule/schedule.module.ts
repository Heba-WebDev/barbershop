import { Module } from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
