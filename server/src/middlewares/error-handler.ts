import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
      ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
    });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({
    message: "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { error }),
  });
}

export default errorHandler;
