import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
<<<<<<< HEAD
import * as jwt from 'jsonwebtoken'
import { type JwtPayload } from 'jsonwebtoken'
=======

import * as jwt from 'jsonwebtoken'
>>>>>>> devop
import { hash, compare } from 'bcrypt'

import { type CreateUserDto } from './dto/create-user.dto'
import { type LoginUserDto } from './dto/login-user.dto'
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service'
=======
import { PrismaService } from '../prisma/prisma.service'
import { type User, type IJwtPayload } from './interfaces'
>>>>>>> devop

@Injectable()
export class AuthService {
  constructor (
    private readonly prismaService: PrismaService
  ) { }

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
        password: hashedPass,
        role: 'CLIENT'
      }
    })

<<<<<<< HEAD
    return { id, name, email, phoneNumber, role }
=======
    return { user: { id, name, email, phoneNumber, role } }
>>>>>>> devop
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
<<<<<<< HEAD
      data: {
=======
      user: {
>>>>>>> devop
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

<<<<<<< HEAD
  async generateJwt (payload: JwtPayload) {
=======
  async generateJwt (payload: IJwtPayload) {
>>>>>>> devop
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION
    })
    return token
  }
<<<<<<< HEAD
=======

  async renewToken (user: User) {
    const token = await this.generateJwt({ id: user.id })

    return {
      user,
      token
    }
  }
>>>>>>> devop
}
