import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
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

  @ApiProperty({
    example: 'https://cloudinary.com/algo',
    description: 'service - avatar',
    nullable: true
  })
  @IsString()
  @IsOptional()
    avatar?: string
}
