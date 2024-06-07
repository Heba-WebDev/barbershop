import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601, IsUUID } from 'class-validator'
import { type UUID } from 'crypto'

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2024-05-07T17:00:00',
    description: 'appointment - start date',
    nullable: false,
    minLength: 1
  })
  @IsISO8601()
    startDate: string

  @ApiProperty({
    example: '["79785aa3-16fb-4108-87a7-966d4ee6bd0f","7f6090f0-11fe-41b2-8ea3-691431bdb763"]',
    description: 'appointment - services UUID',
    nullable: false,
    minLength: 1
  })
  @IsUUID('4', { each: true })
    services: UUID[]

  @ApiProperty({
    example: '79785aa3-16fb-4108-87a7-966d4ee6bd0f',
    description: 'appointment - employee UUID',
    nullable: false,
    minLength: 1
  })
  @IsUUID()
    employeeID: UUID
}
