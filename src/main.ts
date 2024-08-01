import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AddInfoHttp } from './interceptors/http.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AddInfoHttp());
  await app.listen(process.env.PORT);
}
bootstrap();
