import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ServiceModule } from './service/service.module'
import { AppointmentModule } from './appointment/appointment.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServiceModule,
    AppointmentModule
  ]
})
export class AppModule {}
