import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

import { Book } from "../../books/schemas/book.schema";

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
        type: [{
            value: {
                type: String,
                required: true
            }
        }],
        default: []
    })
    emails: { value: string }[];

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Book' })
    books: Book;

};

export const UserSchema = SchemaFactory.createForClass(User);
