import {
  CONFLICT,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "constants/http";

export class AppError extends Error {
  status: number;
  constructor(
    status = INTERNAL_SERVER_ERROR,
    message = "Internal Server Error"
  ) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
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
