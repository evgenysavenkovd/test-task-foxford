import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { type FastifyReply } from 'fastify';

import { SignInDto, SignUpDto } from './dto/index.js';
import { AuthCookiesService, AuthService } from './services/index.js';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookiesService: AuthCookiesService,
  ) {}

  @Post('/sign-in')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Логин',
    description: 'Возвращает токен при валидных данных',
  })
  @ApiOkResponse({
    description: 'Логин прошёл успешно',
    headers: {
      ['Set-Cookie']: {
        schema: {
          type: 'string',
          example: 'accessToken=<jwt>',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Пароль или почта некорректны',
  })
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const tokens = await this.authService.signIn(dto);
    this.authCookiesService.setAuthTokens(res, tokens);
    this.authCookiesService.setIsAuth(res);
    return true;
  }

  @Post('/sign-up')
  @ApiOperation({
    summary: 'Регистрация',
    description: 'Возвращает токен при успешной регистрации',
  })
  @ApiCreatedResponse({
    description: 'Регистрация прошла успешно',
    headers: {
      ['Set-Cookie']: {
        schema: {
          type: 'string',
          example: 'accessToken=<jwt>',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Пароль или почта не прошли валидацию',
  })
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const tokens = await this.authService.signUp(dto);
    this.authCookiesService.setAuthTokens(res, tokens);
    this.authCookiesService.setIsAuth(res);
    return true;
  }
}
