import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type CreateCompanyDto } from './dto/create-company.dto'
import { type User } from '../auth/interfaces'
import { handleErrorExceptions } from '../common/utils'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from '../auth/auth.service'
import { type UUID } from 'crypto'

@Injectable()
export class CompanyService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly auth: AuthService
  ) {}

  async create (createCompanyDto: CreateCompanyDto, user: User) {
    try {
      await this.companyExist(user.id as UUID)

      const company = await this.prisma.company.create({
        data: {
          ...createCompanyDto,
          user_id: user.id
        },
        select: {
          address: true,
          avatar: true,
          name: true,
          phone_number: true
        }
      })

      if (company) await this.auth.changeRole(user.id as UUID)

      return company
    } catch (error) {
      handleErrorExceptions(error)
    }

    return 'This action adds a new company'
  }

  async companyExist (userID: UUID) {
    try {
      const exist = await this.prisma.company.findFirst({ where: { user_id: userID } })

      if (exist) throw new ConflictException('Company Exist')

      return false
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async findCompanyForOwner (userID: UUID) {
    try {
      const company = await this.prisma.company.findFirst({
        where: { user_id: userID }
      })

      if (!company) throw new NotFoundException('Company not exist')
      if (!company.is_active) throw new UnauthorizedException('Company is Inactive')

      return company
    } catch (error) {
      handleErrorExceptions(error)
    }
  }
}
