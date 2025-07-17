import { Router } from "express";
import {
  userLoginSchema,
  handleUserLogin,
  handleUserLogout,
} from "controllers/auth";
import validateRequestBody from "middlewares/request-body-validator";

const router = Router();

router.post("/login", validateRequestBody(userLoginSchema), handleUserLogin);
router.post("/logout", handleUserLogout);

export default router;
