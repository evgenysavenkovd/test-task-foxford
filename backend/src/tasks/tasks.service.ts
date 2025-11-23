import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '#src/prisma/prisma.service.js';
import { UsersService } from '#src/users/users.service.js';

import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(authorId: string, dto: CreateTaskDto) {
    const assignee = await this.usersService.getRandomExcluding(authorId);

    if (!assignee) {
      throw new InternalServerErrorException('No users to assign task to');
    }

    const task = await this.prisma.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        assigneeId: assignee.id,
      },
    });

    return task;
  }
}
