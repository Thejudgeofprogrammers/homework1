import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import IUserDTO from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userRepository: Model<UserDocument>) {};

    public async getAllUsers(): Promise<IUserDTO[]> {
        const users = await this.userRepository.find().select('-__v').exec();
        return users.map(user => user.toObject() as IUserDTO);
    };

    public async hashedPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, 10);
        } catch (err) {
            console.error(err);
            throw err;
        };
    };

    public async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({ email });
        } catch (err) {
            console.error(err);
            throw err;
        };
    };

    public async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashedPassword(dto.password);
            await this.userRepository.create({
                username: dto.username,
                firstName: dto.firstName,
                email: dto.email,
                password: dto.password
            });
            return dto;
        } catch (err) {
            console.error(err);
            throw err;  
        };
    };

    public async publicUser(email: string): Promise<User> {
        try {
            return this.userRepository.findOne({ email })
                .select('-password')
                .select('-__v')
                .populate('books')
        } catch (err) {
            console.error(err);
            throw err;  
        };
    };

    public async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        try {
            await this.userRepository.updateOne(dto, { email });
            return dto;
        } catch (err) {
            throw new Error(err);  
        };
    };

    public async deleteUser(email: string): Promise<boolean> {
        try {
            await this.userRepository.deleteOne({ email });
            return true;  
        } catch (err) {
            console.error(err);
            throw err;
        };
    };
};
