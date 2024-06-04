import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPasswordUserDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User - email',
    nullable: false
  })
  @IsEmail()
  readonly email: string
}
