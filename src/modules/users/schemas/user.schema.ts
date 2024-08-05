import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: "" })
    firstName: string;

    @Prop({
        default: ""
    })
    email: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Book' }] })
    books: MongooseSchema.Types.ObjectId[];

};

export const UserSchema = SchemaFactory.createForClass(User);
