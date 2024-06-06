import { Module } from '@nestjs/common'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
// import { CompanyService } from '../company/company.service'
import { CompanyModule } from '../company/company.module'

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [PrismaModule, AuthModule, CompanyModule],
  exports: [ServiceService]
})
export class ServiceModule {}
