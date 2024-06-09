import { IsEmail, IsString, MinLength } from 'class-validator'

export class EmailConfirmationDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(1)
  readonly name: string

  @IsString()
  readonly token: string
}
