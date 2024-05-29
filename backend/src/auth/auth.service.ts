import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

import * as jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

import { type CreateUserDto } from "./dto/create-user.dto";
import { type LoginUserDto } from "./dto/login-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { type User, type IJwtPayload } from "./interfaces";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAuthDto: CreateUserDto) {
    const { email, password, name, phoneNumber } = createAuthDto;

    const user = await this.findUserByEmail(email);

    if (user)
      throw new ConflictException(
        `User with email ${email} is already registered`
      );
    const hashedPass = await hash(password, 10);
    const { id, role } = await this.prismaService.user.create({
      data: {
        name,
        email,
        phone_number: createAuthDto.phoneNumber,
        password: hashedPass,
        role: "CLIENT",
      },
    });

    return { user: { id, name, email, phoneNumber, role } };
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user;
  }

  async login(loginAuthDto: LoginUserDto) {
    const { email, password } = loginAuthDto;

    const user = await this.findUserByEmail(email);

    if (!user) throw new NotFoundException("User not found");

    const pass = await compare(password, user.password);

    if (!pass) throw new BadRequestException("Invalid credentials");

    const token = await this.generateJwt({ id: user.id });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        is_active: user.is_active,
        is_verified: user.is_verified,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    };
  }

  async update(
    id: string,
    data: UpdateUserDto
  ): Promise<{
    name: string;
    email: string;
    phone_number: string;
    avatar: string;
  }> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException("User doesn't exist");

    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
        phone_number: true,
        avatar: true,
      },
    });
  }

  async generateJwt(payload: IJwtPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    return token;
  }

  async renewToken(user: User) {
    const token = await this.generateJwt({ id: user.id });

    return {
      user,
      token,
    };
  }
}
