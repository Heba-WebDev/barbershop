import { Controller, Post, Body, Patch, Param, ParseUUIDPipe, Get } from '@nestjs/common'
import { ServiceService } from './service.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth, GetUser } from '../auth/decorators'
import { User } from 'src/auth/interfaces'
import { UUID } from 'crypto'
import { UpdateServiceDto } from './dto/update-service.dto'

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor (private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Get()
  @Auth('OWNER')
  async findAll (@GetUser() user: User) {
    return await this.serviceService.findAll(user)
  }

  // @ApiBearerAuth()
  // @Auth('OWNER')
  @Get(':companyId')
  async findServicesWithCompanyId (@Param('companyId', ParseUUIDPipe) companyId: string) {
    return await this.serviceService.findServicesWithCompanyId(companyId)
  }

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

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This endpoint needs a bearear token to extract the user from the request'
  })
  @Patch('remove-service/:id')
  @Auth('OWNER')
  async remove (@Param('id', ParseUUIDPipe) serviceID: UUID) {
    return await this.serviceService.updateVisibility(serviceID)
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Patch('update-detail-service')
  @Auth('OWNER')
  async update (@Body() updateServiceDto: UpdateServiceDto) {
    return await this.serviceService.update(updateServiceDto)
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Patch('update-active-service/:id')
  @Auth('OWNER')
  async updateState (@Param('id', ParseUUIDPipe) serviceID: UUID) {
    return await this.serviceService.updateActive(serviceID)
  }
}
