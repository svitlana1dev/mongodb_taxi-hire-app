import { NextFunction, type Request, type Response } from "express";

export const errorHandlerMiddleware = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
