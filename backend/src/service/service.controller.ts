import { Controller, Post, Body } from '@nestjs/common'
import { ServiceService } from './service.service'
import { CreateServiceDto } from './dto/create-service.dto'

@Controller('service')
export class ServiceController {
  constructor (private readonly serviceService: ServiceService) {}

  @Post()
  async create (@Body() createServiceDto: CreateServiceDto) {
    return await this.serviceService.create(createServiceDto)
  }
}
