import { Router } from "express";
import { createAccountSchema, handleCreateAccount } from "controllers/users";
import validateRequestBody from "middlewares/request-body-validator";

const router = Router();

router.post("/", validateRequestBody(createAccountSchema), handleCreateAccount);

export default router;
