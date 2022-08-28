import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

@Schema()
export class Client extends Document {

    // id

    @Prop({ unique: true, index: true })
    ticket: number;

    @Prop()
    present: boolean;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    birthdate: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;


}

export const ClientSchema = SchemaFactory.createForClass(Client);