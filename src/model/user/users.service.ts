// users.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: any): Promise<User> {
    try {
      const saveUser = {
        username: createUserDto.username,
        password: await this.hashPassword(createUserDto.password),
      };
      const createdUser = new this.userModel(saveUser);
      return createdUser.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw e;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  // Hàm mã hóa mật khẩu
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}
