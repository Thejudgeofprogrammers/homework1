import { IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    email: string;
};

export class UpdateUserDTO {
    @IsString()
    username: string;

    @IsString()
    firstName: string;

    @IsString()
    email: string;
};
