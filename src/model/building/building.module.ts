// user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Building, BuildingSchema } from './building.schema';
import { Units, UnitsSchema } from './units.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Building.name, schema: BuildingSchema },
      { name: Units.name, schema: UnitsSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AddressModule {}
