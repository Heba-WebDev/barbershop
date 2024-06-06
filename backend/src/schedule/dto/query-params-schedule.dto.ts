import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'

export class QueryParamsScheduleDto {
  @ApiProperty({
    description: 'Schedule - filter schedules by state',
    example: 'true',
    type: Boolean,
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
  readonly state?: boolean

  @ApiProperty({
    description: 'Schedule - filter schedules by day',
    example: 'MONDAY',
    type: $Enums.Day,
    nullable: true
  })
  @IsEnum($Enums.Day)
  @IsOptional()
  readonly day?: $Enums.Day
}
