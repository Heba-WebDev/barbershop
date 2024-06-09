import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { type SendUserConfirmationDto } from './dto'

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) { }

  async sendUserConfirmation (sendUserConfirmationDto: SendUserConfirmationDto) {
    const { name, email, token } = sendUserConfirmationDto

    const baseUrl = this.configService.get('FRONT_END_HOST')
    const subject = `Bienvenido ${name}`
    const appName = 'BarberHub'
    const url = `${baseUrl}?token=${token}`
    const logo = 'https://res.cloudinary.com/dvzycdk7y/image/upload/v1717911007/barber-hub/logo/cj2ghikqwbc3wnyo0kt8.png'

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './confirmation',
      context: { name, url, appName, logo }
    })
  }
}
