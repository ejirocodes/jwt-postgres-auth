import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
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

    await this.prisma.user.create({
      data: {
        email,
        password,
        first_name,
        last_name,
      },
    });
    return {
      email,
      first_name,
      last_name,
    };
  }

  login(createAuthDto: CreateAuthDto) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidUser = this.hashService.comparePassword(
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

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
