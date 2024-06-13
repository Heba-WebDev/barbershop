import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { ScheduleModule } from '../schedule/schedule.module'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [PrismaModule, AuthModule, ScheduleModule],
  exports: [CompanyService]
})
export class CompanyModule {}
