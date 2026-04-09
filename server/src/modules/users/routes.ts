import { Router } from "express";
import validate from "middlewares/request-validator";
import requireAuth from "middlewares/require-auth";
import {
  handleCreateAccount,
  handleGetCurrentUser,
} from "modules/users/controllers";
import { createAccountSchema } from "modules/users/schemas";

const router = Router();

router.post("/", validate(createAccountSchema), handleCreateAccount);
router.get("/me", requireAuth, handleGetCurrentUser);

export default router;
