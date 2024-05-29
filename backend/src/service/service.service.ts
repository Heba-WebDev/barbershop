import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { type CreateServiceDto } from './dto/create-service.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { type UUID } from 'crypto'

@Injectable()
export class ServiceService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  create (createServiceDto: CreateServiceDto) {
    // const service = this.prisma.service.create({
    //   data: {}
    // })
    return 'This action adds a new service'
  }

  async findServiceUUID (id: UUID) {
    try {
      return await this.prisma.service.findUnique({
        where: { id }
      })
    } catch (error) {
      throw new InternalServerErrorException('Error in Find by Service UUID')
    }
  }
}
