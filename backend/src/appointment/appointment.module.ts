import { Module } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { AppointmentController } from './appointment.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
import { ServiceModule } from '../service/service.module'
import { CompanyModule } from '../company/company.module'

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [PrismaModule, AuthModule, ServiceModule, CompanyModule],
  exports: [AppointmentService]
})
export class AppointmentModule {}
