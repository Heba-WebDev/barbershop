import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CloudinaryService } from './cloudinary.service'
import { CloudinaryController } from './cloudinary.controller'
import { CloudinaryProvider } from './providers/cloudinary.provider'

@Module({
  imports: [ConfigModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider]
})
export class CloudinaryModule { }
