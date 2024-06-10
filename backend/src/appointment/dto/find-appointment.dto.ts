import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class FindAppointmentDto {
  @ApiProperty({
    example: 'PENDING',
    description: 'appointment - State',
    nullable: true
  })
  @IsOptional()
  @IsEnum($Enums.AppointmentState)
    state?: $Enums.AppointmentState
}
