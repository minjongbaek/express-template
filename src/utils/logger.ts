import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIRECOTRY } from '@config';

// check log directory
if (!existsSync(LOG_DIRECOTRY)) {
  mkdirSync(LOG_DIRECOTRY);
}

// log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

/*
 * log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${LOG_DIRECOTRY}/debug`, // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 14, // 30 Days saved
      json: false,
      zippedArchive: true,
      format: winston.format.uncolorize(),
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${LOG_DIRECOTRY}/error`, // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 14, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
      format: winston.format.uncolorize(),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize()
      ),
    }),
  ],
});

// for morgan stream
const stream = {
  write: (message: string) => {
    logger.info(message.slice(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
