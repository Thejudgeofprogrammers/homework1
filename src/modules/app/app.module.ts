import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from '../books/books.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BooksModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    // TypeOrmModule.forRoot({
    //   entities: [],
    //   synchronize: true
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
