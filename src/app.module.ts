import { Module } from '@nestjs/common';
import { MongoDbProvider } from './config/mongodb.config';
import { UserModule } from './model/user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './model/address/address.module';

@Module({
  imports: [
    MongoDbProvider,
    AuthModule,
    UserModule,
    AddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
