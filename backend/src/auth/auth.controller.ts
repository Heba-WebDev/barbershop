import { Body, Controller, Get, Post } from '@nestjs/common'

import { Auth, GetUser } from './decorators'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { User } from './interfaces'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('new-account')
  async create (@Body() createAuthDto: CreateUserDto) {
    return await this.authService.create(createAuthDto)
  }

  @Post('login')
  async login (@Body() loginAuthDto: LoginUserDto) {
    return await this.authService.login(loginAuthDto)
  }

  @Get('renew')
  @Auth()
  async renewToken (@GetUser() user: User) {
    return await this.authService.renewToken(user)
  }
}
