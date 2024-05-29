import { IsEmail } from 'class-validator'

export class ForgotPasswordUserDto {
  @IsEmail()
  readonly email: string
}
