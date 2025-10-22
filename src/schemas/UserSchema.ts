import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  email: string;

  @Prop({ minLength: 8 })
  password: string;

  @Prop({ default: User, enum: ['user', 'admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
