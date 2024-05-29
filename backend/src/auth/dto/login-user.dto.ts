import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsStrongPassword } from 'class-validator'

export class LoginUserDto {
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
}
