import { IsNotEmpty, IsString } from 'class-validator'

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string
}
