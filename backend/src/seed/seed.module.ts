import { Module } from '@nestjs/common'

import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'
import { AuthModule } from '../auth/auth.module'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [SeedController],
  providers: [SeedService, PrismaService],
  imports: [AuthModule]
})
export class SeedModule {}
