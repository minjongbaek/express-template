import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createLogger } from './config/loggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: createLogger(),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
