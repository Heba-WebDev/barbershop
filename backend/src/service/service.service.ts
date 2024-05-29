import { Injectable } from '@nestjs/common'
import { type CreateServiceDto } from './dto/create-service.dto'

@Injectable()
export class ServiceService {
  create (createServiceDto: CreateServiceDto) {
    return 'This action adds a new service'
  }
}
