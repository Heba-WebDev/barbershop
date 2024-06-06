import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Company Baber Simulator',
    description: 'company - name',
    nullable: false,
    minLength: 1
  })
  @IsString()
    name: string

  @ApiProperty({
    example: '+56961016485',
    description: 'company - phone number',
    nullable: false,
    maxLength: 15,
    minLength: 1
  })
  @IsString()
    phone_number: string

  @ApiProperty({
    example: 'AV Mongolandia',
    description: 'company - phone number',
    nullable: false,
    minLength: 1
  })
  @IsString()
    address: string

  @ApiProperty({
    example: 'https://cloudinary.com/algo',
    description: 'company - avatar',
    nullable: true
  })
  @IsString()
  @IsOptional()
    avatar?: string
}
