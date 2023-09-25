import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const LOG_DIRECOTRY = `${__dirname}/../logs`;

  if (!existsSync(__dirname)) {
    mkdirSync(LOG_DIRECOTRY);
  }

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} ${level}: ${message}`,
        ),
      ),
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
        new winstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: `${LOG_DIRECOTRY}/debug`,
          filename: `%DATE%.log`,
          maxFiles: 14,
          json: false,
          zippedArchive: true,
        }),
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: `${LOG_DIRECOTRY}/error`,
          filename: `%DATE%.log`,
          maxFiles: 14,
          handleExceptions: true,
          json: false,
          zippedArchive: true,
        }),
      ],
    }),
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
