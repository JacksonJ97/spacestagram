import { Router } from "express";
import {
  handleCreateAccount,
  handleGetCurrentUser,
} from "modules/users/controller";
import { createAccountSchema } from "modules/users/schema";
import authenticateUser from "middlewares/authenticate-user";
import validateRequestBody from "middlewares/request-body-validator";

const router = Router();

router.post("/", validateRequestBody(createAccountSchema), handleCreateAccount);
router.get("/me", authenticateUser, handleGetCurrentUser);

export default router;
