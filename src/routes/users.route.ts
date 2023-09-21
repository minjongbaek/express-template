import { Router } from 'express';
import { UserController } from '@/controller/users.controller';
import { Route } from '@/types/route';

export class UserRoute implements Route {
  public path = '/users';
  public router = Router();
  private userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.getUsers);
  }
}
