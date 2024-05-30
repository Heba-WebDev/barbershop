import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type CreateServiceDto } from './dto/create-service.dto'
import { PrismaService } from '../prisma/prisma.service'
import { type UUID } from 'crypto'
import { handleErrorExceptions } from '../common/utils/index'

@Injectable()
export class ServiceService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (createServiceDto: CreateServiceDto) {
    try {
      const company = await this.findCompanyForOwner(createServiceDto.user_id)

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

  //! move to module company
  async findCompanyForOwner (userID: UUID) {
    try {
      const company = await this.prisma.company.findFirst({
        where: { user_id: userID }
      })

      console.log(company)

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
