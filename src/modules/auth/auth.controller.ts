import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './Response';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Post('signup')
    public async signUp(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return await this.authService.signUp(dto);
    };

    @Post('signin')
    public async signIn(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
        return await this.authService.signIn(dto);
    };

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true;
    };
};
