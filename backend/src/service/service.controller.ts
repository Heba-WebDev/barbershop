import { Controller, Post, Body } from '@nestjs/common'
import { ServiceService } from './service.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth, GetUser } from '../auth/decorators'
import { User } from 'src/auth/interfaces'

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor (private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This endpoint needs a bearear token to extract the user from the request'
  })
  @Post()
  @Auth('OWNER')
  async create (@Body() createServiceDto: CreateServiceDto, @GetUser() user: User) {
    return await this.serviceService.create(createServiceDto, user)
  }
}
