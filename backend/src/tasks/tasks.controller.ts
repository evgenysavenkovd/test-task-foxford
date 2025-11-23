import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { type FastifyRequest } from 'fastify';

import { AuthGuard } from '#src/common/guards/auth.guard.js';

import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskDto } from './dto/task.dto.js';
import { TasksService } from './tasks.service.js';

@Controller('/tasks')
@UseGuards(AuthGuard)
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Создание задачи',
  })
  @ApiOkResponse({ type: TaskDto })
  async create(@Body() dto: CreateTaskDto, @Req() req: FastifyRequest) {
    const { uid } = req.user;
    return await this.tasksService.create(uid, dto);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Получение списка задач',
    description:
      'Возвращает все задачи для текущего пользователя, включая и созданные им, и назначенные ему',
  })
  @ApiOkResponse({
    type: TaskDto,
    isArray: true,
  })
  async getAll(@Req() req: FastifyRequest) {
    const { uid } = req.user;
    return await this.tasksService.getForUser(uid);
  }
}
