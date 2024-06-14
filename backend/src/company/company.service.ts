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
          phone_number: true,
          id: true
        }
      })

      if (company) {
        await this.auth.changeRole(user.id as UUID)
        await this.newEmployee(user.id as UUID, company.id as UUID)
      }

      return company
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async newEmployee (userID: UUID, companyID: UUID) {
    try {
      const employee = await this.getEmployee(userID, companyID)
      if (employee) throw new ConflictException('Employee exist')

      return await this.prisma.employeeCompany.create({
        data: {
          company_id: companyID,
          user_id: userID
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async getEmployee (userID: UUID, companyID: UUID) {
    try {
      return await this.prisma.employeeCompany.findFirst({
        where: {
          company_id: companyID, user_id: userID
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
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

  async findEmployeeByUserUUID (id: UUID) {
    try {
      const employee = await this.prisma.employeeCompany.findFirst({
        where: { id }
      })

      if (!employee) throw new NotFoundException('Employee not exist')

      return employee
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async getAllEmployee (companyID: UUID) {
    try {
      return await this.prisma.employeeCompany.findMany({
        where: { company_id: companyID },
        select: {
          id: true,
          user: { select: { name: true } }
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async getAllCompanys () {
    try {
      return await this.prisma.company.findMany({
        where: { is_active: true }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async findOneCompanyById (id: string) {
    const company = await this.prisma.company.findUnique({ where: { id } })
    if (!company) throw new NotFoundException(`Company with id ${id} not found`)
    return company
  }
}
