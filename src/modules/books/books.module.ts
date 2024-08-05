import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../books/schemas/book.schema';
import { User, UserSchema } from '../users/schemas/user.schema'; 
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Book.name, schema: BookSchema },
        { name: User.name, schema: UserSchema },
    ]),
    AuthModule
    ],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {};
