import { IsEmail, IsStrongPassword } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPassUserDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User - email',
    nullable: false
  })
  @IsEmail()
  readonly email: string

  @ApiProperty({
    example: 'Pass1234',
    description: 'User - password',
    nullable: false
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
