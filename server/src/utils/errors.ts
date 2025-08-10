import {
  CONFLICT,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  HttpStatusCode,
} from "constants/http";

const codes = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  CONFLICT: "CONFLICT",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  INVALID_INPUT: "INVALID_INPUT",
  UNAUTHORIZED: "UNAUTHORIZED",
  ACCESS_TOKEN_MISSING: "ACCESS_TOKEN_MISSING",
} as const;

type ErrorCode = keyof typeof codes;

export class AppError extends Error {
  constructor(
    public status: HttpStatusCode = INTERNAL_SERVER_ERROR,
    public message: string = "Internal Server Error",
    public code: ErrorCode = "INTERNAL_SERVER_ERROR"
  ) {
    super(message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", code: ErrorCode = "CONFLICT") {
    super(CONFLICT, message, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found", code: ErrorCode = "RESOURCE_NOT_FOUND") {
    super(NOT_FOUND, message, code);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", code: ErrorCode = "INVALID_INPUT") {
    super(BAD_REQUEST, message, code);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", code: ErrorCode = "UNAUTHORIZED") {
    super(UNAUTHORIZED, message, code);
  }
}
