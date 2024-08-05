import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from '../books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configurations from '../../configurations';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { loggerMiddleware } from '../../middleware/logger.middleware';

@Module({
    imports: [BooksModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations]
        }),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        UsersModule, AuthModule, TokenModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(loggerMiddleware)
            .forRoutes('*')
    };
};
