import { Router } from "express";
import requireAuth from "middlewares/require-auth";
import validate from "middlewares/request-validator";
import { loginSchema } from "modules/auth/schemas";
import { handleUserLogin, handleUserLogout } from "modules/auth/controllers";

const router = Router();

router.post("/login", validate(loginSchema), handleUserLogin);
router.post("/logout", requireAuth, handleUserLogout);

export default router;
