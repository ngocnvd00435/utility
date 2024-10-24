// src/auth/bearer-token.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header not found or invalid format');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Xác thực token bằng JwtService
      const decodedToken:any = this.jwtService.verify(token, {
        secret: 'YOUR_SECRET_KEY', // Khóa bí mật của bạn (nên lấy từ biến môi trường)
      });
      // Lưu thông tin người dùng đã xác thực vào request để dùng trong controller
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
