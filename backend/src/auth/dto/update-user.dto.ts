import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(9)
  readonly phone_number: string;

  @IsString()
  @IsOptional()
  readonly avatar?: string;
}
