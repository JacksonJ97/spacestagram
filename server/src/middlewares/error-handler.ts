import { Request, Response, NextFunction } from "express";
import { AppError } from "utils/errors";
import { INTERNAL_SERVER_ERROR } from "constants/http";

function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`ERROR at ${req.method} ${req.path}:`, error);

  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}

export default errorHandler;
