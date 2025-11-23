import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import ms from 'ms';

import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthCookiesService, AuthService } from './services/index.js';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.getOrThrow<string>('JWT_SECRET');
        const expires = configService.get<string>('JWT_EXPIRES') || '30m';

        return {
          secret: secret,
          signOptions: {
            expiresIn: ms(expires as ms.StringValue),
          },
        };
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthCookiesService],
  exports: [AuthService, AuthCookiesService],
  controllers: [AuthController],
})
export class AuthModule {}
