import { Controller, Post, Body } from '@nestjs/common'
import { ServiceService } from './service.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators'

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor (private readonly serviceService: ServiceService) {}

  @Post()
  @Auth('OWNER')
  async create (@Body() createServiceDto: CreateServiceDto) {
    return await this.serviceService.create(createServiceDto)
  }
}
