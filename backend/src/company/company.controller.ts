import { Controller, Post, Body } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/interfaces/user.interface'

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor (private readonly companyService: CompanyService) {}

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
