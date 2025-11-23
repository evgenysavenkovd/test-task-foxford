import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { type FastifyRequest } from 'fastify';

import { AuthGuard } from '#src/common/guards/auth.guard.js';

import { CreateTaskDto } from './dto/create-task.dto.js';
import { TasksService } from './tasks.service.js';

@Controller('/tasks')
@UseGuards(AuthGuard)
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/')
  async create(@Body() dto: CreateTaskDto, @Req() req: FastifyRequest) {
    const { uid } = req.user;
    const task = await this.tasksService.create(uid, dto);
    return task;
  }
}
