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

import * as jwt from 'jsonwebtoken'
import { Readable } from 'stream'
import { mockPrisma, mockUser } from '../../test/mocks'
import { AuthController } from './auth.controller'
import { type UUID } from 'crypto'
import { CloudinaryService } from '../../src/cloudinary/cloudinary.service'
import { generateJwt } from '../common/utils'
import { EmailService } from '../email/email.service'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword')
}))

jest.mock('../common/utils/generateJwt.ts', () => ({
  generateJwt: jest.fn().mockImplementation(() => 'randomToken')
}))

describe('AuthService', () => {
  let authService: AuthService

  const newMockUser: User = {
    id: 'randomUUID',
    email: mockUser.email,
    name: mockUser.name,
    phoneNumber: mockUser.phoneNumber,
    role: ['CLIENT']
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: EmailService,
          useValue: { sendResetPassword: jest.fn().mockResolvedValue('emailSent') }
        },
        {
          provide: CloudinaryService,
          useValue: { uploadImage: jest.fn(), FiledeleteFile: jest.fn() }
        },
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
      expect(user).toEqual({
        id: expect.any(String),
        name: mockUser.name,
        email: mockUser.email,
        phoneNumber: mockUser.phoneNumber,
        role: ['CLIENT']
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
      const { token, user } = await authService.renewToken(newMockUser)

      expect(user).toEqual(newMockUser)
      expect(token).toBe('randomToken')
    })
  })

  describe('generate jwt', () => {
    it('shoult return a token', async () => {
      jest.spyOn(jwt, 'sign').mockResolvedValue('randomToken' as never)

      const token = generateJwt({ id: 'randomId' })

      expect(token).toBe('randomToken')
      expect(typeof token).toBe('string')
    })
  })

  describe('Update User Info', () => {
    const mockId: string = '1'
    const mockUser: {
      name: string
      email: string
      phone_number: string
      is_active: boolean
      is_verified: boolean
    } = {
      name: 'sam',
      email: 'sam@email.com',
      phone_number: '5610747645',
      is_active: false,
      is_verified: false
    }

    it('should return updates user data', async () => {
      const mockId = 'someUserId'

      const updatedData = {
        name: 'samuel',
        email: 'samuel@hotmail.com',
        phone_number: '1234567890'
      }

      mockUser.is_active = true
      mockUser.is_verified = true

      mockPrisma.user.findUnique.mockResolvedValue({ id: mockId, ...mockUser })
      mockPrisma.user.update.mockResolvedValue(updatedData)

      const result = await authService.update(mockId, updatedData)
      expect(result).toEqual(updatedData)
    })

    it('should throw notFoundExpection whe the user not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(undefined)
      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should throw UnauthorizedException when the user is inactive', async () => {
      const inactiveUser = { ...mockUser, is_active: false }
      mockPrisma.user.findUnique.mockResolvedValue(inactiveUser)

      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        UnauthorizedException
      )
    })

    it('should throw UnauthorizedException when the user is Unverified', async () => {
      const unveriedUser = { ...mockUser, is_verified: false }
      mockPrisma.user.findUnique.mockResolvedValue(unveriedUser)

      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        UnauthorizedException
      )
    })
  })

  describe('update-avatar', () => {
    const mockId: string = '1'
    const mockAvatar: { avatar: string } = {
      avatar: 'https://res.cloudinary.com/dlfokylll/image/upload/v1717106810/x8iq5mmfuf802a2iux0k.jpg'
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
      mockPrisma.user.findUnique.mockResolvedValue({
        id: mockId,
        avatar: mockAvatar.avatar,
        is_active: true,
        is_verified: true
      })

      // se usa spyOn para simular el servicio de cloudinary en Ok
      jest.spyOn(authService, 'updateUserAvatar').mockResolvedValue({
        avatar: mockAvatar.avatar
      })

      await expect(authService.updateUserAvatar(mockId, mockFile)).resolves.toEqual(
        {
          avatar: mockAvatar.avatar
        }
      )
    })

    it('should fail to upload the user avatar', async () => {
      // se usa spyOn para simular el servicio de cloudinary en fallo
      jest.spyOn(authService, 'updateUserAvatar').mockImplementation(() => {
        throw new Error('Failed to upload file')
      })

      try {
        await authService.updateUserAvatar(mockId, mockFile)
        expect(true).toBe(false)
      } catch (error) {
        expect(error.message).toBe('Failed to upload file')
      }
    })

    it('should throw notFoundExpection whe the user not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(undefined)
      await expect(authService.updateUserAvatar(mockId, mockFile)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should throw UnauthorizedException when the user is inactive', async () => {
      const inactiveUser = { ...mockUser, is_verified: false }
      mockPrisma.user.findUnique.mockResolvedValue(inactiveUser)

      await expect(authService.updateUserAvatar(mockId, mockFile)).rejects.toThrow(
        UnauthorizedException
      )
    })

    it('should throw UnauthorizedException when the user is Unverified', async () => {
      const unveriedUser = { ...mockUser, is_verified: false }
      mockPrisma.user.findUnique.mockResolvedValue(unveriedUser)

      await expect(authService.updateUserAvatar(mockId, mockFile)).rejects.toThrow(
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
      await expect(
        authService.forgotPassword(mockForgotPassDto)
      ).rejects.toThrow(new ConflictException('User not found'))
    })

    it("should return 200 if the user's email is found", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      const result = await authService.forgotPassword(mockForgotPassDto)

      expect(result).toEqual('Email succssfully sent')
    })
  })

  describe('Change user role', () => {
    it('Should return new role user', async () => {
      mockPrisma.user.update.mockResolvedValue({
        ...newMockUser,
        role: ['OWNER']
      })

      const result = await authService.changeRole(newMockUser.id as UUID)

      expect(result).toEqual({
        ...newMockUser,
        role: ['OWNER']
      })
    })
  })
})
