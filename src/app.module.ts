import { Module } from '@nestjs/common';
import { MongoDbProvider } from './config/mongodb.config';
import { UsersModule } from './model/user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongoDbProvider,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
