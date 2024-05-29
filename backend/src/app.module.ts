import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AppointmentModule } from './appointment/appointment.module'

@Module({
  imports: [
    AuthModule,
    AppointmentModule
  ]
})
export class AppModule {}
