import { Module } from '@nestjs/common'
<<<<<<< HEAD

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule]
=======
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
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
>>>>>>> devop
})
export class AuthModule {}
