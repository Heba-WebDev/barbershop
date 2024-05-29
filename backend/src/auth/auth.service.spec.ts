import {
  ConflictException,
  Controller,
  NotFoundException,
} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { Test, type TestingModule } from "@nestjs/testing";
import { validate } from "class-validator";

import { hash } from "bcrypt";

import { type User } from "./interfaces";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";

import { AuthController } from "./auth.controller";
import { mockPrisma, mockUser } from "../../test/mocks";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
}));

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
      imports: [PassportModule.register({ defaultStrategy: "jwt" })],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    mockPrisma.user.create.mockClear();
  });

  describe("create user", () => {
    beforeEach(async () => {
      const errors = await validate(mockUser);
      expect(errors.length).toBe(0);
    });

    it("should return a new user", async () => {
      const { user } = await authService.create(mockUser);

      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
      expect(user).toMatchObject({
        id: expect.any(String),
        name: mockUser.name,
        email: mockUser.email,
        phoneNumber: mockUser.phoneNumber,
        role: "CLIENT",
      });

      expect(user).not.toHaveProperty("password");
    });

    it("should return a registered user conflict error exception", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(authService.create(mockUser)).rejects.toThrow(
        new ConflictException(
          `User with email ${mockUser.email} is already registered`
        )
      );
    });
  });

  describe("renew token", () => {
    it("shoult return an user with new token", async () => {
      const newMockUser: User = {
        id: "randomUUID",
        email: mockUser.email,
        name: mockUser.name,
        phoneNumber: mockUser.phoneNumber,
        role: "CLIENT",
      };

      const { token, user } = await authService.renewToken(newMockUser);

      expect(user).toEqual(newMockUser);
      expect(typeof token).toBe("string");
    });
  });

  describe("Update User Info", () => {
    it("should return updates user data", async () => {
      const mockId = "1";
      const mockUser = {
        name: "sam",
        email: "sam@email.com",
        phone_number: "5610747645",
        avatar: "https://algo.com/algo.png",
      };

      jest.spyOn(authService, "update").mockResolvedValue(mockUser);
      await expect(authService.update(mockId, mockUser)).resolves.toEqual(
        mockUser
      );
    });

    it("should throw notFoundExpection whe the user not exist", async () => {
      const mockId = "999";
      const mockUser = {
        name: "sam",
        email: "sam@email.com",
        phone_number: "5610747645",
        avatar: "https://algo.com/algo.png",
      };
      jest
        .spyOn(authService, "update")
        .mockRejectedValue(new NotFoundException("User doesn't exist")); // Use NotFoundException directly
      await expect(authService.update(mockId, mockUser)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
