import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from './../prisma/prisma.service';

import { HashService } from './../hashing/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, first_name, last_name } = createAuthDto;

    const password = await this.hashService.hashPassword(
      createAuthDto.password,
    );

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        first_name,
        last_name,
      },
    });

    return {
      message: 'User created successfully',
      user,
    };
  }

  login(createAuthDto: CreateAuthDto) {
    const { email, first_name, last_name, id } = createAuthDto;

    const user = {
      id,
      email,
      first_name,
      last_name,
    };
    const access_token = this.jwtService.sign(user);

    return {
      ...user,
      access_token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidUser = await this.hashService.comparePassword(
      password,
      user.password,
    );

    if (isValidUser) {
      return user;
    }

    return null;
  }

  findAll() {
    return `This action returns all auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
