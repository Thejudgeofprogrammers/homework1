import { IsString } from "class-validator";

export class UserResponse {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    email: string;
};

export class AuthUserResponse {

    user: UserResponse;

    @IsString()
    token: string
};
