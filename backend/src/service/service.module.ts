import { Module } from '@nestjs/common'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [PrismaModule]
})
export class ServiceModule {}
