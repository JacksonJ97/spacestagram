import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

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

  return res.status(500).json({
    message: "Internal Server Error",
  });
}

export default errorHandler;
