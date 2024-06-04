import { $Enums } from '@prisma/client'
import { IsEnum, IsISO8601, IsString } from 'class-validator'

export class CreateScheduleDto {
  @IsEnum($Enums.Day)
  readonly day: $Enums.Day

  @IsISO8601()
  readonly start_date: Date

  @IsISO8601()
  readonly end_date: Date

  @IsString()
  readonly company_id: string
}
