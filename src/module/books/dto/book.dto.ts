import { IsBoolean, IsNumber, IsString } from "class-validator";

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

    @IsString()
    owner: string;

    @IsBoolean()
    isPublished: boolean;

    @IsNumber()
    count: number;
};