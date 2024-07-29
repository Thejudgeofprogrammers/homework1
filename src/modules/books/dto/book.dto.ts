import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Schema, Types } from "mongoose";

export class BookDTO {
    @IsString()
    _id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    authors: string;

    @IsBoolean()
    favorite: boolean;

    @IsString()
    fileCover: string;

    @IsString()
    fileName: string;

    owner: Types.ObjectId;

    @IsBoolean()
    isPublished: boolean;

    @IsNumber()
    count: number;
};
