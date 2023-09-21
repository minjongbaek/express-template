import { NextFunction, Request, Response } from 'express';

export class UserController {
  public getUsers = (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        data: [
          {
            id: 1,
            name: 'Shaw',
          },
          {
            id: 2,
            name: 'Moses',
          },
          {
            id: 3,
            name: 'Raphael',
          },
        ],
      });
    } catch (error) {
      next(error);
    }
  };
}
