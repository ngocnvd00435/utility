// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Place } from './place.schema';

export type AddressDocument = Address & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      if (ret.details && Array.isArray(ret.details)) {
        ret.details = ret.details.map(({ _id, ...rest }) => rest);
      }
    },
  },
})
export class Address {
  @Prop({
    type: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  })
  details: { name: string; type: string }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Place' }] })
  places: Place[];
}

export const AddressSchema = SchemaFactory.createForClass(Address);
