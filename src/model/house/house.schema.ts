// // user.schema.ts
//
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//
// export type HouseDocument = House & Document;
//
// @Schema({
//   toJSON: {
//     transform: (doc, ret) => {
//       ret.id = ret._id;
//       delete ret._id;
//       delete ret.__v;
//     },
//   },
// })
//
// export class House {
//   @Prop({ required: true })
//   address: string;
//
//   @Prop({ required: true })
//   password: string;
// }
//
// export const HouseSchema = SchemaFactory.createForClass(House);
