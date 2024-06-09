import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator'

export class GetAvailableHoursDto {
  @ApiProperty({
    description: 'Schedule - date',
    example: '1970-01-01T09:00:00Z',
    type: Date
  })
  @IsISO8601()
  @IsNotEmpty()
  readonly date: Date

  @ApiProperty({
    description: 'Schedule - companyId',
    example: 'e6353d98-7b4f-4085-8656-f098c8c24a3e',
    type: String
  })
  @IsUUID()
  @IsNotEmpty()
  readonly companyId: string
}
