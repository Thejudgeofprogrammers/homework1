import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class BookDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    authors?: string;

    @IsBoolean()
    @IsOptional()
    favorite?: boolean;

    @IsString()
    @IsOptional()
    fileCover?: string;

    @IsString()
    @IsOptional()
    fileName?: string;

    owner: Types.ObjectId;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

    @IsNumber()
    @IsOptional()
    count?: number;
};
