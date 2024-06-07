import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ServiceModule } from './service/service.module'
import { AppointmentModule } from './appointment/appointment.module'
import { ScheduleModule } from './schedule/schedule.module'
import { SeedModule } from './seed/seed.module'
import { CompanyModule } from './company/company.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServiceModule,
    AppointmentModule,
    ScheduleModule,
    ...process.env.NODE_ENV === 'development' ? [SeedModule] : [],
    CompanyModule
  ]
})
export class AppModule {}
