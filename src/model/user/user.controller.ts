import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '../../auth/auth.guard';
import * as process from 'node:process';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async register(
    @Body() createUserDto: { username: string; password: string },
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Post('signin')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard)
  @Get('info')
  async getUserInfo(@Request() req: any) {
    // Lấy thông tin người dùng từ JWT (đã được xác thực)
    // const { user } = req;
    const user = await this.userService.findByUsername(req?.user?.username);
    const { username, id }: any = user;
    return { id, username };
  }
}
