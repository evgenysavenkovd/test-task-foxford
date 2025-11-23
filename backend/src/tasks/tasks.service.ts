import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client.js';

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
        authorId,
        assigneeId: assignee.id,
      },
    });

    return task;
  }

  async getForUser(userId: string) {
    const include: Prisma.TaskInclude = {
      assignee: { select: { email: true } },
      author: { select: { email: true } },
    };

    const authored = await this.prisma.task.findMany({
      where: { authorId: userId },
      include,
      orderBy: { createdAt: 'desc' },
    });
    const assigned = await this.prisma.task.findMany({
      where: { assigneeId: userId },
      include,
      orderBy: { createdAt: 'desc' },
    });

    const tasks = [...authored, ...assigned].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );

    return tasks;
  }
}
