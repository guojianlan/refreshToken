import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['access-token', 'refresh-token'],
  });
  await app.listen(3001);
}
void bootstrap();
