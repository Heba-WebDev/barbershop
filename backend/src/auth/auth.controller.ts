import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

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
}
