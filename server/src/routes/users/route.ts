import { Router } from "express";
import {
  handleCreateAccount,
  handleGetCurrentUser,
} from "controllers/users/controller";
import { createAccountSchema } from "controllers/users/schema";
import authenticateUser from "middlewares/authenticate-user";
import validateRequestBody from "middlewares/request-body-validator";

const router = Router();

router.post("/", validateRequestBody(createAccountSchema), handleCreateAccount);
router.get("/me", authenticateUser, handleGetCurrentUser);

export default router;
