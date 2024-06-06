import { Module } from '@nestjs/common'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
import { CompanyService } from '../company/company.service'

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [PrismaModule, AuthModule, CompanyService],
  exports: [ServiceService]
})
export class ServiceModule {}
