import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  displayName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  emailVerified: boolean;
  @Prop({ required: true })
  photoURL: string;
  @Prop({ required: true })
  plan: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
