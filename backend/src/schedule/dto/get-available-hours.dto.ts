import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator'

export class GetAvailableHoursDto {
  @IsISO8601()
  @IsNotEmpty()
  readonly date: Date

  @IsUUID()
  @IsNotEmpty()
  readonly companyId: string
}
