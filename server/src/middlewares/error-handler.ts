import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { NODE_ENV } from "../utils/constants";

function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
      ...(NODE_ENV !== "production" && { stack: error.stack }),
    });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({
    message: "Internal Server Error",
    ...(NODE_ENV !== "production" && { error }),
  });
}

export default errorHandler;
