import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthCookiesService } from '#src/auth/services/auth-cookies.service.js';

import { JwtPayload } from '../types/index.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authCookiesService: AuthCookiesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const tokens = this.authCookiesService.getAuthTokens(request);
    if (!tokens) {
      const res = context.switchToHttp().getResponse<FastifyReply>();
      this.authCookiesService.clearAuthTokens(res);
      throw new UnauthorizedException();
    }

    const { accessToken } = tokens;

    const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken);

    if (!payload) {
      const res = context.switchToHttp().getResponse<FastifyReply>();
      this.authCookiesService.clearAuthTokens(res);
      throw new UnauthorizedException();
    }

    request.user = payload;

    return true;
  }
}
