import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { type EmailConfirmationDto } from './dto'
import { generateJwt } from '../common/utils'

@Injectable()
export class EmailService {
  private readonly logo: string = 'https://res.cloudinary.com/dvzycdk7y/image/upload/v1717911007/barber-hub/logo/cj2ghikqwbc3wnyo0kt8.png'
  private readonly baseUrl: string = this.configService.get('FRONT_END_HOST')
  private readonly appName: string = 'BarberHub'

  constructor (
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) { }

  async sendUserConfirmation (emailConfirmationDto: EmailConfirmationDto) {
    const { name, email, token } = emailConfirmationDto

    const subject = `Bienvenido ${name}`
    const url = `${this.baseUrl}/confirm_email/token=${token}`

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './confirmation',
      context: { name, url, appName: this.appName, logo: this.logo }
    })
  }

  async sendResetPassword (userId: string, email: string, name: string) {
    const token = await generateJwt({ id: userId })

    const subject = 'Reiniciar contraseña | Barbería'
    const url = `${this.baseUrl}/reset-password/${token}`

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './reset-password',
      context: { name, url, appName: this.appName, logo: this.logo }
    })
  }
}
