// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlaceService } from './place.service';
import { Address, AddressDocument } from './address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private readonly placeService: PlaceService
  ) {}


  async findByLevelAndPath({path}: any){
    const list = await this.placeService.findByPath({path});
    return list
  }

  async test(){
    const list = await this.placeService.create();
    return {status: 'ok'}
  }

  async create(){
    const p = await this.placeService.findById("671b616cad67dcceded5521f");
    const d = await this.placeService.findById("671b616cad67dcceded5525f");
    const w = await this.placeService.findById("671b616dad67dcceded55522");

    const s= [
      {
        name: '1',
        type: 'số nhà',
      },
      {
        name: '53',
        type: 'ngõ',
      },
      {
        name: '13',
        type: 'ngách',
      }
    ]

    const abc = {
      details: s,
      places : [w,d,p]
    }

    // const
    const createdUser = new this.addressModel(abc);
    const createdPlaces = await this.addressModel.create(createdUser);

    return createdPlaces
  }
}
