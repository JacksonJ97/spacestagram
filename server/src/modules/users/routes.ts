import { Router } from "express";
import validate from "middlewares/request-validator";
import authenticateUser from "middlewares/authenticate-user";
import {
  handleCreateAccount,
  handleGetCurrentUser,
} from "modules/users/controllers";
import { createAccountSchema } from "modules/users/schemas";

const router = Router();

router.post("/", validate(createAccountSchema), handleCreateAccount);
router.get("/me", authenticateUser, handleGetCurrentUser);

export default router;
