import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/modules/books/schemas/book.schema';
import { User, UserSchema } from '../users/schemas/user.schema'; 

@Module({
  imports: [MongooseModule.forFeature([
    { name: Book.name, schema: BookSchema },
    { name: User.name, schema: UserSchema }
  ]
  )
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {};
