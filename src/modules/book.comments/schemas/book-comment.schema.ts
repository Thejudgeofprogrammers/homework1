import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import IBookCommentDTO from "../interface/book-comment.dto";

export type BookCommentDocument = IBookCommentDTO & Document;

@Schema()
export class BookComment {

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
    bookId: Types.ObjectId;

    @Prop({ required: true })
    comment: string;
};

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
