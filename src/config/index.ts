import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: '.env' });

const BASE_DIRECOTRY = process.cwd();

export const LOG_DIRECOTRY = path.join(BASE_DIRECOTRY, 'logs');
export const { LOG_FORMAT, ORIGIN } = process.env;

export const CREDENTIALS = process.env.CREDENTIALS === 'true';