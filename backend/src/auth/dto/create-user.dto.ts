import { IsString, IsOptional, IsEmail, MinLength, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  readonly name: string

  @IsEmail()
  readonly email: string

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 0,
    minSymbols: 0
  }, { message: 'The password must have at least 8 characters, 1 uppercase letter and 1 number' })
  readonly password: string

  @IsString()
  @MinLength(9)
  readonly phoneNumber: string

  @IsString()
  @IsOptional()
  readonly avatar?: string
}
