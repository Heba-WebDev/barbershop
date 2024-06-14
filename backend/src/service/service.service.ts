import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type CreateServiceDto } from './dto/create-service.dto'
import { PrismaService } from '../prisma/prisma.service'
import { type UUID } from 'crypto'
import { handleErrorExceptions } from '../common/utils/index'
import { type User } from '../auth/interfaces'
import { type UpdateServiceDto } from './dto/update-service.dto'
import { CompanyService } from '../company/company.service'

@Injectable()
export class ServiceService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly company: CompanyService
  ) {}

  async findAll (user: User) {
    try {
      const company = await this.company.findCompanyForOwner(user.id as UUID)
      return await this.prisma.service.findMany({
        where: {
          company_id: company.id,
          is_visible: true
        },
        select: {
          id: true,
          avatar: true,
          name: true,
          price: true,
          is_active: true
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async findServiceUUID (id: UUID) {
    try {
      const service = await this.prisma.service.findUnique({
        where: { id }
      })

      if (!service) throw new NotFoundException('Service not Found')

      return service
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async create (createServiceDto: CreateServiceDto, user: User) {
    try {
      const company = await this.company.findCompanyForOwner(user.id as UUID)

      const service = await this.prisma.service.create({
        data: {
          name: createServiceDto.name,
          price: createServiceDto.price,
          // ? agregar avatar cuando se implemente Cloudinary
          // avatar: createServiceDto.
          company_id: company.id
        },
        select: {
          id: true,
          avatar: true,
          name: true,
          price: true,
          is_active: true
        }
      })
      return service
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async update (updateServiceDto: UpdateServiceDto) {
    try {
      const { id, ...data } = updateServiceDto

      await this.findServiceUUID(id)

      return await this.prisma.service.update({
        where: { id },
        data: { ...data },
        select: {
          avatar: true,
          name: true,
          price: true
        }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async updateActive (serviceID: UUID) {
    try {
      const service = await this.findServiceUUID(serviceID)

      return await this.prisma.service.update({
        where: { id: serviceID },
        data: { is_active: !service.is_active },
        select: { is_active: true }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async updateVisibility (serviceID: UUID) {
    try {
      const service = await this.findServiceUUID(serviceID)

      return await this.prisma.service.update({
        data: {
          is_active: !service.is_active,
          is_visible: !service.is_visible
        },
        where: { id: service.id },
        select: { is_visible: true }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async findServicesWithCompanyId (companyId: string) {
    const company = await this.prisma.company.findUnique({ where: { id: companyId } })

    if (!company) throw new NotFoundException('Company not exist')
    if (!company.is_active) throw new UnauthorizedException('Company is Inactive')

    const services = await this.prisma.service.findMany({
      where: { company_id: companyId },
      select: { id: true, name: true, price: true }
    })

    const employee = await this.prisma.employeeCompany.findFirst({
      where: { company_id: companyId },
      select: { id: true, company: { select: { name: true } } }
    })

    if (!employee) throw new NotFoundException('Employee not found')

    return { services, employee }
  }
}
