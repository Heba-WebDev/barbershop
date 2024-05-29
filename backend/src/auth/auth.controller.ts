import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

import { Auth, GetUser } from './decorators'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { User } from './interfaces'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('new-account')
  async create (@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto)
  }

  @Post('login')
  async login (@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'This endpoint needs a bearear token to extract the user from the request and renew the token' })
  @Get('renew')
  @Auth()
  async renewToken (@GetUser() user: User) {
    return await this.authService.renewToken(user)
  }

  @ApiBearerAuth()
  @Put(':id')
  @Auth()
  async update (@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.update(id, updateUserDto)
  }
}
