import { Controller, Post, Body, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/interfaces/user.interface'
import { UUID } from 'crypto'
import { ScheduleService } from '../schedule/schedule.service'

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor (
    private readonly companyService: CompanyService,
    private readonly scheduleService: ScheduleService
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
    'Find all barberies'
  })
  @Get()
  async getALl () {
    return await this.companyService.getAllCompanys()
  }

  @ApiBearerAuth()
  @Get(':companyId')
  async getCompanyById (
  @Param('companyId', ParseUUIDPipe) companyId: string
  ) {
    return await this.companyService.findOneCompanyById(companyId)
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
    const company = await this.companyService.create(createCompanyDto, user)

    await this.scheduleService.createSchedulesCampany(company.id)

    return company
  }
}
