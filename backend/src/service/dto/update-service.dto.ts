import { PartialType } from '@nestjs/mapped-types'
import { CreateServiceDto } from './create-service.dto'
import { IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiProperty({
    example: 'd11e1d61-7beb-4ad4-b094-da21c06d0b27',
    description: 'Service - UUID',
    nullable: false
  })
  @IsUUID()
    id: UUID
}
