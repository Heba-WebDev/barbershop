import { Module } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyController } from './company.controller'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [PrismaModule, AuthModule],
  exports: [CompanyService]
})
export class CompanyModule {}
