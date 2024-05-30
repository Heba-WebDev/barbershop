import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaModule } from '../prisma/prisma.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

import { CloudinaryProvider } from './claudinary.provider'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CloudinaryProvider],
  imports: [
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get('JWT_REFRESH_EXPIRATION')
          }
        }
      }
    }),

    PrismaModule
  ]
})
export class AuthModule {}
