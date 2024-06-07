import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException
} from '@nestjs/common'

import { compare, hash } from 'bcrypt'
import { createTransport } from 'nodemailer'
import { type UUID } from 'crypto'
import { v2 as cloudinary } from 'cloudinary'
import * as jwt from 'jsonwebtoken'
import * as streamifier from 'streamifier'

import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto, ForgotPasswordUserDto, LoginUserDto, ResetPassUserDto, UpdateUserDto } from './dto'
import { type IJwtPayload, type User } from './interfaces'
import { handleErrorExceptions } from '../common/utils'

@Injectable()
export class AuthService {
  constructor (private readonly prismaService: PrismaService) {}

  async create (createAuthDto: CreateUserDto) {
    const { email, password, name, phoneNumber } = createAuthDto

    const user = await this.findUserByEmail(email)

    if (user) {
      throw new ConflictException(
        `User with email ${email} is already registered`
      )
    }
    const hashedPass = await hash(password, 10)
    const { id, role } = await this.prismaService.user.create({
      data: {
        name,
        email,
        phone_number: createAuthDto.phoneNumber,
        password: hashedPass
      }
    })

    return { user: { id, name, email, phoneNumber, role } }
  }

  async findUserByEmail (email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return user
  }

  async login (loginAuthDto: LoginUserDto) {
    const { email, password } = loginAuthDto

    const user = await this.findUserByEmail(email)

    if (!user) throw new NotFoundException('User not found')

    const pass = await compare(password, user.password)

    if (!pass) throw new BadRequestException('Invalid credentials')

    const token = await this.generateJwt({ id: user.id })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        is_active: user.is_active,
        is_verified: user.is_verified,
        avatar: user.avatar,
        role: user.role
      },
      token
    }
  }

  async update (
    id: string,
    data: UpdateUserDto
  ): Promise<{
      name: string
      email: string
      phone_number: string
    }> {
    const user = await this.prismaService.user.findUnique({ where: { id } })

    if (!user) throw new NotFoundException("User doesn't exist")
    if (!user.is_active) throw new UnauthorizedException('User is inactive')
    if (!user.is_verified) throw new UnauthorizedException('Unveried user')

    return await this.prismaService.user.update({
      where: {
        id
      },
      data,
      select: {
        name: true,
        email: true,
        phone_number: true,
        is_active: true,
        is_verified: true
      }
    })
  }

  async updateAvatar (
    id: string,
    file: Express.Multer.File
  ) {
    const user = await this.prismaService.user.findUnique({ where: { id } })

    if (!user) throw new NotFoundException("User doesn't exist")
    if (!user.is_active) throw new UnauthorizedException('User is inactive')
    if (!user.is_verified) throw new UnauthorizedException('Unverified user')

    if (user.avatar) {
      const currentAvatar = user.avatar.split('/')[7].split('.')[0]
      await cloudinary.uploader.destroy(currentAvatar)
    }

    const uploadResult = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) reject(error)
          else resolve(result.secure_url)
        }
      )

      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })

    return await this.prismaService.user.update({
      where: {
        id
      },
      data: { avatar: uploadResult },
      select: {
        avatar: true
      }
    })
  }

  async forgotPassword (email: ForgotPasswordUserDto) {
    const user = await this.findUserByEmail(email.email)

    if (!user) throw new NotFoundException('User not found')
    await this.sendEmail(user.id, user.email)
    return 'Email succssfully sent'
  }

  async resetPassword (resetPassAuthDto: ResetPassUserDto) {
    const usr = await this.findUserByEmail(resetPassAuthDto.email)

    if (!usr) throw new NotFoundException('User not found')

    const hashedPass = await hash(resetPassAuthDto.password, 10)
    await this.prismaService.user.update({
      where: {
        id: usr.id
      },
      data: {
        password: hashedPass
      }
    })
    const { id, password, ...user } = usr
    const token = await this.generateJwt({ id })
    return {
      user,
      token
    }
  }

  async sendEmail (id: string, email: string) {
    const token = await this.generateJwt({ id })
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    const mailOptions = {
      from: process.env.EMAIL_USR,
      to: email,
      subject: 'Reiniciar contraseña | Barbería',
      text: `Gracias por usar nuestros servicos. Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic a este enlace ${process.env.BASE_URL}/reset-password/${token}. Si no solicitaste este cambio, ignora este correo electrónico.`
    }
    if (process.env.NODE_ENV !== 'test') {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new ServiceUnavailableException(
            'An error occured while sending the email'
          )
        }
      })
    }
  }

  async generateJwt (payload: IJwtPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION
    })
    return token
  }

  async renewToken (user: User) {
    const token = await this.generateJwt({ id: user.id })

    return {
      user,
      token
    }
  }

  async findUserByUUID (id: UUID) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id }
      })

      if (!user) throw new NotFoundException('User not exist')

      return user
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async changeRole (userID: UUID) {
    try {
      return await this.prismaService.user.update({
        where: { id: userID },
        data: { role: ['OWNER'] }
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }
}
