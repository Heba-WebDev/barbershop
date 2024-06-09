import { FileInterceptor } from '@nestjs/platform-express'
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { EmailService } from '../email/email.service'
import { AuthService } from './auth.service'
import { Auth, GetUser } from './decorators'
import { CreateUserDto } from './dto/create-user.dto'
import { ForgotPasswordUserDto } from './dto/forgot-password.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { ResetPassUserDto } from './dto/reset-password.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './interfaces'
import { ConfirmEmailDto } from './dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

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

  @Post('new-account')
  async create (@Body() createUserDto: CreateUserDto) {
    const { user, token } = await this.authService.create(createUserDto)
    const { email, name } = user

    await this.emailService.sendUserConfirmation({ email, name, token })

    return user
  }

  @Post('login')
  async login (@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto)
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
  @Auth()
  async resetPassword (@Body() resetPass: ResetPassUserDto) {
    return await this.authService.resetPassword(resetPass)
  }

  @Patch('confirm-email')
  async confirmEmailUser (
  @Body() confirmEmailDto: ConfirmEmailDto
  ) {
    const { token } = confirmEmailDto

    return await this.authService.confirmEmail(token)
  }
}
