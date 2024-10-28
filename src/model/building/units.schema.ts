// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UnitsDocument = Units & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Units {

  @Prop({ required: true })
  name: string;

  @Prop()
  member: string;

  // số điện old - new - total
  @Prop({
    type: [{value: { type: Number, required: false }}]
  })
  electricity: number;

  // số điện old - new - total
  @Prop({
    type: [{value: { type: Number, required: false }}]
  })
  water: number;

  @Prop({
    type: [{
      name: { type: String, required: true },
      value: { type: Number, required: true },
    }]
  })
  services: [];
}

export const UnitsSchema = SchemaFactory.createForClass(Units);
