import { IsNumber, IsString, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

export class CreateServiceDto {
  @IsString()
    name: string

  @IsNumber()
    value: number

  @IsUUID()
    user_id: UUID
}
