import { Controller, Post, Body, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/interfaces/user.interface'
import { UUID } from 'crypto'

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor (private readonly companyService: CompanyService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Get()
  @Auth('CLIENT', 'EMPLOYEE', 'OWNER')
  async getALl () {
    return await this.companyService.getAllCompanys()
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Get('employees/:id')
  @Auth('CLIENT', 'EMPLOYEE', 'OWNER')
  async getAllEmployee (@Param('id', ParseUUIDPipe) companyID: UUID) {
    return await this.companyService.getAllEmployee(companyID)
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'This endpoint needs a bearear token to extract the user from the request'
  })
  @Post()
  @Auth('CLIENT')
  async create (@Body() createCompanyDto: CreateCompanyDto, @GetUser() user: User) {
    return await this.companyService.create(createCompanyDto, user)
  }
}
