import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type CreateServiceDto } from './dto/create-service.dto'
import { PrismaService } from '../prisma/prisma.service'
import { type UUID } from 'crypto'
import { handleErrorExceptions } from '../common/utils/index'
import { type User } from 'src/auth/interfaces'

@Injectable()
export class ServiceService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async findUnique (serviceID: UUID) {
    try {
      const service = await this.prisma.service.findUnique({
        where: { id: serviceID, is_active: true }
      })

      if (!service) throw new NotFoundException('Service not exist')
      return service
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async create (createServiceDto: CreateServiceDto, user: User) {
    try {
      const company = await this.findCompanyForOwner(user.id as UUID)

      const service = await this.prisma.service.create({
        data: {
          name: createServiceDto.name,
          price: createServiceDto.price,
          // ? agregar avatar cuando se implemente Cloudinary
          // avatar: createServiceDto.
          company_id: company.id
        },
        select: {
          avatar: true,
          name: true,
          price: true
        }
      })
      return service
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async updateVisibility (serviceID: UUID) {
    try {
      const service = await this.findUnique(serviceID)

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

  //! move to module company
  async findCompanyForOwner (userID: UUID) {
    try {
      const company = await this.prisma.company.findFirst({
        where: { user_id: userID }
      })

      if (!company) throw new NotFoundException('Company not exist')
      if (!company.is_active) throw new UnauthorizedException('Inactive')

      return company
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
}
