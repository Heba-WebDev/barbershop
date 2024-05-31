import {
  ConflictException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'
import { validate } from 'class-validator'

import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from './auth.service'
import { type User } from './interfaces'

import { Readable } from 'stream'
import { mockPrisma, mockUser } from '../../test/mocks'
import { AuthController } from './auth.controller'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword')
}))

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
    }).compile()

    authService = module.get<AuthService>(AuthService)
    mockPrisma.user.create.mockClear()
  })

  describe('create user', () => {
    beforeEach(async () => {
      const errors = await validate(mockUser)
      expect(errors.length).toBe(0)
    })

    it('should return a new user', async () => {
      const { user } = await authService.create(mockUser)

      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1)
      expect(user).toMatchObject({
        id: expect.any(String),
        name: mockUser.name,
        email: mockUser.email,
        phoneNumber: mockUser.phoneNumber,
        role: 'CLIENT'
      })

      expect(user).not.toHaveProperty('password')
    })

    it('should return a registered user conflict error exception', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      await expect(authService.create(mockUser)).rejects.toThrow(
        new ConflictException(
          `User with email ${mockUser.email} is already registered`
        )
      )
    })
  })

  describe('renew token', () => {
    it('shoult return an user with new token', async () => {
      const newMockUser: User = {
        id: 'randomUUID',
        email: mockUser.email,
        name: mockUser.name,
        phoneNumber: mockUser.phoneNumber,
        role: 'CLIENT'
      }

      const { token, user } = await authService.renewToken(newMockUser)

      expect(user).toEqual(newMockUser)
      expect(typeof token).toBe('string')
    })
  })

  describe('Update User Info', () => {
    const mockId: string = '1'
    const mockUser: { name: string, email: string, phone_number: string, avatar: string } = {
      name: 'sam',
      email: 'sam@email.com',
      phone_number: '5610747645',
      avatar: 'https://algo.com/algo.png'
    }
    it('should return updates user data', async () => {
      jest.spyOn(authService, 'update').mockResolvedValue(mockUser)
      await expect(authService.update(mockId, mockUser)).resolves.toEqual(
        mockUser
      )
    })

    it('should throw notFoundExpection whe the user not exist', async () => {
      jest.spyOn(authService, 'update').mockRejectedValue(new NotFoundException("User doesn't exist"))

      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should throw NotFoundException when the user does not exist', async () => {
      jest.spyOn(authService, 'update').mockRejectedValue(new NotFoundException("User doesn't exist"))

      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should throw UnauthorizedException when the user is inactive', async () => {
      jest.spyOn(authService, 'update').mockRejectedValue(new UnauthorizedException('User is inactive'))
      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        UnauthorizedException
      )
    })

    it('should throw UnauthorizedException when the user is Unverified', async () => {
      jest.spyOn(authService, 'update').mockRejectedValue(new UnauthorizedException('Unverified user'))
      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        UnauthorizedException
      )
    })
  })

  describe('update-avatar', () => {
    const mockId: string = '1'
    const mockAvatar: { avatar: string } = {
      avatar: 'https://algo.com/algo.png'
    }
    const mockFile: Express.Multer.File = {
      fieldname: 'avatar',
      originalname: 'example.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 123456,
      destination: '',
      filename: 'example.jpg',
      path: '',
      buffer: null as unknown as Buffer,
      stream: Readable.from([])
    }

    it('should update the user avatar correctly', async () => {
      jest.spyOn(authService, 'updateAvatar').mockResolvedValue({
        avatar: mockAvatar.avatar
      })

      await expect(authService.updateAvatar(mockId, mockFile)).resolves.toEqual({
        avatar: mockAvatar.avatar
      })
    })

    it('should fail to upload the user avatar', async () => {
      jest.spyOn(authService, 'updateAvatar').mockImplementation(() => {
        throw new Error('Failed to upload file')
      })

      try {
        await authService.updateAvatar(mockId, mockFile)
        expect(true).toBe(false)
      } catch (error) {
        expect(error.message).toBe('Failed to upload file')
      }
    })

    it('should throw NotFoundException when the user does not exist', async () => {
      jest.spyOn(authService, 'updateAvatar').mockRejectedValue(new NotFoundException("User doesn't exist"))

      await expect(authService.updateAvatar(mockId, mockFile)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should throw UnauthorizedException when the user is inactive', async () => {
      jest.spyOn(authService, 'updateAvatar').mockRejectedValue(new UnauthorizedException('User is inactive'))
      await expect(authService.updateAvatar(mockId, mockFile)).rejects.toThrow(
        UnauthorizedException
      )
    })

    it('should throw UnauthorizedException when the user is Unverified', async () => {
      jest.spyOn(authService, 'updateAvatar').mockRejectedValue(new UnauthorizedException('Unverified user'))
      await expect(authService.updateAvatar(mockId, mockFile)).rejects.toThrow(
        UnauthorizedException
      )
    })
  })

  describe('forgot password', () => {
    const mockForgotPassDto = {
      email: mockUser.email
    }
    it('should return an error if no user was found with the same email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null)
      await expect(authService.forgotPassword(mockForgotPassDto)).rejects.toThrow(new ConflictException('User not found'))
    })

    it('should return 200 if the user\'s email is found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      const result = await authService.forgotPassword(mockForgotPassDto)
      expect(result).toEqual('Email succssfully sent')
    })
  })
})
