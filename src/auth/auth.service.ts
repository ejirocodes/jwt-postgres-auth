import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from './../prisma/prisma.service';

import { HashService } from './../hashing/hash.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;

    const password = await this.hashService.hashPassword(
      createAuthDto.password,
    );

    await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
    console.log(email, password);
    return {
      email,
    };
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
