import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  // ServiceUnavailableException,
  UnauthorizedException
} from '@nestjs/common'

import { compare, hash } from 'bcrypt'
import { type UUID } from 'crypto'
// import { createTransport } from 'nodemailer'

import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { generateJwt, handleErrorExceptions } from '../common/utils'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto, ForgotPasswordUserDto, LoginUserDto, ResetPassUserDto, UpdateUserDto } from './dto'
import { type User } from './interfaces'
import { EmailService } from '../email/email.service'

@Injectable()
export class AuthService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService
  ) {}

  async create (createAuthDto: CreateUserDto) {
    const { email, password, name, phoneNumber } = createAuthDto

    const user = await this.findUserByEmail(email)

    if (user) throw new ConflictException(`User with email ${email} is already registered`)

    const hashedPass = await hash(password, 10)

    const { id, role } = await this.prismaService.user.create({
      data: {
        name,
        email,
        phone_number: createAuthDto.phoneNumber,
        password: hashedPass
      }
    })

    const emailToken = await generateJwt({ id })

    await this.prismaService.user.update({ where: { id }, data: { email_token: emailToken } })

    return {
      user: { id, name, email, phoneNumber, role },
      token: emailToken
    }
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

    const token = await generateJwt({ id: user.id })

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

  async update (id: string, data: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } })

    if (!user) throw new NotFoundException('User dont exist')
    if (!user.is_active) throw new UnauthorizedException('User is inactive')
    if (!user.is_verified) throw new UnauthorizedException('Unveried user')

    return await this.prismaService.user.update({
      where: { id },
      data,
      select: { name: true, email: true, phone_number: true, avatar: true, role: true }
    })
  }

  async updateUserAvatar (userId: string, file: Express.Multer.File) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } })

    if (!user) throw new NotFoundException("User doesn't exist")
    if (!user.is_active) throw new UnauthorizedException('User is inactive')
    if (!user.is_verified) throw new UnauthorizedException('Unverified user')

    if (user.avatar) {
      const imageId = user.avatar.split('/').at(-1).split('.').at(0)
      await this.cloudinaryService.deleteFile(imageId, 'users')
    }

    const { secure_url: secureUrl } = await this.cloudinaryService.uploadImageFile(file, 'users')

    return { avatar: secureUrl }
  }

  async forgotPassword (email: ForgotPasswordUserDto) {
    const user = await this.findUserByEmail(email.email)

    if (!user) throw new NotFoundException('User not found')

    await this.emailService.sendResetPassword(user.id, user.email, user.name)

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
    const token = await generateJwt({ id })
    return {
      user,
      token
    }
  }

  async renewToken (user: User) {
    const token = await generateJwt({ id: user.id })

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

  async confirmEmail (token: string) {
    const user = await this.prismaService.user.findFirst({ where: { email_token: token } })

    if (!user) throw new NotFoundException('Invalid token')
    if (user.is_verified) throw new ForbiddenException('User already verified')

    await this.prismaService.user.update({ where: { id: user.id }, data: { is_verified: true, email_token: null } })

    return {
      message: 'Token verified',
      statusCode: 200
    }
  }
}
