import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { UserLogin } from "../schemas/auth";
import { getUserByEmail } from "../db/queries";
import { BadRequestError } from "../utils/errors";

interface UserLoginRequest extends Request {
  body: UserLogin;
}

async function handleUserLogin(
  req: UserLoginRequest,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestError("Invalid email or password");
    }

    res.json({ message: "User authenticated" });
  } catch (error) {
    next(error);
  }
}

function handleUserLogout(req: Request, res: Response, next: NextFunction) {
  res.json({ message: "Login route" });
}

export { handleUserLogin, handleUserLogout };
