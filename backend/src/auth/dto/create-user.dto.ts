import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsEmail, MinLength, IsStrongPassword, MaxLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User - name',
    nullable: false,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  readonly name: string

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User - email',
    nullable: false
  })
  @IsEmail()
  readonly email: string

  @ApiProperty({
    example: 'qerqweE7',
    description: 'User - password must have at least 8 characters, 1 uppercase letter and 1 number',
    nullable: false,
    minLength: 8
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 0,
    minSymbols: 0
  }, { message: 'The password must have at least 8 characters, 1 uppercase letter and 1 number' })
  readonly password: string

  @ApiProperty({
    example: '+569 22334422',
    description: 'User - phoneNumber must be maximum 15 characters',
    nullable: true,
    maxLength: 15
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  readonly phoneNumber?: string

  @ApiProperty({
    example: 'https://image.png.com',
    description: 'User - avatar',
    nullable: true
  })
  @IsString()
  @IsOptional()
  readonly avatar?: string
}
