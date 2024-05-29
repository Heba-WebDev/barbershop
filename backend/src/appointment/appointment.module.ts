import { Module } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { AppointmentController } from './appointment.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [PrismaModule, AuthModule]
})
export class AppointmentModule {}
