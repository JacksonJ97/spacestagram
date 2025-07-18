import {
  CONFLICT,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  HttpStatusCode,
} from "constants/http";

export class AppError extends Error {
  constructor(
    public status: HttpStatusCode = INTERNAL_SERVER_ERROR,
    public message: string = "Internal Server Error"
  ) {
    super(message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(CONFLICT, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(NOT_FOUND, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(UNAUTHORIZED, message);
  }
}
