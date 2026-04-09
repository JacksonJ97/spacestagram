import { Router } from "express";
import validate from "middlewares/request-validator";
import {
  handleUserLogin,
  handleUserLogout,
  handleTokenRefresh,
} from "modules/auth/controllers";
import { loginSchema } from "modules/auth/schemas";

const router = Router();

router.post("/login", validate(loginSchema), handleUserLogin);
router.post("/logout", handleUserLogout);
router.post("/refresh", handleTokenRefresh);

export default router;
