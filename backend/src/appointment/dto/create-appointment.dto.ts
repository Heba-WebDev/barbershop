import { IsISO8601, IsNumber, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

export class CreateAppointmentDto {
  @IsISO8601()
    startDate: string

  @IsNumber()
    total: number

  @IsUUID()
    employee_id: UUID

  @IsUUID()
    user_id: UUID

  @IsUUID('4', { each: true })
    services: UUID[]
}
