import { Request, type Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const serverErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: err.message || "error",
  });
};
