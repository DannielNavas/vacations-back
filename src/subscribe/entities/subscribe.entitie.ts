import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscribe extends Document {
  @Prop({ required: true })
  email: string;
}

export const SubscribeSchema = SchemaFactory.createForClass(Subscribe);
