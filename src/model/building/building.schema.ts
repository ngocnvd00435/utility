// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BuildingDocument = Building & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Building {
  // @Prop({ required: true })
  // address: string;


  // số phòng/ căn hộ
  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  available: number;

  // giá phòng/ căn hộ min - max
  @Prop({
    type: [{ value: { type: Number, required: false }}]
  })
  price: [];

  @Prop({ required: true })
  floor: number;

  @Prop({
    type: [{
        name: { type: String, required: true },
        value: { type: Number, required: true },
      }]
  })
  services: [];
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
