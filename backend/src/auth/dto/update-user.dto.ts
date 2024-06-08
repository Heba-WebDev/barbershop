import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User - name',
    nullable: true,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly name?: string

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User - email',
    nullable: true
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiProperty({
    example: '+569 22334422',
    description: 'User - phoneNumber must be maximum 15 characters',
    nullable: true,
    maxLength: 15
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  readonly phone_number?: string

  @ApiProperty({
    example: 'https://res.cloudinary.com/dvzycdk7y/image/upload/v1717788840/users/fsdfsdfsdfsds.gif',
    description: 'User - image url',
    nullable: true
  })
  @IsString()
  @IsOptional()
  readonly avatar?: string
}
