import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type CreateServiceDto } from './dto/create-service.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { type UUID } from 'crypto'

@Injectable()
export class ServiceService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (createServiceDto: CreateServiceDto) {
    try {
      const company = await this.findCompanyForOwner(createServiceDto.user_id)

      // const service = this.prisma.service.create({
      //   data: createServiceDto
      // })
      return company
    } catch (error) {
      // throw new InternalServerErrorException('Error Create Service')
      this.handleError(error)
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
      // throw new InternalServerErrorException('Error in Find By Company for User')
      this.handleError(error)
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
      this.handleError(error)
      // throw new InternalServerErrorException('Error in Find by Service UUID')
    }
  }

  private handleError (error: unknown) {
    if (error instanceof NotFoundException) throw new NotFoundException(error.message)
    if (error instanceof UnauthorizedException) throw new UnauthorizedException(error.message)

    throw new InternalServerErrorException('An unexpected error occurred')
  }
}
