import { Request, Response, NextFunction } from "express";
import type { NewUser } from "../schemas/users";
import { ConflictError } from "../utils/errors";
import { createUser, getUserByEmail } from "../db/queries";

interface CreateUserRequest extends Request {
  body: NewUser;
}

async function handleCreateUser(
  req: CreateUserRequest,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const user = await createUser({ firstName, lastName, email, password });

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

export { handleCreateUser };
