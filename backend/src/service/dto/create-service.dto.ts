import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
// import { UUID } from 'crypto'

export class CreateServiceDto {
  @ApiProperty({
    example: 'cut hair',
    description: 'service - name',
    nullable: false,
    minLength: 1
  })
  @IsString()
    name: string

  @ApiProperty({
    example: '7000',
    description: 'service - price',
    nullable: false,
    minLength: 1
  })
  @IsNumber()
    price: number
}
