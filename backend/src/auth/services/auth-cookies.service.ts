import { CookieSerializeOptions } from '@fastify/cookie';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import ms from 'ms';

import { CookieName } from '#src/common/enum/cookie-name.enum.js';
import { Tokens } from '#src/common/types/index.js';

@Injectable()
export class AuthCookiesService {
  private readonly tokenCookieOptions: CookieSerializeOptions;
  private readonly isAuthCookieOptions: CookieSerializeOptions;

  constructor(private readonly configService: ConfigService) {
    const isProd = this.configService.get('NODE_ENV') === 'production';

    const tokenMaxAge = this.configService.get('COOKIE_TOKEN_MAX_AGE') ?? '30m';
    const cookieDomain = isProd
      ? this.configService.getOrThrow('COOKIE_DOMAIN')
      : 'localhost';
    const sameSite: CookieSerializeOptions['sameSite'] = isProd
      ? 'lax'
      : 'none';

    this.tokenCookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite,
      maxAge: ms(tokenMaxAge as ms.StringValue),
      domain: cookieDomain,
      path: '/',
    } as const;

    // эта cookie будет использоваться исключительно на фронтенде для определения состояния аутентификации,
    // поэтому она не httpOnly, для доступа из js
    this.isAuthCookieOptions = {
      httpOnly: false,
      secure: true,
      sameSite,
      domain: cookieDomain,
      path: '/',
    };
  }

  getAuthTokens(req: FastifyRequest): Tokens | null {
    const accessToken = this.getAccessTokenCookie(req);

    if (!accessToken) return null;

    return {
      accessToken,
    };
  }

  getAccessTokenCookie(req: FastifyRequest): string | undefined {
    return req.cookies[CookieName.AccessToken];
  }

  setAuthTokens(res: FastifyReply, tokens: Tokens) {
    res.setCookie(
      CookieName.AccessToken,
      tokens.accessToken,
      this.tokenCookieOptions,
    );
  }

  clearAuthTokens(res: FastifyReply) {
    res.clearCookie(CookieName.AccessToken, this.tokenCookieOptions);
  }

  setIsAuth(res: FastifyReply) {
    res.setCookie(CookieName.IsAuth, 'true', this.isAuthCookieOptions);
  }
  clearIsAuth(res: FastifyReply) {
    res.clearCookie(CookieName.IsAuth, this.isAuthCookieOptions);
  }
}
