import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon from 'argon2';

import { JwtPayload, Tokens } from '#src/common/types/index.js';
import { UsersService } from '#src/users/index.js';

import { SignInDto, SignUpDto } from '../dto/index.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const existingUser = await this.usersService.getForAuth(dto.email);

    if (existingUser)
      throw new HttpException(
        'Некорректный адрес почты', // не указываем явно на то, что адрес уже использован, в целях безопасности
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await this.hashPassword(dto.password);
    const createdUser = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
    });

    const tokens = await this.signTokens(createdUser.id);

    return tokens;
  }

  async signIn(dto: SignInDto): Promise<Tokens> {
    const user = await this.usersService.getForAuth(dto.email);

    if (!user)
      throw new HttpException('Данные неверны', HttpStatus.UNAUTHORIZED); // не указываем что именно неверно ради безопасности

    if (!(await this.verifyPassword(dto.password, user.password))) {
      throw new HttpException('Данные неверны', HttpStatus.UNAUTHORIZED); // не указываем что именно неверно ради безопасности
    }

    const tokens = await this.signTokens(user.id);

    return tokens;
  }

  private async hashPassword(plain: string) {
    return await argon.hash(plain);
  }

  private async verifyPassword(
    plain: string,
    hashed: string,
  ): Promise<boolean> {
    try {
      return await argon.verify(hashed, plain);
    } catch {
      return false;
    }
  }

  // подразумевается, что этот метод должен объединять в себе подписание accessToken и создание refreshToken
  private async signTokens(userId: string): Promise<Tokens> {
    const accessToken = await this.signAccessToken(userId);
    return { accessToken };
  }

  private async signAccessToken(userId: string): Promise<string> {
    const payload: JwtPayload = { uid: userId };
    return await this.jwtService.signAsync(payload);
  }
}
