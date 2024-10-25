// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Place, PlaceDocument } from './place.schema';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}


  async findById(id: any){
    return  await this.placeModel.findById(id).exec();
  }

  async findByPath({level,path}: any){
    const list = await this.placeModel.find({path}).exec();
    return list
  }

  async create() {
    const p = await this.createP();
    const d = await this.createD(p);
    const w = await this.createW(d);
  }


  async createW(districts:any[]) {
    try {
      // const placesData = [];
      const response = await fetch('https://provinces.open-api.vn/api/w/');
      const data = await response.json();
      const places = data.map((place: any) => {
        const district = districts.find(p => p.code == String(place.district_code));
        const obj = {
          name: place.name
            .replaceAll('Phường ', '')
            .replaceAll('Xã ', '')
            .replaceAll('Thị trấn ', ''),
          code: String(place.code),
          path: district.path + '.' + String(place.district_code),
          type: place.division_type,
          level: 4,
        };
        const createdUser = new this.placeModel(obj);
        return createdUser;
      });

      const createdPlaces = await this.placeModel.insertMany(places);
      console.log(createdPlaces.length);
      return { status: 'oke' };
    } catch (e) {}
  }

  async createD(provinces:any[]) {
    try {
      // const placesData = [];
      const response = await fetch('https://provinces.open-api.vn/api/d/');
      const data = await response.json();
      const places = data.map((place: any) => {
        const province = provinces.find(p => p.code == String(place.province_code));
        const obj = {
          name: place.name
            .replaceAll('Huyện ', '')
            .replaceAll('Quận ', '')
            .replaceAll('Thành phố ', '')
            .replaceAll('Thị xã ', ''),
          code: String(place.code),
          path: province.path + '.' + String(place.province_code),
          type: place.division_type,
          level: 3,
        };
        const createdUser = new this.placeModel(obj);
        return createdUser;
      });

      const createdPlaces = await this.placeModel.insertMany(places);
      console.log(createdPlaces.length);
      return createdPlaces;
    } catch (e) {}
  }

  async createP() {
    try {
      // const placesData = [];
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      const data = await response.json();
      const places = data.map((place: any) => {
        const obj = {
          name: place.name.replaceAll('Tỉnh ', '').replaceAll('Thành phố ', ''),
          code: String(place.code),
          path: '1',
          type: place.division_type,
          level: 2,
        };
        const createdUser = new this.placeModel(obj);
        return createdUser;
      });
      const createdPlaces = await this.placeModel.insertMany(places);
      console.log(createdPlaces.length);
      return createdPlaces;
    } catch (e) {}
  }
}
