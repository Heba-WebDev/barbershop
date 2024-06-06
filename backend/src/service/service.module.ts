import { Module } from '@nestjs/common'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [PrismaModule, AuthModule],
  exports: [ServiceService]
})
export class ServiceModule {}
