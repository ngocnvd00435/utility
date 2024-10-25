// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlaceDocument = Place & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Place {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  path: string;

  @Prop()
  type: string;
}

const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.index({ path: 1 });

export { PlaceSchema };
