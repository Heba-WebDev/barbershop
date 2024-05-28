import { Test, type TestingModule } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'

import * as request from 'supertest'

import { PrismaService } from '../src/prisma/prisma.service'
import { mockPrisma, mockUser } from './mocks'
import { AuthController } from '../src/auth/auth.controller'
import { AuthService } from '../src/auth/auth.service'
import { PassportModule } from '@nestjs/passport'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
    })
      .compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())

    await app.init()
  })

  it('/new-account (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/new-account')
      .expect('Content-Type', /json/)
      .expect(201)
      .send(mockUser)
      .then(resp => {
        expect(resp.body.user).toEqual({
          name: mockUser.name,
          email: mockUser.email,
          phoneNumber: mockUser.phoneNumber,
          id: expect.any(String),
          role: 'CLIENT'
        })
      })
  })
})
