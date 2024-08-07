import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from './adapters/ws.adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useWebSocketAdapter(new WsAdapter(app));
    const port = configService.get('port');
    await app.listen(port);
};
bootstrap();
