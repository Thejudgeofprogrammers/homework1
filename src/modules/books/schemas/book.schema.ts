import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

import { User } from "../../user/schemas/user.schema";


export type BookDocument = Book & Document;

@Schema()
export class Book {

    @Prop({ required: true })
    title: string;

    @Prop({ default: "" })
    description: string;

    @Prop({ default: "" })
    authors: string;

    @Prop({ default: false })
    favorite: boolean;

    @Prop({ default: "" })
    fileCover: string;

    @Prop({ default: "" })
    fileName: string;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop({ default: false })
    isPublished: boolean;

    @Prop({ default: 0 })
    count: number;
};

export const BookSchema = SchemaFactory.createForClass(Book);