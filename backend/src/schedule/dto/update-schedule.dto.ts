import { IsEnum, IsISO8601, IsOptional } from 'class-validator'

import { $Enums } from '@prisma/client'

export class UpdateScheduleDto {
  @IsEnum($Enums.Day)
  @IsOptional()
  readonly day: $Enums.Day

  @IsISO8601()
  @IsOptional()
  readonly start_date: Date

  @IsISO8601()
  @IsOptional()
  readonly end_date: Date
}
