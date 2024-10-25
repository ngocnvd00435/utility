// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../model/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // const { password, ...result } = user;
      // return result;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
