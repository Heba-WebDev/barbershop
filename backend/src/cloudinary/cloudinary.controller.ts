import { Controller } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'

@Controller('cloudinary')
export class CloudinaryController {
  constructor (private readonly cloudinaryService: CloudinaryService) {}
}
