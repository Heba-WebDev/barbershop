import { FileInterceptor } from '@nestjs/platform-express'

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { Auth, GetUser } from './decorators'
import { CreateUserDto } from './dto/create-user.dto'
import { ForgotPasswordUserDto } from './dto/forgot-password.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { ResetPassUserDto } from './dto/reset-password.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JWTAuthGuard } from './guards/reset-password.guard'
import { User } from './interfaces'
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'

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
  @ApiOperation({
    description:
      'This endpoint needs a bearear token to extract the user from the request and renew the token'
  })
  @Get('renew')
  @Auth()
  async renewToken (@GetUser() user: User) {
    return await this.authService.renewToken(user)
  }

  @ApiBearerAuth()
  @Put('update-avatar')
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async updateUserAvatar (
  @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg|gif)$/ })
        ]
      })
    ) file: Express.Multer.File
  ) {
    const { avatar } = await this.authService.updateUserAvatar(user.id, file)

    await this.authService.update(user.id, { avatar })

    return { imageUrl: avatar }
  }

  @ApiBearerAuth()
  @Put(':id')
  @Auth()
  async update (@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.update(id, updateUserDto)
  }

  @Post('forgot-password')
  async forgotPassword (@Body() email: ForgotPasswordUserDto) {
    return await this.authService.forgotPassword(email)
  }

  @Patch('reset-password')
  @UseGuards(JWTAuthGuard)
  async resetPassword (
  @Req() req: Request,
    @Body() resetPass: ResetPassUserDto
  ) {
    return await this.authService.resetPassword(resetPass)
  }
}
