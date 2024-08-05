import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @UseGuards(JwtAuthGuard)
    @Get()
    public async getAllUser() {
        return await this.usersService.getAllUsers();
    }; // Для теста будет убрано 

    @UseGuards(JwtAuthGuard)
    @Patch()
    public async updateUser(@Body() updateDTO: UpdateUserDTO, @Req() req): Promise<UpdateUserDTO> {
        const user = req.user;
        return await this.usersService.updateUser(user.email, updateDTO);
    };
    
    @UseGuards(JwtAuthGuard)
    @Delete()
    public async deleteUser(@Req() req): Promise<boolean> {
        const user = req.user;
        return await this.usersService.deleteUser(user.email);
    };
};
