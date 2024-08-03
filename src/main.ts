import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
// import { AddInfoHttp } from './interceptors/http.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  // app.useGlobalInterceptors(new AddInfoHttp());
  await app.listen(port);
}
bootstrap();
