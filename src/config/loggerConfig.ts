import { existsSync, mkdirSync } from 'fs';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as path from 'path';

const LOG_DIRECOTRY = path.join(process.cwd(), 'logs');

export const createLogger = () => {
  if (!existsSync(LOG_DIRECOTRY)) {
    mkdirSync(LOG_DIRECOTRY);
  }

  const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
  );

  const transports = [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('NestApp', {
          prettyPrint: true,
        }),
      ),
    }),
    createWinstonDaily('error'),
  ];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(createWinstonDaily('debug'));
  }

  const logger = WinstonModule.createLogger({
    format,
    transports,
  });

  return logger;
};

const createWinstonDaily = (level: string) => {
  return new winstonDaily({
    level: level,
    datePattern: 'YYYY-MM-DD',
    dirname: `${LOG_DIRECOTRY}/${level}`,
    filename: `%DATE%.log`,
    maxFiles: 14,
    handleExceptions: true,
    json: false,
    zippedArchive: true,
  });
};
