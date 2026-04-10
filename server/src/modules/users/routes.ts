import { Router } from "express";
import optionalAuth from "middlewares/optional-auth";
import validate from "middlewares/request-validator";
import { createAccountSchema } from "modules/users/schemas";
import {
  handleCreateAccount,
  handleGetCurrentUser,
} from "modules/users/controllers";

const router = Router();

router.post("/", validate(createAccountSchema), handleCreateAccount);
router.get("/me", optionalAuth, handleGetCurrentUser);

export default router;
