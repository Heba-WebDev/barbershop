import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'

import { type User, type IJwtPayload } from '../interfaces'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly prismaService: PrismaService,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate ({ id }: IJwtPayload): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } })

    if (!user) throw new UnauthorizedException('Token not valid')
    if (!user.is_active) throw new UnauthorizedException('User is inactive')
    if (!user.is_verified) throw new UnauthorizedException('Unveried user')

    const { name, email, phone_number: phoneNumber, role } = user

    return { id: user.id, name, email, phoneNumber, role }
  }
}
