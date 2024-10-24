// src/auth/auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../model/user/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Thay bằng khóa bí mật của bạn, nên lưu vào biến môi trường
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
