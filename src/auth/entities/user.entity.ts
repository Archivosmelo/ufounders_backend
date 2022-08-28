import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

enum Role {
    user, //or User = "user",
    admin, // or Admin = "admin",
  }

@Schema()
export class User extends Document {

    @Prop({ unique: true, index: true })
    username: string;

    @Prop({ unique: true, index: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    roles: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);