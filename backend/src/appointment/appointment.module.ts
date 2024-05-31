import { Module } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { AppointmentController } from './appointment.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'
import { ServiceModule } from 'src/service/service.module'

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [PrismaModule, AuthModule, ServiceModule]
})
export class AppointmentModule {}
