import { Module } from '@nestjs/common'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [PrismaModule, AuthModule],
  exports: [ServiceService]
})
export class ServiceModule {}
