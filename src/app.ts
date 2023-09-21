import type { Application } from 'express';
import express from 'express';

export class App {
  private app: Application;
  private env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
  }

  public listen() {
    this.app.listen(this.port);
  }
}
