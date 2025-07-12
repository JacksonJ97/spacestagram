import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import type { NewUser } from "../schemas/users";
import { createUser, getUserByEmail } from "../db/queries";

interface CreateUserRequest extends Request {
  body: NewUser;
}

async function handleCreateUser(req: CreateUserRequest, res: Response) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const [existingUser] = await getUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [user] = await createUser({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function handleGetUser(req: Request, res: Response) {
  res.json({ message: `Get user with ID: ${req.params.id}` });
}

export { handleCreateUser, handleGetUser };
