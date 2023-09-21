import type { Application } from 'express';
import express from 'express';
import morgan from 'morgan';
import { CREDENTIALS, LOG_FORMAT, ORIGIN } from './config';
import { stream } from './utils/logger';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Route } from './types/route';

export class App {
  private app: Application;
  private env: string;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
