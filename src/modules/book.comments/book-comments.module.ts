import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../books/schemas/book.schema';
import { BookCommentSchema, BookComment } from './schemas/book-comment.schema';
import { AuthModule } from '../auth/auth.module';
import { BookCommentsService } from './book-comments.service';
import { BookCommentsController } from './book-comments.controller';
import { BookCommentsGateway } from './gateways/book-comments.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([ { name: BookComment.name, schema: BookCommentSchema } ]),
        AuthModule
    ],
    providers: [BookCommentsService, BookCommentsGateway],
    controllers: [BookCommentsController]
})
export class BookCommentsModule {}
