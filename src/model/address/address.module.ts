// user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './place.schema';
import { Address, AddressSchema } from './address.schema';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Place.name, schema: PlaceSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService,PlaceService],
  exports: [AddressService,PlaceService],
})
export class AddressModule {}
