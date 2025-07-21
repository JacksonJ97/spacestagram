import { Router } from "express";
import {
  createAccountSchema,
  handleCreateAccount,
  handleGetCurrentUser,
} from "controllers/users";
import authenticateUser from "middlewares/authenticate-user";
import validateRequestBody from "middlewares/request-body-validator";

const router = Router();

router.post("/", validateRequestBody(createAccountSchema), handleCreateAccount);
router.get("/me", authenticateUser, handleGetCurrentUser);

export default router;
