import { Injectable } from '@nestjs/common';

import { PrismaService } from '#src/prisma/prisma.service.js';

import { CreateUserDto } from './dto/index.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const res = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
      },
    });

    return res;
  }

  async exists(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    return user !== null;
  }

  async getForAuth(email: string) {
    try {
      return await this.prisma.user.findFirst({ where: { email } });
    } catch {
      return null;
    }
  }

  async getRandomExcluding(excludeUserId: string) {
    const where = { id: { not: excludeUserId } };
    const count = await this.prisma.user.count({ where });
    const skip = Math.floor(count * Math.random());
    const user = await this.prisma.user.findFirst({ where, skip });
    return user;
  }
}
